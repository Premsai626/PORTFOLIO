import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileCode2,
  Terminal,
  Zap,
  Code2,
  Copy,
  Check,
} from 'lucide-react';

interface FaqAssistantAnimationProps {
  height?: number;
  className?: string;
}

interface QueryStep {
  query: string;
  category: string;
  sourceDoc: string;
  relevanceScore: string;
  relevancePct: number;
  answerText: string;
  codeSnippet: string;
  latencyMs: number;
}

const FAQ_CYCLES: QueryStep[] = [
  {
    query: 'How to configure JWT auth tokens in FastAPI?',
    category: 'Security & Auth',
    sourceDoc: 'docs/security/jwt_auth.py §4.2',
    relevanceScore: '0.982 Cosine',
    relevancePct: 98,
    answerText: 'Use OAuth2PasswordBearer with PyJWT and inject expiration timestamps:',
    codeSnippet: 'payload = {"sub": user.id, "exp": expire_delta}\ntoken = jwt.encode(payload, SECRET_KEY, "HS256")',
    latencyMs: 124,
  },
  {
    query: 'How does vector similarity search index chunks?',
    category: 'Vector Search & RAG',
    sourceDoc: 'docs/retrieval/vector_index.md §2.1',
    relevanceScore: '0.965 Cosine',
    relevancePct: 96,
    answerText: 'Chunks are converted to 1536-dim embeddings and queried with HNSW index:',
    codeSnippet: 'index = faiss.IndexHNSWFlat(dimension, 32)\nindex.add(np.array(document_embeddings))',
    latencyMs: 148,
  },
  {
    query: 'How to cache recent questions on the client?',
    category: 'Full-Stack Caching',
    sourceDoc: 'docs/cache/session_store.ts §1.8',
    relevanceScore: '0.974 Cosine',
    relevancePct: 97,
    answerText: 'Client-side query cache keeps recent embeddings in memory for instant replay:',
    codeSnippet: 'const cached = queryCache.get(hash(prompt));\nif (cached) return renderAnswer(cached);',
    latencyMs: 95,
  },
];

export const FaqAssistantAnimation: React.FC<FaqAssistantAnimationProps> = ({
  height = 240,
  className = '',
}) => {
  const [cycleIdx, setCycleIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const step = FAQ_CYCLES[cycleIdx];

  // Cycling state machine
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIdx((prev) => (prev + 1) % FAQ_CYCLES.length);
      setCopied(false);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Typing effect animation
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const fullText = step.answerText;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [cycleIdx, step.answerText]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-md shadow-black/80 flex flex-col justify-between select-none ${className}`}
      style={{ height }}
    >
      {/* Top Telemetry Header */}
      <div className="relative z-20 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-[10px] font-mono text-sky-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>FAQ AI ASSISTANT</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            Vector DB • FastAPI
          </span>
        </div>

        {/* Index Status & Latency Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold">{step.latencyMs}ms</span>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-md font-semibold">
            1,420 Chunks Indexed
          </span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 sm:p-2.5 overflow-hidden bg-slate-950">
        {/* Left Side: Semantic Search & Vector Embeddings Space */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between p-2.5">
          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-sky-300">
              <Search className="w-3 h-3 text-sky-400" />
              <span>SEMANTIC VECTOR SEARCH</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400">
              {step.relevanceScore}
            </span>
          </div>

          {/* Natural Language Prompt Pill */}
          <div className="my-auto z-10 space-y-2 py-1">
            <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 flex items-start gap-2">
              <Terminal className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                  Natural Language Query
                </span>
                <p className="text-xs font-semibold text-slate-100 font-sans leading-tight">
                  &ldquo;{step.query}&rdquo;
                </p>
              </div>
            </div>

            {/* Matched Source Citation Box */}
            <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-800/40 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="flex items-center gap-1 text-indigo-300 font-semibold">
                  <BookOpen className="w-3 h-3 text-indigo-400" />
                  <span>Matched Citation:</span>
                </span>
                <span className="text-emerald-400 font-bold">{step.relevancePct}% Match</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                <FileCode2 className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="text-amber-200 truncate font-semibold">
                  {step.sourceDoc}
                </span>
              </div>
            </div>
          </div>

          {/* Relevance Bar */}
          <div className="z-10 bg-slate-950/80 border border-slate-800/90 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Category:</span>
            <span className="text-sky-300 font-semibold">{step.category}</span>
          </div>
        </div>

        {/* Right Side: Generated AI Answer & Code Snippet Preview */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between p-2.5">
          {/* Answer Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>GENERATED RESPONSE</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Verified Citation</span>
            </span>
          </div>

          {/* Answer Text & Snippet */}
          <div className="my-auto z-10 space-y-1.5 py-1">
            <p className="text-xs text-slate-200 font-sans leading-snug">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-3 bg-sky-400 ml-0.5 animate-pulse" />}
            </p>

            {/* Code Snippet Block */}
            <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-2 font-mono text-[10px] text-sky-300 leading-relaxed overflow-x-auto group">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800/80 text-[8px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Code2 className="w-2.5 h-2.5 text-indigo-400" />
                  <span>Python / TypeScript Snippet</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300 text-[9px] font-mono leading-tight whitespace-pre-wrap">
                {step.codeSnippet}
              </pre>
            </div>
          </div>

          {/* Fast Pipeline Status */}
          <div className="z-10 bg-slate-950/80 border border-slate-800/90 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Streaming:</span>
            <span className="text-emerald-400 font-semibold">FastAPI Server-Sent Events</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-20 px-3 py-1.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <BookOpen className="w-3 h-3 text-sky-400" />
          <span className="text-slate-400 font-medium">Retrieval Engine:</span>
          <span className="text-sky-300 font-semibold">Cosine Vector Index (Zero Hallucination)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Doc Verified</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-indigo-300 font-semibold">
            Markdown Ready
          </span>
        </div>
      </div>
    </div>
  );
};
