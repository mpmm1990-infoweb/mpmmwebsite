import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookTitle, bookTitleBn, email, phone, paymentMethod, paymentRef, amount } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!bookTitle || !email || !phone || !paymentMethod || !paymentRef || !amount) {
      return NextResponse.json(
        { error: "Missing required fields for email record." },
        { status: 400 }
      );
    }

    // ── SMTP Config ──────────────────────────────────────────────────────────
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || "";
    const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const adminEmail = process.env.ADMIN_EMAIL || user || "info.mpmm1990@gmail.com";

    const methodLabel = paymentMethod === "bkash" ? "bKash" : "Nagad";
    const submittedAt = new Date().toLocaleString("bn-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const submittedAtEn = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "short",
    });

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      // ────────────────────────────────────────────────────────────────────────
      // EMAIL 1: Auto-responder → USER
      // ────────────────────────────────────────────────────────────────────────
      const userMailOptions = {
        from: `"আধুনিক পুলিশ স্মৃতি জাদুঘর" <${user}>`,
        to: email,
        subject: `পেমেন্ট গ্রহণের নিশ্চয়তা — ${bookTitleBn || bookTitle}`,
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
                  Modern Police Memorial Museum — First Batch 1990
                </p>
              </div>
              
              <!-- Divider -->
              <div style="height:3px;background:linear-gradient(90deg,transparent,#D4AF37,transparent);"></div>
              
              <!-- Body -->
              <div style="padding:32px 28px;">
                <h2 style="color:#FFFFFF;font-size:20px;margin:0 0 16px 0;">আপনার পেমেন্ট রিকোয়েস্ট গ্রহণ করা হয়েছে ✅</h2>
                
                <p style="color:#E0E8E3;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
                  ধন্যবাদ! আপনার পেমেন্ট রিকোয়েস্টটি গ্রহণ করা হয়েছে।
                  ট্রানজেকশন যাচাই সম্পন্ন হওয়ার পর খুব শীঘ্রই আপনার প্রদত্ত ইমেইলে পিডিএফ বইটি পাঠিয়ে দেওয়া হবে।
                </p>
                
                <!-- Order Details Box -->
                <div style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.35);border-radius:14px;padding:20px;margin:24px 0;">
                  <p style="color:#D4AF37;font-weight:bold;font-size:13px;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:0.5px;">
                    অর্ডারের তথ্য
                  </p>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:5px 0;width:40%;">বইয়ের নাম</td>
                      <td style="color:#FFFFFF;font-size:13px;padding:5px 0;font-weight:bold;">${bookTitleBn || bookTitle}</td>
                    </tr>
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:5px 0;">পরিমাণ</td>
                      <td style="color:#D4AF37;font-size:14px;padding:5px 0;font-weight:bold;">৳${amount}</td>
                    </tr>
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:5px 0;">পেমেন্ট মাধ্যম</td>
                      <td style="color:#FFFFFF;font-size:13px;padding:5px 0;">${methodLabel}</td>
                    </tr>
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:5px 0;">ট্রানজেকশন আইডি</td>
                      <td style="color:#FFFFFF;font-size:13px;padding:5px 0;font-weight:bold;word-break:break-all;">${paymentRef}</td>
                    </tr>
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:5px 0;">সময়</td>
                      <td style="color:#FFFFFF;font-size:13px;padding:5px 0;">${submittedAt}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- What Happens Next -->
                <div style="background:rgba(0,106,78,0.1);border:1px solid rgba(0,106,78,0.35);border-radius:14px;padding:18px;margin:16px 0;">
                  <p style="color:#4CAF50;font-weight:bold;font-size:13px;margin:0 0 10px 0;">পরবর্তী পদক্ষেপ:</p>
                  <ol style="color:#E0E8E3;font-size:13px;line-height:2;margin:0;padding-left:20px;">
                    <li>আমাদের টিম আপনার ${methodLabel} ট্রানজেকশন ম্যানুয়ালি যাচাই করবে।</li>
                    <li>যাচাই সম্পন্ন হলে, এই ইমেইলে (${email}) পিডিএফ বইটি পাঠানো হবে।</li>
                    <li>সাধারণত ২৪ ঘণ্টার মধ্যে ডেলিভারি দেওয়া হয়।</li>
                  </ol>
                </div>

                <p style="color:#94A59B;font-size:13px;line-height:1.6;margin:20px 0 0 0;">
                  কোনো সমস্যা হলে আমাদের সাথে যোগাযোগ করুন: 
                  <a href="mailto:${adminEmail}" style="color:#D4AF37;">${adminEmail}</a>
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background:#060E1F;padding:20px 28px;text-align:center;border-top:1px solid rgba(212,175,55,0.15);">
                <p style="color:#4A5568;font-size:12px;margin:0;">
                  © ${new Date().getFullYear()} Modern Police Memorial Museum — First Batch 1990
                </p>
                <p style="color:#4A5568;font-size:11px;margin:4px 0 0 0;">
                  এটি একটি স্বয়ংক্রিয় ইমেইল। সরাসরি এই ইমেইলে রিপ্লাই করবেন না।
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // ────────────────────────────────────────────────────────────────────────
      // EMAIL 2: Alert → ADMIN
      // ────────────────────────────────────────────────────────────────────────
      const adminMailOptions = {
        from: `"Museum Purchase System" <${user}>`,
        to: adminEmail,
        subject: `🚨 [New Book Purchase] ${bookTitle} — ৳${amount} via ${methodLabel}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background-color:#0B1B3D;font-family:Arial,sans-serif;">
            <div style="max-width:600px;margin:30px auto;background-color:#060E1F;border-radius:20px;overflow:hidden;border:2px solid #f42a41;">
              
              <!-- Alert Header -->
              <div style="background:#f42a41;padding:20px 28px;">
                <h1 style="color:#FFFFFF;margin:0;font-size:20px;">🚨 নতুন বই ক্রয়ের অনুরোধ</h1>
                <p style="color:rgba(255,255,255,0.85);font-size:13px;margin:4px 0 0 0;">Manual verification required — Modern Police Memorial Museum</p>
              </div>
              
              <!-- Details -->
              <div style="padding:28px;">
                
                <div style="background:rgba(244,42,65,0.08);border:1px solid rgba(244,42,65,0.3);border-radius:12px;padding:20px;margin-bottom:20px;">
                  <p style="color:#f42a41;font-weight:bold;font-size:13px;margin:0 0 14px 0;text-transform:uppercase;">Action Required: Verify & Send PDF</p>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;width:40%;vertical-align:top;">Book Title</td>
                      <td style="color:#FFFFFF;font-size:13px;padding:8px 0;font-weight:bold;">${bookTitle}<br/><span style="color:#94A59B;font-weight:normal;">${bookTitleBn || ""}</span></td>
                    </tr>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">Amount Paid</td>
                      <td style="color:#D4AF37;font-size:16px;padding:8px 0;font-weight:bold;">৳${amount}</td>
                    </tr>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">Payment Method</td>
                      <td style="color:#FFFFFF;font-size:14px;padding:8px 0;font-weight:bold;">${methodLabel}</td>
                    </tr>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">TrxID / Ref</td>
                      <td style="color:#FFFFFF;font-size:14px;padding:8px 0;font-weight:bold;word-break:break-all;background:rgba(212,175,55,0.1);padding:8px;border-radius:6px;">${paymentRef}</td>
                    </tr>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">Customer Email</td>
                      <td style="padding:8px 0;">
                        <a href="mailto:${email}" style="color:#D4AF37;font-size:14px;font-weight:bold;">${email}</a>
                      </td>
                    </tr>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">Customer Phone</td>
                      <td style="color:#FFFFFF;font-size:14px;padding:8px 0;font-weight:bold;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="color:#94A59B;font-size:13px;padding:8px 0;vertical-align:top;">Submitted At</td>
                      <td style="color:#C2CFC8;font-size:13px;padding:8px 0;">${submittedAtEn} (Dhaka)</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Admin Checklist -->
                <div style="background:rgba(0,106,78,0.1);border:1px solid rgba(0,106,78,0.3);border-radius:12px;padding:18px;">
                  <p style="color:#4CAF50;font-weight:bold;font-size:13px;margin:0 0 10px 0;">✅ Admin Checklist:</p>
                  <ol style="color:#E0E8E3;font-size:13px;line-height:2;margin:0;padding-left:20px;">
                    <li>Open your <strong>${methodLabel}</strong> app and verify TrxID: <strong>${paymentRef}</strong></li>
                    <li>Check that ৳${amount} was received from phone: <strong>${phone}</strong></li>
                    <li>If verified, reply to <strong>${email}</strong> with the PDF download link.</li>
                    <li>Update the purchase status in Supabase dashboard to "approved".</li>
                  </ol>
                </div>

                <p style="color:#4A5568;font-size:12px;margin:20px 0 0 0;text-align:center;">
                  Modern Police Memorial Museum Purchase System — ${new Date().getFullYear()}
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // Fire both emails simultaneously
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);
    } else {
      // Mock mode — log instead of sending
      console.log("[MOCK] Purchase record emails would be sent:", {
        to_user: email,
        to_admin: adminEmail,
        bookTitle,
        amount,
        paymentMethod,
        paymentRef,
        phone,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Purchase emails sent successfully.",
    });
  } catch (error) {
    console.error("Purchase email error:", error);
    return NextResponse.json(
      { error: "Failed to send purchase notification emails." },
      { status: 500 }
    );
  }
}
