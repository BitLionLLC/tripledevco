import BackgroundScene from "@/components/BackgroundScene";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { sendContactEmail as sendContactEmailServer } from "@/lib/mailer";
import ContactForm from "./ContactForm";

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
    await sendContactEmailServer(name, email, message);
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

          <div className="mt-8">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}


