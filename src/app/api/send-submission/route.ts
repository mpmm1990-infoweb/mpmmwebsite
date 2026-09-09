import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, designation, email, category, title, content } = body;

    if (!name || !email || !title || !content) {
      return NextResponse.json(
        { error: "Name, email, title, and content are required fields." },
        { status: 400 }
      );
    }

    const categoryMap: Record<string, { bn: string; en: string }> = {
      poem: { bn: "কবিতা", en: "Poem" },
      story: { bn: "গল্প", en: "Story" },
      reminiscence: { bn: "স্মৃতিগাথা", en: "Reminiscence" },
      other: { bn: "অন্যান্য", en: "Other" },
    };

    const categoryLabel = categoryMap[category] || { bn: "গল্প/কবিতা", en: "Words & Verses" };

    // SMTP Transporter configuration
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || "";
    const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const adminEmail = process.env.ADMIN_EMAIL || user || "info.mpmm1990@gmail.com";

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      // 1. Automated "Thank You" Confirmation Email to Submitter
      const userMailOptions = {
        from: `"Modern Police Memorial Museum" <${user}>`,
        to: email,
        subject: `ধন্যবাদ! আপনার "${title}" লেখাটি জমা হয়েছে — কথা ও গাথা`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #060E1F; color: #FFFFFF; padding: 30px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">🇧🇩 আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০</h1>
              <p style="color: #C2CFC8; font-size: 14px; margin-top: 5px;">Modern Police Memorial Museum — কথা ও গাথা</p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #D4AF37; opacity: 0.3; margin: 20px 0;" />
            
            <h2 style="color: #FFFFFF; font-size: 20px;">প্রিয় ${name},</h2>
            <p style="color: #E0E8E3; line-height: 1.6; font-size: 15px;">
              আধুনিক পুলিশ স্মৃতি জাদুঘরের সাহিত্য শাখা <strong>"কথা ও গাথা"</strong>-তে আপনার লেখাটি জমা দেওয়ার জন্য ধন্যবাদ। 
            </p>

            <div style="background-color: rgba(212, 175, 55, 0.1); border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <p style="margin: 0; color: #D4AF37; font-weight: bold; font-size: 14px;">লেখার তথ্য Summary:</p>
              <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 14px;"><strong>শিরোনাম:</strong> ${title}</p>
              <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 14px;"><strong>বিভাগ:</strong> ${categoryLabel.bn} (${categoryLabel.en})</p>
              <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 14px;"><strong>পদবী:</strong> ${designation || "N/A"}</p>
            </div>

            <p style="color: #E0E8E3; line-height: 1.6; font-size: 15px;">
              অ্যাডমিন প্যানেলে পর্যালোচনার পর শীঘ্রই এটি আমাদের লাইভ জাদুঘরে প্রকাশ করা হবে।
            </p>

            <p style="color: #94A59B; font-size: 13px; margin-top: 30px; text-align: center;">
              © ${new Date().getFullYear()} Modern Police Memorial Museum — First Batch 1990
            </p>
          </div>
        `,
      };

      // 2. Notification Email to Admin
      const adminMailOptions = {
        from: `"Museum Kotha-O-Gatha Portal" <${user}>`,
        to: adminEmail,
        subject: `[New Submission] Kotha & Gatha (${categoryLabel.en}): ${title} by ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0B1B3D; color: #FFFFFF; padding: 30px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid #f42a41;">
            <h2 style="color: #f42a41; margin-top: 0;">NEW KOTHA & GATHA SUBMISSION</h2>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Category:</strong> ${categoryLabel.bn} (${categoryLabel.en})</p>
            <p><strong>Author:</strong> ${name}</p>
            <p><strong>Designation/Rank:</strong> ${designation || "Not specified"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</p>
            
            <hr style="border: 0; border-top: 1px solid #D4AF37; opacity: 0.3; margin: 20px 0;" />
            
            <h3 style="color: #D4AF37;">Full Content Payload:</h3>
            <div style="background: rgba(255,255,255,0.08); padding: 20px; border-radius: 12px; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">
              ${content}
            </div>

            <p style="margin-top: 25px; font-size: 13px; color: #C2CFC8;">
              Please review this submission and add it to Sanity Studio under "kothaOGatha" schema for live display.
            </p>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);
    }
    // else: SMTP credentials not configured — submission received but not emailed

    return NextResponse.json({
      success: true,
      message: "Submission received successfully. Thank you email sent!",
    });
  } catch (error) {
    console.error("Submission processing error:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again later." },
      { status: 500 }
    );
  }
}
