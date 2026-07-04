import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Bot, Sparkles, Shield, Zap, Check, Star, Menu, X,
  ChevronRight, Brain, Globe, Cpu, FileText, Smartphone, GitBranch, Clock, ChevronDown, Users
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import confetti from "canvas-confetti";

// Import premium 3D assets
import robotHand from "../assets/robot_hand.png";
import brainHologram from "../assets/brain_hologram.png";
import aiCube from "../assets/ai_cube.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────
const LIME = "#B9FF29";
const DARK = "#09090D";
const CARD = "#111118";

// ─── Global CSS ────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes spin-rev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes pulse-glow { 0%,100% { opacity:.35; } 50% { opacity:.7; } }
    @keyframes float-up  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.15;} }

    .spin-slow  { animation: spin-slow 20s linear infinite; }
    .spin-rev   { animation: spin-rev 28s linear infinite; }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .float-1    { animation: float-up 5s ease-in-out infinite; }
    .float-2    { animation: float-up 6s ease-in-out 1.5s infinite; }
    .float-3    { animation: float-up 7s ease-in-out 3s infinite; }
    .blink      { animation: blink 1.8s ease-in-out infinite; }

    .dark-card {
      background: ${CARD};
      border: 1px solid rgba(255,255,255,0.06);
      transition: border-color .25s, box-shadow .25s, transform .25s;
    }
    .dark-card:hover {
      border-color: rgba(185,255,41,.25);
      box-shadow: 0 0 32px rgba(185,255,41,.07);
      transform: translateY(-3px);
    }
    .lime-btn {
      background: ${LIME};
      color: ${DARK};
      font-weight: 700;
      transition: opacity .2s, box-shadow .2s;
    }
    .lime-btn:hover { opacity:.9; box-shadow: 0 0 24px rgba(185,255,41,.35); }
    .lime-outline {
      border: 1.5px solid rgba(185,255,41,.5);
      color: ${LIME};
      transition: background .2s;
    }
    .lime-outline:hover { background: rgba(185,255,41,.08); }
    
    /* Custom Scrollbar for Terminal */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #0E0E15;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    html {
      scroll-behavior: smooth;
    }
  `}</style>
);

// ─── Hero 3D Robot Hand & Orbit Visual ──────────────────────────────────────────
const HeroVisual = () => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 480, height: 480 }}>
      {/* outer glow */}
      <div className="pulse-glow absolute inset-0 rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, rgba(185,255,41,.18) 0%, transparent 65%)`,
        filter: "blur(36px)",
      }} />

      {/* Orbit Rings */}
      <div className="spin-slow absolute inset-0 flex items-center justify-center" style={{ pointerEvents:"none" }}>
        <svg width="480" height="480" viewBox="0 0 480 480" style={{ position:"absolute", inset:0 }}>
          <ellipse cx="240" cy="240" rx="230" ry="60" fill="none" stroke="rgba(185,255,41,.22)" strokeWidth="1" />
        </svg>
      </div>
      <div className="spin-rev absolute inset-0 flex items-center justify-center" style={{ pointerEvents:"none" }}>
        <svg width="480" height="480" viewBox="0 0 480 480" style={{ position:"absolute", inset:0 }}>
          <ellipse cx="240" cy="240" rx="205" ry="45" fill="none" stroke="rgba(185,255,41,.15)" strokeWidth="1"
            transform="rotate(60 240 240)" />
        </svg>
      </div>

      {/* Hero 3D Robot Hand Image */}
      <motion.div 
        className="relative z-10 w-[380px] h-[250px] flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src={robotHand} 
          alt="AI Futuristic Robot Hand" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(185,255,41,0.35)]" 
        />
      </motion.div>

      {/* Floating stat card — top right */}
      <div className="float-1 absolute dark-card rounded-xl px-4 py-3 flex items-center gap-3 z-20"
        style={{ top: 40, right: 0, minWidth: 160 }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background:"rgba(185,255,41,.12)" }}>
          <Zap className="w-4 h-4" style={{ color: LIME }} />
        </div>
        <div>
          <div className="text-[11px] text-gray-400">Automation Rate</div>
          <div className="text-sm font-bold text-white">94.7%</div>
        </div>
      </div>

      {/* Floating stat card — bottom left */}
      <div className="float-2 absolute dark-card rounded-xl px-4 py-3 flex items-center gap-3 z-20"
        style={{ bottom: 80, left: 0, minWidth: 160 }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background:"rgba(185,255,41,.12)" }}>
          <Bot className="w-4 h-4" style={{ color: LIME }} />
        </div>
        <div>
          <div className="text-[11px] text-gray-400">Active Agents</div>
          <div className="text-sm font-bold text-white">247 Online</div>
        </div>
      </div>

      {/* Badge — top left */}
      <div className="float-3 absolute dark-card rounded-xl px-3 py-2 z-20"
        style={{ top: 90, left: 8 }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full blink" style={{ background: LIME }} />
          <span className="text-xs font-semibold text-white">PREMIUM TECH PARTNER</span>
        </div>
        <div className="flex gap-0.5 mt-1">
          {[1,2,3,4,5].map(i=><Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400"/>)}
        </div>
      </div>
    </div>
  );
};

// ─── Brain Hologram / AI-Powered visualization ──────────────────────────────────
const sparkData = [
  {v:40},{v:60},{v:45},{v:80},{v:65},{v:90},{v:72},{v:95},{v:80},{v:100}
];

const BrainHologramVisual = () => (
  <div className="relative flex items-center justify-center" style={{ width: 520, height: 480 }}>
    {/* outer pulse glow */}
    <div className="pulse-glow absolute inset-0 rounded-full pointer-events-none" style={{
      background: `radial-gradient(circle, rgba(185,255,41,.3) 0%, transparent 65%)`,
      filter: "blur(50px)",
    }} />

    {/* Subtle Scanner Rings */}
    {[220, 175, 130].map((r, i) => (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: r * 2,
          height: r * 2,
          border: `1px dashed rgba(185,255,41, ${0.12 - i * 0.03})`,
          animation: i % 2 === 0 ? "spin-slow 18s linear infinite" : "spin-rev 25s linear infinite"
        }}
      />
    ))}

    {/* Brain Hologram Image — full size, fully visible */}
    <motion.div
      className="relative z-10 flex items-center justify-center"
      style={{ width: 420, height: 420 }}
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={brainHologram}
        alt="AI Glowing Brain Hologram"
        className="w-full h-full object-contain"
        style={{ filter: "drop-shadow(0 0 55px rgba(185,255,41,0.55)) drop-shadow(0 0 25px rgba(185,255,41,0.3))" }}
      />
    </motion.div>

    {/* Overlay stat card: success rate */}
    <div className="float-1 absolute dark-card rounded-xl p-3 z-20" style={{ top: 20, right: -10, width: 170 }}>
      <div className="text-[10px] text-gray-400 mb-1">Weekly Build Success</div>
      <div className="text-lg font-black text-white">99.8%</div>
      <div className="h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="v" stroke={LIME} strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] mt-1 font-semibold" style={{ color: LIME }}>+2.4% SLA ↑</div>
    </div>

    {/* Overlay stat card: speedup */}
    <div className="float-2 absolute dark-card rounded-xl p-3 text-center z-20" style={{ bottom: 40, left: -10, width: 130 }}>
      <div className="text-[10px] text-gray-400 mb-1.5">Speedup Factor</div>
      <div className="text-3xl font-black" style={{ color: LIME }}>10x</div>
      <div className="text-[10px] text-gray-500 mt-1">AI-Powered Dev</div>
    </div>
  </div>
);

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#09090D]/90 backdrop-blur-xl border-b border-white/5" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,rgba(185,255,41,.8),rgba(100,200,0,.9))" }}>
            <Cpu className="w-4 h-4 text-black" />
          </div>
          <span className="font-black text-sm tracking-widest text-white uppercase">Nexora AI</span>
        </a>
        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "Services", href: "#services" },
            { label: "Solutions", href: "#solutions" },
            { label: "Process", href: "#process" },
            { label: "Tech Stack", href: "#tech" },
            { label: "Testimonials", href: "#testimonials" }
          ].map(l => (
            <a key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="lime-outline text-xs px-5 py-2.5 rounded-lg font-semibold transition-all">Get in Touch</a>
        </div>
        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle Navigation Menu">
          {open ? <X className="w-5 h-5 text-white"/>:<Menu className="w-5 h-5 text-white"/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 space-y-4" style={{ background:"#09090D" }}>
          {[
            { label: "Services", href: "#services" },
            { label: "Solutions", href: "#solutions" },
            { label: "Process", href: "#process" },
            { label: "Tech Stack", href: "#tech" },
            { label: "Testimonials", href: "#testimonials" }
          ].map(l => (
            <a key={l.label} href={l.href} onClick={()=>setOpen(false)} className="block text-sm text-gray-400">{l.label}</a>
          ))}
          <a href="#contact" onClick={()=>setOpen(false)} className="lime-btn block text-center py-2.5 rounded-lg text-sm mt-2 font-bold">Get in Touch</a>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen pt-16 flex items-center overflow-hidden" style={{ background: DARK }}>
    {/* Subtle grid */}
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:"linear-gradient(rgba(185,255,41,.025) 1px, transparent 1px),linear-gradient(90deg,rgba(185,255,41,.025) 1px,transparent 1px)",
      backgroundSize:"60px 60px"
    }} />
    {/* Bottom glow */}
    <div className="pulse-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 pointer-events-none" style={{
      background:"radial-gradient(ellipse, rgba(185,255,41,.1) 0%, transparent 70%)",
      filter:"blur(40px)"
    }} />

    <div className="max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
      {/* Left */}
      <motion.div className="flex-1 max-w-xl"
        initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold tracking-wide"
          style={{ borderColor:"rgba(185,255,41,.3)", color:LIME, background:"rgba(185,255,41,.05)" }}>
          <div className="w-1.5 h-1.5 rounded-full blink" style={{ background:LIME }} />
          Engineering Excellence &amp; AI Innovation
        </div>

        <h1 className="text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight text-white mb-6">
          We build software &amp; <span style={{ color:LIME }}>AI solutions</span> that deliver results
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
          Elite custom software engineering, mobile apps, web applications, and tailor-made artificial intelligence. Engineered for massive scale, compliance, and speed.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#contact" className="lime-btn flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-lime-400/20">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="lime-outline flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold">
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { val:"15+", label:"Years Excellence" },
            { val:"850+", label:"Projects Done" },
            { val:"330+", label:"Active Clients" },
            { val:"99.9%", label:"Uptime SLA" },
          ].map(s=>(
            <div key={s.label} className="border-l border-white/10 pl-4">
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right */}
      <motion.div className="flex-1 flex items-center justify-center"
        initial={{ opacity:0, scale:.92 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.8, delay:.15 }}>
        <HeroVisual />
      </motion.div>
    </div>
  </section>
);

