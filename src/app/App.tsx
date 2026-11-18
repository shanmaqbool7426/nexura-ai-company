import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Bot, Shield, Check, Star, Menu, X, ChevronRight, ChevronDown, Globe,
  Search, MapPin, MessageSquare, Phone, Calendar, Scale, Briefcase, Home, Building2, Users, TrendingUp, Clock, Zap, Stethoscope, Hammer, ShoppingBag, Wrench, Smartphone, BarChart3, Navigation, Award,
  ShoppingCart, Target, Eye, DollarSign, MousePointerClick, Filter, Sparkles, Utensils, Megaphone, Rocket, Layers,
} from "lucide-react";
import confetti from "canvas-confetti";

// Photography (Unsplash licence, stored locally for speed)
import ladyJusticeImg from "../assets/legal/lady-justice-2.jpg";
import clientWinImg from "../assets/legal/client-win.jpg";
import lawyerSuitImg from "../assets/legal/lawyer-suit.jpg";
import consultationImg from "../assets/legal/consultation.jpg";
import signingImg from "../assets/legal/signing.jpg";
import tradespersonImg from "../assets/industries/tradesperson.jpg";
import clinicImg from "../assets/industries/clinic.jpg";
import constructionTeamImg from "../assets/industries/construction-team.jpg";
// Real homepage screenshots of client websites
import bridgeLegalSiteImg from "../assets/clients/bridge-legal-site.jpg";
import arzConstructionSiteImg from "../assets/clients/arz-construction-site.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────
const LIME = "#B9FF29";
const DARK = "#09090D";
const CARD = "#111118";
const BRAND = "Nexora AI";
const WHATSAPP_NUMBER = "923069829158";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE = "(416) 876-4305";
const PHONE_HREF = "tel:+14168764305";
const ADDRESS = "2428 Islington Ave., Suite 207, Etobicoke, ON M9W 3X8";

// Stripe configuration is loaded from .env (variables must be prefixed with VITE_).
const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || "#contact";
const STRIPE_PORTAL_LINK = import.meta.env.VITE_STRIPE_PORTAL_LINK;

