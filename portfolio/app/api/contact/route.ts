import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // replace with your verified domain once set up e.g. contact@yourdomain.com
      to: "callumgreig20@gmail.com",                    // your email — only lives server-side
      replyTo: email,                                   // so you can reply directly to the sender
      subject: `Portfolio enquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f5ead5; color: #363636;">
          <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
            New message from your portfolio
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 0.5rem 0; color: #C75B2A; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; width: 100px;">Name</td>
              <td style="padding: 0.5rem 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; color: #C75B2A; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
              <td style="padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #6B7D5F;">${email}</a></td>
            </tr>
          </table>

          <div style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 1.5rem;">
            <p style="color: #C75B2A; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem;">Message</p>
            <p style="line-height: 1.75; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 2rem; font-size: 0.7rem; color: #888; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 1rem;">
            Sent via portfolio-callum-greig.vercel.app portfolio contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}