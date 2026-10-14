"use client";
 
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  MessageCircle,
  Send,
  LogOut,
  Search,
  RefreshCw,
  UserRound,
  ShieldCheck,
  Clock3,
} from "lucide-react";
 
/* ------------------------------------------------------------------ */
/* Types — these mirror what admin.php / admin-auth.php really return. */
/* ------------------------------------------------------------------ */
 
type ConversationStatus = "open" | "closed";
 
// Raw row from admin.php?action=conversations
type RawConversation = {
  id: number | string; // chat_conversations.id  (the CONVERSATION id)
  client_id: number | string; // chat_clients.id        (the CLIENT id)
  status?: string | null;
  created_at?: string | null;
  last_message_at?: string | null;
  client_name?: string | null;
  client_email?: string | null;
  last_message?: string | null;
  unread_count?: number | string | null;
};
 
// Raw row from admin.php?action=messages (and the reply response)
type RawMessage = {
  id: number | string;
  conversation_id?: number | string;
  sender_type?: string;
  sender_id?: number | string;
  message: string;
  created_at: string;
  read_at?: string | null;
};
 
type Conversation = {
  id: number; // conversation id — used for messages and replies
  clientId: number; // client id — display/reference only
  clientName: string;
  clientEmail: string;
  status: ConversationStatus;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
};
 
type ChatMessage = {
  id: number;
  sender_type: "client" | "admin";
  sender_id: number;
  message: string;
  created_at: string;
  read_at: string | null;
};
 
type ApiResult = {
  success?: boolean;
  // Errors return a string; the reply endpoint returns the saved message object.
  message?: string | RawMessage;
  authenticated?: boolean;
  csrf_token?: string;
  conversations?: RawConversation[];
  messages?: RawMessage[];
};
 
type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};
 
const API = "/api/chat/api";
 