// WhatsApp brand icon (inline SVG)
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Global CSS ────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

    @keyframes pulse-glow { 0%,100% { opacity:.35; } 50% { opacity:.7; } }
    @keyframes float-up  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.15;} }

    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .float-1    { animation: float-up 5s ease-in-out infinite; }
    .float-2    { animation: float-up 6s ease-in-out 1.5s infinite; }
    .blink      { animation: blink 1.8s ease-in-out infinite; }

    .dark-card {
      background: ${CARD};
      border: 1px solid rgba(255,255,255,0.06);
      transition: border-color .25s, box-shadow .25s, transform .25s;
    }
    .dark-card:hover {
      border-color: rgba(185,255,41,.25);
      box-shadow: 0 0 32px rgba(185,255,41,.07);
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

    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee { animation: marquee 40s linear infinite; }
    .grad-text {
      background: linear-gradient(90deg, ${LIME} 0%, #E9FFB0 50%, ${LIME} 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .glass {
      background: rgba(17,17,24,.72);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,.08);
    }
    .photo-frame { box-shadow: 0 30px 80px -20px rgba(0,0,0,.45); }

    html { scroll-behavior: smooth; }
    @media (prefers-reduced-motion: reduce) {
      .pulse-glow, .float-1, .float-2, .blink, .marquee { animation: none; }
      html { scroll-behavior: auto; }
    }
  `}</style>
);

// Reusable section heading
const SectionHeading = ({
  eyebrow, title, intro, dark = false, center = true,
}: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; dark?: boolean; center?: boolean }) => (
  <motion.div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14`}
    initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${dark ? "" : "text-lime-700"}`} style={dark ? { color: LIME } : undefined}>
      {eyebrow}
    </p>
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
      {title}
    </h2>
    {intro && <p className={`leading-relaxed text-base ${dark ? "text-gray-400" : "text-gray-600"}`}>{intro}</p>}
  </motion.div>
);

// ─── Checkout Status Banner ─────────────────────────────────────────────────────
type CheckoutStatus = "success" | "cancel" | null;

const useCheckoutStatus = (): CheckoutStatus => {
  const [status, setStatus] = useState<CheckoutStatus>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripeStatus = params.get("stripe_status");
    if (stripeStatus === "success" || stripeStatus === "cancel") {
      setStatus(stripeStatus);
      // Clean the query parameter so the banner does not reappear on refresh.
      const url = new URL(window.location.href);
      url.searchParams.delete("stripe_status");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return status;
};

const CheckoutStatusBanner = () => {
  const status = useCheckoutStatus();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status) setVisible(true);
  }, [status]);

  if (!status || !visible) return null;

  const isSuccess = status === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl border flex items-center gap-3 max-w-md w-[calc(100%-2rem)] ${
        isSuccess
          ? "bg-[#111118] border-[#B9FF29]/40 text-white"
          : "bg-[#111118] border-white/10 text-white"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isSuccess ? "bg-[#B9FF29]/15" : "bg-white/10"
        }`}
      >
        {isSuccess ? (
          <Check className="w-4 h-4" style={{ color: LIME }} />
        ) : (
          <span className="text-sm">✕</span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">
          {isSuccess ? `Welcome to ${BRAND} Growth!` : "Checkout cancelled"}
        </p>
        <p className="text-xs text-gray-400">
          {isSuccess
            ? "Your subscription is active. Check your email for the receipt."
            : "No worries — you can subscribe anytime from the Pricing section."}
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="text-gray-500 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// ─── Hero quick-enquiry form ──────────────────────────────────────────────────
const HeroForm = () => {
  const [d, setD] = useState({ name: "", contact: "", website: "", service: "Full growth package" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setD(prev => ({ ...prev, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!d.name || !d.contact) return;
    const text = [
      "New project enquiry from the website",
      `Name: ${d.name}`,
      `Email / phone: ${d.contact}`,
      d.website && `Website: ${d.website}`,
      `Interested in: ${d.service}`,
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };
  return (
    <div className="relative w-full max-w-[460px]">
      <div className="pulse-glow absolute -inset-8 rounded-full pointer-events-none" style={{
        background:"radial-gradient(circle, rgba(185,255,41,.16) 0%, transparent 65%)", filter:"blur(36px)",
      }} />
      <div className="relative glass rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4" style={{ color: LIME }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: LIME }}>Free growth audit</span>
        </div>
        <h2 className="text-2xl font-black text-white leading-tight mb-2">Tell us about your project</h2>
        <p className="text-gray-400 text-sm mb-6">We'll review your website, Google rankings and lead flow, then reply within one business day.</p>
        {sent ? (
          <div className="rounded-2xl p-6 text-center" style={{ background:"rgba(185,255,41,.08)", border:"1px solid rgba(185,255,41,.3)" }}>
            <Check className="w-8 h-8 mx-auto mb-3" style={{ color: LIME }} />
            <div className="text-white font-bold mb-1">Almost done</div>
            <p className="text-gray-400 text-sm">Press send in the WhatsApp window that just opened and your enquiry reaches our team.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5">
            <div>
              <label htmlFor="h-name" className={labelCls}>Your name *</label>
              <input id="h-name" required autoComplete="name" value={d.name} onChange={set("name")} placeholder="Jane Smith" className={inputCls} />
            </div>
            <div>
              <label htmlFor="h-contact" className={labelCls}>Email or phone *</label>
              <input id="h-contact" required value={d.contact} onChange={set("contact")} placeholder="jane@yourbusiness.com" className={inputCls} />
            </div>
            <div>
              <label htmlFor="h-web" className={labelCls}>Website</label>
              <input id="h-web" inputMode="url" value={d.website} onChange={set("website")} placeholder="yourbusiness.com" className={inputCls} />
            </div>
            <div>
              <label htmlFor="h-service" className={labelCls}>I need help with</label>
              <div className="relative">
                <select id="h-service" value={d.service} onChange={set("service")} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                  {SERVICE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <button type="submit" className="w-full lime-btn flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm cursor-pointer">
              Get My Free Audit <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-gray-500 text-center">No contracts, no spam. Opens WhatsApp with your details filled in.</p>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Growth Path", href: "#growth-path" },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "#clients" },
  { label: "Lead Tracking", href: "#tracking" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

const Logo = () => (
  <a href="#top" className="flex items-center gap-2.5" aria-label={`${BRAND} home`}>
    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ background:"linear-gradient(135deg,rgba(185,255,41,.8),rgba(100,200,0,.9))" }}>
      <TrendingUp className="w-4 h-4 text-black" />
    </div>
    <span className="font-black text-sm tracking-widest text-white uppercase">{BRAND}</span>
  </a>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || open ? "bg-[#09090D]/95 backdrop-blur-xl border-b border-white/5" : ""
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main">
        <Logo />
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg font-semibold transition-all"
            style={{ background:"#25D366", color:"#fff" }}>
            <WhatsappIcon className="w-4 h-4" />
            WhatsApp
          </a>
          <a href="#contact" className="lime-btn text-xs px-5 py-2.5 rounded-lg">Free Growth Audit</a>
        </div>
        <button className="lg:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open}>
          {open ? <X className="w-5 h-5 text-white"/>:<Menu className="w-5 h-5 text-white"/>}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-white/5 px-6 py-4 space-y-4" style={{ background: DARK }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={()=>setOpen(false)} className="block text-sm text-gray-300">{l.label}</a>
          ))}
          <a href="#contact" onClick={()=>setOpen(false)} className="lime-btn block text-center py-2.5 rounded-lg text-sm mt-2">Get a Free Growth Audit</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={()=>setOpen(false)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold"
            style={{ background:"#25D366", color:"#fff" }}>
            <WhatsappIcon className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
};

// Rotating outcome line under the H1
const OUTCOMES = [
  { label: "more phone calls", icon: Phone },
  { label: "more qualified leads", icon: Target },
  { label: "more booked appointments", icon: Calendar },
  { label: "more online sales", icon: ShoppingBag },
];

const RotatingOutcome = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % OUTCOMES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const A = OUTCOMES[i];
  return (
    <div className="flex items-center gap-3 mb-6 h-10" aria-hidden="true">
      <span className="text-gray-400 text-lg">built for</span>
      <AnimatePresence mode="wait">
        <motion.span key={A.label}
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }} transition={{ duration:.3 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm sm:text-base font-bold"
          style={{ background:"rgba(185,255,41,.12)", color: LIME, border:"1px solid rgba(185,255,41,.3)" }}>
          <A.icon className="w-4 h-4" /> {A.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="top" className="relative min-h-screen pt-16 flex items-center overflow-hidden" style={{ background: DARK }}>
    <img src={consultationImg} alt="" aria-hidden="true" fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover opacity-25" />
    <div className="absolute inset-0 pointer-events-none" style={{
      background:`linear-gradient(90deg, ${DARK} 0%, rgba(9,9,13,.92) 45%, rgba(9,9,13,.7) 100%), linear-gradient(0deg, ${DARK} 0%, transparent 35%)`,
    }} />
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:"linear-gradient(rgba(185,255,41,.03) 1px, transparent 1px),linear-gradient(90deg,rgba(185,255,41,.03) 1px,transparent 1px)",
      backgroundSize:"60px 60px"
    }} />
    <div className="pulse-glow absolute -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{
      background:"radial-gradient(circle, rgba(185,255,41,.14) 0%, transparent 60%)", filter:"blur(40px)",
    }} />

    <div className="max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
      <motion.div className="flex-1 max-w-2xl"
        initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold tracking-wide"
          style={{ borderColor:"rgba(185,255,41,.3)", color:LIME, background:"rgba(185,255,41,.05)" }}>
          <div className="w-1.5 h-1.5 rounded-full blink" style={{ background:LIME }} />
          Digital Marketing Agency · Canada, USA &amp; UK
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight text-white mb-5">
          SEO, web design &amp; AI automation that <span className="grad-text">grow your revenue</span>
        </h1>
        <RotatingOutcome />

        <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-xl">
          {BRAND} is a results-driven digital marketing agency. We help businesses get found on Google,
          Google Maps and AI search, turn that attention into enquiries, and track which marketing actually
          brings in customers.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">
          Website design &amp; development, SEO &amp; AI search visibility, local SEO &amp; Google Business Profile,
          AI business automation and AI chatbots, all from one team and measured against your bottom line.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#contact" className="lime-btn flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-lime-400/20">
            Get a Free SEO Audit <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#growth-path" className="lime-outline flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold">
            See How We Grow Businesses
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { val:"5-in-1", label:"Growth services" },
            { val:"CA · US · UK", label:"Markets served" },
            { val:"24/7", label:"AI lead capture" },
            { val:"Monthly", label:"ROI reporting" },
          ].map(s=>(
            <li key={s.label} className="border-l border-white/10 pl-4">
              <div className="text-xl font-black text-white">{s.val}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="flex-1 flex items-center justify-center w-full"
        initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.8, delay:.15 }}>
        <HeroForm />
      </motion.div>
    </div>
  </section>
);

// ─── Service marquee ────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "SEO", "Web Design", "Local SEO", "Google Business Profile", "AI Search Visibility", "GEO & AEO",
  "AI Chatbots", "Business Automation", "Lead Tracking", "Landing Pages", "E-commerce", "Conversion Optimization",
];

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/5 py-5" style={{ background:"#0C0C12" }} aria-hidden="true">
    <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background:"linear-gradient(90deg,#0C0C12,transparent)" }} />
    <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background:"linear-gradient(-90deg,#0C0C12,transparent)" }} />
    <div className="marquee flex w-max gap-10">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
          {t} <Sparkles className="w-4 h-4" style={{ color: LIME }} />
        </span>
      ))}
    </div>
  </div>
);

// ─── Marketing should connect to revenue ───────────────────────────────────────
const outcomeQuestions = [
  { icon: Eye, q: "Can customers actually find you on Google, Google Maps and AI assistants like ChatGPT?" },
  { icon: MousePointerClick, q: "Does your website turn visitors into calls, form fills and bookings?" },
  { icon: Phone, q: "Is every call, form and chat tracked back to the channel that produced it?" },
  { icon: Filter, q: "Do you know which leads were qualified and which were a waste of time?" },
  { icon: DollarSign, q: "Can you see which marketing produced paying customers and real revenue?" },
];

const Outcomes = () => (
  <section id="why-us" className="py-24 bg-gray-50 text-gray-900 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div className="relative h-[460px] sm:h-[540px]"
        initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
        <img src={lawyerSuitImg} alt="Business owner reviewing marketing results" loading="lazy"
          className="photo-frame absolute left-0 top-0 w-[62%] h-[78%] object-cover rounded-3xl" />
        <img src={signingImg} alt="New customer signing an agreement after finding the business online" loading="lazy"
          className="photo-frame absolute right-0 bottom-0 w-[58%] h-[56%] object-cover rounded-3xl border-[6px] border-white" />
        <div className="float-1 absolute left-4 sm:left-8 bottom-6 rounded-2xl bg-white shadow-2xl px-5 py-4 flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: DARK }}>
            <TrendingUp className="w-4 h-4" style={{ color: LIME }} />
          </div>
          <div>
            <div className="text-[11px] text-gray-500">Source: Google organic</div>
            <div className="text-sm font-black text-gray-900">New customer tracked</div>
          </div>
        </div>
        <div className="float-2 absolute right-4 top-8 rounded-2xl px-4 py-3 shadow-2xl" style={{ background: LIME }}>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: DARK }}>Cost per lead</div>
          <div className="text-lg font-black" style={{ color: DARK }}>Measured monthly</div>
        </div>
      </motion.div>

      <div>
        <SectionHeading center={false}
          eyebrow="Why businesses choose us"
          title="Marketing should be measured in customers, not clicks"
          intro="Rankings, traffic and likes only matter if they turn into revenue. Most businesses get a report full of channel metrics and still can't answer the questions that matter. We build your marketing so you can."
        />
        <ul className="space-y-3 -mt-4">
          {outcomeQuestions.map((p, i) => (
            <motion.li key={p.q}
              className="flex items-center gap-4 rounded-2xl p-4 bg-white border border-gray-100 hover:border-lime-400 hover:shadow-xl transition-all"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:i*.06 }}>
              <div className="w-10 h-10 shrink-0 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center">
                <p.icon className="w-5 h-5" />
              </div>
              <p className="text-gray-800 text-sm font-semibold leading-snug">{p.q}</p>
            </motion.li>
          ))}
        </ul>
        <a href="#contact" className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white" style={{ background: DARK }}>
          Get a free lead tracking &amp; ROI audit <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

