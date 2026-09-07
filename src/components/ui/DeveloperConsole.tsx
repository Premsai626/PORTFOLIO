import React, { useState } from 'react';
import { Terminal, X, Play, Sparkles, Check, Copy } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export const DeveloperConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputCommand, setInputCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: 'whoami',
      output: `${profile.name} — ${profile.role}`,
    },
    {
      command: 'status',
      output: `ONLINE // ${profile.status}`,
    },
  ]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let res: React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        res = (
          <div className="text-slate-300 space-y-1">
            <p className="font-semibold text-white">Available Commands:</p>
            <p className="text-sky-300 font-mono">
              • whoami <span className="text-slate-400">— View creator identity</span>
            </p>
            <p className="text-sky-300 font-mono">
              • role <span className="text-slate-400">— Current engineering focus</span>
            </p>
            <p className="text-sky-300 font-mono">
              • projects <span className="text-slate-400">— List flagship projects</span>
            </p>
            <p className="text-sky-300 font-mono">
              • renders <span className="text-slate-400">— 3D graphics & shaders</span>
            </p>
            <p className="text-sky-300 font-mono">
              • tech <span className="text-slate-400">— Core technical stack</span>
            </p>
            <p className="text-sky-300 font-mono">
              • education <span className="text-slate-400">— Academic credentials</span>
            </p>
            <p className="text-sky-300 font-mono">
              • contact / socials <span className="text-slate-400">— Direct communication channels</span>
            </p>
            <p className="text-sky-300 font-mono">
              • clear <span className="text-slate-400">— Wipe console logs</span>
            </p>
          </div>
        );
        break;

      case 'whoami':
        res = `${profile.name} — ${profile.role} (MLRIT CSM)`;
        break;

      case 'role':
        res = profile.role;
        break;

      case 'projects':
        res = (
          <div className="space-y-1">
            {projects.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-xs">
                <span className="text-sky-300 font-bold">{p.name}</span>
                <span className="text-slate-400">[{p.category}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'renders':
      case '3d':
      case 'graphics':
        res = '3D Real-Time Engine: 60FPS Euler background vector engine with Fibonacci Geodesic Polyhedron, 3D Undulating Horizon Wave Grid, 3D Torus Knot, and volumetric particles.';
        break;

      case 'tech':
        res = 'React, TypeScript, Python, Java, C++, Supabase, OpenCV, IoT, Tailwind CSS';
        break;

      case 'education':
        res = `${profile.education.degree} (${profile.education.specialization}) @ ${profile.education.institution}`;
        break;

      case 'contact':
      case 'socials':
      case 'links':
        res = (
          <div className="space-y-1.5 text-xs">
            <p className="text-white font-semibold">Direct Communication Channels:</p>
            {profile.links.email && (
              <p className="text-sky-300">
                • Email: <span className="text-slate-200">{profile.links.email}</span>
              </p>
            )}
            {profile.links.github && (
              <p className="text-sky-300">
                • GitHub: <span className="text-slate-200">{profile.links.github}</span>
              </p>
            )}
            {profile.links.linkedin && (
              <p className="text-sky-300">
                • LinkedIn: <span className="text-slate-200">{profile.links.linkedin}</span>
              </p>
            )}
            {profile.links.instagram && (
              <p className="text-sky-300">
                • Instagram: <span className="text-slate-200">{profile.links.instagram}</span>
              </p>
            )}
          </div>
        );
        break;

      case 'clear':
        setCommandHistory([]);
        return;

      default:
        res = `Unknown command: "${cleanCmd}". Type "help" for a list of valid commands.`;
        break;
    }

    setCommandHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;
    executeCommand(inputCommand);
    setInputCommand('');
  };

  const copySnapshot = () => {
    const text = `Prem Sai Portfolio Terminal Snapshot:\nDeveloper: ${profile.name}\nRole: ${profile.role}\nStatus: ${profile.status}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Terminal Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open developer command terminal"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/60 hover:border-sky-500/50 hover:text-sky-400 hover:scale-105 transition-all duration-300 group"
      >
        <div className="relative">
          <Terminal className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-mono font-semibold tracking-wider uppercase">
          Dev_Console.sh
        </span>
      </button>

      {/* Terminal Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-900/50 overflow-hidden font-mono text-xs z-10 animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-400 text-[11px] font-sans flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  prem_sai@workstation: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copySnapshot}
                  title="Copy terminal info"
                  className="p-1 text-slate-400 hover:text-sky-300 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 max-h-72 overflow-y-auto space-y-3 text-slate-300 bg-slate-950">
              <div className="text-slate-500 text-[11px]">
                Prem Sai Interactive Shell [v2.4.0]<br />
                Type <span className="text-sky-400 font-semibold">help</span> for available commands.
              </div>

              {commandHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-sky-400">
                    <span className="text-emerald-400 font-semibold">prem@dev:~$</span>
                    <span className="font-semibold text-slate-100">{item.command}</span>
                  </div>
                  <div className="pl-4 text-slate-300 leading-relaxed">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Command Input Form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-t border-slate-800"
            >
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder="type command (help, whoami, projects, tech)..."
                autoFocus
                className="flex-1 bg-transparent text-sky-300 placeholder:text-slate-600 focus:outline-none text-xs"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
              >
                <Play className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
