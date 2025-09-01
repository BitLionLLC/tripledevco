import BackgroundScene from "@/components/BackgroundScene";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export const runtime = 'nodejs';

async function sendContactEmail(formData) {
  "use server";

  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    return redirect("/contact?error=1");
  }

  try {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.error("Missing SMTP environment variables. Expected SMTP_USER, SMTP_PASS");
      return redirect("/contact?error=1");
    }

    const hasHost = Boolean(host);
    const hasPort = typeof process.env.SMTP_PORT !== 'undefined' && process.env.SMTP_PORT !== '';
    const hasSecure = typeof process.env.SMTP_SECURE !== 'undefined' && process.env.SMTP_SECURE !== '';

    let transporter;
    if (hasHost && hasPort && hasSecure) {
      transporter = nodemailer.createTransport({
        host,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user, pass },
      });
    } else {
      const service = process.env.MAIL_SERVICE || "gmail";
      transporter = nodemailer.createTransport({
        service,
        auth: { user, pass },
      });
    }

    const toAddress = process.env.MAIL_TO || "grant@tripledev.co";
    const fromAddress = process.env.MAIL_FROM || user;

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;font-family:inherit">${message}</pre>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return redirect("/contact?error=1");
  }
  return redirect("/contact?success=1");
}

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const success = params?.success;
  const error = params?.error;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundScene />
      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-3 px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

        <section className="relative z-10 w-full max-w-2xl py-12 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em]">Contact</h1>
          <p className="mt-3 text-white/70">Tell us a bit about your project and how to reach you.</p>

          {success && (
            <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-200 px-4 py-3">
              Thanks! Your message has been sent. We&#39;ll get back to you soon.
            </div>
          )}
          {error && (
            <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 text-red-200 px-4 py-3">
              Something went wrong sending your message. Please try again later.
            </div>
          )}

          <form action={sendContactEmail} className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-white/80">Name</label>
              <input id="name" name="name" type="text" required
                className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-white/80">Email</label>
              <input id="email" name="email" type="email" required
                className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-white/80">Message</label>
              <textarea id="message" name="message" rows={6} required
                className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" placeholder="What are you building?" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
                Send message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}