// ─── The Nexora Growth Path (framework) ────────────────────────────────────────
const growthPath = [
  { icon: Eye, name: "Visibility", desc: "Rank on Google, Google Maps and AI answers for the searches your customers make." },
  { icon: MousePointerClick, name: "Traffic", desc: "Bring the right visitors to pages built for what they searched." },
  { icon: Phone, name: "Leads", desc: "Turn visits into calls, forms, chats and bookings, 24/7." },
  { icon: Filter, name: "Qualified leads", desc: "AI qualifies every enquiry so your team talks to real buyers." },
  { icon: Users, name: "Customers", desc: "Automated follow-up and booking close more of those leads." },
  { icon: DollarSign, name: "Revenue & ROI", desc: "See which channel produced each customer and what it earned you." },
];

const GrowthPath = () => (
  <section id="growth-path" className="py-24 relative overflow-hidden" style={{ background: DARK }}>
    <div className="pulse-glow absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{
      background:"radial-gradient(ellipse, rgba(185,255,41,.10) 0%, transparent 65%)", filter:"blur(40px)",
    }} />
    <div className="relative max-w-7xl mx-auto px-6">
      <SectionHeading dark
        eyebrow="The Nexora Growth Path"
        title={<>From first search to <span className="grad-text">paying customer</span></>}
        intro="Every service we offer moves your business one step along the same path. We optimize each step, and connect them, so you can see exactly where growth comes from."
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {growthPath.map((s, i) => (
          <motion.li key={s.name} className="relative dark-card rounded-2xl p-5"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:i*.07 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:"rgba(185,255,41,.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: LIME }} />
              </span>
              <span className="text-xs font-black text-gray-600">0{i + 1}</span>
            </div>
            <h3 className="font-extrabold text-white text-base mb-1.5">{s.name}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
            {i < growthPath.length - 1 && (
              <ChevronRight className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: LIME }} aria-hidden="true" />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

// ─── Services ───────────────────────────────────────────────────────────────────
const servicesList = [
  {
    icon: Globe,
    label: "Website Design & Development",
    desc: "Fast, mobile-first websites and landing pages designed to convert, with clear service and location pages, trust signals and easy ways to call, book or buy.",
    points: ["Custom & WordPress websites", "E-commerce development", "Landing pages & redesigns", "Conversion rate optimization"],
  },
  {
    icon: Search,
    label: "SEO & AI Search Visibility",
    desc: "Full-service SEO plus generative engine optimization (GEO) and answer engine optimization (AEO), so Google, ChatGPT, Gemini, Perplexity and AI Overviews understand and recommend you.",
    points: ["Technical, on-page & off-page SEO", "Keyword research & content SEO", "Link building & SEO audits", "GEO, AEO & LLM visibility"],
  },
  {
    icon: MapPin,
    label: "Local SEO & Google Business Profile",
    desc: "Win the Google Maps 3-pack and \"near me\" searches in every city you serve, with an optimized Google Business Profile, consistent citations and a steady flow of genuine reviews.",
    points: ["Google Business Profile optimization", "Local citations & NAP consistency", "Review generation & reputation", "Multi-location SEO"],
  },
  {
    icon: Zap,
    label: "AI Business Automation",
    desc: "Automate the repetitive work around every lead and customer: instant follow-up, booking, quotes, reminders, email nurturing and CRM updates.",
    points: ["Lead follow-up & nurturing", "Booking, quotes & reminders", "CRM & software integrations", "Call, form & lead tracking"],
  },
  {
    icon: Bot,
    label: "AI Chatbot Development",
    desc: "A chatbot trained on your business that answers questions, qualifies enquiries and books appointments around the clock on your website, WhatsApp and social media.",
    points: ["Trained on your services & FAQs", "Qualifies & routes every lead", "Books into your calendar", "Website, WhatsApp & Facebook"],
  },
];

const Services = () => (
  <section id="services" className="py-24 text-white" style={{ background: "#0C0C12" }}>
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading dark
        eyebrow="Digital marketing services"
        title={<>Digital growth, search visibility &amp; <span style={{ color: LIME }}>intelligent automation</span></>}
        intro="Five services built around the full picture: your website wins trust, SEO and local SEO bring the traffic, and AI automation makes sure every lead is captured, followed up and tracked."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicesList.map((s, i) => (
          <motion.article key={s.label}
            className="dark-card rounded-2xl p-7 flex flex-col justify-between"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:i*.06 }}>
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background:"rgba(185,255,41,.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: LIME }} />
              </div>
              <h3 className="font-extrabold text-white text-lg mb-3 leading-snug">{s.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.points.map(pt => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: LIME }} /> {pt}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: LIME }}>
              Get a proposal <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.article>
        ))}
        {/* CTA tile */}
        <motion.div className="rounded-2xl p-7 flex flex-col justify-between"
          style={{ background: LIME, color: DARK }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:.3 }}>
          <div>
            <Rocket className="w-8 h-8 mb-5" />
            <h3 className="font-black text-2xl leading-tight mb-3">Not sure where to start?</h3>
            <p className="text-sm leading-relaxed font-medium opacity-80">
              Get a free audit of your website, SEO, Google Business Profile and lead tracking. We'll show you
              exactly where you're losing customers to competitors, and what to fix first.
            </p>
          </div>
          <a href="#contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ background: DARK }}>
            Request My Free Audit <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Industries we serve ────────────────────────────────────────────────────────
const industries = [
  {
    id: "professional",
    icon: Briefcase,
    title: "Professional Services",
    img: ladyJusticeImg,
    alt: "Lady Justice statue representing marketing for law firms and professional services",
    desc: "Law firms, paralegals, accountants and consultants: rank for high-intent searches and turn them into booked consultations.",
    points: ["Service & city landing pages", "Trust-building websites", "AI intake & booking"],
  },
  {
    id: "construction",
    icon: Hammer,
    title: "Construction & Home Services",
    img: tradespersonImg,
    alt: "Tradesperson at work, representing marketing for construction and home service companies",
    desc: "Builders, renovators and trades: win more quote requests from homeowners searching in your service area.",
    points: ["Contractor SEO & local SEO", "Project gallery websites", "Automated quote follow-up"],
  },
  {
    id: "clinics",
    icon: Stethoscope,
    title: "Clinics & Healthcare",
    img: clinicImg,
    alt: "Doctor speaking with a patient, representing marketing for clinics",
    desc: "Clinics, dentists, physios and specialists: fill your schedule with patients searching for care near them.",
    points: ["Clinic & dental SEO", "Online booking websites", "AI appointment assistant"],
  },
];

const moreIndustries = [
  { icon: ShoppingCart, name: "E-commerce & retail" },
  { icon: Home, name: "Real estate & mortgages" },
  { icon: Utensils, name: "Restaurants & hospitality" },
  { icon: Wrench, name: "Auto services & dealerships" },
  { icon: Users, name: "Salons, spas & fitness" },
  { icon: Building2, name: "Property management" },
  { icon: Layers, name: "SaaS & tech startups" },
  { icon: Megaphone, name: "Local service businesses" },
];