// ─── Services Section with AI Cube Graphic ─────────────────────────────────────
const servicesList = [
  { icon: Cpu, label:"Custom Software", desc:"Full-cycle bespoke implementation from MVPs to complex enterprise systems tailored to your workflows.", tags:["SaaS", "Enterprise", "MVP"] },
  { icon: Smartphone, label:"Mobile Apps", desc:"High-performance native and cross-platform mobile apps for iOS and Android with premium UI/UX.", tags:["iOS", "Android", "Flutter"] },
  { icon: Globe, label:"Web Applications", desc:"Robust, responsive, and secure web applications built using cutting-edge modern frameworks.", tags:["React", "Next.js", "Node.js"] },
  { icon: Bot, label:"Custom AI Solutions", desc:"Transform data into intelligence. Advanced generative AI, custom RAG systems, and autonomous agent pipelines.", tags:["LLMs", "RAG", "AI Agents"] },
  { icon: Brain, label:"Machine Learning", desc:"Predictive modeling, computer vision, data analytics, and deep learning algorithms built for business scale.", tags:["PyTorch", "TensorFlow", "MLOps"] },
  { icon: GitBranch, label:"Digital Transformation", desc:"Legacy system modernization, cloud architecture migrations, and automated CI/CD DevOps workflows.", tags:["Cloud", "DevOps", "CI/CD"] },
];

