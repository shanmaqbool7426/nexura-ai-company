import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Bot, Shield, Check, Star, Menu, X, ChevronRight, ChevronDown, Globe,
  Search, MapPin, MessageSquare, Phone, Calendar, Scale, Gavel, Car, Plane, Heart,
  Briefcase, Home, Building2, FileText, Users, TrendingUp, Clock, Zap, Landmark,
  Stethoscope, Hammer, ShoppingBag, Wrench, Smartphone, BarChart3, Navigation, Award,
} from "lucide-react";
import confetti from "canvas-confetti";

// Photography (Unsplash licence, stored locally for speed)
import lawLibraryImg from "../assets/legal/law-library.jpg";
import ladyJusticeImg from "../assets/legal/lady-justice-2.jpg";
import courthouseImg from "../assets/legal/courthouse.jpg";
import gavelImg from "../assets/legal/gavel.jpg";
import clientWinImg from "../assets/legal/client-win.jpg";
import lawyerSuitImg from "../assets/legal/lawyer-suit.jpg";
import consultationImg from "../assets/legal/consultation.jpg";
import signingImg from "../assets/legal/signing.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────
const LIME = "#B9FF29";
const DARK = "#09090D";
const CARD = "#111118";
const BRAND = "Nexora AI";
const WHATSAPP_NUMBER = "923069829158";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

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