const Industries = () => (
  <section id="industries" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Industries we serve"
        title="Digital marketing for businesses of every kind"
        intro="If your customers search for you online, our growth system works for you. Here are some of the industries we help, from local service businesses to online stores."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industries.map((ind, i) => (
          <motion.article key={ind.id}
            className="group relative rounded-3xl overflow-hidden bg-gray-950 text-white min-h-[460px] flex flex-col justify-end shadow-xl"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5, delay:i*.08 }}>
            <img src={ind.img} alt={ind.alt} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background:"linear-gradient(180deg, rgba(9,9,13,.05) 0%, rgba(9,9,13,.55) 40%, rgba(9,9,13,.97) 78%)" }} />
            <div className="relative p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 glass">
                <ind.icon className="w-5 h-5" style={{ color: LIME }} />
              </div>
              <h3 className="text-2xl font-black mb-2">{ind.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 min-h-[66px]">{ind.desc}</p>
              <ul className="space-y-1.5">
                {ind.points.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-gray-200">
                    <Check className="w-4 h-4 shrink-0" style={{ color: LIME }} /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {moreIndustries.map(x => (
          <li key={x.name} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 hover:border-lime-400 hover:bg-white transition-colors">
            <x.icon className="w-5 h-5 text-lime-700 shrink-0" />
            <span className="text-sm font-semibold text-gray-800">{x.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─── AI intake chatbot showcase ─────────────────────────────────────────────────
const chatScript = [
  { from: "bot", text: "Hi! Thanks for visiting. Are you looking for a quote, a booking or some quick information?" },
  { from: "user", text: "A quote for a kitchen renovation, please." },
  { from: "bot", text: "Great choice. Two quick questions so we can price it properly: what's your postcode, and roughly when would you like to start?" },
  { from: "user", text: "M9B, and ideally next month." },
  { from: "bot", text: "Perfect, we cover your area. I've booked a free site visit for Thursday at 10:30 AM. You'll get a confirmation by text and email." },
];

const ChatbotShowcase = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setTimeout(() => setCount(c => (c >= chatScript.length ? 1 : c + 1)), count >= chatScript.length ? 5000 : 1800);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="dark-card rounded-2xl overflow-hidden max-w-md w-full mx-auto shadow-2xl border border-white/10"
      role="img" aria-label="Example conversation: an AI chatbot qualifies a renovation enquiry and books a free site visit">
      <div className="bg-[#161622] px-5 py-3.5 flex items-center gap-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:"rgba(185,255,41,.15)" }}>
          <Bot className="w-4 h-4" style={{ color: LIME }} />
        </div>
        <div>
          <div className="text-sm font-bold text-white">AI Sales Assistant</div>
          <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: LIME }} /> Online 24/7
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3 h-[360px] overflow-hidden bg-[#0E0E15]">
        <AnimatePresence initial={false}>
          {chatScript.slice(0, count).map((m, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                m.from === "user" ? "rounded-br-sm text-[#09090D] font-medium" : "rounded-bl-sm bg-white/[.06] text-gray-200"
              }`} style={m.from === "user" ? { background: LIME } : undefined}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ChatbotSection = () => (
  <section className="py-24 overflow-hidden" style={{ background: DARK }}>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:LIME }}>AI chatbot development &amp; 24/7 lead capture</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Never miss a lead again, <span style={{ color:LIME }}>even at 2 AM</span>
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8">
          Your AI assistant greets every visitor, gathers the key details, screens out enquiries you don't
          take, and books qualified prospects straight into your calendar, whether that's a consultation,
          a site visit for a quote, an appointment or a product demo. You wake up to a summary of each lead.
        </p>
        <ul className="space-y-3.5 mb-8">
          {[
            "Trained on your services, prices and FAQs",
            "Qualifies by service, location and urgency",
            "Books consultations, site visits & appointments",
            "Hands complex questions to your team",
            "Syncs leads to your CRM, email or WhatsApp",
          ].map(f => (
            <li key={f} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background:"rgba(185,255,41,.15)" }}>
                <Check className="w-3 h-3" style={{ color:LIME }} />
              </span>
              <span className="text-gray-300 text-sm">{f}</span>
            </li>
          ))}
        </ul>
        <a href="#contact" className="lime-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm">
          See a Demo for Your Business <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
      <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}>
        <ChatbotShowcase />
      </motion.div>
    </div>
  </section>
);

// ─── Snapshots of our work (tabbed showcase) ───────────────────────────────────
const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="rounded-2xl overflow-hidden bg-white border border-white/10 shadow-[0_40px_120px_-30px_rgba(185,255,41,.25)]">
    <div className="flex items-center gap-2 px-4 py-3 bg-[#F1F1F4] border-b border-gray-200">
      <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
      <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
      <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
      <div className="ml-3 flex-1 max-w-sm rounded-md bg-white px-3 py-1 text-[11px] text-gray-500 flex items-center gap-1.5 truncate">
        <Shield className="w-3 h-3 text-green-600" /> {url}
      </div>
    </div>
    {children}
  </div>
);

const WebsiteSnapshot = () => (
  <BrowserFrame url="yourbusiness.com">
    <div className="relative h-[300px] sm:h-[360px] overflow-hidden">
      <img src={constructionTeamImg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, rgba(10,22,40,.95) 0%, rgba(10,22,40,.75) 55%, rgba(10,22,40,.2) 100%)" }} />
      <div className="relative px-6 sm:px-10 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-2 text-white font-bold text-sm"><Hammer className="w-5 h-5 text-amber-300" /> Your Business</div>
          <div className="hidden md:flex items-center gap-5 text-[11px] text-white/70">
            <span>Services</span><span>Projects</span><span>Reviews</span>
            <span className="rounded-md bg-amber-300 text-[#0a1628] font-bold px-3 py-1.5">(416) 555-0199</span>
          </div>
        </div>
        <div className="max-w-md">
          <div className="text-[10px] uppercase tracking-[.2em] text-amber-300 font-bold mb-3">Home renovation · Toronto &amp; GTA</div>
          <div className="text-white text-2xl sm:text-4xl font-black leading-tight mb-3">Renovations done right, on time and on budget.</div>
          <div className="text-white/70 text-xs sm:text-sm mb-5">Free quotes. Fully insured. 5-star rated on Google.</div>
          <div className="flex gap-2">
            <span className="rounded-lg bg-amber-300 px-4 py-2.5 text-xs font-bold text-[#0a1628]">Get a free quote</span>
            <span className="hidden sm:inline rounded-lg border border-white/30 px-4 py-2.5 text-xs font-bold text-white">Call now</span>
          </div>
        </div>
        <div className="mt-auto" />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
      {[{ i: Home, t:"Kitchens" }, { i: Wrench, t:"Bathrooms" }, { i: Building2, t:"Extensions" }, { i: Hammer, t:"Basements" }].map(x => (
        <div key={x.t} className="bg-white px-4 py-4 flex items-center gap-2.5">
          <x.i className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-gray-800">{x.t}</span>
        </div>
      ))}
    </div>
  </BrowserFrame>
);

const GbpSnapshot = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
    <div className="md:col-span-3 rounded-2xl overflow-hidden bg-white shadow-2xl">
      <div className="relative h-40">
        <img src={clientWinImg} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="text-xl font-black text-gray-900">Your Business</div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
          <span className="font-bold text-gray-900">4.9</span>
          <span className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</span>
          <span className="text-blue-600">Google reviews</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Dental clinic in Vancouver, BC</div>
        <div className="grid grid-cols-4 gap-2 mt-5">
          {[{ i: Globe, t:"Website" }, { i: Navigation, t:"Directions" }, { i: Phone, t:"Call" }, { i: Calendar, t:"Book" }].map(x => (
            <div key={x.t} className="flex flex-col items-center gap-1.5">
              <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"><x.i className="w-4 h-4 text-blue-600" /></span>
              <span className="text-[11px] text-blue-600 font-medium">{x.t}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
          <div className="flex gap-2"><Clock className="w-4 h-4 text-gray-400" /> <span><b className="text-green-700">Open 24 hours</b> · AI chatbot answers after hours</span></div>
          <div className="flex gap-2"><MessageSquare className="w-4 h-4 text-gray-400" /> <span>Responds to messages within minutes</span></div>
        </div>
      </div>
    </div>
    <div className="md:col-span-2 grid grid-cols-1 gap-5">
      {[
        { i: Phone, t:"Calls from your profile", d:"Tracked every month" },
        { i: Navigation, t:"Direction requests", d:"People heading to your door" },
        { i: Globe, t:"Website clicks", d:"Visitors from Google Maps" },
      ].map(x => (
        <div key={x.t} className="glass rounded-2xl p-5 flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(185,255,41,.12)" }}>
            <x.i className="w-5 h-5" style={{ color: LIME }} />
          </span>
          <div>
            <div className="text-white font-bold text-sm">{x.t}</div>
            <div className="text-gray-400 text-xs">{x.d}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Illustrative sample data for the report mock-up (not a client's real numbers)
const reportData = [
  { m:"Jan", leads:18 }, { m:"Feb", leads:22 }, { m:"Mar", leads:27 }, { m:"Apr", leads:31 },
  { m:"May", leads:38 }, { m:"Jun", leads:44 }, { m:"Jul", leads:49 }, { m:"Aug", leads:57 },
];

// Lightweight SVG area chart with hover crosshair + tooltip (no chart library needed)
const LeadsChart = () => {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600, H = 170, padX = 16, top = 12, bottom = 26;
  const max = Math.max(...reportData.map(d => d.leads)) * 1.1;
  const x = (i: number) => padX + (i * (W - padX * 2)) / (reportData.length - 1);
  const y = (v: number) => top + (1 - v / max) * (H - top - bottom);
  const line = reportData.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.leads)}`).join(" ");
  const area = `${line} L${x(reportData.length - 1)},${H - bottom} L${x(0)},${H - bottom} Z`;
  const h = hover === null ? null : reportData[hover];
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48" preserveAspectRatio="none"
        role="img" aria-label={`Leads per month, rising from ${reportData[0].leads} in ${reportData[0].m} to ${reportData[reportData.length-1].leads} in ${reportData[reportData.length-1].m}`}
        onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LIME} stopOpacity={0.3} />
            <stop offset="100%" stopColor={LIME} stopOpacity={0} />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(g => (
          <line key={g} x1={padX} x2={W - padX} y1={top + g * (H - top - bottom)} y2={top + g * (H - top - bottom)} stroke="rgba(255,255,255,.05)" />
        ))}
        <path d={area} fill="url(#leadFill)" />
        <path d={line} fill="none" stroke={LIME} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1={top} y2={H - bottom} stroke="rgba(255,255,255,.25)" vectorEffect="non-scaling-stroke" />
        )}
        {reportData.map((d, i) => (
          <g key={d.m}>
            <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#6B7280">{d.m}</text>
            <rect x={x(i) - (W / reportData.length) / 2} y={0} width={W / reportData.length} height={H}
              fill="transparent" onMouseEnter={() => setHover(i)} />
          </g>
        ))}
      </svg>
      {h && hover !== null && (
        <>
          <span className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left:`${(x(hover) / W) * 100}%`, top:`${(y(h.leads) / H) * 192}px`, background: LIME, boxShadow:`0 0 0 2px ${CARD}` }} />
          <div className="absolute -translate-x-1/2 rounded-lg px-3 py-2 text-xs pointer-events-none whitespace-nowrap"
            style={{ left:`${Math.min(85, Math.max(15, (x(hover) / W) * 100))}%`, top: 0, background:"#161622", border:"1px solid rgba(255,255,255,.1)" }}>
            <div className="text-gray-400">{h.m}</div>
            <div className="text-white font-bold">{h.leads} leads</div>
          </div>
        </>
      )}
    </div>
  );
};

