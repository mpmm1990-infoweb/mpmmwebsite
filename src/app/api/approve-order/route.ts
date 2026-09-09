import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanityFetch } from "@/sanity/client";

interface BookQueryResponse {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current?: string };
  pdfFile?: {
    asset?: {
      url?: string;
    };
  };
  externalLink?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const rawBookSlug = searchParams.get("bookSlug");
    const secret = searchParams.get("secret");

    const expectedSecret = process.env.ADMIN_SECRET_KEY || "default-secret-key-1990";

    // ── 1. Security Authorization Check ──────────────────────────────────────
    if (!secret || secret !== expectedSecret) {
      console.warn("⛔ Unauthorized attempt to approve order:", { email, bookSlug: rawBookSlug, secret });
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <title>401 Unauthorized — PPMP Admin</title>
        </head>
        <body style="margin:0;padding:0;background-color:#060E1F;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
          <div style="max-width:480px;width:90%;background:#0B1B3D;border-radius:20px;border:1px solid #f42a41;padding:36px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.8);">
            <div style="font-size:48px;margin-bottom:12px;">🚫</div>
            <h2 style="color:#f42a41;margin:0 0 8px 0;font-size:22px;">401 Unauthorized Access</h2>
            <p style="color:#C2CFC8;font-size:14px;line-height:1.6;margin:0;">
              Invalid or missing secret key. You do not have permission to execute this 1-Click approval action.
            </p>
          </div>
        </body>
        </html>`,
        {
          status: 401,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    if (!email || !rawBookSlug) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head><title>Bad Request — PPMP Admin</title></head>
        <body style="background-color:#060E1F;color:#ffffff;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
          <div style="background:#0B1B3D;padding:32px;border-radius:20px;border:1px solid #D4AF37;text-align:center;max-width:450px;">
            <h2 style="color:#D4AF37;">⚠️ Missing Parameters</h2>
            <p style="color:#C2CFC8;">Both customer email and book identifier are required.</p>
          </div>
        </body>
        </html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const bookSlug = decodeURIComponent(rawBookSlug).trim();

    // ── 2. Foolproof Sanity Fetch (Slug, Title, TitleBn, or ID Match) ──────────
    // First: Direct GROQ Query across 'book' and 'digitalLibrary' schema types
    const directQuery = `*[(_type == "book" || _type == "digitalLibrary") && (slug.current == $slug || title == $slug || titleBn == $slug || _id == $slug)][0]{
      _id,
      title,
      titleBn,
      slug,
      pdfFile{
        asset->{url}
      },
      externalLink
    }`;

    let book: BookQueryResponse | null = await sanityFetch<BookQueryResponse | null>(directQuery, { slug: bookSlug }, ["book"]);

    // Fallback: If direct query missed (due to spacing/case/hyphen differences), scan all books
    if (!book) {
      const allBooksQuery = `*[(_type == "book" || _type == "digitalLibrary")]{
        _id,
        title,
        titleBn,
        slug,
        pdfFile{
          asset->{url}
        },
        externalLink
      }`;
      const allBooks = await sanityFetch<BookQueryResponse[]>(allBooksQuery, {}, ["book"]);
      
      const normalizedTarget = bookSlug.toLowerCase().replace(/[\s\-_]+/g, "");
      
      book = allBooks.find((b) => {
        const s = (b.slug?.current || "").toLowerCase().replace(/[\s\-_]+/g, "");
        const t = (b.title || "").toLowerCase().replace(/[\s\-_]+/g, "");
        const tb = (b.titleBn || "").toLowerCase().replace(/[\s\-_]+/g, "");
        const id = (b._id || "").toLowerCase().replace(/[\s\-_]+/g, "");
        
        return s === normalizedTarget || t === normalizedTarget || tb === normalizedTarget || id === normalizedTarget;
      }) || null;
    }

    const pdfAssetUrl = book?.pdfFile?.asset?.url;
    // Flexible Delivery Link (External Drive Link takes priority if set, otherwise uploaded PDF file)
    const finalDownloadLink = book?.externalLink || pdfAssetUrl;

    if (!book || !finalDownloadLink) {
      console.warn("⚠️ Neither PDF file nor external link found for book in Sanity:", { bookSlug, foundBook: !!book, bookTitle: book?.title });
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="bn">
        <head><title>Download Link Missing — PPMP Admin</title></head>
        <body style="background-color:#060E1F;color:#ffffff;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
          <div style="background:#0B1B3D;padding:36px;border-radius:20px;border:1px solid #f42a41;text-align:center;max-width:520px;box-shadow:0 25px 50px rgba(0,0,0,0.8);">
            <div style="font-size:44px;margin-bottom:12px;">⚠️</div>
            <h2 style="color:#f42a41;margin:0 0 12px 0;font-size:20px;">Error: Download Link Missing</h2>
            <p style="color:#E0E8E3;font-size:14px;line-height:1.6;margin:0 0 16px 0;">
              No PDF file or external link was found for this book in the Sanity database. Please update the book in Sanity first.
            </p>
            <div style="background:rgba(244,42,65,0.1);border:1px solid rgba(244,42,65,0.3);border-radius:12px;padding:14px;">
              <p style="color:#C2CFC8;font-size:12px;margin:0;">
                Sanity Studio-তে "<strong>${book?.title || bookSlug}</strong>" বইটির 'পিডিএফ ফাইল আপলোড' অথবা 'বইয়ের ড্রাইভ/ডাউনলোড লিংক' ফিল্ডটি পূরণ করুন।
              </p>
            </div>
          </div>
        </body>
        </html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // ── 3. Nodemailer Configuration & Customer Email Delivery ────────────────
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.EMAIL_USER || process.env.SMTP_USER || "";
    const pass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || "").replace(/\s+/g, "");

    const bookTitle = book.title || "Digital Book";
    const bookTitleBn = book.titleBn || bookTitle;

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
      });

      const customerMailOptions = {
        from: `"আধুনিক পুলিশ স্মৃতি জাদুঘর" <${user}>`,
        to: email,
        subject: `আপনার ডিজিটাল বই প্রস্তুত — ${bookTitleBn}`,
        html: `
          <!DOCTYPE html>
          <html lang="bn">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background-color:#060E1F;font-family:Arial,sans-serif;">
            <div style="max-width:600px;margin:30px auto;background-color:#0B1B3D;border-radius:20px;overflow:hidden;border:1px solid #D4AF37;">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg,#006a4e,#0B1B3D);padding:32px 28px;text-align:center;">
                <h1 style="color:#D4AF37;margin:0;font-size:22px;letter-spacing:0.5px;">
                  🇧🇩 আধুনিক পুলিশ স্মৃতি জাদুঘর
                </h1>
                <p style="color:#C2CFC8;font-size:13px;margin:6px 0 0 0;">
                  Digital Library — First Batch 1990
                </p>
              </div>
              
              <!-- Divider -->
              <div style="height:3px;background:linear-gradient(90deg,transparent,#D4AF37,transparent);"></div>
              
              <!-- Body -->
              <div style="padding:36px 28px;text-align:center;">
                <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px 0;">আপনার অর্ডারটি সফল হয়েছে! 🎉</h2>
                
                <p style="color:#E0E8E3;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
                  আপনার পেমেন্ট যাচাই সম্পন্ন হয়েছে। আপনি এখন <strong>"${bookTitleBn}"</strong> বইটির সম্পূর্ণ ডিজিটাল সংস্করণ (PDF) ডাউনলোড করে পড়তে পারবেন।
                </p>

                <!-- Dynamic PDF / Drive Download CTA Button -->
                <div style="margin:32px 0;">
                  <a href="${finalDownloadLink}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg,#f42a41,#d81e34);color:#ffffff;padding:16px 36px;border-radius:14px;text-decoration:none;font-weight:bold;font-size:16px;box-shadow:0 8px 24px rgba(244,42,65,0.4);">
                    বইটি ডাউনলোড করুন 📥
                  </a>
                </div>
                
                <p style="color:#94A59B;font-size:13px;line-height:1.6;margin:24px 0 0 0;">
                  ভবিষ্যতে ব্যবহারের জন্য এই ইমেইলটি সংরক্ষণ করুন। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background:#060E1F;padding:20px 28px;text-align:center;border-top:1px solid rgba(212,175,55,0.15);">
                <p style="color:#4A5568;font-size:12px;margin:0;">
                  © ${new Date().getFullYear()} Modern Police Memorial Museum — First Batch 1990
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(customerMailOptions);
    } else {
      console.warn("⚠️ SMTP credentials not found. PDF delivery mock log:", { email, finalDownloadLink });
    }

    // ── 4. Admin Confirmation Browser Response HTML ──────────────────────────
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Approved — PPMP Admin</title>
      </head>
      <body style="margin:0;padding:0;background-color:#060E1F;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
        <div style="max-width:500px;width:90%;background-color:#0B1B3D;border-radius:24px;border:1px solid rgba(212,175,55,0.4);padding:44px 32px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);">
          <div style="width:72px;height:72px;border-radius:50%;background-color:rgba(0,106,78,0.2);border:2px solid #006a4e;display:flex;align-items:center;justify-content:center;margin:0 auto 24px auto;">
            <span style="color:#006a4e;font-size:36px;font-weight:bold;">✓</span>
          </div>
          <h1 style="color:#FFFFFF;font-size:22px;margin:0 0 12px 0;">Order Approved Successfully!</h1>
          <p style="color:#E0E8E3;font-size:14px;line-height:1.6;margin:0 0 20px 0;">
            Success! The PDF download link has been securely sent to <strong style="color:#D4AF37;">${email}</strong> for the book <strong style="color:#FFFFFF;">"${bookTitleBn}"</strong>.
          </p>
          <div style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);border-radius:14px;padding:16px;margin-top:20px;">
            <p style="color:#94A59B;font-size:12px;margin:0;">No further manual action required. The customer has received their download link.</p>
          </div>
        </div>
      </body>
      </html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error: any) {
    console.error("❌ ERROR in /api/approve-order:", error);
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head><title>Error — PPMP Admin</title></head>
      <body style="background-color:#060E1F;color:#ffffff;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
        <div style="background:#0B1B3D;padding:36px;border-radius:20px;border:1px solid #f42a41;text-align:center;max-width:480px;">
          <h2 style="color:#f42a41;margin-top:0;">❌ Approval Error</h2>
          <p style="color:#C2CFC8;font-size:14px;">${error?.message || "An unexpected error occurred while processing approval."}</p>
        </div>
      </body>
      </html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
}
