'use client';

import { useCallback, useMemo, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function InnerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const allValid = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 0
    );
  }, [name, email, message]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!allValid) return;
    setIsSubmitting(true);
    setResult(null);
    try {
      let recaptchaToken = '';
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('contact_submit');
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          recaptchaToken,
          recaptchaAction: 'contact_submit',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setResult({ ok: true, message: "Thanks! We'll be in touch soon." });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setResult({ ok: false, message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [allValid, email, isSubmitting, message, name, executeRecaptcha]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {result && (
        <div className={`text-sm px-4 py-3 rounded ${result.ok ? 'bg-emerald-400/10 text-emerald-200 border border-emerald-400/30' : 'bg-red-400/10 text-red-200 border border-red-400/30'}`}>
          {result.message}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm text-white/80">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-white/80">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-white/80">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          placeholder="What are you building?"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !allValid}
          className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

export default function ContactForm() {
  return <InnerForm />;
}