const ReportSnapshot = () => (
  <div className="rounded-2xl p-5 sm:p-7 border border-white/10" style={{ background: CARD }}>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <div className="text-white font-black text-lg">Monthly Growth Report</div>
        <div className="text-gray-500 text-xs">Your Business · Sample report</div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 text-gray-400">Last 8 months</span>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {[
        { l:"Tracked leads", v:"57", s:"this month" },
        { l:"Calls from Google", v:"112", s:"this month" },
        { l:"Keywords in top 3", v:"24", s:"local searches" },
        { l:"New reviews", v:"9", s:"this month" },
      ].map(k => (
        <div key={k.l} className="rounded-xl p-4 bg-white/[.03] border border-white/5">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">{k.l}</div>
          <div className="text-3xl font-black text-white">{k.v}</div>
          <div className="text-[11px] text-gray-500 mt-1">{k.s}</div>
        </div>
      ))}
    </div>
    <div className="rounded-xl p-4 bg-white/[.02] border border-white/5">
      <div className="text-sm font-bold text-white mb-1">Tracked leads per month</div>
      <div className="text-[11px] text-gray-500 mb-3">Website forms, calls and AI chatbot combined</div>
      <LeadsChart />
    </div>
  </div>
);

const PhoneSnapshot = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="mx-auto w-[280px] rounded-[44px] p-3 bg-[#1b1b22] border border-white/10 shadow-[0_40px_120px_-30px_rgba(185,255,41,.3)]">
      <div className="rounded-[34px] overflow-hidden bg-[#0E0E15] h-[540px] flex flex-col">
        <div className="h-7 flex justify-center items-end"><span className="w-24 h-5 rounded-full bg-black" /></div>
        <div className="px-4 py-3 flex items-center gap-2.5 border-b border-white/5">
          <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:"rgba(185,255,41,.15)" }}><Bot className="w-4 h-4" style={{ color: LIME }} /></span>
          <div>
            <div className="text-white text-xs font-bold">Your Business</div>
            <div className="text-[10px]" style={{ color: LIME }}>AI assistant · online</div>
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2.5 text-[11.5px] leading-snug">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[.07] text-gray-200 px-3 py-2">Hi! Would you like to book a cleaning, a check-up or an emergency visit?</div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 font-medium" style={{ background: LIME, color: DARK }}>A check-up. I'm a new patient.</div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[.07] text-gray-200 px-3 py-2">Welcome! New patients get a full exam. Which time suits you best?</div>
          <div className="flex gap-1.5 flex-wrap">
            {["Tomorrow 9 AM", "Tomorrow 2 PM", "Thu 11 AM"].map(s => (
              <span key={s} className="rounded-full border px-2.5 py-1 text-[10.5px]" style={{ borderColor:"rgba(185,255,41,.4)", color: LIME }}>{s}</span>
            ))}
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 font-medium" style={{ background: LIME, color: DARK }}>Tomorrow 9 AM</div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[.07] text-gray-200 px-3 py-2 flex gap-2">
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: LIME }} /> Booked! A confirmation is on its way by text.
          </div>
        </div>
        <div className="m-3 rounded-full bg-white/[.06] px-4 py-2.5 text-[11px] text-gray-500">Type a message…</div>
      </div>
    </div>
    <div>
      <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Your sales team, in every visitor's pocket</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        Most local searches happen on a phone. Your AI assistant works on your website, Google Business
        Profile messages, Facebook and WhatsApp, and flags urgent enquiries for your team first.
      </p>
      <ul className="space-y-3">
        {["Routes each enquiry by service", "Flags urgent enquiries first", "Books appointments in real time", "Sends you a summary of every lead"].map(t => (
          <li key={t} className="flex items-center gap-3 text-sm text-gray-300">
            <Check className="w-4 h-4 shrink-0" style={{ color: LIME }} /> {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SHOWCASE_TABS = [
  { id: "web", label: "Website design", icon: Globe, el: <WebsiteSnapshot /> },
  { id: "gbp", label: "Google Business Profile", icon: MapPin, el: <GbpSnapshot /> },
  { id: "report", label: "Growth report", icon: BarChart3, el: <ReportSnapshot /> },
  { id: "chat", label: "AI chatbot on mobile", icon: Smartphone, el: <PhoneSnapshot /> },
];

const Showcase = () => {
  const [tab, setTab] = useState(SHOWCASE_TABS[0].id);
  const active = SHOWCASE_TABS.find(t => t.id === tab)!;
  return (
    <section id="work" className="py-24 relative overflow-hidden" style={{ background: DARK }}>
      <div className="pulse-glow absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{
        background:"radial-gradient(ellipse, rgba(185,255,41,.10) 0%, transparent 65%)", filter:"blur(40px)",
      }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeading dark
          eyebrow="Snapshots of our work"
          title={<>See what we build <span className="grad-text">for our clients</span></>}
          intro="From the website your customers land on, to the Google profile that brings them there, to the report that shows what it's earning you."
        />
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Work snapshots">
          {SHOWCASE_TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === t.id ? "text-[#09090D] shadow-lg shadow-lime-400/20" : "text-gray-400 bg-white/[.04] border border-white/10 hover:text-white"
              }`}
              style={tab === t.id ? { background: LIME } : undefined}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
        <motion.div key={active.id} role="tabpanel"
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}>
          {active.el}
        </motion.div>
        <p className="text-center text-[11px] text-gray-600 mt-6">Sample designs for illustration. Names and figures are examples, not client data.</p>
      </div>
    </section>
  );
};

// ─── Photo CTA band ─────────────────────────────────────────────────────────────
const PhotoCta = () => (
  <section className="relative py-28 overflow-hidden">
    <img src={constructionTeamImg} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, rgba(9,9,13,.95) 0%, rgba(9,9,13,.8) 50%, rgba(9,9,13,.55) 100%)" }} />
    <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Right now, someone in your city is searching for <span className="grad-text">a business like yours.</span>
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
          Will they find you or a competitor? Get a free audit and see exactly where you stand on
          Google, Google Maps and AI search.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#contact" className="lime-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm">
            Get My Free Audit <ArrowRight className="w-4 h-4" />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white" style={{ background:"#25D366" }}>
            <WhatsappIcon className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="hidden lg:flex justify-end">
        <div className="relative">
          <img src={clientWinImg} alt="Happy customer after choosing a business they found online" loading="lazy"
            className="photo-frame w-[420px] h-[300px] object-cover rounded-3xl border border-white/10" />
          <div className="float-1 glass absolute -left-10 -bottom-8 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: LIME }}>
              <Award className="w-5 h-5" style={{ color: DARK }} />
            </span>
            <div>
              <div className="text-[11px] text-gray-400">The goal</div>
              <div className="text-sm font-black text-white">More paying customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Our clients: real case studies ─────────────────────────────────────────────
// Edit `scope` to match exactly what you delivered for each client.
// Only add results (rankings, calls, leads) once you have the real numbers.
const CLIENTS = [
  {
    name: "Bridge Legal Services",
    url: "https://bridgelegalservices.ca/",
    domain: "bridgelegalservices.ca",
    img: bridgeLegalSiteImg,
    industry: "Legal · Licensed paralegals",
    location: "Etobicoke, Ontario, Canada",
    icon: Scale,
    summary:
      "A licensed paralegal firm defending drivers against traffic tickets and Highway Traffic Act charges across Toronto, Mississauga, Brampton and the GTA. They needed a site that turns a worried driver's search into a booked case review.",
    scope: [
      "Website design & development",
      "SEO for traffic-ticket and charge-specific searches",
      "Local SEO & Google Business Profile across GTA offices",
      "Free case-review form, call and WhatsApp lead capture",
    ],
  },
  {
    name: "ARZ Construction Ltd",
    url: "https://arzconstructionltd.com/",
    domain: "arzconstructionltd.com",
    img: arzConstructionSiteImg,
    industry: "Construction · Residential renovation",
    location: "Croydon & South London, UK",
    icon: Hammer,
    summary:
      "A residential construction company delivering house extensions, loft conversions and full renovations for homeowners in Croydon and South London. They needed a site that wins homeowners' trust and turns visits into quote requests.",
    scope: [
      "Website design & development",
      "SEO for extensions, loft conversions & renovations",
      "Local SEO & Google Business Profile for Croydon and South London",
      "Free-quote, call and WhatsApp lead capture",
    ],
  },
];

const ClientShot = ({ c }: { c: typeof CLIENTS[number] }) => (
  <a href={c.url} target="_blank" rel="noopener noreferrer"
    className="group block rounded-2xl overflow-hidden bg-white border border-gray-200 photo-frame">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F1F4] border-b border-gray-200">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
      <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-gray-500 flex items-center gap-1.5 truncate">
        <Shield className="w-3 h-3 text-green-600" /> {c.domain}
      </div>
    </div>
    <div className="relative overflow-hidden aspect-[16/10]">
      <img src={c.img} alt={`Homepage of ${c.name}, designed by ${BRAND}`} loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-lg" style={{ background: LIME, color: DARK }}>
          Visit live site <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </a>
);

const ClientsSection = () => (
  <section id="clients" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Our recent clients"
        title={<>Case studies: real businesses, <span className="text-lime-700">live today</span></>}
        intro="Two recent projects in two different industries and two countries: a paralegal firm in Canada and a construction company in the UK. Click a screenshot to visit the live site."
      />
      <div className="space-y-20">
        {CLIENTS.map((c, i) => (
          <motion.article key={c.name}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
            <div className={i % 2 ? "lg:order-2" : ""}>
              <ClientShot c={c} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-lime-100 text-lime-800">
                  <c.icon className="w-3 h-3" /> {c.industry}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  <MapPin className="w-3 h-3" /> {c.location}
                </span>
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-4">{c.name}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{c.summary}</p>
              <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-3">What we delivered</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
                {c.scope.map(s => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-lime-700" /> {s}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold border border-gray-200 hover:border-gray-900 transition-colors">
                  <Globe className="w-4 h-4" /> {c.domain}
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ background: DARK }}>
                  Get the same for your business <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ─── Process ────────────────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", name: "Free growth audit", desc: "We review your website, Google rankings, Google Business Profile, reviews and competitors, then show you where clients are slipping away." },
  { step: "02", name: "Strategy & keyword plan", desc: "We map the services and cities you want to grow in to the exact searches your clients make, and agree on goals together." },
  { step: "03", name: "Build & optimize", desc: "We launch or improve your website, optimize your Google Business Profile, publish content, set up lead tracking and launch your AI chatbot." },
  { step: "04", name: "Report & grow", desc: "Each month you get a plain-English report on rankings, leads, customers and ROI, plus the next steps to keep growing." },
];

const ProcessTimeline = () => (
  <section id="process" className="py-24 text-white" style={{ background: "#0C0C12" }}>
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading dark
        eyebrow="How we work"
        title="A simple, transparent process"
        intro="No long lock-in contracts and no marketing jargon. You always know what we're doing and why."
      />
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((p, i) => (
          <motion.li key={p.step} className="p-6 dark-card rounded-2xl"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5, delay:i*.07 }}>
            <div className="text-4xl font-black mb-4 select-none" style={{ color: LIME }} aria-hidden="true">{p.step}</div>
            <h3 className="font-extrabold text-white text-base mb-2">{p.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

// ─── Locations served ───────────────────────────────────────────────────────────
// Cities with a static landing page (see scripts/generate-city-pages.mjs).
const ONTARIO_PAGES: Record<string, string> = {
  Toronto: "toronto", Etobicoke: "etobicoke", Mississauga: "mississauga", Brampton: "brampton",
};
const locations = [
  { country: "Canada", flag: "CA", note: "SEO, web design and AI automation for businesses in every province.",
    cities: ["Toronto", "Etobicoke", "Mississauga", "Brampton", "Vaughan", "Oakville", "Ottawa", "Hamilton", "Vancouver", "Calgary", "Edmonton", "Montreal"] },
  { country: "United States", flag: "US", note: "Local and national SEO campaigns for businesses in every state.",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Dallas", "Miami", "Phoenix", "Atlanta", "Seattle", "San Diego", "Denver", "Boston"] },
  { country: "United Kingdom", flag: "UK", note: "Local SEO, websites and automation for businesses across the UK.",
    cities: ["London", "Croydon", "South London", "Manchester", "Birmingham", "Leeds", "Bristol", "Liverpool", "Kent", "Surrey", "Glasgow", "Edinburgh"] },
];

const Locations = () => (
  <section id="locations" className="py-24 bg-gray-50 text-gray-900 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Areas we serve"
        title="Digital marketing agency for Canada, the USA and the UK"
        intro="We work remotely with businesses in every province, state and region, and build local SEO campaigns around the exact cities and neighbourhoods where you want more customers."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.country} className="rounded-2xl bg-white border border-gray-100 p-7 hover:shadow-xl hover:border-lime-300 transition-all">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-sm font-black tracking-wider" style={{ background: DARK, color: LIME }} aria-hidden="true">{loc.flag}</div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-1">Digital marketing in {loc.country}</h3>
            <p className="text-sm text-gray-500 mb-5">{loc.note}</p>
            <ul className="flex flex-wrap gap-2">
              {loc.cities.map(c => {
                const slug = loc.country === "Canada" ? ONTARIO_PAGES[c] : undefined;
                return (
                  <li key={c} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                    <MapPin className="w-3 h-3 text-lime-700" />
                    {slug ? <a href={`/${slug}/`} className="hover:underline">{c}</a> : c}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── What we track ──────────────────────────────────────────────────────────────
const trackingGroups = [
  { icon: Eye, title: "Visibility", items: ["Google & Google Maps rankings", "AI search mentions (ChatGPT, Gemini, AI Overviews)", "Impressions & share of search"] },
  { icon: MousePointerClick, title: "Lead actions", items: ["Phone calls & call recordings", "Form fills, chats & WhatsApp", "Bookings & quote requests"] },
  { icon: Filter, title: "Lead quality", items: ["Qualified vs. unqualified leads", "Lead source for every enquiry", "Response & follow-up times"] },
  { icon: DollarSign, title: "Business outcomes", items: ["New customers by channel", "Revenue & cost per lead", "Return on marketing spend"] },
];

const Tracking = () => (
  <section id="tracking" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Lead tracking & reporting"
        title="What we track, so you always know what's working"
        intro="Every plan includes call, form and lead tracking connected to Google Analytics 4 and your CRM. Each month you get a plain-English report that ties marketing to customers and revenue."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trackingGroups.map((g, i) => (
          <motion.article key={g.title}
            className="rounded-2xl p-6 border border-gray-100 bg-gray-50 hover:bg-white hover:border-lime-400 hover:shadow-xl transition-all"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:i*.06 }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: DARK }}>
              <g.icon className="w-5 h-5" style={{ color: LIME }} />
            </div>
            <h3 className="font-extrabold text-lg mb-3">{g.title}</h3>
            <ul className="space-y-2">
              {g.items.map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-lime-700" /> {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ─── FAQ (mirrors the FAQPage JSON-LD in index.html — keep both in sync) ───────
const faqs = [
  {
    q: "What does a digital marketing agency like Nexora AI do?",
    a: "We help businesses get found online, turn visitors into leads and track which marketing produces customers. Our services are website design and development, SEO and AI search visibility, local SEO and Google Business Profile optimization, AI business automation and AI chatbot development, all managed by one team.",
  },
  {
    q: "Do you only offer SEO?",
    a: "No. SEO is a core service, but most businesses grow fastest when the website, local SEO, Google Business Profile, AI chatbot and lead follow-up work together. We can handle one service or the full package, depending on what your business needs.",
  },
  {
    q: "Which industries do you work with?",
    a: "We work with businesses of every kind, including law firms and professional services, construction and home services, clinics and healthcare, e-commerce and retail, real estate, hospitality and other local businesses. Recent clients include Bridge Legal Services in Ontario, Canada and ARZ Construction Ltd in South London, UK.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Most businesses see early movement in Google Maps and local rankings within 2–3 months, especially after the Google Business Profile is fully optimized. Competitive keywords in large cities usually take 6–12 months of consistent work to reach the top positions.",
  },
  {
    q: "What is AI search visibility (GEO and AEO)?",
    a: "More people now ask ChatGPT, Google AI Overviews, Gemini or Perplexity for recommendations. Generative engine optimization (GEO) and answer engine optimization (AEO) structure your website, content, reviews and online profiles so these AI tools understand your business and are more likely to recommend it.",
  },
  {
    q: "Why is lead tracking part of your service?",
    a: "Without tracking, you can't tell which marketing brings in customers and which wastes money. We track calls, forms, chats and bookings back to their source, so every decision about your budget is based on real results instead of guesswork.",
  },
  {
    q: "Which countries do you work in?",
    a: "We work remotely with businesses across Canada, the United States and the United Kingdom, and build local SEO campaigns around the specific cities and neighbourhoods where you want more customers.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. Our monthly plans are month-to-month and you can cancel anytime. Website builds are quoted as a fixed price before we start.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 text-white" style={{ background: DARK }}>
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading dark eyebrow="FAQ" title="Questions clients ask us" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="dark-card rounded-xl">
                <h3>
                  <button className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                    onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}>
                    <span className="font-bold text-white text-sm sm:text-base">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!isOpen} className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Pricing Section (Stripe) ──────────────────────────────────────────────────
const PRICING_FEATURES = [
  "AI chatbot & 24/7 client intake setup",
  "Workflow automation & lead follow-up",
  "Custom integrations with your tools",
  "Monthly performance report",
  "Priority email & WhatsApp support",
  "Cancel anytime",
];

const Pricing = () => {
  const isStripeReady = STRIPE_PAYMENT_LINK && !STRIPE_PAYMENT_LINK.includes("_xxxx");

  return (
    <section id="pricing" className="py-24 border-t border-white/5" style={{ background:"#0C0C12" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading dark
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          intro="Start with AI automation today. Website, SEO and local SEO projects are quoted after your free audit."
        />

        <motion.div className="max-w-md mx-auto rounded-3xl p-8 border relative"
          style={{ background:CARD, borderColor:"rgba(185,255,41,.35)", boxShadow:"0 0 60px rgba(185,255,41,.08)" }}
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.5 }}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background:LIME, color:DARK }}>
            Most Popular
          </div>

          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:LIME }}>AI Automation Plan</div>
          <div className="flex items-end gap-1 mb-2">
            <span className="text-6xl font-black text-white">$30</span>
            <span className="text-gray-400 text-sm mb-2">/ month</span>
          </div>
          <p className="text-gray-500 text-xs mb-6">Billed monthly. No setup fees. Cancel anytime.</p>

          <ul className="space-y-3 mb-8">
            {PRICING_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color:LIME }} />
                {f}
              </li>
            ))}
          </ul>

          <a href={isStripeReady ? STRIPE_PAYMENT_LINK : "#contact"} target="_blank" rel="noopener noreferrer"
            className={`lime-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold ${
              !isStripeReady ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              if (!isStripeReady) {
                e.preventDefault();
                alert("Stripe is not configured yet. Please follow STRIPE_SETUP.md to create your payment link.");
              }
            }}>
            Subscribe with Stripe <ArrowRight className="w-4 h-4" />
          </a>

          {STRIPE_PORTAL_LINK && (
            <a href={STRIPE_PORTAL_LINK} target="_blank" rel="noopener noreferrer"
              className="mt-3 block text-center text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-2">
              Manage or cancel your subscription
            </a>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
            <Shield className="w-3 h-3" /> Secure SSL checkout via Stripe
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Contact Form ───────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  "Full growth package",
  "Website Design & Development",
  "SEO & AI Search Visibility",
  "Local SEO & Google Business Profile",
  "AI Business Automation",
  "AI Chatbot Development",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  firm: "",
  website: "",
  businessType: "Local service business",
  service: SERVICE_OPTIONS[0],
  message: "",
};

const inputCls = "w-full bg-[#161622] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B9FF29]/50 transition-colors";
const labelCls = "block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-bold";

const ContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const set = (k: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [k]: e.target.value }));

  // Sends the enquiry to WhatsApp so it actually reaches the team.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    const text = [
      `New growth audit request from the website`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      formData.firm && `Firm / business: ${formData.firm}`,
      formData.website && `Website: ${formData.website}`,
      `Type: ${formData.businessType}`,
      `Interested in: ${formData.service}`,
      formData.message && `Goals: ${formData.message}`,
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSuccess(true);
    confetti({ particleCount: 150, spread: 85, origin: { y: 0.6 }, colors: [LIME, "#ffffff", "#22D3EE"] });
  };

  if (success) {
    return (
      <motion.div className="dark-card rounded-2xl p-8 border border-white/10 text-center max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="w-16 h-16 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" style={{ color: LIME }} />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">Almost done!</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Press send in the WhatsApp window that just opened and your request will reach our team. We'll reply
          within one business day with next steps for your free growth audit.
        </p>
        <button onClick={() => { setSuccess(false); setFormData(EMPTY_FORM); }} className="lime-btn px-6 py-3 rounded-xl text-xs">
          Send Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dark-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-name" className={labelCls}>Your name *</label>
          <input id="f-name" type="text" required autoComplete="name" value={formData.name} onChange={set("name")} placeholder="Jane Smith" className={inputCls} />
        </div>
        <div>
          <label htmlFor="f-email" className={labelCls}>Email *</label>
          <input id="f-email" type="email" required autoComplete="email" value={formData.email} onChange={set("email")} placeholder="jane@yourbusiness.com" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-phone" className={labelCls}>Phone</label>
          <input id="f-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={set("phone")} placeholder="+1 (416) 555-0123" className={inputCls} />
        </div>
        <div>
          <label htmlFor="f-firm" className={labelCls}>Firm / business name</label>
          <input id="f-firm" type="text" autoComplete="organization" value={formData.firm} onChange={set("firm")} placeholder="Smith & Co." className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="f-website" className={labelCls}>Current website</label>
        <input id="f-website" type="text" inputMode="url" value={formData.website} onChange={set("website")} placeholder="yourbusiness.com" className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-type" className={labelCls}>Business type</label>
          <div className="relative">
            <select id="f-type" value={formData.businessType} onChange={set("businessType")} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
              {["Local service business", "Professional services (legal, accounting, consulting)", "Construction / home services", "Clinic / healthcare", "E-commerce / retail", "Restaurant / hospitality", "SaaS / tech", "Other"].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="f-service" className={labelCls}>I'm interested in</label>
          <div className="relative">
            <select id="f-service" value={formData.service} onChange={set("service")} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
              {SERVICE_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="f-msg" className={labelCls}>Your goals</label>
        <textarea id="f-msg" rows={4} value={formData.message} onChange={set("message")}
          placeholder="e.g. Rank on Google in Toronto, get more quote requests, launch a new website, automate lead follow-up..."
          className={`${inputCls} resize-none`} />
      </div>

      <button type="submit" className="w-full lime-btn flex items-center justify-center gap-2 py-4 rounded-xl text-sm cursor-pointer">
        Get My Free Growth Audit <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-gray-500 text-center">Opens WhatsApp with your details filled in. No spam, ever.</p>
    </form>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-28 relative overflow-hidden" style={{ background: DARK }}>
    <div className="pulse-glow absolute inset-0 flex items-center justify-center pointer-events-none">
      <div style={{ width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(185,255,41,.1) 0%, transparent 65%)", filter:"blur(40px)" }} />
    </div>

    <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Ready to get <span style={{ color:LIME }}>more customers</span> for your business?
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
          Request a free, no-obligation SEO and growth audit. We'll review your website, Google rankings,
          Google Business Profile and lead tracking, and send you a clear action plan.
        </p>
        <ul className="space-y-4 mb-8">
          {[
            "Free website, SEO & Google Business Profile audit",
            "Competitor comparison for your city and industry",
            "Clear plan and fixed quote, with no pressure",
          ].map(t => (
            <li key={t} className="flex items-center gap-3">
              <Check className="w-5 h-5 shrink-0" style={{ color: LIME }} />
              <span className="text-gray-300 text-sm">{t}</span>
            </li>
          ))}
        </ul>
        <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white mb-3">
          <Phone className="w-4 h-4" style={{ color: LIME }} /> Call {PHONE}
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white">
          <MessageSquare className="w-4 h-4" style={{ color: LIME }} /> Prefer to chat? Message us on WhatsApp
        </a>
        <p className="flex items-start gap-2 text-sm text-gray-400 mt-3">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: LIME }} /> {ADDRESS}
        </p>
      </div>
      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: "Services", links: servicesList.map(s => ({ l: s.label, h: "#services" })) },
  { title: "SEO", links: ["Technical SEO", "On-page & off-page SEO", "Link building", "Keyword research", "SEO audits", "GEO, AEO & LLM visibility"].map(l => ({ l, h: "#services" })) },
  { title: "Ontario SEO", links: [
    { l: "SEO in Toronto", h: "/toronto/" },
    { l: "SEO in Etobicoke", h: "/etobicoke/" },
    { l: "SEO in Mississauga", h: "/mississauga/" },
    { l: "SEO in Brampton", h: "/brampton/" },
    { l: "All of Ontario", h: "/ontario/" },
  ] },
  { title: "Company", links: [
    { l: "Growth Path", h: "#growth-path" },
    { l: "Case Studies", h: "#clients" },
    { l: "Lead Tracking", h: "#tracking" },
    { l: "Industries", h: "#industries" },
    { l: "FAQ", h: "#faq" },
    { l: "Free SEO Audit", h: "#contact" },
  ] },
];

const Footer = () => (
  <footer style={{ background:"#07070B" }} className="border-t border-white/5 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
      <div className="lg:col-span-2">
        <div className="mb-4"><Logo /></div>
        <p className="text-sm leading-relaxed max-w-sm mb-5">
          {BRAND} is a digital marketing agency for businesses in Canada, the USA and the UK. Website design,
          SEO, AI search visibility, local SEO, AI automation and chatbots, measured against your revenue.
        </p>
        <p className="text-xs text-gray-500 mb-4">Serving Toronto, Vancouver, Calgary, Montreal, New York, Los Angeles, Chicago, London, Manchester and beyond.</p>
        <address className="not-italic text-sm text-gray-400 mb-3">{ADDRESS}</address>
        <a href={PHONE_HREF} className="block text-sm font-semibold text-gray-300 hover:text-white mb-3">{PHONE}</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white">
          <WhatsappIcon className="w-4 h-4" /> Message us on WhatsApp
        </a>
      </div>
      {FOOTER_COLS.map(col => (
        <div key={col.title}>
          <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">{col.title}</div>
          <ul className="space-y-2.5">
            {col.links.map(x => (
              <li key={x.l}><a href={x.h} className="text-sm hover:text-white transition-colors">{x.l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
      <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
      <span>Digital Marketing Agency · Canada · USA · UK</span>
    </div>
  </footer>
);

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GlobalStyles />
      <CheckoutStatusBanner />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Outcomes />
        <GrowthPath />
        <Services />
        <Showcase />
        <ClientsSection />
        <Tracking />
        <ChatbotSection />
        <Industries />
        <PhotoCta />
        <ProcessTimeline />
        <Locations />
        <FAQ />
        <Pricing />
        <ContactSection />
      </main>
      <Footer />

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
