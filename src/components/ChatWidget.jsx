'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm the TripleDev assistant. Ask me anything about our services, process, or how we can help 🚀" },
  ]);
  const [isContactMode, setIsContactMode] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactResult, setContactResult] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const reply = data?.message?.content ?? 'Sorry, I had trouble responding.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, something went wrong. Please try again.' }]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleContactSubmit() {
    if (isSubmittingContact) return;
    const name = contactName.trim();
    const email = contactEmail.trim();
    const message = contactMessage.trim();
    if (!name || !email || !message) {
      setContactResult({ ok: false, message: 'Please fill in all fields.' });
      return;
    }
    setIsSubmittingContact(true);
    setContactResult(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Failed');
      setContactResult({ ok: true, message: "Thanks! We'll be in touch soon." });
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (e) {
      setContactResult({ ok: false, message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmittingContact(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-white text-black shadow-lg px-4 py-3 text-sm font-medium hover:bg-white/90"
          aria-label="Open chat"
        >
          Chat with us
        </button>
      )}

      {isOpen && (
        <div className="w-[22rem] sm:w-96 h-[28rem] bg-zinc-900/95 text-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-sm font-medium">TripleDev Assistant</div>
            <div className="flex items-center gap-2">
              <button
                className={`text-xs px-2 py-1 rounded ${!isContactMode ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
                onClick={() => setIsContactMode(false)}
              >Chat</button>
              <button
                className={`text-xs px-2 py-1 rounded ${isContactMode ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
                onClick={() => setIsContactMode(true)}
              >Contact</button>
              <button
                className="text-white/60 hover:text-white text-sm ml-1"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {!isContactMode && (
            <>
              <div ref={listRef} className="h-[20rem] overflow-y-auto p-4 space-y-3">
                {messages.map((m, idx) => (
                  <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <div
                      className={
                        m.role === 'user'
                          ? 'inline-block max-w-[85%] rounded-2xl bg-white text-black px-3 py-2'
                          : 'inline-block max-w-[85%] rounded-2xl bg-white/10 px-3 py-2'
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="text-left">
                    <div className="inline-block rounded-2xl bg-white/10 px-3 py-2">
                      <div className="flex items-center gap-1">
                        <span className="sr-only">Assistant is typing</span>
                        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: '0ms' }} />
                        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: '0.2s' }} />
                        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-white/10">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask about services, pricing, timelines…"
                    className="flex-1 resize-none rounded-xl bg-zinc-800/80 border border-white/10 px-3 py-2 text-sm outline-none placeholder-white/40"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isSending || !input.trim()}
                    className="shrink-0 rounded-xl bg-white text-black text-sm font-medium px-4 py-2 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}

          {isContactMode && (
            <div className="h-[24.5rem] p-4 flex flex-col gap-3">
              {contactResult && (
                <div className={`text-sm px-3 py-2 rounded ${contactResult.ok ? 'bg-emerald-400/10 text-emerald-200 border border-emerald-400/30' : 'bg-red-400/10 text-red-200 border border-red-400/30'}`}>
                  {contactResult.message}
                </div>
              )}
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
              <textarea
                rows={5}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="What are you building?"
                className="flex-1 resize-none rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleContactSubmit}
                  disabled={isSubmittingContact}
                  className="inline-flex items-center justify-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {isSubmittingContact ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .chat-typing-dot {
          display: inline-block;
          animation: chat-typing-bounce 1.4s infinite ease-in-out both;
        }

        @keyframes chat-typing-bounce {
          0%, 80%, 100% {
            transform: scale(0.4);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}


