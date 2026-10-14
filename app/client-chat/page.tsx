"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type ChatMessage = {
  id: number;
  conversation_id: number;
  sender_type: "client" | "admin";
  sender_id: number;
  message: string;
  created_at: string;
  read_at?: string | null;
};

type ChatUser = {
  id: number;
  name: string;
  email: string;
};


type ApiResponse = {
  success?: boolean;
  message?: string;
  csrf_token?: string;
  csrfToken?: string;
  authenticated?: boolean;
  user?: ChatUser;
  client?: ChatUser;
  messages?: ChatMessage[];
  conversation_id?: number;
  conversation?: {
    id: number;
    status?: string;
  } | null;
};

const API = "/api/chat/api";

async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse> {
  const response = await fetch(`${API}/${endpoint}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as ApiResponse;

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

function formatTime(value: string) {
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ClientChatPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [user, setUser] = useState<ChatUser | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const loadMessages = useCallback(async () => {
  try {
    const data = await apiRequest("messages.php?action=list");

    if (data.messages) {
      setMessages(data.messages);
    }

    if (typeof data.conversation?.id === "number") {
      setConversationId(data.conversation.id);
    } else if (typeof data.conversation_id === "number") {
      setConversationId(data.conversation_id);
    }
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  }
}, []);

  const checkSession = useCallback(async () => {
  setLoading(true);

  try {
    const data = await apiRequest("auth.php?action=me");

    setCsrfToken(data.csrfToken || data.csrf_token || "");

    const authenticatedUser = data.user || data.client || null;
    setUser(data.authenticated ? authenticatedUser : null);
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (!user) return;

    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(), 3000);

    return () => window.clearInterval(interval);
  }, [user, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError("");
  setNotice("");
  setSubmitting(true);

  try {
    let token = csrfToken;

    if (!token) {
      const csrfData = await apiRequest("auth.php?action=csrf");
      token = csrfData.csrfToken || csrfData.csrf_token || "";
      setCsrfToken(token);
    }

    if (!token) {
      throw new Error("Could not establish a secure session. Please refresh and try again.");
    }

    const payload: {
      name: string;
      email: string;
      phone?: string;
    } = {
      name: name.trim(),
      email: email.trim(),
    };

    if (mode === "register") {
      payload.phone = phone.trim();
    }

    const data = await apiRequest(`auth.php?action=${mode}`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
      },
      body: JSON.stringify(payload),
    });

    const authenticatedUser = data.user || data.client;

    if (!authenticatedUser) {
      throw new Error(data.message || "Authentication response was incomplete.");
    }

    setUser(authenticatedUser);
    setCsrfToken(data.csrfToken || data.csrf_token || token);
    setPhone("");
    setNotice(
      mode === "register"
        ? "Your account has been created. You can now chat with our team."
        : "Welcome back. Your private conversation is ready.",
    );
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Unable to authenticate.",
    );
  } finally {
    setSubmitting(false);
  }
}

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const text = message.trim();

  if (!text || submitting) return;

  setError("");
  setSubmitting(true);

  try {
    if (!csrfToken) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    await apiRequest("messages.php?action=send", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        message: text,
        conversation_id: conversationId,
        csrf_token: csrfToken,
      }),
    });

    setMessage("");
    await loadMessages();
    messageInputRef.current?.focus();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Unable to send message.",
    );
  } finally {
    setSubmitting(false);
  }
}

  async function logout() {
    setError("");
    try {
      await apiRequest("auth.php?action=logout", {
        method: "POST",
        headers: csrfToken
          ? { "X-CSRF-Token": csrfToken }
          : {},
        body: JSON.stringify({
          action: "logout",
          csrf_token: csrfToken,
        }),
      });
    } catch {
      // Clear local UI even if the server session has already expired.
    }

    setUser(null);
    setMessages([]);
    setConversationId(null);
    setCsrfToken("");
    setNotice("");
    setMode("login");
  }

  if (loading) {
    return (
      <main className="client-chat-shell">
        <div className="client-chat-loading">
          <LoaderCircle className="animate-spin" size={28} />
          <p>Connecting to CPA-DMV Support…</p>
        </div>
        <style jsx>{styles}</style>
      </main>
    );
  }

  return (
    <main className="client-chat-shell">
      <header className="chat-topbar">
        <a href="/" className="brand" aria-label="CPA-DMV home">
          <span className="brand-mark">C</span>
          <span>
            <strong>CPA-DMV</strong>
            <small>CLIENT SUPPORT</small>
          </span>
        </a>

        {user && (
          <button className="logout-button" onClick={logout} type="button">
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        )}
      </header>

      {!user ? (
        <section className="auth-layout">
          <div className="auth-intro">
            <span className="eyebrow">
              <ShieldCheck size={15} /> PRIVATE CLIENT PORTAL
            </span>
            <h1>
              Your questions.
              <br />
              Our <span>personal attention.</span>
            </h1>
            <p>
              Connect directly with the CPA-DMV team through your own private
              conversation. Sign in anytime to continue where you left off.
            </p>

            <div className="trust-row">
              <LockKeyhole size={18} />
              <span>Private account · One-to-one support</span>
            </div>
          </div>

          <div className="auth-card">
            <div className="auth-icon">
              <MessageCircle size={25} />
            </div>

            <h2>{mode === "register" ? "Create your account" : "Welcome back"}</h2>
            <p className="auth-subtitle">
              {mode === "register"
                ? "Register to start a conversation with our team."
                : "Sign in to access your private chat."}
            </p>

            <div className="mode-switch">
              <button
                type="button"
                className={mode === "register" ? "active" : ""}
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
              >
                Create account
              </button>
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Sign in
              </button>
            </div>

            <form onSubmit={handleAuth} className="auth-form">
              {mode === "register" && (
                <label>
                  Full name
                  <span className="field-wrap">
                    <UserRound size={17} />
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      maxLength={150}
                      required
                    />
                  </span>
                </label>
              )}

              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </label>

              {mode === "register" && (
  <label>
    Phone number (optional)
    <input
      type="tel"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
      placeholder="Your phone number"
      autoComplete="tel"
      maxLength={30}
    />
  </label>
)}

              {error && <p className="alert error-alert">{error}</p>}
              {notice && <p className="alert success-alert">{notice}</p>}

              <button className="primary-button" disabled={submitting}>
                {submitting ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : mode === "register" ? (
                  "Create account"
                ) : (
                  "Sign in securely"
                )}
              </button>
            </form>

            <p className="privacy-note">
              <LockKeyhole size={13} />
              Your account and messages are private to your conversation.
            </p>
          </div>
        </section>
      ) : (
        <section className="chat-layout">
          <div className="chat-heading">
            <div className="chat-heading-icon">
              <MessageCircle size={24} />
            </div>
            <div>
              <h1>Client support</h1>
              <p>
                Hello, {user.name}. Send a message to speak with our team.
              </p>
            </div>
            <span className="secure-label">
              <LockKeyhole size={13} /> Private chat
            </span>
          </div>

          <div className="chat-panel">
            <div className="conversation-header">
              <div className="support-avatar">C</div>
              <div>
                <strong>CPA-DMV Support</strong>
                <span>
                  <i className="online-dot" /> Client services team
                </span>
              </div>
              <span className="conversation-tag">1:1 Conversation</span>
            </div>

            <div className="messages-area">
              <div className="date-divider">
                <span>YOUR PRIVATE CONVERSATION</span>
              </div>

              <div className="welcome-note">
                <div className="welcome-icon">
                  <ShieldCheck size={21} />
                </div>
                <strong>Welcome to CPA-DMV Support</strong>
                <p>
                  Send us your question and a member of our team will respond
                  here. You can return anytime to view the conversation.
                </p>
              </div>

              {messages.map((item) => {
                const isMine = item.sender_type === "client";

                return (
                  <div
                    className={`message-row ${isMine ? "mine" : "theirs"}`}
                    key={item.id}
                  >
                    {!isMine && (
                      <div className="message-avatar">C</div>
                    )}

                    <div className="message-content">
                      <span className="message-sender">
                        {isMine ? "You" : "CPA-DMV Support"}
                      </span>
                      <div className="message-bubble">
                        {item.message}
                      </div>
                      <span className="message-meta">
                        {formatTime(item.created_at)}
                        {isMine && (
                          item.read_at ? (
                            <CheckCheck size={14} />
                          ) : (
                            <Check size={14} />
                          )
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div ref={bottomRef} />
            </div>

            {error && <p className="chat-error">{error}</p>}

            <form className="composer" onSubmit={sendMessage}>
              <textarea
                ref={messageInputRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your message…"
                rows={2}
                maxLength={5000}
                aria-label="Write your message"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button
                type="submit"
                className="send-button"
                disabled={submitting || !message.trim()}
                aria-label="Send message"
              >
                {submitting ? (
                  <LoaderCircle size={19} className="animate-spin" />
                ) : (
                  <>
                    <Send size={17} />
                    <span>Send</span>
                  </>
                )}
              </button>
              <span className="composer-hint">
                Press Enter to send · Shift + Enter for a new line
              </span>
            </form>
          </div>

          <div className="chat-footer-note">
            <LockKeyhole size={14} />
            Please avoid sending passwords, payment card details, or other
            highly sensitive information in chat.
          </div>
        </section>
      )}

      <footer className="page-footer">
        <span>© {new Date().getFullYear()} CPA-DMV</span>
        <span>Professional service. Personal attention.</span>
        <a href="/">Back to website</a>
      </footer>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
  .client-chat-shell {
    --navy: #102a25;
    --green: #174e3b;
    --gold: #d4ad58;
    --ink: #172b25;
    --muted: #718079;
    min-height: 100vh;
    padding: 0 6%;
    color: var(--ink);
    background: #f6f8f6;
    font-family: Arial, Helvetica, sans-serif;
  }
  .chat-topbar {
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e3e9e4;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--navy);
    text-decoration: none;
  }
  .brand-mark {
    width: 43px;
    height: 43px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: var(--green);
    color: white;
    font-family: Georgia, serif;
    font-size: 26px;
    font-weight: bold;
  }
  .brand strong, .brand small { display: block; }
  .brand strong { font-size: 19px; letter-spacing: .2px; }
  .brand small { margin-top: 4px; font-size: 9px; letter-spacing: 2px; color: #7b8b81; }
  .logout-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #dce5de;
    border-radius: 9px;
    padding: 10px 14px;
    background: white;
    color: #40564a;
    cursor: pointer;
    font-size: 13px;
  }
  .auth-layout {
    max-width: 1110px;
    min-height: calc(100vh - 160px);
    margin: auto;
    padding: 64px 0;
    display: grid;
    grid-template-columns: 1.05fr .8fr;
    align-items: center;
    gap: 90px;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--green);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
  }
  .auth-intro h1 {
    margin: 22px 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(38px, 4.5vw, 60px);
    line-height: 1.12;
    letter-spacing: -1.6px;
    font-weight: 500;
  }
  .auth-intro h1 span { color: var(--green); font-style: italic; }
  .auth-intro > p {
    max-width: 440px;
    color: #68766e;
    font-size: 16px;
    line-height: 1.9;
  }
  .trust-row {
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 11px;
    color: #52685b;
    font-size: 13px;
  }
  .auth-card {
    border: 1px solid #e4e9e4;
    border-radius: 19px;
    background: white;
    padding: 32px;
    box-shadow: 0 20px 65px rgba(27, 55, 40, .06);
  }
  .auth-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: #eaf2ec;
    color: var(--green);
  }
  .auth-card h2 { margin: 22px 0 8px; font-size: 25px; letter-spacing: -.5px; }
  .auth-subtitle { margin: 0; color: #7a867f; font-size: 13px; line-height: 1.6; }
  .mode-switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin: 24px 0;
    padding: 4px;
    background: #f3f6f3;
    border-radius: 10px;
  }
  .mode-switch button {
    border: 0;
    border-radius: 7px;
    padding: 11px 5px;
    background: transparent;
    color: #728077;
    font-size: 12px;
    cursor: pointer;
  }
  .mode-switch button.active {
    color: var(--green);
    background: white;
    box-shadow: 0 1px 4px #dfe6df;
    font-weight: 700;
  }
  .auth-form { display: grid; gap: 17px; }
  .auth-form label { display: grid; gap: 8px; color: #405148; font-size: 12px; font-weight: 700; }
  .auth-form input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 13px 14px;
    border: 1px solid #dfe6e0;
    border-radius: 9px;
    outline: none;
    background: white;
    color: #1b3026;
    font: inherit;
    font-weight: 400;
    font-size: 13px;
  }
  .auth-form input:focus, .composer textarea:focus { border-color: #6b9b7c; box-shadow: 0 0 0 3px #e7f1e9; }
  .field-wrap { position: relative; display: flex; align-items: center; }
  .field-wrap > svg { position: absolute; left: 13px; color: #839187; }
  .field-wrap input { padding-left: 40px; }
  .primary-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 47px;
    margin-top: 2px;
    border: 0;
    border-radius: 9px;
    background: var(--green);
    color: white;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }
  .primary-button:disabled, .send-button:disabled { opacity: .6; cursor: not-allowed; }
  .privacy-note {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 22px 0 0;
    color: #859188;
    font-size: 10px;
  }
  .alert { margin: 0; padding: 10px 12px; border-radius: 8px; font-size: 12px; line-height: 1.5; }
  .error-alert { background: #fff0ee; color: #a5372a; }
  .success-alert { background: #edf7ef; color: #286341; }
  .chat-layout { max-width: 950px; margin: auto; padding: 42px 0 32px; }
  .chat-heading { display: flex; align-items: center; gap: 14px; margin-bottom: 25px; }
  .chat-heading-icon { display: grid; place-items: center; width: 50px; height: 50px; border-radius: 13px; background: #e5efe7; color: var(--green); }
  .chat-heading h1 { margin: 0 0 5px; font-family: Georgia, serif; font-size: 29px; font-weight: 500; }
  .chat-heading p { margin: 0; color: #77857c; font-size: 13px; }
  .secure-label { display: flex; align-items: center; gap: 6px; margin-left: auto; padding: 8px 10px; border-radius: 20px; background: #eaf3eb; color: #2e6a45; font-size: 11px; white-space: nowrap; }
  .chat-panel { overflow: hidden; border: 1px solid #e0e7e0; border-radius: 15px; background: white; box-shadow: 0 14px 45px rgba(28, 58, 39, .05); }
  .conversation-header { display: flex; align-items: center; gap: 12px; padding: 19px 22px; border-bottom: 1px solid #edf0ed; }
  .support-avatar, .message-avatar { display: grid; place-items: center; flex: 0 0 auto; width: 42px; height: 42px; border-radius: 50%; background: var(--green); color: white; font-family: Georgia, serif; font-size: 20px; }
  .conversation-header strong, .conversation-header span { display: block; }
  .conversation-header strong { margin-bottom: 5px; font-size: 14px; }
  .conversation-header span { color: #7a887e; font-size: 11px; }
  .conversation-header .online-dot { display: inline-block; width: 7px; height: 7px; margin-right: 5px; border-radius: 50%; background: #52a76c; }
  .conversation-header .conversation-tag { margin-left: auto; padding: 7px 10px; border-radius: 6px; background: #f3f6f3; color: #68796d; white-space: nowrap; }
  .messages-area { min-height: 300px; max-height: 52vh; overflow-y: auto; padding: 22px; background: #fcfdfc; }
  .date-divider { display: flex; justify-content: center; margin-bottom: 22px; }
  .date-divider span { padding: 7px 11px; border: 1px solid #edf0ed; border-radius: 20px; background: white; color: #869188; font-size: 9px; letter-spacing: 1px; }
  .welcome-note { max-width: 390px; margin: 0 auto 28px; padding: 20px; border: 1px solid #e8eee8; border-radius: 12px; background: white; text-align: center; }
  .welcome-icon { display: grid; place-items: center; width: 40px; height: 40px; margin: 0 auto 12px; border-radius: 12px; background: #edf4ee; color: var(--green); }
  .welcome-note strong { font-size: 13px; }
  .welcome-note p { margin: 9px 0 0; color: #78847c; font-size: 12px; line-height: 1.7; }
  .message-row { display: flex; align-items: flex-end; gap: 9px; margin: 17px 0; }
  .message-row.mine { justify-content: flex-end; }
  .message-avatar { width: 29px; height: 29px; font-size: 14px; }
  .message-content { max-width: min(72%, 540px); display: flex; flex-direction: column; gap: 5px; }
  .mine .message-content { align-items: flex-end; }
  .message-sender { color: #7e8a81; font-size: 10px; }
  .message-bubble { padding: 12px 15px; border: 1px solid #e5eae5; border-radius: 13px 13px 13px 3px; background: white; color: #304137; font-size: 13px; line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere; }
  .mine .message-bubble { border-color: var(--green); border-radius: 13px 13px 3px 13px; background: var(--green); color: white; }
  .message-meta { display: flex; align-items: center; gap: 4px; color: #96a098; font-size: 10px; }
  .composer { position: relative; display: flex; align-items: flex-end; gap: 12px; padding: 18px 20px 36px; border-top: 1px solid #e9eee9; background: white; }
  .composer textarea { box-sizing: border-box; flex: 1; min-width: 0; resize: vertical; min-height: 49px; max-height: 150px; padding: 14px; border: 1px solid #dfe7df; border-radius: 10px; outline: none; color: #25392d; font: inherit; font-size: 13px; line-height: 1.5; }
  .send-button { display: flex; align-items: center; justify-content: center; gap: 8px; min-width: 95px; height: 47px; border: 0; border-radius: 9px; background: var(--green); color: white; font-size: 12px; font-weight: 700; cursor: pointer; }
  .composer-hint { position: absolute; left: 22px; bottom: 12px; color: #97a199; font-size: 10px; }
  .chat-error { margin: 0; padding: 10px 20px; background: #fff1ef; color: #a5372a; font-size: 12px; }
  .chat-footer-note { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 18px; color: #859188; font-size: 11px; line-height: 1.6; text-align: center; }
  .page-footer { min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 15px; border-top: 1px solid #e2e9e2; color: #849087; font-size: 11px; }
  .page-footer a { color: #42664f; text-decoration: none; }
  .client-chat-loading { min-height: 75vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; color: var(--green); }
  .client-chat-loading p { font-size: 13px; }
  .animate-spin { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 800px) {
    .client-chat-shell { padding: 0 5%; }
    .auth-layout { grid-template-columns: 1fr; gap: 30px; padding: 40px 0; }
    .auth-intro h1 { font-size: 43px; }
    .auth-card { padding: 25px; }
    .chat-layout { padding-top: 28px; }
    .chat-heading h1 { font-size: 25px; }
    .secure-label { display: none; }
    .messages-area { max-height: 55vh; padding: 16px 12px; }
    .conversation-header { padding: 15px 13px; }
    .conversation-header .conversation-tag { display: none; }
    .composer { padding: 13px 12px 37px; gap: 8px; }
    .send-button { min-width: 48px; width: 48px; }
    .send-button span { display: none; }
    .message-content { max-width: 83%; }
    .page-footer { flex-wrap: wrap; padding: 18px 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-spin { animation: none; }
  }
`;
