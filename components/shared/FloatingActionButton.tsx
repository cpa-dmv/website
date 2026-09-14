"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = { id: string; sender: "visitor" | "support"; text: string; createdAt: string };
type Conversation = { id: string; name: string; messages: ChatMessage[] };
const TOKEN_KEY = "cpa-dmv-website-chat-token";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(() => typeof window === "undefined" ? "" : localStorage.getItem(TOKEN_KEY) || "");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const loadConversation = useCallback(async (savedToken: string, quiet = false) => {
    try {
      const response = await fetch(`/api/website-chat.php?token=${encodeURIComponent(savedToken)}`, { cache: "no-store" });
      if (!response.ok) {
        if (response.status === 404) { localStorage.removeItem(TOKEN_KEY); setToken(""); setConversation(null); }
        return;
      }
      setConversation((await response.json()).conversation);
    } catch { if (!quiet) setError("Chat is temporarily unavailable. Please try again."); }
  }, []);

  useEffect(() => {
    if (!token) return;
    const timer = window.setTimeout(() => void loadConversation(token), 0);
    return () => window.clearTimeout(timer);
  }, [token, loadConversation]);
  useEffect(() => {
    if (!open || !token) return;
    const timer = window.setInterval(() => void loadConversation(token, true), 4000);
    return () => window.clearInterval(timer);
  }, [open, token, loadConversation]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [conversation?.messages.length, open]);

  async function startChat(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/website-chat.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start", name, email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not start chat.");
      localStorage.setItem(TOKEN_KEY, data.token); setToken(data.token); setConversation(data.conversation);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Could not start chat."); }
    finally { setBusy(false); }
  }

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = message.trim(); if (!text || !token) return;
    setBusy(true); setError(""); setMessage("");
    const optimistic: ChatMessage = { id: `pending-${Date.now()}`, sender: "visitor", text, createdAt: new Date().toISOString() };
    setConversation((current) => current ? { ...current, messages: [...current.messages, optimistic] } : current);
    try {
      const response = await fetch("/api/website-chat.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "message", token, text }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Message was not delivered.");
      setConversation(data.conversation);
    } catch (caught) {
      setConversation((current) => current ? { ...current, messages: current.messages.filter((item) => item.id !== optimistic.id) } : current);
      setMessage(text); setError(caught instanceof Error ? caught.message : "Message was not delivered.");
    } finally { setBusy(false); }
  }

  return <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
    <AnimatePresence>{open && <motion.section initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .96 }} className="flex h-[min(560px,calc(100vh-110px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" aria-label="Chat with CPA-DMV">
      <header className="bg-[#082B5C] px-5 py-4 text-white"><div className="flex items-center justify-between"><div><p className="text-base font-bold">Chat with our team</p><p className="mt-0.5 text-xs text-blue-100">CPA-DMV support</p></div><button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-white/10"><X size={19} /></button></div></header>
      {!conversation ? <form onSubmit={startChat} className="flex flex-1 flex-col justify-center gap-4 p-5">
        <div><h2 className="text-xl font-bold text-[#163650]">How can we help?</h2><p className="mt-1 text-sm leading-6 text-slate-600">Enter your details to start a private conversation with our team.</p></div>
        <label className="text-sm font-semibold text-slate-700">Name<input required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-[#0C749B]" /></label>
        <label className="text-sm font-semibold text-slate-700">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-[#0C749B]" /></label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="flex items-center justify-center gap-2 rounded-lg bg-[#C97366] px-4 py-3 font-bold text-white hover:bg-[#b96357] disabled:opacity-60">{busy && <Loader2 className="animate-spin" size={17} />}Start chat</button>
        <p className="text-center text-[11px] leading-4 text-slate-500">Your details are used only to respond to this conversation.</p>
      </form> : <>
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
          {conversation.messages.length === 0 && <div className="mx-auto mt-8 max-w-[260px] text-center text-sm leading-6 text-slate-500">Hi {conversation.name}. Send your question and our team will reply here.</div>}
          {conversation.messages.map((item) => <div key={item.id} className={`flex ${item.sender === "visitor" ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${item.sender === "visitor" ? "rounded-br-md bg-[#082B5C] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p>{item.text}</p><time className={`mt-1 block text-[10px] ${item.sender === "visitor" ? "text-blue-100" : "text-slate-400"}`}>{new Date(item.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></div></div>)}
          <div ref={endRef} />
        </div>
        <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-3">{error && <p className="mb-2 text-xs text-red-700">{error}</p>}<div className="flex items-end gap-2"><textarea required maxLength={2000} rows={2} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} placeholder="Type your message…" className="max-h-28 flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0C749B]" /><button disabled={busy || !message.trim()} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C97366] text-white disabled:opacity-50">{busy ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}</button></div></form>
      </>}
    </motion.section>}</AnimatePresence>
    <motion.button onClick={() => setOpen((value) => !value)} whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }} aria-label={open ? "Close chat" : "Open live chat"} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-xl shadow-amber-500/30">{open ? <X size={22} /> : <MessageCircle size={23} />}</motion.button>
  </div>;
}