const Services = () => (
  <section id="services" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-16"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-3">// What We Build</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Services Catalog &amp; 3D Core Architecture
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
          Nexora AI designs and implements high-performance custom platforms and automated workflows. We transform complexity into core assets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: AI Services Cube Image */}
        <motion.div 
          className="lg:col-span-5 sticky top-24"
          initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}
        >
          <div className="rounded-3xl overflow-hidden border-2 border-gray-150 shadow-2xl bg-white p-4 relative group">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-400/5 to-transparent pointer-events-none" />
            <img 
              src={aiCube} 
              alt="Nexora AI Core Services 3D Cube" 
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500" 
            />
            <div className="p-5 text-center">
              <div className="text-xs font-black uppercase tracking-widest text-lime-600 mb-1">Nexora AI core engine</div>
              <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                Visualizing our unified stack: AI Agents, Generative workflows, Web/Mobile systems, DevOps networks, and Digital marketing solutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Detailed Services Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {servicesList.map((s,i)=>(
            <motion.div key={s.label}
              className="rounded-2xl p-5 border border-gray-100 bg-white hover:border-lime-300 hover:shadow-xl transition-all cursor-default group flex flex-col justify-between"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:.45, delay:i*.05 }}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-lime-50 flex items-center justify-center mb-4 group-hover:bg-lime-400 group-hover:text-black transition-all text-lime-600">
                  <s.icon className="w-4 h-4 transition-colors" />
                </div>
                <h3 className="font-extrabold text-gray-900 text-base mb-1.5">{s.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{s.desc}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {s.tags.map(t=>(
                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{t}</span>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
                  Inquire Project <ChevronRight className="w-3 h-3"/>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── AI-Powered Capabilities (dark) ────────────────────────────────────────────
const capabilitiesList = [
  "Bespoke Software Engineering & Architectures",
  "High-Performance Cloud Infrastructures (AWS, GCP)",
  "Custom LLM Integrations & Fine-Tuning Pipelines",
  "Advanced Data Mining & ML Model Orchestration",
  "Strict Enterprise-Grade Compliance (SOC 2, HIPAA)",
  "Agile Product Iterations with Continuous Deployment",
];

const AIPowered = () => (
  <section className="py-24 overflow-hidden" style={{ background: DARK }}>
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      <motion.div className="flex-1 max-w-lg"
        initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:LIME }}>// Core Capabilities</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Architected for Speed. <span style={{ color:LIME }}>Built for Scale.</span>
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 text-sm">
          We combine cutting-edge software engineering with robust artificial intelligence workflows. Our systems adapt, learn, and deliver business intelligence over years, not months.
        </p>
        <div className="space-y-3.5 mb-8">
          {capabilitiesList.map(f=>(
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:"rgba(185,255,41,.15)" }}>
                <Check className="w-3 h-3" style={{ color:LIME }} />
              </div>
              <span className="text-gray-300 text-sm font-medium">{f}</span>
            </div>
          ))}
        </div>
        <a href="#contact" className="lime-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm max-w-xs">
          Request Technical Briefing <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.div className="flex-1 flex justify-center"
        initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7, delay:.15 }}>
        <BrainHologramVisual />
      </motion.div>
    </div>
  </section>
);