class ApiError extends Error {
  status: number;
 
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
 
async function request(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResult> {
  const response = await fetch(`${API}/${endpoint}`, {
    ...options,
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
 
  const result = (await response.json().catch(() => ({}))) as ApiResult;
 
  if (!response.ok || result.success === false) {
    const text =
      typeof result.message === "string" && result.message
        ? result.message
        : `Request failed (${response.status})`;
    throw new ApiError(text, response.status);
  }
 
  return result;
}
 
function normalizeConversation(raw: RawConversation): Conversation {
  const clientId = Number(raw.client_id);
  const email = (raw.client_email ?? "").trim();
  const name = (raw.client_name ?? "").trim();
 
  return {
    id: Number(raw.id),
    clientId,
    clientName: name || email || `Client #${clientId}`,
    clientEmail: email,
    status: raw.status === "closed" ? "closed" : "open",
    lastMessage: raw.last_message ?? null,
    lastMessageAt: raw.last_message_at ?? raw.created_at ?? null,
    unreadCount: Number(raw.unread_count ?? 0) || 0,
  };
}
 
function normalizeMessage(raw: RawMessage): ChatMessage {
  return {
    id: Number(raw.id),
    sender_type: raw.sender_type === "admin" ? "admin" : "client",
    sender_id: Number(raw.sender_id ?? 0),
    message: raw.message,
    created_at: raw.created_at,
    read_at: raw.read_at ?? null,
  };
}
 
function formatDate(value: string): string {
  // MySQL returns "YYYY-MM-DD HH:MM:SS"; "T" makes it parse reliably (Safari).
  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}
 
export default function AdminChatPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [csrf, setCsrf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [notice, setNotice] = useState("");
 
  // Tracks the open conversation so a slow response can't overwrite a newer one.
  const selectedIdRef = useRef<number | null>(null);
  const selectedId = selected ? selected.id : null;
 
  const loadConversations = useCallback(async () => {
    try {
      const data = await request("admin.php?action=conversations");
      const list = (data.conversations ?? [])
        .map(normalizeConversation)
        .filter((c) => Number.isFinite(c.id) && c.id > 0);
 
      setConversations(list);
      setListError("");
      setSelected((current) =>
        current ? (list.find((c) => c.id === current.id) ?? current) : current,
      );
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        // Session expired: return to the login screen with a fresh CSRF token.
        setAuthenticated(false);
        setCsrf("");
        return;
      }
      setListError(
        e instanceof Error ? e.message : "Could not load conversations.",
      );
    }
  }, []);
 
  const loadMessages = useCallback(async (conversationId: number) => {
    const data = await request(
      `admin.php?action=messages&conversation_id=${encodeURIComponent(
        String(conversationId),
      )}`,
    );
 
    if (selectedIdRef.current !== conversationId) return;
    setMessages((data.messages ?? []).map(normalizeMessage));
  }, []);
 
  useEffect(() => {
    let active = true;
 
    async function initialise() {
      let isAuthenticated = false;
 
      try {
        const session = await request("admin-auth.php?action=session");
        if (!active) return;
 
        if (session.csrf_token) setCsrf(session.csrf_token);
        isAuthenticated = session.authenticated === true;
        setAuthenticated(isAuthenticated);
      } catch {
        // The login screen is shown when there is no admin session.
      }
 
      if (isAuthenticated) {
        await loadConversations();
      }
 
      if (active) setLoading(false);
    }
 
    void initialise();
 
    return () => {
      active = false;
    };
  }, [loadConversations]);
 
  useEffect(() => {
    if (!authenticated) return;
 
    const timer = window.setInterval(() => {
      void loadConversations();
      if (selectedId !== null) {
        void loadMessages(selectedId).catch(() => {});
      }
    }, 4000);
 
    return () => window.clearInterval(timer);
  }, [authenticated, selectedId, loadConversations, loadMessages]);
 
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      // Always fetch a current CSRF token first (it is tied to the PHP session).
      const session = await request("admin-auth.php?action=session");
      const token = session.csrf_token ?? "";
      setCsrf(token);
 
      const data = await request("admin-auth.php?action=login", {
        method: "POST",
        headers: { "X-CSRF-Token": token },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
 
      if (data.csrf_token) setCsrf(data.csrf_token);
      setAuthenticated(true);
      setPassword("");
      await loadConversations();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }
 
  async function chooseConversation(conversation: Conversation) {
    selectedIdRef.current = conversation.id;
    setSelected(conversation);
    setMessages([]);
    setError("");
    setNotice("");
 
    try {
      await loadMessages(conversation.id);
      void loadConversations(); // refresh unread counts after messages are marked read
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load conversation.");
    }
  }
 
  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!selected || !text || sending) return;
 
    const conversationId = selected.id;
 
    setSending(true);
    setError("");
    setNotice("");
 
    try {
      await request("admin.php?action=reply", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: text,
        }),
      });
 
      setDraft("");
      setNotice("Reply sent.");
      window.setTimeout(() => setNotice(""), 3000);
      await loadMessages(conversationId);
      await loadConversations();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Message could not be sent.");
    } finally {
      setSending(false);
    }
  }
 
  async function logout() {
    try {
      const data = await request("admin-auth.php?action=logout", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: JSON.stringify({}),
      });
 
      setCsrf(data.csrf_token ?? "");
      selectedIdRef.current = null;
      setAuthenticated(false);
      setSelected(null);
      setConversations([]);
      setMessages([]);
      setListError("");
      setError("");
      setNotice("");
    } catch (e) {
      // Stay signed in if the server did not confirm the logout.
      setListError(
        e instanceof Error
          ? `Sign out failed: ${e.message}`
          : "Sign out failed. Please try again.",
      );
      try {
        const session = await request("admin-auth.php?action=session");
        if (session.csrf_token) setCsrf(session.csrf_token);
      } catch {
        // Ignore; the next action will surface any remaining problem.
      }
    }
  }
 
  const query = search.trim().toLowerCase();
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.clientName.toLowerCase().includes(query) ||
      conversation.clientEmail.toLowerCase().includes(query),
  );
 
  const isClosed = selected?.status === "closed";
 
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <RefreshCw className="mr-3 h-5 w-5 animate-spin" />
        Loading chat dashboard...
      </main>
    );
  }
 
  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12 text-slate-100">
        <form
          onSubmit={login}
          className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            CPA-DMV Support
          </p>
          <h1 className="mb-2 text-3xl font-semibold">Admin chat</h1>
          <p className="mb-7 text-sm text-slate-400">
            Sign in to manage private client conversations.
          </p>
 
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}
 
          <label className="mb-2 block text-sm text-slate-300">
            Admin email
          </label>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
          />
 
          <label className="mb-2 block text-sm text-slate-300">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
          />
 
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
          >
            Sign in securely
          </button>
        </form>
      </main>
    );
  }
 
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-semibold">CPA-DMV Client Support</h1>
            <p className="text-xs text-slate-400">Private conversations</p>
          </div>
        </div>
        <button
          onClick={() => void logout()}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>
 
      <div className="mx-auto grid max-w-7xl gap-4 p-4 md:grid-cols-[340px_1fr] md:p-6">
        <aside className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-4">
            <h2 className="mb-3 font-semibold">Client conversations</h2>
            <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients..."
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>
          </div>
 
          <div className="max-h-[65vh] overflow-y-auto">
            {listError && (
              <p role="alert" className="p-4 text-sm text-red-400">
                {listError}
              </p>
            )}
            {filteredConversations.length === 0 ? (
              !listError && (
                <p className="p-6 text-sm text-slate-400">
                  No client conversations found.
                </p>
              )
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => void chooseConversation(conversation)}
                  className={`w-full border-b border-slate-800 p-4 text-left transition hover:bg-slate-800 ${
                    selected?.id === conversation.id ? "bg-slate-800" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">
                          {conversation.clientName}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-slate-950">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-slate-400">
                        {conversation.clientEmail}
                      </p>
                      <p className="mt-2 truncate text-xs text-slate-500">
                        {conversation.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>
 
        <section className="flex min-h-[65vh] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {selected ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 p-4">
                <div>
                  <h2 className="font-semibold">{selected.clientName}</h2>
                  <p className="text-sm text-slate-400">
                    {selected.clientEmail}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <Clock3 className="h-3.5 w-3.5" />{" "}
                  {isClosed ? "Closed" : "Auto-refresh"}
                </span>
              </div>
 
              <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
                {messages.length === 0 ? (
                  <p className="py-12 text-center text-sm text-slate-500">
                    No messages yet. Start the conversation below.
                  </p>
                ) : (
                  messages.map((message) => {
                    const fromAdmin = message.sender_type === "admin";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          fromAdmin ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            fromAdmin
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-slate-800 text-slate-100"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm">
                            {message.message}
                          </p>
                          <p
                            className={`mt-2 text-[10px] ${
                              fromAdmin ? "text-slate-800" : "text-slate-400"
                            }`}
                          >
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
 
              <form
                onSubmit={sendMessage}
                className="border-t border-slate-800 p-4"
              >
                <div className="flex items-end gap-3">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={
                      isClosed
                        ? "This conversation is closed."
                        : "Write a reply..."
                    }
                    disabled={isClosed}
                    rows={2}
                    maxLength={5000}
                    className="max-h-40 min-h-12 flex-1 resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={sending || isClosed || !draft.trim()}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {sending ? "Sending..." : "Send"}
                    </span>
                  </button>
                </div>
                {error && (
                  <p role="alert" className="mt-3 text-sm text-red-400">
                    {error}
                  </p>
                )}
                {notice && (
                  <p role="status" className="mt-3 text-sm text-emerald-400">
                    {notice}
                  </p>
                )}
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <MessageCircle className="mb-4 h-12 w-12 text-slate-600" />
              <h2 className="text-xl font-semibold">Choose a conversation</h2>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Select a client from the left to read messages and respond
                privately.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
 