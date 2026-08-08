import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, designation, email, story } = body;

    if (!name || !email || !story) {
      return NextResponse.json(
        { error: "Name, email, and story content are required." },
        { status: 400 }
      );
    }

    // SMTP Transporter configuration
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || "";
    const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const adminEmail = process.env.ADMIN_EMAIL || user || "info.mpmm1990@gmail.com";

    // If credentials are configured in environment variables, send real emails
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
        subject: "ধন্যবাদ! আপনার কর্মজীবনের গল্পটি সফলভাবে সংগৃহীত হয়েছে",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #060E1F; color: #FFFFFF; padding: 30px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">🇧🇩 আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০</h1>
              <p style="color: #C2CFC8; font-size: 14px; margin-top: 5px;">Modern Police Memorial Museum</p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #D4AF37; opacity: 0.3; margin: 20px 0;" />
            
            <h2 style="color: #FFFFFF; font-size: 20px;">প্রিয় ${name},</h2>
            <p style="color: #E0E8E3; line-height: 1.6; font-size: 15px;">
              আধুনিক পুলিশ স্মৃতি জাদুঘর প্রাঙ্গণে আপনার স্মৃতিগাথা ও অভিজ্ঞতার গল্প শেয়ার করার জন্য আন্তরিক ধন্যবাদ। 
            </p>
            <p style="color: #E0E8E3; line-height: 1.6; font-size: 15px;">
              আপনার প্রেরিত গল্পটি আমাদের অ্যাডমিন প্যানেলে জমা হয়েছে। পর্যালোচনার পর শীঘ্রই এটি আমাদের "জীবনের গল্প" (Journeys & Stories) সেকশনে প্রকাশ করা হবে।
            </p>

            <div style="background-color: rgba(212, 175, 55, 0.1); border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <p style="margin: 0; color: #D4AF37; font-weight: bold; font-size: 14px;">আপনার প্রেরিত তথ্য summary:</p>
              <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 14px;"><strong>পদবী:</strong> ${designation || "N/A"}</p>
              <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 14px;"><strong>গল্পের বিষয়:</strong> ${story.substring(0, 120)}...</p>
            </div>

            <p style="color: #94A59B; font-size: 13px; margin-top: 30px; text-align: center;">
              © ${new Date().getFullYear()} Modern Police Memorial Museum — First Batch 1990
            </p>
          </div>
        `,
      };

      // 2. Notification Email to Admin
      const adminMailOptions = {
        from: `"Museum Story Portal" <${user}>`,
        to: adminEmail,
        subject: `[New Story Submission] Officer Journey: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0B1B3D; color: #FFFFFF; padding: 30px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid #f42a41;">
            <h2 style="color: #f42a41; margin-top: 0;">NEW POLICE JOURNEY STORY SUBMISSION</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Designation/Rank:</strong> ${designation || "Not specified"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</p>
            
            <hr style="border: 0; border-top: 1px solid #D4AF37; opacity: 0.3; margin: 20px 0;" />
            
            <h3 style="color: #D4AF37;">Story Content:</h3>
            <div style="background: rgba(255,255,255,0.08); padding: 20px; border-radius: 12px; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
              ${story}
            </div>

            <p style="margin-top: 25px; font-size: 13px; color: #C2CFC8;">
              Please review this story and add it to Sanity Studio if approved for live display.
            </p>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);
    } else {
      console.log("Nodemailer API received story submission (Mock mode active):", {
        name,
        designation,
        email,
        story,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Story submitted successfully. Thank you email sent!",
    });
  } catch (error) {
    console.error("Story submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit story. Please try again later." },
      { status: 500 }
    );
  }
}