// ─── Solutions Section ─────────────────────────────────────────────────────────
const industrySolutions = [
  { icon: Star, title: "Healthcare & Medtech", desc: "HIPAA-compliant platforms, EHR integrations, patient portals, and automated clinic scheduling software.", tags: ["EHR Portal", "HIPAA", "Telehealth"] },
  { icon: Shield, title: "Fintech & Banking", desc: "Secure payment gateways, credit scoring models, AML compliance, and transactional dashboards.", tags: ["PCI-DSS", "KYC/AML", "Payments"] },
  { icon: Sparkles, title: "E-Commerce & Retail", desc: "Custom online storefronts, headless commerce integrations, inventory management, and recommendation engines.", tags: ["Shopify", "POS Sync", "Headless"] },
  { icon: Globe, title: "EdTech & Learning", desc: "Interactive Learning Management Systems (LMS), student analytics, custom curriculum paths, and video portals.", tags: ["LMS", "Gamification", "Streaming"] },
  { icon: Cpu, title: "Enterprise & SaaS", desc: "Multi-tenant cloud architecture, workflow automations, CRM systems, and unified KPI dashboard setups.", tags: ["Multi-Tenant", "API Gateway", "SaaS"] },
  { icon: Sparkles, title: "AI & Automation", desc: "Intelligent cognitive processing, NLP document classification, conversational support, and semantic analytics.", tags: ["RAG Systems", "AI Agents", "Automations"] },
];

