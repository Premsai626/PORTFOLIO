import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Achievements } from '@/components/Achievements';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { DeveloperConsole } from '@/components/ui/DeveloperConsole';
import { IntroScreen } from '@/components/IntroScreen';
import { ExecutiveBrief } from '@/components/ExecutiveBrief';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { FloatingScrollIndicator } from '@/components/ui/FloatingScrollIndicator';
import { ScrollVelocityMarquee } from '@/components/ui/ScrollVelocityMarquee';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showExecutiveBrief, setShowExecutiveBrief] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Floating Vertical Radar Section Navigation */}
      <FloatingScrollIndicator />

      {/* Intro Landing Splash & Diagnostic Boot Screen */}
      {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} />}

      {/* Recruiter & Executive Brief Modal */}
      <ExecutiveBrief
        isOpen={showExecutiveBrief}
        onClose={() => setShowExecutiveBrief(false)}
      />

      {/* Background Ambience and Particles */}
      <AnimatedBackground />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Developer Console Shell */}
      <DeveloperConsole />

      {/* Dynamic Glassmorphic Navigation with Executive Brief trigger */}
      <Navbar onOpenExecutiveBrief={() => setShowExecutiveBrief(true)} />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <Hero onOpenExecutiveBrief={() => setShowExecutiveBrief(true)} />

        {/* Dynamic Velocity-Responsive Marquee Banner 1 */}
        <div className="py-6">
          <ScrollVelocityMarquee
            row1Text="PREM SAI • AI & MACHINE LEARNING • FULL-STACK REACT • EMBEDDED IOT • "
            row2Text="ARCHITECTING INTELLIGENT SYSTEMS • PYTHON • TYPESCRIPT • ROS & ROBOTICS • "
            baseSpeed={0.85}
          />
        </div>

        <About />
        <Skills />

        {/* Dynamic Velocity-Responsive Marquee Banner 2 */}
        <div className="py-6">
          <ScrollVelocityMarquee
            row1Text="FEATURED PROTOTYPES • ORBIT AI • VIBETUNE REAL-TIME AUDIO • WI-FI IOT BOT • "
            row2Text="RESPONSIVE UI/UX • HIGH PERFORMANCE GRAPHICS • 60 FPS VECTOR PIPELINE • "
            baseSpeed={0.75}
          />
        </div>

        <Projects />
        <Experience />
        <Education />
        <Achievements />

        {/* Dynamic Velocity-Responsive Marquee Banner 3 */}
        <div className="py-6">
          <ScrollVelocityMarquee
            row1Text="LET'S CONNECT • OPEN FOR INTERNSHIPS & ROLES • HYDERABAD & REMOTE • "
            row2Text="BUILD • ITERATE • SHIP EXTRAORDINARY SOFTWARE • REACH OUT TODAY • "
            baseSpeed={0.9}
          />
        </div>

        <Contact />
      </main>

      {/* Portfolio Footer */}
      <Footer />
    </div>
  );
};

export default App;
