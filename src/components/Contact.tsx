import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { profile } from '@/data/profile';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const targetEmail = profile.links.email || 'ippilipremsai12356@gmail.com';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form Validation
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      setStatus('error');
      setErrorMessage('Message must be at least 8 characters.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const emailSubject = formData.subject.trim() || `Portfolio Direct Message from ${formData.name.trim()}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: emailSubject,
          subject: emailSubject,
          message: formData.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.success === 'true' || data?.success === true || response.status === 200)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data?.message || 'Transmission failed');
      }
    } catch (err: any) {
      console.warn('FormSubmit AJAX dispatch warning, offering direct mail fallbacks:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to send automatically via background server. Please use one of the direct email buttons below.'
      );
    }
  };

  const copyEmail = () => {
    if (targetEmail) {
      navigator.clipboard.writeText(targetEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const mailSubject = encodeURIComponent(
    formData.subject || `Portfolio Inquiry from ${formData.name || 'Visitor'}`
  );
  const mailBody = encodeURIComponent(
    `Hi Prem Sai,\n\n${formData.message || ''}\n\nBest regards,\n${formData.name || ''}\n${formData.email || ''}`
  );

  const directMailtoUrl = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;
  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${mailSubject}&body=${mailBody}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="08"
          badge="GET IN TOUCH"
          title="Let's connect and"
          highlight="build something great."
          subtitle="Open to internships, software engineering opportunities, AI research collaborations, and technical discussions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Outreach & Social Links */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="left" duration={850} distance={30}>
              <TiltCard className="h-full" maxTilt={5} scale={1.015}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl flex flex-col justify-between shadow-2xl shadow-black/70">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Open to Opportunities</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Have an opportunity or project in mind?
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed font-normal">
                      Whether you are looking for an engineer to build a web application, collaborate on an AI or IoT project, or discuss technical ideas, I&apos;d love to connect.
                    </p>

                    {/* Direct Channels */}
                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                        <span>DIRECT CONTACT:</span>
                        <span className="text-[10px] text-sky-400 font-normal">Active Inbox</span>
                      </div>

                      {/* Email Action Card */}
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 shadow-xs">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white block">
                                Direct Email
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 font-medium break-all">
                                {targetEmail}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={copyEmail}
                            title="Copy email address"
                            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 shadow-xs transition-colors"
                          >
                            {copiedEmail ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Quick 1-Click Launch Options */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                          <a
                            href={`mailto:${targetEmail}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/80 text-sky-400 hover:text-white border border-sky-800/50 text-[11px] font-mono font-medium transition-all"
                          >
                            <Send className="w-3 h-3" />
                            <span>Mail App</span>
                          </a>

                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-mono font-medium transition-all"
                          >
                            <span>Gmail Web</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      </div>

                      {/* Social Profiles Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        <ExternalLinkButton
                          href={profile.links.github}
                          variant="secondary"
                          icon={<Github className="w-4 h-4 text-slate-300" />}
                          disabledLabel="Add GitHub"
                          className="w-full text-xs justify-center"
                        >
                          GitHub
                        </ExternalLinkButton>

                        <ExternalLinkButton
                          href={profile.links.linkedin}
                          variant="secondary"
                          icon={<Linkedin className="w-4 h-4 text-sky-400" />}
                          disabledLabel="Add LinkedIn"
                          className="w-full text-xs justify-center"
                        >
                          LinkedIn
                        </ExternalLinkButton>

                        <ExternalLinkButton
                          href={profile.links.instagram}
                          variant="secondary"
                          icon={<Instagram className="w-4 h-4 text-pink-400" />}
                          disabledLabel="Add Insta"
                          className="w-full text-xs justify-center"
                        >
                          Instagram
                        </ExternalLinkButton>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 font-medium flex items-center justify-between">
                    <span>Location: Hyderabad, India</span>
                    <span className="text-emerald-400 font-semibold">• IST (UTC+5:30)</span>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="right" duration={850} distance={30}>
              <TiltCard className="h-full" maxTilt={4} scale={1.01}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl shadow-black/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-sky-400" />
                        <h4 className="text-lg font-bold font-display text-white">
                          Send a Direct Message
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                        Delivered to Inbox
                      </span>
                    </div>

                    {status === 'success' ? (
                      <div className="py-12 px-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-center space-y-4 animate-fadeIn">
                        <div className="w-14 h-14 rounded-full bg-emerald-900/80 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h5 className="text-xl font-bold font-display text-white">
                          Message Dispatched to Prem Sai!
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                          Thank you for reaching out. Your message has been forwarded directly to{' '}
                          <span className="text-sky-300 font-mono font-semibold">{targetEmail}</span>. I will review it and reply as soon as possible.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => setStatus('idle')}
                            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                          >
                            Send Another Message
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {status === 'error' && (
                          <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-800/80 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-rose-300 font-medium">
                              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                              <span>{errorMessage}</span>
                            </div>

                            {/* Direct Fallback Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-900/60">
                              <a
                                href={directGmailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/40 text-xs font-mono font-semibold transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open Pre-filled in Gmail</span>
                              </a>

                              <a
                                href={directMailtoUrl}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono font-medium transition-all"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Open in Mail App</span>
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                              YOUR NAME *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="e.g. Alex Turing"
                              required
                              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:bg-slate-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                              YOUR EMAIL *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="alex@company.com"
                              required
                              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:bg-slate-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                            TOPIC / SUBJECT
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineering Opportunity / Collaboration"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:bg-slate-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                            MESSAGE *
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project, team, or opportunity..."
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:bg-slate-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs transition-colors resize-none"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                          >
                            {status === 'submitting' ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                                <span>Transmitting to {targetEmail}...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Send Direct Message</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                            <span>Instant email forwarding</span>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