const SolutionsSection = () => (
  <section id="solutions" className="py-24 bg-white text-gray-900 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-14"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-3">// Tailored Verticals</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Solutions for Every Industry
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
          We leverage domain expertise to develop industry-specific software solving real-world complex business challenges.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industrySolutions.map((sol,i)=>(
          <motion.div key={sol.title}
            className="rounded-2xl p-6 bg-gray-50 border border-gray-100 hover:border-lime-400 hover:bg-white hover:shadow-xl transition-all cursor-default flex flex-col justify-between"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:.45, delay:i*.05 }}>
            <div>
              <div className="w-10 h-10 rounded-lg bg-gray-200/50 flex items-center justify-center mb-5 text-gray-700">
                <sol.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base mb-2">{sol.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{sol.desc}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sol.tags.map(t=>(
                <span key={t} className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-gray-200/50 text-gray-600">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Interactive AI Terminal CLI Showcase ─────────────────────────────────────
const TerminalShowcase = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { type: 'input', text: 'nexora analyze --project "healthcare-portal"' },
    { type: 'output', text: '🔍 Parsing project files & repository graph...' },
    { type: 'output', text: '⚙️ Scanning code for AI agent optimization... Found 4 modules.' },
    { type: 'output', text: '💾 Generating local vector database embeddings... Done.' },
    { type: 'output', text: '✅ Analysis complete. System ready for deployment.' },
    { type: 'input', text: 'nexora deploy --target "production-edge"' },
    { type: 'output', text: '📦 Bundling React components & Node.js functions...' },
    { type: 'output', text: '🔒 Checking compliance (HIPAA & SOC 2 audit)... Passed.' },
    { type: 'output', text: '🚀 Deploying cloud infrastructure to AWS Edge (12 regions)...' },
    { type: 'progress', text: 'Deploying: [================================] 100%' },
    { type: 'success', text: '🎉 Deployed successfully to https://portal.nexora.ai' },
    { type: 'success', text: '📊 Metrics: Response: 18ms | SLA: 99.99% | AI Accuracy: 98%' },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      if (step.type === 'input') {
        let charIndex = 0;
        let typedText = '';
        const typingInterval = setInterval(() => {
          typedText += step.text[charIndex];
          setLines(prev => {
            const copy = [...prev];
            if (charIndex === 0) {
              copy.push(`→ ${typedText}`);
            } else {
              copy[copy.length - 1] = `→ ${typedText}`;
            }
            return copy;
          });
          charIndex++;
          if (charIndex >= step.text.length) {
            clearInterval(typingInterval);
            setCurrentStep(prev => prev + 1);
          }
        }, 25);
        return () => clearInterval(typingInterval);
      } else {
        timer = setTimeout(() => {
          setLines(prev => [...prev, step.text]);
          setCurrentStep(prev => prev + 1);
        }, step.type === 'progress' ? 1200 : 700);
      }
    } else {
      timer = setTimeout(() => {
        setLines([]);
        setCurrentStep(0);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="dark-card rounded-2xl overflow-hidden max-w-2xl mx-auto border border-white/10 shadow-2xl font-mono text-xs leading-relaxed text-gray-300">
      {/* terminal top bar */}
      <div className="bg-[#161622] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">nexora-cli v1.4.2</span>
        <div className="w-10" />
      </div>
      {/* terminal output screen */}
      <div className="p-5 min-h-[300px] bg-[#0E0E15] text-left space-y-2 h-[340px] overflow-y-auto custom-scrollbar">
        {lines.map((line, i) => {
          let style = {};
          if (line.startsWith('→')) {
            style = { color: LIME, fontWeight: 'bold' };
          } else if (line.startsWith('✅') || line.startsWith('🎉')) {
            style = { color: '#4ADE80' };
          } else if (line.startsWith('📊')) {
            style = { color: '#38BDF8' };
          } else if (line.startsWith('⚙️') || line.startsWith('🔍')) {
            style = { color: '#E2E8F0' };
          }
          return (
            <div key={i} style={style}>
              {line}
            </div>
          );
        })}
        {currentStep < steps.length && (
          <span className="inline-block w-1.5 h-4 bg-white animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
};

const TerminalSection = () => (
  <section className="py-24" style={{ background: DARK }}>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:LIME }}>// Cloud Orchestration</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Deploy Complex Networks with CLI Ease
        </h2>
        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
          We leverage automated build scripting pipelines to deploy modern modular software architectures at lightspeed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-white font-bold text-sm mb-1">1.2B+ Analyzed</h4>
            <p className="text-gray-500 text-xs">Event signals parsed by model graph pipelines daily.</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-white font-bold text-sm mb-1">&lt;100ms Latency</h4>
            <p className="text-gray-500 text-xs">Lightning fast global routing infrastructure latency.</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:.7 }}>
        <TerminalShowcase />
      </motion.div>
    </div>
  </section>
);

// ─── Engagement Models ─────────────────────────────────────────────────────────
const engagementModels = [
  { icon: Users, title: "Dedicated Development Team", desc: "Top engineering talent committed exclusively to your project. Ideal for long-term roadmaps, agile team expansion, and continuous iterations.", perk: "Flexible monthly contracts" },
  { icon: FileText, title: "Fixed-Price Milestones", desc: "Clearly defined roadmap, budgets, timelines, and milestones. Ideal for MVPs, proof of concepts, and structured phase deployments.", perk: "Defined scope and timeline" },
  { icon: Clock, title: "Time & Materials (Hourly)", desc: "Pay-as-you-go flexible engagement. Ideal for early stage exploration, specialized consulting, system refactoring, and post-launch maintenance.", perk: "Maximum agile flexibility" },
];

