import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Sparkles, Loader2, AlertTriangle, User } from "lucide-react";
import {
  sendGeminiMessage,
  MissingApiKeyError,
  type ChatMessage,
} from "@/lib/gemini";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Analyze my essay cohesion across all NYU drafts",
  "Identify bottlenecks in my current PDCA cycle",
  "Give me a risk-adjusted plan for the next 14 days",
];

type DisplayMessage = ChatMessage & { error?: boolean; id: string };

export function GeminiChat() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [input]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: DisplayMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendGeminiMessage(
        nextHistory.map(({ role, content }) => ({ role, content })),
      );
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "model", content: reply }]);
    } catch (err) {
      const content =
        err instanceof MissingApiKeyError
          ? "Please configure your Gemini API Key in the environment variables (`VITE_GEMINI_API_KEY`) to activate the consultant."
          : err instanceof Error
            ? `Something went wrong reaching Gemini. ${err.message}`
            : "Something went wrong reaching Gemini.";
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "model", content, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5 glass-strong">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
          <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Gemini AI</div>
          <div className="text-[11px] text-muted-foreground">
            Elite admissions consultant · Powered by Google Gemini
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Ready
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <EmptyState onPick={send} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Gemini is thinking…
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={onSubmit}
        className="border-t border-border bg-surface-elevated/40 px-4 md:px-8 py-4"
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40 transition">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              placeholder="Ask the Copilot anything about your application strategy…"
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground py-1.5 max-h-[200px]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant transition",
                "disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:scale-105",
              )}
              aria-label="Send"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground text-center">
            Press <kbd className="rounded border border-border bg-muted px-1">Enter</kbd> to send ·{" "}
            <kbd className="rounded border border-border bg-muted px-1">Shift+Enter</kbd> for newline
          </p>
        </div>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="mx-auto max-w-2xl text-center py-10">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow mb-4">
        <Sparkles className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">How can I sharpen your strategy?</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Your elite admissions consultant for Ivy League and top-tier programs.
      </p>
      <div className="mt-6 grid gap-2 sm:grid-cols-1">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3 text-left text-sm text-foreground/90 hover:border-primary/40 hover:bg-accent transition"
          >
            <span>{s}</span>
            <Send className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition" />
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: DisplayMessage }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 border border-primary/20 px-4 py-2.5 text-sm leading-relaxed text-foreground">
          {message.content}
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-elevated border border-border text-muted-foreground">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-full shadow-elegant",
          message.error
            ? "bg-destructive/15 border border-destructive/30 text-destructive"
            : "gradient-primary text-primary-foreground",
        )}
      >
        {message.error ? <AlertTriangle className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed",
          message.error
            ? "bg-destructive/10 border border-destructive/30 text-foreground"
            : "bg-surface-elevated border border-border text-foreground",
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:mb-2 prose-headings:mt-3 prose-pre:bg-muted prose-pre:text-foreground prose-code:text-primary prose-a:text-primary prose-strong:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