// ─── Hero visual: Google local results mockup ───────────────────────────────────
const SerpMockup = () => (
  <div className="relative w-full max-w-[480px]" role="img"
    aria-label="Illustration of a law firm ranking first in the Google map results for 'family lawyer near me', with a new consultation booked by the AI intake assistant">
    <div className="pulse-glow absolute -inset-8 rounded-full pointer-events-none" style={{
      background:"radial-gradient(circle, rgba(185,255,41,.16) 0%, transparent 65%)", filter:"blur(36px)",
    }} />

    {/* Browser card */}
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-white/10">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 shadow-sm mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-800">family lawyer near me</span>
        </div>

        {/* Map strip */}
        <div className="relative h-24 rounded-xl overflow-hidden mb-3" style={{
          background:"linear-gradient(135deg,#e8f0e3 0%,#dfe9f3 100%)",
        }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 96" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60 Q100 40 200 58 T400 46" stroke="#fff" strokeWidth="6" fill="none" />
            <path d="M120 0 L150 96" stroke="#fff" strokeWidth="5" />
            <path d="M290 0 L270 96" stroke="#fff" strokeWidth="4" />
          </svg>
          {[{l:"22%",t:"30%",n:1},{l:"58%",t:"52%",n:2},{l:"80%",t:"22%",n:3}].map(p=>(
            <div key={p.n} className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow"
              style={{ left:p.l, top:p.t, background: p.n===1 ? DARK : "#EA4335", color: p.n===1 ? LIME : "#fff" }}>{p.n}</div>
          ))}
        </div>

        {/* Local pack */}
        {[
          { n:"Your Law Firm", r:"4.9", c:"Family law attorney · Open 24 hours", top:true },
          { n:"Competitor Law Office", r:"4.3", c:"Lawyer · Closes 5 PM" },
          { n:"Another Legal Group", r:"4.1", c:"Law firm · Closes 6 PM" },
        ].map(item => (
          <div key={item.n} className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 mb-1.5 ${item.top ? "border-2" : "border border-transparent"}`}
            style={item.top ? { borderColor: LIME, background:"rgba(185,255,41,.08)" } : undefined}>
            <div className="min-w-0">
              <div className={`text-sm truncate ${item.top ? "font-black text-gray-900" : "font-semibold text-gray-600"}`}>{item.n}</div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <span className="font-semibold text-gray-700">{item.r}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="truncate">· {item.c}</span>
              </div>
            </div>
            {item.top && (
              <div className="flex gap-1.5 shrink-0">
                <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: DARK }}><Phone className="w-3.5 h-3.5" style={{ color: LIME }} /></span>
                <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: DARK }}><MapPin className="w-3.5 h-3.5" style={{ color: LIME }} /></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Floating: new consultation */}
    <div className="float-1 absolute -right-2 sm:-right-8 -bottom-8 dark-card rounded-xl px-4 py-3 flex items-center gap-3 z-20 shadow-2xl">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background:"rgba(185,255,41,.12)" }}>
        <Calendar className="w-4 h-4" style={{ color: LIME }} />
      </div>
      <div>
        <div className="text-[11px] text-gray-400">AI intake · 11:42 PM</div>
        <div className="text-sm font-bold text-white">Consultation booked</div>
      </div>
    </div>

    {/* Floating: ranking */}
    <div className="float-2 absolute -left-2 sm:-left-8 -top-6 dark-card rounded-xl px-4 py-3 flex items-center gap-3 z-20 shadow-2xl">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background:"rgba(185,255,41,.12)" }}>
        <TrendingUp className="w-4 h-4" style={{ color: LIME }} />
      </div>
      <div>
        <div className="text-[11px] text-gray-400">Google Maps</div>
        <div className="text-sm font-bold text-white">#1 in the local pack</div>
      </div>
    </div>
  </div>
);

// ─── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Law Firm Marketing", href: "#law-firms" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Case Study", href: "#case-study" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

const Logo = () => (
  <a href="#top" className="flex items-center gap-2.5" aria-label={`${BRAND} home`}>
    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ background:"linear-gradient(135deg,rgba(185,255,41,.8),rgba(100,200,0,.9))" }}>
      <Scale className="w-4 h-4 text-black" />
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

// ─── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="top" className="relative min-h-screen pt-16 flex items-center overflow-hidden" style={{ background: DARK }}>
    <img src={lawLibraryImg} alt="" aria-hidden="true" fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover opacity-35" />
    <div className="absolute inset-0 pointer-events-none" style={{
      background:`linear-gradient(90deg, ${DARK} 0%, rgba(9,9,13,.92) 40%, rgba(9,9,13,.6) 100%), linear-gradient(0deg, ${DARK} 0%, transparent 35%)`,
    }} />
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:"linear-gradient(rgba(185,255,41,.03) 1px, transparent 1px),linear-gradient(90deg,rgba(185,255,41,.03) 1px,transparent 1px)",
      backgroundSize:"60px 60px"
    }} />
    <div className="pulse-glow absolute -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{
      background:"radial-gradient(circle, rgba(185,255,41,.14) 0%, transparent 60%)", filter:"blur(40px)",
    }} />

    <div className="max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-20 lg:gap-10">
      <motion.div className="flex-1 max-w-2xl"
        initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold tracking-wide"
          style={{ borderColor:"rgba(185,255,41,.3)", color:LIME, background:"rgba(185,255,41,.05)" }}>
          <div className="w-1.5 h-1.5 rounded-full blink" style={{ background:LIME }} />
          Law Firm Marketing Agency · Canada &amp; USA
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight text-white mb-6">
          Law firm SEO &amp; marketing that brings you <span className="grad-text">more clients</span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-xl">
          We help law firms, lawyers and paralegals across Canada and the USA rank higher on Google,
          show up in AI search, and turn more website visitors into signed clients.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">
          Website design, local SEO, Google Business Profile optimization, and AI intake chatbots that
          answer enquiries 24/7, all from one team built around how people actually look for a lawyer.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#contact" className="lime-btn flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-lime-400/20">
            Get a Free Law Firm Growth Audit <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="lime-outline flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold">
            Explore Services
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { val:"CA + US", label:"Markets served" },
            { val:"24/7", label:"AI client intake" },
            { val:"Local", label:"Map-pack focus" },
            { val:"Monthly", label:"Plain-English reports" },
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
        <SerpMockup />
      </motion.div>
    </div>
  </section>
);

// ─── Practice-area marquee ──────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Personal Injury", "Family Law", "Immigration", "Criminal Defence", "Real Estate Law",
  "Employment Law", "Wills & Estates", "Corporate Law", "Paralegal Services", "Civil Litigation",
];

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/5 py-5" style={{ background:"#0C0C12" }} aria-hidden="true">
    <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background:"linear-gradient(90deg,#0C0C12,transparent)" }} />
    <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background:"linear-gradient(-90deg,#0C0C12,transparent)" }} />
    <div className="marquee flex w-max gap-10">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
          {t} <Scale className="w-4 h-4" style={{ color: LIME }} />
        </span>
      ))}
    </div>
  </div>
);

// ─── Why law firms lose clients ────────────────────────────────────────────────
const painPoints = [
  { icon: Search, title: "Clients can't find you", desc: "Most people start by searching \"lawyer near me\" or asking an AI assistant. If you're not in the top three map results, that call goes to another firm." },
  { icon: Clock, title: "Leads come in after hours", desc: "Legal problems don't keep office hours. Enquiries sent at night or on weekends often go cold before anyone replies the next morning." },
  { icon: Globe, title: "Your website doesn't convert", desc: "A slow, dated or generic site makes visitors leave. Clear practice-area pages, trust signals and an easy way to book are what turn visits into consultations." },
];

const LawFirmProblem = () => (
  <section id="law-firms" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Photo collage */}
      <motion.div className="relative h-[460px] sm:h-[560px]"
        initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
        <img src={lawyerSuitImg} alt="Lawyer in a suit at a modern law office" loading="lazy"
          className="photo-frame absolute left-0 top-0 w-[62%] h-[78%] object-cover rounded-3xl" />
        <img src={consultationImg} alt="Lawyer meeting a new client for a consultation" loading="lazy"
          className="photo-frame absolute right-0 bottom-0 w-[58%] h-[56%] object-cover rounded-3xl border-[6px] border-white" />
        <div className="float-1 absolute left-4 sm:left-8 bottom-6 rounded-2xl bg-white shadow-2xl px-5 py-4 flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: DARK }}>
            <Phone className="w-4 h-4" style={{ color: LIME }} />
          </div>
          <div>
            <div className="text-[11px] text-gray-500">From Google Maps</div>
            <div className="text-sm font-black text-gray-900">New client call</div>
          </div>
        </div>
        <div className="float-2 absolute right-4 top-8 rounded-2xl px-4 py-3 shadow-2xl" style={{ background: LIME }}>
          <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: DARK }} />)}</div>
          <div className="text-xs font-black" style={{ color: DARK }}>Reviews that win trust</div>
        </div>
      </motion.div>

      <div>
        <SectionHeading center={false}
          eyebrow="Legal marketing for law firms"
          title="Why good law firms lose clients online, and how we fix it"
          intro="You're good at practising law. Clients choose who to call long before they meet you, from what they see on Google, Google Maps, your reviews and your website. We make sure that first impression wins the call."
        />
        <div className="space-y-4 -mt-4">
          {painPoints.map((p, i) => (
            <motion.article key={p.title}
              className="flex gap-4 rounded-2xl p-5 bg-gray-50 border border-gray-100 hover:border-lime-400 hover:bg-white hover:shadow-xl transition-all"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.45, delay:i*.07 }}>
              <div className="w-11 h-11 shrink-0 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center">
                <p.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base mb-1">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Services ───────────────────────────────────────────────────────────────────
const servicesList = [
  {
    icon: Globe,
    label: "Law Firm Website Design & Development",
    desc: "Fast, mobile-first websites for law firms with a dedicated page for every practice area and city you serve, attorney and lawyer bios that build trust, and clear calls to book a consultation.",
    points: ["Practice-area & location pages", "Under 2-second load times", "Built to convert visitors into consultations"],
  },
  {
    icon: Search,
    label: "Law Firm SEO & AI Search Visibility",
    desc: "Lawyer SEO that targets the searches your future clients make, plus structured content and schema so ChatGPT, Google AI Overviews, Gemini and Perplexity understand and recommend your firm.",
    points: ["Keyword research by practice area", "Technical SEO & legal schema markup", "AI search (GEO/AEO) optimization"],
  },
  {
    icon: MapPin,
    label: "Local SEO & Google Business Profile for Lawyers",
    desc: "Rank in the Google Maps 3-pack for \"lawyer near me\" searches in your city. We optimize your Google Business Profile, build consistent legal directory citations, and set up an ethical review strategy.",
    points: ["Google Business Profile optimization", "Legal directory citations", "Review generation workflow"],
  },
  {
    icon: Zap,
    label: "AI Business Automation for Law Firms",
    desc: "Automate the repetitive work around new clients: instant lead follow-up, consultation scheduling, intake forms, reminders and CRM updates, so your team spends time on legal work, not admin.",
    points: ["Automated lead follow-up", "Consultation booking & reminders", "CRM & practice-management integrations"],
  },
  {
    icon: Bot,
    label: "AI Chatbot & 24/7 Legal Intake Assistant",
    desc: "A chatbot trained on your firm that answers common questions, qualifies enquiries by practice area and urgency, and books consultations day and night, without giving legal advice.",
    points: ["Qualifies leads by case type", "Books directly into your calendar", "Website, Facebook & WhatsApp"],
  },
];

const Services = () => (
  <section id="services" className="py-24 text-white" style={{ background: "#0C0C12" }}>
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading dark
        eyebrow="Our services"
        title={<>Digital growth, search visibility &amp; <span style={{ color: LIME }}>intelligent automation</span></>}
        intro="Five services that work together: your website wins trust, SEO and local SEO bring the traffic, and AI automation makes sure no enquiry slips through."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicesList.map((s, i) => (
          <motion.article key={s.label}
            className={`dark-card rounded-2xl p-7 flex flex-col justify-between ${i === 0 ? "lg:row-span-1" : ""}`}
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
            <Scale className="w-8 h-8 mb-5" />
            <h3 className="font-black text-2xl leading-tight mb-3">Not sure where to start?</h3>
            <p className="text-sm leading-relaxed font-medium opacity-80">
              Get a free audit of your website, Google rankings and Google Business Profile. We'll show you
              exactly where you're losing potential clients to competing firms.
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

// ─── Practice areas ─────────────────────────────────────────────────────────────
const practiceAreas = [
  { icon: Car, name: "Personal Injury", kw: "Personal injury lawyer SEO" },
  { icon: Heart, name: "Family & Divorce Law", kw: "Family lawyer marketing" },
  { icon: Plane, name: "Immigration Law", kw: "Immigration lawyer SEO" },
  { icon: Gavel, name: "Criminal Defence", kw: "Criminal defence lawyer marketing" },
  { icon: Home, name: "Real Estate Law", kw: "Real estate lawyer SEO" },
  { icon: Briefcase, name: "Employment Law", kw: "Employment lawyer marketing" },
  { icon: FileText, name: "Wills, Estates & Probate", kw: "Estate planning attorney SEO" },
  { icon: Building2, name: "Corporate & Business Law", kw: "Business lawyer marketing" },
  { icon: Landmark, name: "Paralegal Services", kw: "Paralegal marketing in Ontario" },
  { icon: Users, name: "Landlord & Tenant", kw: "Landlord tenant lawyer SEO" },
  { icon: Shield, name: "Insurance & Disability Claims", kw: "Disability lawyer marketing" },
  { icon: Scale, name: "Civil Litigation", kw: "Litigation lawyer SEO" },
];

const PracticeAreas = () => (
  <section className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Practice areas"
        title="Marketing built for your area of law"
        intro="Someone searching for an immigration lawyer behaves very differently from someone who was just in a car accident. We build pages, keywords and intake flows around the way your clients search."
      />
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {practiceAreas.map((a, i) => (
          <motion.li key={a.name}
            className="rounded-2xl p-5 border border-gray-100 bg-gray-50 hover:bg-white hover:border-lime-400 hover:shadow-lg transition-all"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.35, delay:i*.03 }}>
            <a.icon className="w-5 h-5 text-lime-700 mb-3" />
            <h3 className="font-extrabold text-gray-900 text-sm mb-1">{a.name}</h3>
            <p className="text-xs text-gray-500">{a.kw}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

// ─── AI intake chatbot showcase ─────────────────────────────────────────────────
const chatScript = [
  { from: "bot", text: "Hi, you've reached the firm's after-hours assistant. What can we help you with today?" },
  { from: "user", text: "I was rear-ended on the highway last week and my back still hurts." },
  { from: "bot", text: "I'm sorry to hear that. A few quick questions so the right lawyer can follow up: where did the accident happen, and have you seen a doctor?" },
  { from: "user", text: "Toronto. Yes, I saw my doctor on Monday." },
  { from: "bot", text: "Thank you. I've booked a free 20-minute consultation for tomorrow at 10:30 AM. You'll get a confirmation by text and email." },
];

const ChatbotShowcase = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setTimeout(() => setCount(c => (c >= chatScript.length ? 1 : c + 1)), count >= chatScript.length ? 5000 : 1800);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="dark-card rounded-2xl overflow-hidden max-w-md w-full mx-auto shadow-2xl border border-white/10"
      role="img" aria-label="Example conversation: an AI intake assistant qualifies a personal injury enquiry and books a consultation after hours">
      <div className="bg-[#161622] px-5 py-3.5 flex items-center gap-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:"rgba(185,255,41,.15)" }}>
          <Bot className="w-4 h-4" style={{ color: LIME }} />
        </div>
        <div>
          <div className="text-sm font-bold text-white">Client Intake Assistant</div>
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
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:LIME }}>AI legal intake chatbot</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Never miss a potential client again, <span style={{ color:LIME }}>even at 2 AM</span>
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8">
          Your AI intake assistant greets every visitor, gathers the key facts of their matter, screens out
          enquiries you don't take, and books qualified prospects straight into your calendar. Your team
          wakes up to a summary of each lead.
        </p>
        <ul className="space-y-3.5 mb-8">
          {[
            "Trained on your firm's practice areas, fees and FAQs",
            "Qualifies by case type, location, urgency and conflicts",
            "Books consultations and sends confirmations automatically",
            "Gives general information only, never legal advice",
            "Syncs leads to Clio, your CRM, email or WhatsApp",
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
          See a Demo for Your Firm <ArrowRight className="w-4 h-4" />
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
  <BrowserFrame url="yourlawfirm.ca">
    <div className="relative h-[300px] sm:h-[360px] overflow-hidden">
      <img src={courthouseImg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, rgba(10,22,40,.95) 0%, rgba(10,22,40,.75) 55%, rgba(10,22,40,.2) 100%)" }} />
      <div className="relative px-6 sm:px-10 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-2 text-white font-bold text-sm"><Scale className="w-5 h-5 text-amber-300" /> Your Law Firm</div>
          <div className="hidden md:flex items-center gap-5 text-[11px] text-white/70">
            <span>Practice Areas</span><span>Our Lawyers</span><span>Reviews</span>
            <span className="rounded-md bg-amber-300 text-[#0a1628] font-bold px-3 py-1.5">(416) 555-0199</span>
          </div>
        </div>
        <div className="max-w-md">
          <div className="text-[10px] uppercase tracking-[.2em] text-amber-300 font-bold mb-3">Personal injury lawyers · Toronto</div>
          <div className="text-white text-2xl sm:text-4xl font-black leading-tight mb-3">Injured in an accident? Talk to a lawyer today.</div>
          <div className="text-white/70 text-xs sm:text-sm mb-5">Free consultation. Same-day response. Serving Toronto and the GTA.</div>
          <div className="flex gap-2">
            <span className="rounded-lg bg-amber-300 px-4 py-2.5 text-xs font-bold text-[#0a1628]">Book a free consultation</span>
            <span className="hidden sm:inline rounded-lg border border-white/30 px-4 py-2.5 text-xs font-bold text-white">Call now</span>
          </div>
        </div>
        <div className="mt-auto" />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
      {[{ i: Car, t:"Car accidents" }, { i: Briefcase, t:"Workplace injury" }, { i: Shield, t:"Disability claims" }, { i: Heart, t:"Wrongful death" }].map(x => (
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
        <div className="text-xl font-black text-gray-900">Your Law Firm</div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
          <span className="font-bold text-gray-900">4.9</span>
          <span className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</span>
          <span className="text-blue-600">Google reviews</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Family law attorney in Vancouver, BC</div>
        <div className="grid grid-cols-4 gap-2 mt-5">
          {[{ i: Globe, t:"Website" }, { i: Navigation, t:"Directions" }, { i: Phone, t:"Call" }, { i: Calendar, t:"Book" }].map(x => (
            <div key={x.t} className="flex flex-col items-center gap-1.5">
              <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"><x.i className="w-4 h-4 text-blue-600" /></span>
              <span className="text-[11px] text-blue-600 font-medium">{x.t}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
          <div className="flex gap-2"><Clock className="w-4 h-4 text-gray-400" /> <span><b className="text-green-700">Open 24 hours</b> · AI intake answers after hours</span></div>
          <div className="flex gap-2"><MessageSquare className="w-4 h-4 text-gray-400" /> <span>Responds to messages within minutes</span></div>
        </div>
      </div>
    </div>
    <div className="md:col-span-2 grid grid-cols-1 gap-5">
      {[
        { i: Phone, t:"Calls from your profile", d:"Tracked every month" },
        { i: Navigation, t:"Direction requests", d:"People heading to your office" },
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
        role="img" aria-label={`Consultation requests per month, rising from ${reportData[0].leads} in ${reportData[0].m} to ${reportData[reportData.length-1].leads} in ${reportData[reportData.length-1].m}`}
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
            <div className="text-white font-bold">{h.leads} consultation requests</div>
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
        <div className="text-gray-500 text-xs">Your Law Firm · Sample report</div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 text-gray-400">Last 8 months</span>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {[
        { l:"Consultation requests", v:"57", s:"this month" },
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
      <div className="text-sm font-bold text-white mb-1">Consultation requests per month</div>
      <div className="text-[11px] text-gray-500 mb-3">Website forms, calls and AI intake combined</div>
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
            <div className="text-white text-xs font-bold">Your Law Firm</div>
            <div className="text-[10px]" style={{ color: LIME }}>Intake assistant · online</div>
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2.5 text-[11.5px] leading-snug">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[.07] text-gray-200 px-3 py-2">Hi! Is your question about immigration, family or real estate law?</div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 font-medium" style={{ background: LIME, color: DARK }}>Immigration. My work permit expires in 2 months.</div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[.07] text-gray-200 px-3 py-2">Thanks. That's time-sensitive, so I'll flag it as a priority. Which day suits you for a call with a lawyer?</div>
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
      <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Your intake team, in every visitor's pocket</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        Most legal searches happen on a phone. Your AI assistant works on your website, Google Business
        Profile messages, Facebook and WhatsApp, and flags urgent matters for your team first.
      </p>
      <ul className="space-y-3">
        {["Routes each enquiry by practice area", "Flags urgent matters first", "Books consultations in real time", "Sends you a summary of every lead"].map(t => (
          <li key={t} className="flex items-center gap-3 text-sm text-gray-300">
            <Check className="w-4 h-4 shrink-0" style={{ color: LIME }} /> {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SHOWCASE_TABS = [
  { id: "web", label: "Law firm website", icon: Globe, el: <WebsiteSnapshot /> },
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
          title={<>See what we build <span className="grad-text">for law firms</span></>}
          intro="From the website your clients land on, to the Google profile that brings them there, to the report that shows what it's earning you."
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
    <img src={gavelImg} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, rgba(9,9,13,.95) 0%, rgba(9,9,13,.8) 50%, rgba(9,9,13,.55) 100%)" }} />
    <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Right now, someone in your city is searching for <span className="grad-text">a lawyer like you.</span>
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
          Will they find your firm or a competitor's? Get a free audit and see exactly where you stand on
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
          <img src={signingImg} alt="Client signing a retainer agreement with a law firm" loading="lazy"
            className="photo-frame w-[420px] h-[300px] object-cover rounded-3xl border border-white/10" />
          <div className="float-1 glass absolute -left-10 -bottom-8 rounded-2xl px-5 py-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: LIME }}>
              <Award className="w-5 h-5" style={{ color: DARK }} />
            </span>
            <div>
              <div className="text-[11px] text-gray-400">The goal</div>
              <div className="text-sm font-black text-white">More signed clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Client case study: Bridge Legal Services ──────────────────────────────────
// Edit CASE_STUDY to match the exact work delivered for this client.
// Only publish results (rankings, call volume, leads) once you have the real numbers.
const CASE_STUDY = {
  client: "Bridge Legal Services",
  sector: "Legal services",
  summary:
    "Bridge Legal Services came to us to strengthen their online presence and make it easier for people who need legal help to find them and get in touch.",
  scope: [
    "Website design & development",
    "Local SEO & Google Business Profile optimization",
    "On-page SEO for each practice area",
    "Contact and consultation-request flow",
  ],
  tracking: [
    "Map-pack and organic rankings for priority searches",
    "Calls and direction requests from Google Business Profile",
    "Consultation requests from the website",
  ],
};

const CaseStudyVisual = () => (
  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white" role="img"
    aria-label={`Website and Google Business Profile work for ${CASE_STUDY.client}`}>
    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
      <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-gray-400 truncate">{CASE_STUDY.client}</div>
    </div>
    <div className="relative px-7 pt-8 pb-10 overflow-hidden" style={{ background:"#0f1b2d" }}>
      <img src={ladyJusticeImg} alt="" className="absolute inset-0 w-full h-full object-cover object-right" loading="lazy" />
      <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, rgba(15,27,45,.97) 0%, rgba(15,27,45,.85) 50%, rgba(15,27,45,.25) 100%)" }} />
      <div className="relative">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 text-white">
          <Scale className="w-5 h-5 text-amber-300" />
          <span className="font-bold tracking-wide text-sm">{CASE_STUDY.client}</span>
        </div>
        <div className="hidden sm:flex gap-4 text-[11px] text-white/60">
          <span>Services</span><span>About</span><span>Contact</span>
        </div>
      </div>
      <div className="text-white text-2xl sm:text-3xl font-black leading-tight max-w-xs mb-3">Legal help you can rely on.</div>
      <div className="text-white/60 text-xs max-w-xs mb-6">Clear advice, honest fees and a team that answers.</div>
      <div className="inline-flex items-center gap-2 rounded-lg bg-amber-300 px-4 py-2 text-xs font-bold text-[#0f1b2d]">
        <Calendar className="w-3.5 h-3.5" /> Book a consultation
      </div>
      </div>
    </div>
    <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
      {[{ i: Globe, t:"New website" }, { i: MapPin, t:"Google Business Profile" }, { i: Search, t:"Local SEO" }].map(x => (
        <div key={x.t} className="flex flex-col items-center gap-1.5 py-4 px-2 text-center">
          <x.i className="w-4 h-4 text-lime-700" />
          <span className="text-[11px] font-bold text-gray-700">{x.t}</span>
        </div>
      ))}
    </div>
  </div>
);

const CaseStudy = () => (
  <section id="case-study" className="py-24 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Client work"
        title={<>Case study: {CASE_STUDY.client}</>}
        intro="How we're helping a legal practice get found by the people who need them."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <CaseStudyVisual />
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}>
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-lime-100 text-lime-800 mb-4">
            {CASE_STUDY.sector}
          </span>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{CASE_STUDY.summary}</p>

          <h3 className="font-extrabold text-gray-900 mb-3">What we delivered</h3>
          <ul className="space-y-2.5 mb-8">
            {CASE_STUDY.scope.map(s => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-lime-700" /> {s}
              </li>
            ))}
          </ul>

          <h3 className="font-extrabold text-gray-900 mb-3">What we measure every month</h3>
          <ul className="space-y-2.5 mb-8">
            {CASE_STUDY.tracking.map(s => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-gray-700">
                <TrendingUp className="w-4 h-4 mt-0.5 shrink-0 text-lime-700" /> {s}
              </li>
            ))}
          </ul>

          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white" style={{ background: DARK }}>
            Get the same for your firm <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Process ────────────────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", name: "Free growth audit", desc: "We review your website, Google rankings, Google Business Profile, reviews and competitors, then show you where clients are slipping away." },
  { step: "02", name: "Strategy & keyword plan", desc: "We map the practice areas and cities you want to grow in to the exact searches your clients make, and agree on goals together." },
  { step: "03", name: "Build & optimize", desc: "We launch or improve your website, optimize your Google Business Profile, publish content and set up your AI intake assistant." },
  { step: "04", name: "Report & grow", desc: "Each month you get a plain-English report on rankings, calls and consultation requests, plus the next steps to keep growing." },
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
const locations = {
  Canada: ["Toronto", "Vancouver", "Calgary", "Ottawa", "Mississauga", "Brampton", "Edmonton", "Winnipeg", "Hamilton", "Montreal", "Surrey", "Halifax"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Dallas", "Miami", "Phoenix", "Atlanta", "Seattle", "San Diego", "Denver", "Boston"],
};

const Locations = () => (
  <section className="py-24 bg-gray-50 text-gray-900 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Areas we serve"
        title="Lawyer SEO across Canada and the USA"
        intro="We work remotely with law firms in every province and state, and build local SEO campaigns that target the specific cities and neighbourhoods where you want more clients."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(locations).map(([country, cities]) => (
          <div key={country} className="rounded-2xl bg-white border border-gray-100 p-7">
            <h3 className="font-extrabold text-gray-900 text-lg mb-1">Law firm marketing in {country}</h3>
            <p className="text-sm text-gray-500 mb-5">
              {country === "Canada"
                ? "Content written with the Law Society advertising rules of each province in mind."
                : "Content written with state bar attorney-advertising rules in mind."}
            </p>
            <ul className="flex flex-wrap gap-2">
              {cities.map(c => (
                <li key={c} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                  <MapPin className="w-3 h-3 text-lime-700" /> {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Other industries ───────────────────────────────────────────────────────────
const otherIndustries = [
  { icon: Stethoscope, name: "Clinics & healthcare" },
  { icon: Hammer, name: "Contractors & home services" },
  { icon: Home, name: "Real estate & mortgages" },
  { icon: Briefcase, name: "Accountants & consultants" },
  { icon: Wrench, name: "Auto repair & dealerships" },
  { icon: ShoppingBag, name: "Local retail & e-commerce" },
];

const OtherIndustries = () => (
  <section className="py-20 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-5">
        <p className="text-xs font-bold uppercase tracking-widest text-lime-700 mb-3">Beyond legal</p>
        <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">We also help other local businesses grow</h2>
        <p className="text-gray-600 leading-relaxed">
          Law firms are our specialty, but the same mix of website design, local SEO, Google Business Profile
          optimization and AI automation works for any business that depends on local customers.
        </p>
      </div>
      <ul className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {otherIndustries.map(x => (
          <li key={x.name} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
            <x.icon className="w-5 h-5 text-lime-700 shrink-0" />
            <span className="text-sm font-semibold text-gray-800">{x.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─── FAQ (mirrors the FAQPage JSON-LD in index.html — keep both in sync) ───────
const faqs = [
  {
    q: "How long does SEO take for a law firm?",
    a: "Most law firms see early movement in Google Maps and local rankings within the first 2–3 months, especially after a Google Business Profile is fully optimized. Competitive practice areas in large cities, like personal injury in Toronto or Los Angeles, usually take 6–12 months of consistent work to reach the top positions.",
  },
  {
    q: "Do you work with law firms in both Canada and the USA?",
    a: "Yes. We work remotely with law firms, lawyers, attorneys and licensed paralegals across Canada and the United States, and build local SEO campaigns around the specific cities you want to win clients in.",
  },
  {
    q: "Is your marketing compliant with law society and bar advertising rules?",
    a: "We write content with the Law Society advertising rules in Canada and state bar attorney-advertising rules in the USA in mind. That means no guaranteed outcomes, no misleading claims and no 'specialist' language unless you are certified. You review and approve everything before it goes live.",
  },
  {
    q: "Will an AI chatbot give legal advice to my visitors?",
    a: "No. Your AI intake assistant gives general information about your firm, collects the details of the enquiry, qualifies the lead and books a consultation. It is set up to make clear that it does not provide legal advice and to hand complex questions to your team.",
  },
  {
    q: "What is AI search visibility, and why does it matter for lawyers?",
    a: "More people now ask ChatGPT, Google AI Overviews, Gemini or Perplexity to recommend a lawyer. AI search visibility (also called GEO or AEO) means structuring your website, reviews and online profiles so these tools understand your firm and are more likely to mention you.",
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
        <SectionHeading dark eyebrow="FAQ" title="Questions law firms ask us" />
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
  "Full law firm growth package",
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
  businessType: "Law firm",
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
          <input id="f-email" type="email" required autoComplete="email" value={formData.email} onChange={set("email")} placeholder="jane@yourfirm.com" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-phone" className={labelCls}>Phone</label>
          <input id="f-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={set("phone")} placeholder="+1 (416) 555-0123" className={inputCls} />
        </div>
        <div>
          <label htmlFor="f-firm" className={labelCls}>Firm / business name</label>
          <input id="f-firm" type="text" autoComplete="organization" value={formData.firm} onChange={set("firm")} placeholder="Smith Law Professional Corp." className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="f-website" className={labelCls}>Current website</label>
        <input id="f-website" type="text" inputMode="url" value={formData.website} onChange={set("website")} placeholder="yourfirm.com" className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="f-type" className={labelCls}>Business type</label>
          <div className="relative">
            <select id="f-type" value={formData.businessType} onChange={set("businessType")} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
              {["Law firm", "Solo lawyer / attorney", "Paralegal practice", "Other business"].map(o => <option key={o}>{o}</option>)}
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
          placeholder="e.g. More personal injury clients in Toronto, rank in Google Maps, stop missing after-hours enquiries..."
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
          Ready to get <span style={{ color:LIME }}>more clients</span> for your firm?
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
          Request a free, no-obligation growth audit. We'll review your website, Google rankings and
          Google Business Profile and send you a clear action plan.
        </p>
        <ul className="space-y-4 mb-8">
          {[
            "Free website, SEO & Google Business Profile audit",
            "Competitor comparison for your city and practice area",
            "Clear plan and fixed quote, with no pressure",
          ].map(t => (
            <li key={t} className="flex items-center gap-3">
              <Check className="w-5 h-5 shrink-0" style={{ color: LIME }} />
              <span className="text-gray-300 text-sm">{t}</span>
            </li>
          ))}
        </ul>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white">
          <MessageSquare className="w-4 h-4" style={{ color: LIME }} /> Prefer to chat? Message us on WhatsApp
        </a>
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
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div className="lg:col-span-2">
        <div className="mb-4"><Logo /></div>
        <p className="text-sm leading-relaxed max-w-sm">
          {BRAND} is a law firm marketing and AI automation agency. Digital growth, search visibility and
          intelligent business automation for law firms and local businesses across Canada and the USA.
        </p>
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">Services</div>
        <ul className="space-y-2.5">
          {servicesList.map(s => (
            <li key={s.label}><a href="#services" className="text-sm hover:text-white transition-colors">{s.label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">Company</div>
        <ul className="space-y-2.5">
          {[
            { l: "Case Study", h: "#case-study" },
            { l: "Our Process", h: "#process" },
            { l: "FAQ", h: "#faq" },
            { l: "Pricing", h: "#pricing" },
            { l: "Free Growth Audit", h: "#contact" },
          ].map(x => (
            <li key={x.l}><a href={x.h} className="text-sm hover:text-white transition-colors">{x.l}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
      <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
      <span>We are a marketing agency, not a law firm, and do not provide legal advice.</span>
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
        <LawFirmProblem />
        <Services />
        <Showcase />
        <PracticeAreas />
        <ChatbotSection />
        <CaseStudy />
        <PhotoCta />
        <ProcessTimeline />
        <Locations />
        <OtherIndustries />
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