const Engagement = () => (
  <section className="py-24 bg-white text-gray-900 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-14"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-3">// Engagement Models</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Flexible Ways to Collaborate
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
          We tailor our engineering engagements to align with your project structure, budgeting cycle, and speed to market.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {engagementModels.map((model, i) => (
          <motion.div key={model.title}
            className="rounded-2xl p-7 bg-gray-50 border border-gray-100 flex flex-col justify-between hover:border-lime-500 hover:shadow-lg transition-all"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5, delay:i*.07 }}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-lime-50 text-lime-600 flex items-center justify-center mb-6">
                <model.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg mb-3 leading-tight">{model.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{model.desc}</p>
            </div>
            <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs">
              <span className="text-gray-400">Primary Advantage:</span>
              <span className="font-bold text-gray-900">{model.perk}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Process Timeline ──────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", name: "Discovery", desc: "Deep-dive into business targets, technical requirements, and detailed system scope mapping." },
  { step: "02", name: "Strategy & Arch", desc: "Planning software system architectures, selecting database setups, and milestone roadmap plotting." },
  { step: "03", name: "Agile Sprints", desc: "Robust development with structured 2-week agile sprints, QA validations, and bi-weekly build demos." },
  { step: "04", name: "Launch & Scale", desc: "Production release orchestration, custom logging setup, performance optimizations, and SLA support." },
];

const ProcessTimeline = () => (
  <section id="process" className="py-24 text-white" style={{ background: "#0C0C12" }}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-16"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-lime-400 mb-3">// How We Deliver</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          From Concept to Production Launch
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
          A proven, highly structured software development lifecycle engineered over years of successful releases.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {processSteps.map((p, i) => (
          <motion.div key={p.step}
            className="p-6 dark-card rounded-2xl relative"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5, delay:i*.07 }}>
            <div className="text-4xl font-black mb-4 select-none" style={{ color: LIME }}>{p.step}</div>
            <h3 className="font-extrabold text-white text-base mb-2">{p.name}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Filterable Technology Stack with Brands & Hover Glows ───────────────────────
const techStack = [
  // Frontend
  { name: 'React', category: 'frontend', icon: 'fa-brands fa-react', color: '#61DAFB' },
  { name: 'Next.js', category: 'frontend', icon: 'fa-solid fa-globe', color: '#FFFFFF' },
  { name: 'Vue.js', category: 'frontend', icon: 'fa-brands fa-vuejs', color: '#4FC08D' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'fa-solid fa-wind', color: '#06B6D4' },
  { name: 'TypeScript', category: 'frontend', icon: 'fa-solid fa-code', color: '#3178C6' },
  { name: 'HTML5/CSS3', category: 'frontend', icon: 'fa-brands fa-html5', color: '#E34F26' },
  // Backend
  { name: 'Node.js', category: 'backend', icon: 'fa-brands fa-node-js', color: '#339933' },
  { name: 'Python', category: 'backend', icon: 'fa-brands fa-python', color: '#3776AB' },
  { name: 'Laravel', category: 'backend', icon: 'fa-brands fa-laravel', color: '#FF2D20' },
  { name: 'Express', category: 'backend', icon: 'fa-solid fa-server', color: '#A0A0A0' },
  { name: 'PostgreSQL', category: 'backend', icon: 'fa-solid fa-database', color: '#4169E1' },
  { name: 'MongoDB', category: 'backend', icon: 'fa-solid fa-leaf', color: '#47A248' },
  // AI/ML
  { name: 'PyTorch', category: 'aiml', icon: 'fa-solid fa-brain', color: '#EE4C2C' },
  { name: 'TensorFlow', category: 'aiml', icon: 'fa-solid fa-microchip', color: '#FF6F00' },
  { name: 'OpenAI / GPT', category: 'aiml', icon: 'fa-solid fa-robot', color: '#10A37F' },
  { name: 'LLaMA Models', category: 'aiml', icon: 'fa-solid fa-network-wired', color: '#B9FF29' },
  { name: 'LangChain', category: 'aiml', icon: 'fa-solid fa-link', color: '#38BDF8' },
  { name: 'Hugging Face', category: 'aiml', icon: 'fa-solid fa-face-smile', color: '#FFD21E' },
  // DevOps/Cloud
  { name: 'AWS Cloud', category: 'devops', icon: 'fa-brands fa-aws', color: '#FF9900' },
  { name: 'Azure Cloud', category: 'fa-solid fa-cloud', icon: 'fa-solid fa-cloud', color: '#0089D6' },
  { name: 'Docker', category: 'devops', icon: 'fa-brands fa-docker', color: '#2496ED' },
  { name: 'Kubernetes', category: 'devops', icon: 'fa-solid fa-dharmachakra', color: '#326CE5' },
  { name: 'Terraform', category: 'devops', icon: 'fa-solid fa-cubes', color: '#7B42BC' },
  { name: 'CI/CD Pipelines', category: 'devops', icon: 'fa-solid fa-infinity', color: '#4ADE80' },
];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend & DB' },
    { id: 'aiml', name: 'AI & Data Science' },
    { id: 'devops', name: 'Cloud & DevOps' }
  ];

  const filteredTech = activeCategory === 'all' 
    ? techStack 
    : techStack.filter(t => t.category === activeCategory);

  return (
    <section id="tech" className="py-24 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-3">// Technologies We Use</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Advanced Technology Stack
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
            We use cutting-edge frameworks, libraries, cloud networks, and deep learning platforms to construct robust solutions.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c.id 
                  ? "bg-gray-950 text-white shadow-md" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Tech Grid with Glowing Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[160px]">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => {
              const isHovered = hoveredTech === tech.name;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="p-5 rounded-2xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-lime-400 hover:shadow-lg transition-all text-center flex flex-col justify-center items-center cursor-default group"
                  style={{
                    boxShadow: isHovered ? `0 10px 25px -5px ${tech.color}15, 0 8px 10px -6px ${tech.color}15` : ''
                  }}
                >
                  {/* Glowing Tech Icon Container */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? `${tech.color}15` : '#FFFFFF',
                      border: `1px solid ${isHovered ? tech.color : 'rgba(0,0,0,0.06)'}`,
                      color: isHovered ? tech.color : '#4A5568',
                      boxShadow: isHovered ? `0 0 15px ${tech.color}30` : ''
                    }}
                  >
                    <i className={`${tech.icon} text-lg`} />
                  </div>
                  <div className="font-extrabold text-xs text-gray-900 group-hover:text-lime-600 transition-colors">{tech.name}</div>
                  <div className="text-[9px] uppercase tracking-wider text-gray-400 mt-1 font-semibold">{tech.category}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ─── Products / Projects (dark) ────────────────────────────────────────────────
const projectsList = [
  {
    tag:"HealthTech",
    title:"MediFlow Patient Portal",
    desc:"HIPAA-compliant custom medical record portals, telemedicine video routing, and EHR synchronization pipelines.",
    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=320&fit=crop&auto=format",
    glow:"rgba(185,255,41,.12)",
  },
  {
    tag:"Fintech",
    title:"PaySphere Transaction System",
    desc:"Secure PCI-DSS compliant credit lending dashboards, multi-currency processing networks, and automated risk reporting.",
    img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=320&fit=crop&auto=format",
    glow:"rgba(0,210,255,.1)",
  },
  {
    tag:"E-Commerce",
    title:"CartX Headless Marketplace",
    desc:"Ultra-fast storefronts using Next.js headless checkout hooks, complex ERP inventory synchronizers, and analytics.",
    img:"https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&h=320&fit=crop&auto=format",
    glow:"rgba(74,222,128,.1)",
  },
  {
    tag:"EdTech",
    title:"EduLearn Global LMS",
    desc:"Scalable video hosting and streaming networks, gamified course pipelines, and student assessment algorithms.",
    img:"https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=320&fit=crop&auto=format",
    glow:"rgba(251,146,60,.08)",
  },
];

const Projects = () => (
  <section className="py-24" style={{ background:"#0C0C12" }}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:LIME }}>// Case Studies</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Featured Projects &amp; Work
          </h2>
        </div>
        <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white mt-4 md:mt-0 transition-colors">
          Start Your Case Study <ChevronRight className="w-4 h-4"/>
        </a>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectsList.map((p,i)=>(
          <motion.div key={p.title} className="dark-card rounded-2xl overflow-hidden cursor-default flex flex-col justify-between"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:.5, delay:i*.08 }}>
            {/* Image */}
            <div>
              <div className="relative h-40 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background:`linear-gradient(to bottom, transparent 40%, ${CARD})` }} />
                <div className="absolute inset-0" style={{ background:p.glow }} />
                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background:"rgba(185,255,41,.15)", color:LIME }}>{p.tag}</span>
              </div>
              {/* Text */}
              <div className="p-5">
                <h3 className="font-extrabold text-white text-base mb-2 leading-snug">{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color:LIME }}>
                View Project Details <ChevronRight className="w-3.5 h-3.5"/>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials (light) ──────────────────────────────────────────────────────
