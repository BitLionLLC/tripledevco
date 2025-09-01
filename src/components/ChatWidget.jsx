'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm the TripleDev assistant. Ask me anything about our services, process, or how we can help 🚀" },
  ]);
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
            <button
              className="text-white/60 hover:text-white text-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
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
                <div className="inline-block rounded-2xl bg-white/10 px-3 py-2 text-white/70">Thinking…</div>
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
        </div>
      )}
    </div>
  );
}


