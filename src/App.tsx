import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Linkedin, Phone, MapPin } from 'lucide-react';

const StatCard = ({ target, label, tag, delay = 0 }: { target: number, label: string, tag: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="border-t border-black/15 pt-10 pb-10 pr-8 relative overflow-hidden group"
    >
      <div className="flex items-baseline">
        <span className="font-bebas text-5xl md:text-7xl leading-none text-black transition-colors group-hover:text-rust">
          {count}
        </span>
        <span className="font-bebas text-4xl text-black transition-colors group-hover:text-rust">
          {target === 12 || target === 10 || target === 6 || target === 475 ? '+' : target === 2000 ? 'K+' : '%'}
        </span>
      </div>
      <p className="text-xs md:text-sm leading-relaxed opacity-50 mt-2 font-normal">
        {label}
      </p>
      <span className="font-mono text-[9px] tracking-[2px] uppercase text-rust opacity-60 mt-3 block">
        {tag}
      </span>
    </motion.div>
  );
};

const ExperienceItem = ({ date, role, company, bullets, tags }: { date: string, role: string, company: string, bullets: string[], tags: string[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-4 md:gap-12 py-12 border-b border-white/10 relative group"
    >
      <div className="absolute -left-12 -right-12 top-0 bottom-0 bg-gold/3 opacity-0 transition-opacity group-hover:opacity-100 hidden md:block" />
      <div className="font-mono text-xs tracking-wider opacity-40 pt-1.5 z-10">
        {date.split('<br>').map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div className="z-10">
        <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2">{role}</h3>
        <div className="font-mono text-[11px] tracking-[2px] uppercase text-gold opacity-80 mb-6">{company}</div>
        <ul className="list-none">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-sm leading-relaxed opacity-55 py-1.5 border-b border-white/5 relative pl-4 before:content-['→'] before:absolute before:left-0 before:text-gold before:opacity-50 before:text-[10px]">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 items-start md:items-end justify-start z-10">
        {tags.map((tag, i) => (
          <span key={i} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-white/10 opacity-50 whitespace-nowrap">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateRing = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12
      }));
      requestAnimationFrame(animateRing);
    };
    const frame = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const marqueeItems = [
    "Content Strategy", "Influencer Partnerships", "KPI Reporting", "Meta Business Suite", 
    "Sprout Social", "Brand Storytelling", "Ethnographic Research", "Audience Segmentation"
  ];

  return (
    <div className="bg-black text-white font-syne overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        className="fixed w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height,background] duration-300"
        style={{ left: mousePos.x, top: mousePos.y, width: isHovering ? 20 : 12, height: isHovering ? 20 : 12 }}
      />
      <div 
        className="fixed w-10 h-10 border border-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50 transition-[width,height] duration-150"
        style={{ left: ringPos.x, top: ringPos.y, width: isHovering ? 60 : 40, height: isHovering ? 60 : 40 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference">
        <a href="#hero" className="font-bebas text-2xl tracking-[4px] text-white no-underline" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>LM</a>
        <ul className="hidden md:flex gap-9 list-none">
          {['Numbers', 'Experience', 'Project', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="font-mono text-[11px] tracking-[2px] uppercase text-white no-underline opacity-60 hover:opacity-100 transition-opacity"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(201,168,76,0.08)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(184,92,56,0.06)_0%,transparent_50%),#0a0a0a]" />
        
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 font-bebas text-[clamp(120px,18vw,280px)] tracking-[-4px] text-transparent text-stroke whitespace-nowrap animate-[ticker_20s_linear_infinite] pointer-events-none select-none">
          MARKETING IS ANTHROPOLOGY &nbsp; MARKETING IS ANTHROPOLOGY &nbsp; MARKETING IS ANTHROPOLOGY &nbsp; MARKETING IS ANTHROPOLOGY &nbsp;
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] tracking-[3px] uppercase text-gold mb-6 relative z-10"
        >
          Social Media Strategist — Fort Wayne, IN
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-bebas text-[clamp(72px,12vw,180px)] leading-[0.9] tracking-[-2px] relative z-10"
        >
          Lex<br /><em className="italic font-serif text-gold not-italic">Murayao</em>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 relative z-10 gap-6"
        >
          <p className="max-w-[380px] text-sm leading-relaxed opacity-60 font-normal">
            Brand marketing professional with a B.A. in Anthropology — bringing a human-first lens to content strategy, influencer partnerships, and community engagement.
          </p>
          <div className="flex gap-4">
            <a 
              href="#experience" 
              className="font-mono text-[11px] tracking-[2px] uppercase px-7 py-3.5 border border-gold text-gold no-underline transition-all duration-300 relative overflow-hidden group hover:text-black"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a 
              href="mailto:lmurayao@gmail.com" 
              className="font-mono text-[11px] tracking-[2px] uppercase px-7 py-3.5 border border-white/20 text-white/50 no-underline transition-all duration-300 relative overflow-hidden group hover:text-white"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-white/10 -translate-x-[101%] transition-transform duration-300 group-hover:translate-x-0" />
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2 opacity-30 z-10">
          <span className="font-mono text-[9px] tracking-[3px] uppercase [writing-mode:vertical-rl]">Scroll</span>
          <div className="w-px h-[60px] bg-white animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* Marquee Band */}
      <div className="bg-gold text-black py-3.5 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_18s_linear_infinite]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-bebas text-sm tracking-[4px] uppercase mx-8">
              {item}
              <span className="opacity-40 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Numbers Section */}
      <section id="numbers" className="px-6 md:px-12 py-32 bg-cream text-black">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20"
        >
          <div>
            <div className="font-mono text-[10px] tracking-[4px] uppercase text-rust opacity-70 mb-4">Field Work</div>
            <h2 className="font-bebas text-[clamp(48px,7vw,96px)] leading-none tracking-[-1px]">By The<br />Numbers</h2>
          </div>
          <p className="max-w-[280px] text-[13px] leading-relaxed opacity-50 text-left md:text-right mt-4 md:mt-0">
            Every metric earned in the field — not estimated, not projected.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
          <StatCard target={25} label="Social media growth across TikTok, Instagram & Facebook in 5 months" tag="Brand Growth" />
          <StatCard target={12} label="Influencer-brand partnerships tracked in KPI dashboard" tag="Partnerships" delay={0.1} />
          <StatCard target={35} label="Average increase in event attendance from targeted campaigns" tag="Campaigns" delay={0.2} />
          <StatCard target={475} label="Customer interactions analyzed in ethnographic field study" tag="Research" delay={0.3} />
          <StatCard target={2000} label="Students reached across mental health, diversity & academic campaigns" tag="Reach" delay={0.4} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 mt-px">
          <StatCard target={30} label="Faster campaign reporting speed via KPI dashboard build" tag="Efficiency" />
          <StatCard target={15} label="Lift in average engagement rates across 8+ creators" tag="Engagement" delay={0.1} />
          <StatCard target={20} label="Reduction in creator onboarding time via standardized templates" tag="Operations" delay={0.2} />
          <StatCard target={10} label="Event budget managed across 8+ programs — always on target" tag="Budget" delay={0.3} />
          <StatCard target={6} label="SOPs & Salesforce workflow templates built to reduce task duplication" tag="Systems" delay={0.4} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 md:px-12 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-20 pb-8 border-b border-white/10"
        >
          <div>
            <div className="font-mono text-[10px] tracking-[4px] uppercase text-gold opacity-70 mb-4">Experience</div>
            <h2 className="font-bebas text-[clamp(48px,7vw,96px)] leading-none">Field<br />Notes</h2>
          </div>
        </motion.div>

        <ExperienceItem 
          date="Jan 2026<br>— Present"
          role="Strategist Intern"
          company="Edit Co. Media Boutique — Grand Rapids, MI"
          bullets={[
            "Built KPI dashboard tracking 12+ influencer-brand partnerships — improved reporting speed by ~30%",
            "Conducted market research across 20+ creator verticals → directly drove 3 new brand partnership decisions",
            "Designed creator onboarding templates that reduced onboarding time by ~20% — became team standard",
            "Authored performance reports that contributed to a 15% lift in avg engagement across 8+ creators"
          ]}
          tags={["KPI Dashboards", "Influencer Strategy", "Excel · YouTube Studio", "Creator Partnerships"]}
        />

        <ExperienceItem 
          date="Aug 2025<br>— Jan 2026"
          role="Brand Marketing Intern"
          company="Business Connect L3C — Grand Rapids, MI"
          bullets={[
            "Grew multi-platform social presence by 25% over 5 months via content calendars & data-driven campaigns",
            "Assisted in paid social campaigns through Meta Business Suite — targeting, scheduling & reporting",
            "Built 6+ SOPs & Salesforce workflow templates — cut project turnaround by ~15%",
            "Competitor landscape analysis across 10+ brands — shaped quarterly content & outreach strategy"
          ]}
          tags={["Meta Business Suite", "Sprout Social", "Salesforce", "Paid Social"]}
        />

        <ExperienceItem 
          date="Mar 2024<br>— Aug 2025"
          role="Resident Assistant"
          company="Indiana University — Bloomington, IN"
          bullets={[
            "Designed 5+ targeted marketing campaigns — 35% average increase in event attendance",
            "Produced branded visual content reaching 2,000+ students across 3 initiative verticals",
            "Managed $10K+ event budget across 8+ programs — consistently on target"
          ]}
          tags={["Campaign Marketing", "Budget Management", "Content Creation", "Canva"]}
        />
      </section>

      {/* Project Section */}
      <section id="project" className="px-6 md:px-12 py-32 bg-ink relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[30vw] text-transparent text-stroke-ink pointer-events-none whitespace-nowrap select-none">FIELD</div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-gold mb-6">Featured Project — Spring 2024</div>
            <h2 className="font-bebas text-[clamp(48px,6vw,80px)] leading-none tracking-[-1px] mb-8">Ethnographic<br />Field Study</h2>
            <p className="text-base leading-[1.8] opacity-55 mb-10">A 10-week research study analyzing human behavior at scale — applying mixed methods to uncover audience pain points and translate findings into actionable marketing strategy. The anthropology-to-marketing pipeline in action.</p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "475+", label: "Customer interactions analyzed" },
                { num: "150+", label: "Survey participants" },
                { num: "10", label: "Weeks of field research" },
                { num: "2K+", label: "Students reached with findings" }
              ].map((stat, i) => (
                <div key={i} className="border-t border-white/10 pt-4">
                  <span className="font-bebas text-4xl text-gold block leading-none">{stat.num}</span>
                  <p className="text-[11px] opacity-40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {[
              { num: "01", title: "Behavioral Observation", desc: "Direct field observation of 475+ customer interactions to map real-world audience behaviors and decision patterns." },
              { num: "02", title: "Survey Research", desc: "Structured surveys with 150+ participants to quantify audience pain points and content preferences at scale." },
              { num: "03", title: "Strategic Reporting", desc: "15-page report with Excel pivot table segmentation — translated into targeted messaging recommendations for 2,000+ students." }
            ].map((method, i) => (
              <div key={i} className="border border-white/10 p-6 relative overflow-hidden transition-colors hover:border-gold/30 group">
                <span className="font-bebas text-5xl text-gold opacity-20 absolute right-4 top-2 leading-none">{method.num}</span>
                <h4 className="font-serif text-xl mb-2">{method.title}</h4>
                <p className="text-xs opacity-40 leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 md:px-12 py-32 bg-cream text-black">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="font-mono text-[10px] tracking-[4px] uppercase text-sage opacity-70 mb-4">Competencies</div>
          <h2 className="font-bebas text-[clamp(48px,7vw,96px)] leading-none tracking-[-1px]">The<br />Toolkit</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-black/10">
          {[
            { icon: "📱", name: "Social Media & Content", tools: ["Content Calendars", "Multi-Platform Publishing", "Sprout Social", "TikTok Analytics", "Instagram Insights"] },
            { icon: "🤝", name: "Influencer & Creator", tools: ["Partnership Briefs", "KPI Dashboards", "Onboarding Templates", "YouTube Studio", "Creator Verticals"] },
            { icon: "📊", name: "Data & Reporting", tools: ["Excel / Google Sheets", "Pivot Tables", "Google Analytics", "Performance Reports"] },
            { icon: "💰", name: "Paid & Campaign", tools: ["Meta Business Suite", "Paid Social", "Campaign Targeting", "Post-Campaign Reporting"] },
            { icon: "🔬", name: "Research & Insights", tools: ["Ethnographic Methods", "Competitor Analysis", "Audience Segmentation", "Mixed Methods"] },
            { icon: "🎨", name: "Brand & Storytelling", tools: ["Brand Development", "Canva", "Cross-Cultural Comm.", "Salesforce"] }
          ].map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cream p-12 transition-colors hover:bg-black hover:text-white group relative overflow-hidden"
            >
              <span className="text-3xl mb-5 block">{skill.icon}</span>
              <h3 className="font-serif text-2xl mb-4">{skill.name}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool, j) => (
                  <span key={j} className="font-mono text-[10px] tracking-wider px-2.5 py-1 border border-black/20 opacity-60 transition-colors group-hover:border-white/20">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-12 py-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[800px] mx-auto text-center"
        >
          <div className="font-mono text-[11px] tracking-[4px] uppercase text-gold opacity-70 mb-8">Let's work together</div>
          <h2 className="font-bebas text-[clamp(60px,10vw,140px)] leading-[0.9] tracking-[-2px] mb-12">
            Let's Build<br /><em className="font-serif italic text-gold not-italic">Something</em><br />Human.
          </h2>
          <div className="flex justify-center gap-6 flex-wrap mb-16">
            <a 
              href="mailto:lmurayao@gmail.com" 
              className="font-mono text-[11px] tracking-[2px] uppercase px-7 py-3.5 border border-gold text-gold no-underline transition-all duration-300 relative overflow-hidden group hover:text-black"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10">lmurayao@gmail.com</span>
              <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a 
              href="https://www.linkedin.com/in/lex-murayao/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[2px] uppercase px-7 py-3.5 border border-white/20 text-white/50 no-underline transition-all duration-300 relative overflow-hidden group hover:text-white"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10">LinkedIn</span>
              <div className="absolute inset-0 bg-white/10 -translate-x-[101%] transition-transform duration-300 group-hover:translate-x-0" />
            </a>
          </div>
          <p className="font-mono text-xs tracking-[2px] opacity-40 uppercase">
            <a href="tel:2604584474" className="hover:opacity-80 transition-opacity">(260) 458-4474</a>
            &nbsp;·&nbsp;
            Fort Wayne, IN
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center border-t border-white/10 gap-4">
        <span className="font-mono text-[10px] tracking-[2px] uppercase opacity-20">© 2026 Lex Murayao</span>
        <span className="font-mono text-[10px] tracking-[2px] uppercase opacity-20 text-center md:text-right">Social Media Strategist & Brand Marketing Professional</span>
      </footer>
    </div>
  );
}