const testimonials = [
  {
    quote:"Nexora AI engineered our HIPAA medical records pipeline. Their compliance checks, data encryption, and overall speed are unmatched.",
    name:"Sarah Chen", role:"CTO, HealthFlow Systems",
    avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:"We contracted their dedicated team for a multi-tenant SaaS integration. They deliver production-ready code bi-weekly with zero friction.",
    name:"Marcus Johnson", role:"VP of Engineering, CoreSaaS",
    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:"Their custom RAG AI modeling shaved minutes off our operational data review. The resulting automation has changed our bottom line.",
    name:"Priya Patel", role:"Product Director, ShopScale",
    avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-white text-gray-900 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div className="text-center mb-14"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-3">// Client Voices</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">What Our Partners Say</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((t,i)=>(
          <motion.div key={t.name}
            className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-lime-400 hover:shadow-xl transition-all cursor-default flex flex-col justify-between"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:.5, delay:i*.1 }}>
            <div>
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map(i=><Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 border-none"/>)}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-6 font-medium">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-200/60 pt-4 mt-2">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <div className="font-extrabold text-gray-900 text-sm">{t.name}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Contact Form Component ────────────────────────────────────────────────────
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Custom Software Development',
    budget: '$10k - $30k',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#B9FF29', '#ffffff', '#22D3EE']
      });
    }, 1200);
  };

  if (success) {
    return (
      <motion.div 
        className="dark-card rounded-2xl p-8 border border-white/10 text-center max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" style={{ color: LIME }} />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">Inquiry Received!</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-6">
          Thank you for reaching out to Nexora AI. Our engineering team is reviewing your project requirements and will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => {
            setSuccess(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              projectType: 'Custom Software Development',
              budget: '$10k - $30k',
              message: ''
            });
          }}
          className="lime-btn px-6 py-3 rounded-xl text-xs font-bold"
        >
          Send Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dark-card rounded-2xl p-8 border border-white/10 space-y-5 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Your Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
            className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Work Email *</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@company.com"
            className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Company / Organization</label>
          <input 
            type="text" 
            value={formData.company}
            onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Acme Corp"
            className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Project Type</label>
          <div className="relative">
            <select 
              value={formData.projectType}
              onChange={e => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
              className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors appearance-none pr-10 cursor-pointer"
            >
              <option value="Custom Software Development">Custom Software Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Web Application Development">Web Application Development</option>
              <option value="Custom AI & Generative AI">AI &amp; Generative AI Solutions</option>
              <option value="Machine Learning & Data Science">Machine Learning &amp; Data Science</option>
              <option value="Digital Transformation & Cloud">Digital Transformation &amp; Cloud</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Estimated Budget</label>
        <div className="relative">
          <select 
            value={formData.budget}
            onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors appearance-none pr-10 cursor-pointer"
          >
            <option value="&lt; $10k">&lt; $10,000</option>
            <option value="$10k - $30k">$10,000 - $30,000</option>
            <option value="$30k - $100k">$30,000 - $100,000</option>
            <option value="$100k+">$100,000+</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Project Details</label>
        <textarea 
          rows={4}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Describe your project, desired timeline, and core goals..."
          className="w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#B9FF29]/50 transition-colors resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full lime-btn flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Submitting Inquiry...' : 'Submit Project Inquiry'} 
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
};

// ─── CTA & Contact Section ─────────────────────────────────────────────────────
const ContactSection = () => (
  <section id="contact" className="py-28 relative overflow-hidden" style={{ background: DARK }}>
    <div className="pulse-glow absolute inset-0 flex items-center justify-center pointer-events-none">
      <div style={{
        width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(185,255,41,.1) 0%, transparent 65%)",
        filter:"blur(40px)"
      }} />
    </div>
    {/* grid */}
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:"linear-gradient(rgba(185,255,41,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(185,255,41,.02) 1px,transparent 1px)",
      backgroundSize:"60px 60px"
    }} />

    <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 text-left">
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Have an idea? Let's turn it into <span style={{ color:LIME }}>software.</span>
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
          Partner with Nexora AI for your next software build. Start with a free discovery call — no commitment required.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" style={{ color: LIME }} />
            <span className="text-gray-300 text-xs font-medium">Free 30-minute discovery call</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" style={{ color: LIME }} />
            <span className="text-gray-300 text-xs font-medium">Detailed architecture &amp; pricing plan</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" style={{ color: LIME }} />
            <span className="text-gray-300 text-xs font-medium">Top 3% engineering talent pool</span>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background:"#07070B" }} className="border-t border-white/5 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-10">
      <div className="col-span-2">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,rgba(185,255,41,.8),rgba(100,200,0,.9))" }}>
            <Cpu className="w-4 h-4 text-black"/>
          </div>
          <span className="font-black text-sm tracking-widest text-white uppercase">Nexora AI</span>
        </div>
        <p className="text-sm leading-relaxed max-w-xs mb-5">Enterprise custom software and AI infrastructure for companies building what comes next.</p>
        <div className="flex gap-2">
          {["X","LinkedIn","GitHub","YouTube"].map(s=>(
            <button key={s} className="text-xs font-semibold text-gray-500 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">{s}</button>
          ))}
        </div>
      </div>
      {[
        { title:"Services", links:["Custom Software","Mobile Apps","Web Applications","Custom AI Solutions","Machine Learning","Digital Transformation"] },
        { title:"Company", links:["About","Careers","Blog","Press","Partners","Contact"] },
        { title:"Engagement", links:["Dedicated Team","Fixed Price","Hourly T&M","SOC 2 Audit","SLA Uptime","Terms of Service"] },
      ].map(col=>(
        <div key={col.title}>
          <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">{col.title}</div>
          <ul className="space-y-2.5">
            {col.links.map(l=>(
              <li key={l}><a href="#contact" className="text-sm hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
      <span>© 2026 Nexora AI, Inc. All rights reserved.</span>
      <div className="flex gap-5">
        {["Privacy Policy","Terms &amp; Conditions","Cookies","Accessibility"].map(l=>(
          <a key={l} href="#" className="hover:text-gray-400 transition-colors">{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground select-none">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Services />
      <AIPowered />
      <SolutionsSection />
      <TerminalSection />
      <Engagement />
      <ProcessTimeline />
      <TechStack />
      <Projects />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
