import { useState, useEffect, useRef, Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Menu, X, Phone, MapPin, Mail, Clock, Camera, ChevronRight, ChevronDown,
  Sparkles, GraduationCap, Users, BookOpen, CalendarCheck, FileText,
  CheckCircle2, ArrowRight, Send, Languages, ShieldCheck, Video, TreePine,
  HeartHandshake, Puzzle, Trophy, SmilePlus, Star, PartyPopper,
  Bus, Droplets, Library, Monitor, Computer, Brain, Palette, Music, Dumbbell, UsersRound, Utensils,
  Award, Medal, Crown,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Palette pulled from the school's own building paint and
   uniforms: warm gold + deep maroon on a soft cream ground,
   with campus green and uniform-pink used only as accents.
   Custom colors live as CSS classes (not Tailwind arbitrary
   values, since this environment has no JIT compiler) so the
   Tailwind core utility classes handle layout/spacing/shadow
   and these classes handle brand color.
   ============================================================ */
function BrandStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');

      :root{
        --cream:#FFF8EA; --cream2:#FBEEDA; --cream3:#F6E4C4;
        --gold:#F0A828; --gold-light:#FBD98A; --gold-dark:#C97F0E;
        --maroon:#7A2331; --maroon-dark:#551620; --maroon-light:#A5455A;
        --green:#4F7A45; --green-light:#EAF2E6;
        --pink:#D97B94; --ink:#3A2A1E;
      }
      .font-display{ font-family:'Quicksand',sans-serif; }
      .font-body{ font-family:'Nunito',sans-serif; }

      .bg-cream{ background-color:var(--cream); }
      .bg-cream2{ background-color:var(--cream2); }
      .bg-cream3{ background-color:var(--cream3); }
      .bg-gold{ background-color:var(--gold); }
      .bg-gold-light{ background-color:var(--gold-light); }
      .bg-gold-dark{ background-color:var(--gold-dark); }
      .bg-maroon{ background-color:var(--maroon); }
      .bg-maroon-dark{ background-color:var(--maroon-dark); }
      .bg-green{ background-color:var(--green); }
      .bg-green-light{ background-color:var(--green-light); }
      .bg-pink{ background-color:var(--pink); }

      .text-gold{ color:var(--gold); }
      .text-gold-dark{ color:var(--gold-dark); }
      .text-maroon{ color:var(--maroon); }
      .text-maroon-dark{ color:var(--maroon-dark); }
      .text-green{ color:var(--green); }
      .text-ink{ color:var(--ink); }
      /* Explicit color+opacity combinations (written out, since the slash-opacity
         modifier syntax needs a JIT compiler to generate arbitrary combos, which
         this static-stylesheet environment doesn't have) */
      .text-ink-80{ color:rgba(58,42,30,0.8); }
      .text-ink-75{ color:rgba(58,42,30,0.75); }
      .text-ink-70{ color:rgba(58,42,30,0.7); }
      .text-ink-60{ color:rgba(58,42,30,0.6); }
      .text-maroon-dark-80{ color:rgba(85,22,32,0.8); }
      .text-maroon-dark-70{ color:rgba(85,22,32,0.7); }
      .text-maroon-dark-50{ color:rgba(85,22,32,0.5); }
      .text-gold-light-90{ color:rgba(251,217,138,0.9); }
      .text-gold-light-85{ color:rgba(251,217,138,0.85); }
      .text-gold-light-80{ color:rgba(251,217,138,0.8); }
      .text-gold-light-60{ color:rgba(251,217,138,0.6); }
      .bg-gold-light-60{ background-color:rgba(251,217,138,0.6); }
      .border-gold-light-40{ border-color:rgba(251,217,138,0.4); }
      .border-green-30{ border-color:rgba(79,122,69,0.3); }
      .bg-cream-60{ background-color:rgba(255,248,234,0.6); }
      .bg-cream-50{ background-color:rgba(255,248,234,0.5); }
      .border-white-10{ border-color:rgba(255,255,255,0.1); }
      .bg-white-95{ background-color:rgba(255,255,255,0.95); }
      .bg-white-90{ background-color:rgba(255,255,255,0.9); }
      .bg-white-80{ background-color:rgba(255,255,255,0.8); }
      .bg-white-70{ background-color:rgba(255,255,255,0.7); }

      .border-gold{ border-color:var(--gold); }
      .border-gold-light{ border-color:var(--gold-light); }
      .border-maroon{ border-color:var(--maroon); }

      .pencil-stripe{
        background-image:repeating-linear-gradient(45deg,var(--gold) 0 14px,var(--maroon) 14px 28px);
      }
      .pencil-stripe-thin{
        background-image:repeating-linear-gradient(45deg,var(--gold) 0 7px,var(--maroon) 7px 14px);
      }

      .glass-nav{
        background:rgba(255,248,234,0.72);
        backdrop-filter:blur(14px);
        -webkit-backdrop-filter:blur(14px);
        border-bottom:1px solid rgba(240,168,40,0.35);
      }
      .glass-card{
        background:rgba(255,255,255,0.6);
        backdrop-filter:blur(10px);
        -webkit-backdrop-filter:blur(10px);
        border:1px solid rgba(255,255,255,0.7);
      }

      .hover-lift{ transition:transform .25s ease, box-shadow .25s ease; }
      .hover-lift:hover{ transform:translateY(-6px); box-shadow:0 20px 40px -12px rgba(122,35,49,0.25); }

      /* Interactive states written as real :hover rules — Tailwind's hover: prefix
         needs a compiler to generate variants for custom (non-core) classes, which
         this static-stylesheet environment doesn't have. */
      .btn-primary{ background:var(--maroon); color:#fff; transition:background-color .2s ease, transform .2s ease; }
      .btn-primary:hover{ background:var(--maroon-dark); transform:translateY(-2px); }
      .btn-gold{ background:var(--gold); color:var(--maroon-dark); transition:background-color .2s ease, color .2s ease, transform .2s ease; }
      .btn-gold:hover{ background:var(--gold-dark); color:#fff; transform:translateY(-2px); }
      .btn-outline{ background:rgba(255,255,255,0.9); color:var(--maroon); border:2px solid var(--maroon); transition:background-color .2s ease, color .2s ease; }
      .btn-outline:hover{ background:var(--maroon); color:#fff; }
      .nav-link-inactive:hover{ background:rgba(251,217,138,0.6); }
      .footer-link:hover{ color:#fff; }
      .link-arrow{ color:var(--maroon); transition:color .2s ease; }
      .link-arrow:hover{ color:var(--maroon-dark); }
      .filter-btn-inactive:hover{ border-color:var(--maroon); }

      @keyframes spin-slow{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
      .animate-spin-slow{ animation:spin-slow 40s linear infinite; }
      @keyframes bob{ 0%,100%{ transform:translateY(0px); } 50%{ transform:translateY(-10px); } }
      .animate-bob{ animation:bob 4s ease-in-out infinite; }
      @keyframes marquee-scroll{ 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
      .marquee-track{ animation:marquee-scroll 36s linear infinite; }
      .marquee-track:hover{ animation-play-state:paused; cursor:default; }
      @media (prefers-reduced-motion: reduce){
        .animate-spin-slow, .animate-bob, .marquee-track{ animation:none; }
      }

      .focus-ring:focus-visible{ outline:3px solid var(--maroon); outline-offset:2px; border-radius:8px; }

      /* ── Scroll-reveal animations ── */
      @keyframes fadeInUp{
        from{ opacity:0; transform:translateY(32px); }
        to{ opacity:1; transform:translateY(0); }
      }
      .fade-in-up{ opacity:0; transform:translateY(32px); transition:opacity 0.65s ease, transform 0.65s ease; }
      .fade-in-up.is-visible{ opacity:1; transform:translateY(0); }

      .stagger-card{ opacity:0; transform:translateY(28px); transition:opacity 0.55s ease, transform 0.55s ease; }
      .stagger-card.is-visible{ opacity:1; transform:translateY(0); }

      /* ── Feature hover scale ── */
      .feature-scale{ transition:transform 0.25s ease, box-shadow 0.25s ease; }
      .feature-scale:hover{ transform:scale(1.05); box-shadow:0 20px 40px -12px rgba(122,35,49,0.28); }

      /* ── Vision / Mission asymmetric hover ── */
      .vision-card{ transition:transform 0.3s ease, box-shadow 0.3s ease; }
      .vision-card:hover{ transform:translateY(-10px); box-shadow:0 30px 50px -14px rgba(122,35,49,0.32); }
      .mission-card{ transition:transform 0.3s ease, box-shadow 0.3s ease; }
      .mission-card:hover{ transform:translateY(-10px); box-shadow:0 30px 50px -14px rgba(122,35,49,0.28); }

      /* ── Stat divider ── */
      .stat-divider{ width:1px; height:72px; background:var(--maroon); opacity:0.2; flex-shrink:0; align-self:center; }

      /* ── Swiper faculty overrides ── */
      .faculty-swiper{ padding-bottom:52px !important; }
      .faculty-swiper .swiper-button-prev,
      .faculty-swiper .swiper-button-next{
        width:42px; height:42px; border-radius:50%;
        background:var(--gold); color:var(--maroon-dark) !important;
        box-shadow:0 4px 16px rgba(122,35,49,0.2);
        top:42%;
      }
      .faculty-swiper .swiper-button-prev::after,
      .faculty-swiper .swiper-button-next::after{ font-size:15px !important; font-weight:900; }
      .faculty-swiper .swiper-pagination-bullet{ background:var(--gold); opacity:0.5; }
      .faculty-swiper .swiper-pagination-bullet-active{ background:var(--maroon); opacity:1; }
    `}</style>
  );
}

/* ============================================================
   ANIMATION HOOKS
   ============================================================ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, suffix, duration, inView) {
  const [display, setDisplay] = useState('0' + suffix);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = Math.ceil(duration / 16);
    const id = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      const val = Math.round(eased * target);
      setDisplay(val + suffix);
      if (frame >= total) { setDisplay(target + suffix); clearInterval(id); }
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, suffix, duration]);
  return display;
}

function useParallax(speed = 0.2) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

/* ============================================================
   SIGNATURE ELEMENT — Emblem (sunburst over open book)
   Reused as the nav logo, hero crest, section-eyebrow badge,
   and footer mark: the one motif that ties every page together.
   ============================================================ */
function Emblem({ size = 56, ring = true, className = "" }) {
  const rays = [...Array(9)].map((_, i) => {
    const deg = -160 + i * 20;
    const rad = (deg * Math.PI) / 180;
    const x1 = 50 + Math.cos(rad) * 21;
    const y1 = 40 + Math.sin(rad) * 21;
    const x2 = 50 + Math.cos(rad) * 34;
    const y2 = 40 + Math.sin(rad) * 34;
    return { x1, y1, x2, y2, key: i };
  });
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {ring && (
        <div
          className="absolute inset-0 rounded-full bg-cream border-2 border-gold shadow-md"
          style={{ boxShadow: "0 4px 14px rgba(122,35,49,0.18)" }}
        />
      )}
      <svg viewBox="0 0 100 100" width={size * 0.74} height={size * 0.74} className="relative">
        <g stroke="var(--gold-dark)" strokeWidth="3.4" strokeLinecap="round">
          {rays.map((r) => (
            <line key={r.key} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </g>
        <circle cx="50" cy="40" r="8.5" fill="var(--gold)" />
        <path d="M50 46 C36 39 20 40 12 46 L12 68 C20 62 36 61 50 68 Z" fill="var(--maroon)" />
        <path d="M50 46 C64 39 80 40 88 46 L88 68 C80 62 64 61 50 68 Z" fill="var(--maroon)" />
        <path d="M50 48.5 C38.5 43 24 43.5 17 47.5 L17 65 C24 61.5 38.5 61 50 65.5 Z" fill="var(--cream)" />
        <path d="M50 48.5 C61.5 43 76 43.5 83 47.5 L83 65 C76 61.5 61.5 61 50 65.5 Z" fill="var(--cream)" />
        <line x1="50" y1="48.5" x2="50" y2="65.5" stroke="var(--maroon)" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* Diagonal pencil-stripe divider — used between major sections on every page */
function PencilDivider({ thin = false, className = "" }) {
  return (
    <div
      className={`w-full h-2.5 md:h-3 ${thin ? "pencil-stripe-thin" : "pencil-stripe"} ${className}`}
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}

/* Small eyebrow label used at the top of every section, carrying the emblem motif */
function Eyebrow({ children, light = false }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <Emblem size={26} ring={false} />
      <span
        className={`font-display font-bold uppercase tracking-widest text-xs md:text-sm ${
          light ? "text-gold-light" : "text-maroon"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ============================================================
   MASCOTS — simple flat illustrations echoing the school's
   maroon/gold uniform styling
   ============================================================ */
function Mascot({ variant = "girl", size = 140, className = "" }) {
  const isGirl = variant === "girl";
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className}>
      <ellipse cx="100" cy="228" rx="55" ry="9" fill="var(--maroon)" opacity="0.12" />
      {/* legs */}
      <rect x="78" y="170" width="16" height="46" rx="8" fill="var(--ink)" opacity="0.85" />
      <rect x="106" y="170" width="16" height="46" rx="8" fill="var(--ink)" opacity="0.85" />
      <rect x="74" y="208" width="24" height="12" rx="5" fill="var(--maroon-dark)" />
      <rect x="102" y="208" width="24" height="12" rx="5" fill="var(--maroon-dark)" />
      {/* body / uniform */}
      <path d="M62 110 C62 92 78 82 100 82 C122 82 138 92 138 110 L134 176 C134 184 126 190 116 190 L84 190 C74 190 66 184 66 176 Z" fill="var(--maroon)" />
      {isGirl ? (
        <path d="M70 176 L60 190 L84 190 Z M130 176 L140 190 L116 190 Z" fill="var(--maroon-dark)" />
      ) : null}
      {/* tie stripes */}
      <path d="M96 92 L104 92 L108 130 L100 140 L92 130 Z" fill="var(--gold)" />
      <path d="M98 100 L102 100 L104 118 L100 122 L96 118 Z" fill="var(--cream)" />
      {/* arms */}
      <rect x="46" y="112" width="16" height="52" rx="8" fill="var(--maroon)" />
      <rect x="138" y="112" width="16" height="52" rx="8" fill="var(--maroon)" />
      <circle cx="54" cy="168" r="9" fill="#E8B98C" />
      <circle cx="146" cy="168" r="9" fill="#E8B98C" />
      {/* neck + head */}
      <rect x="92" y="66" width="16" height="18" fill="#E8B98C" />
      <circle cx="100" cy="52" r="30" fill="#E8B98C" />
      {/* hair */}
      {isGirl ? (
        <>
          <path d="M70 46 C70 20 130 20 130 46 C130 34 118 26 100 26 C82 26 70 34 70 46 Z" fill="var(--ink)" />
          <path d="M68 44 C64 60 66 78 74 88 C70 74 70 58 74 46 Z" fill="var(--ink)" />
          <path d="M132 44 C136 60 134 78 126 88 C130 74 130 58 126 46 Z" fill="var(--ink)" />
          <circle cx="70" cy="40" r="6" fill="var(--pink)" />
        </>
      ) : (
        <path d="M70 40 C70 20 130 20 130 40 C130 30 116 22 100 22 C84 22 70 30 70 40 Z" fill="var(--ink)" />
      )}
      {/* face */}
      <circle cx="90" cy="54" r="3" fill="var(--ink)" />
      <circle cx="110" cy="54" r="3" fill="var(--ink)" />
      <path d="M90 64 Q100 72 110 64" stroke="var(--maroon-dark)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="82" cy="60" r="5" fill="var(--pink)" opacity="0.5" />
      <circle cx="118" cy="60" r="5" fill="var(--pink)" opacity="0.5" />
      {/* bag */}
      <rect x="140" y="120" width="26" height="34" rx="7" fill="var(--gold)" />
      <rect x="146" y="112" width="14" height="14" rx="6" fill="var(--gold-dark)" />
    </svg>
  );
}

/* ============================================================
   REUSABLE UI PRIMITIVES
   ============================================================ */
function CTAButton({ children, variant = "primary", onClick, icon: Icon = ArrowRight, className = "" }) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 font-display font-bold rounded-full px-6 py-3 text-sm md:text-base shadow-lg";
  const styles =
    variant === "primary" ? "btn-primary" : variant === "gold" ? "btn-gold" : "btn-outline";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
}

function FeatureCard({ icon: Icon, title, desc, className = "" }) {
  return (
    <div className={`hover-lift glass-card rounded-3xl p-6 shadow-md border-t-4 border-gold flex flex-col gap-3 h-full w-full ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-maroon flex items-center justify-center shadow-sm shrink-0">
        <Icon size={22} className="text-white" strokeWidth={2.2} />
      </div>
      <h3 className="font-display font-bold text-lg text-maroon-dark leading-snug">{title}</h3>
      <p className="font-body text-sm text-ink-70 leading-relaxed">{desc}</p>
    </div>
  );
}

/* Reusable placeholder for a real photo — sized/composed like the actual shot would be.
   Uses an inline aspectRatio style rather than a Tailwind aspect-[] class, since this
   environment has no JIT compiler to generate arbitrary-value utility classes. */
function ImagePlaceholder({ src, label, caption, ratio = "4 / 3", tone = "gold", className = "" }) {
  if (src) {
    return (
      <div
        className={`relative rounded-3xl overflow-hidden shadow-lg border-4 border-white ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <img src={src} alt={label || "School Image"} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-2 pencil-stripe-thin" />
      </div>
    );
  }
  const grad =
    tone === "gold"
      ? "linear-gradient(135deg, var(--gold-light) 0%, var(--cream3) 60%, var(--gold) 100%)"
      : tone === "green"
      ? "linear-gradient(135deg, var(--green-light) 0%, var(--cream3) 55%, var(--green) 100%)"
      : "linear-gradient(135deg, var(--cream3) 0%, var(--pink) 100%)";
  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-lg border-4 border-white ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center" style={{ backgroundImage: grad }}>
        <Camera size={30} className="text-maroon-dark-50" strokeWidth={1.6} />
        <span className="font-display font-bold text-maroon-dark-70 text-sm md:text-base">{label}</span>
        {caption && <span className="font-body text-xs text-maroon-dark-50">{caption}</span>}
      </div>
      <div className="absolute top-0 left-0 w-full h-2 pencil-stripe-thin" />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="inline-block bg-gold-light text-maroon-dark font-display font-bold text-xs md:text-sm px-4 py-1.5 rounded-full">
      {children}
    </span>
  );
}

function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-maroon overflow-hidden">
      <div className="absolute -right-16 -top-16 opacity-20 animate-spin-slow" aria-hidden="true">
        <Emblem size={260} ring={false} />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight max-w-2xl">{title}</h1>
        {subtitle && <p className="font-body text-gold-light-90 mt-4 max-w-xl text-base md:text-lg">{subtitle}</p>}
      </div>
      <PencilDivider />
    </section>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "academics", label: "Academics" },
    { id: "gallery", label: "Gallery" },
    { id: "admissions", label: "Admissions" },
    { id: "contact", label: "Contact" },
  ];
  const go = (id) => {
    setPage(id);
    setOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 glass-nav">
      <nav className="max-w-6xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between">
        <button onClick={() => go("home")} className="focus-ring flex items-center gap-2.5 sm:gap-3 text-left min-w-0">
          <Emblem size={40} className="shrink-0 sm:w-[46px] sm:h-[46px]" />
          <span className="leading-tight truncate">
            <span className="block font-display font-extrabold text-maroon-dark text-sm sm:text-base md:text-lg truncate">Model Primary School</span>
            <span className="hidden sm:block font-body text-xs text-ink-60 truncate">Bharsare, Bhadaiyan, Sultanpur</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`focus-ring font-display font-semibold text-sm px-4 py-2 rounded-full transition-colors ${
                page === l.id ? "bg-maroon text-white" : "text-maroon-dark nav-link-inactive"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <CTAButton variant="gold" onClick={() => go("admissions")}>
            Enroll Now
          </CTAButton>
        </div>

        <button
          className="focus-ring lg:hidden p-2 rounded-xl bg-white-70 border border-gold-light text-maroon-dark"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-cream border-t border-gold-light px-5 pb-5 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`focus-ring text-left font-display font-semibold text-sm px-4 py-3 rounded-2xl ${
                page === l.id ? "bg-maroon text-white" : "text-maroon-dark nav-link-inactive"
              }`}
            >
              {l.label}
            </button>
          ))}
          <CTAButton variant="primary" onClick={() => go("admissions")} className="mt-2 w-full">
            Enroll Now
          </CTAButton>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ setPage }) {
  return (
    <footer className="bg-maroon-dark text-cream">
      <PencilDivider />
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Emblem size={48} />
            <span className="font-display font-extrabold text-lg text-white">Model Primary School</span>
          </div>
          <p className="font-body text-sm text-gold-light-80 max-w-sm leading-relaxed">
            A government-recognized English medium school for LKG to Class 5, proudly serving the children of
            Bharsare, Bhadaiyan and the wider Sultanpur community — Model in Education.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-gold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-gold-light-85">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About Us" },
              { id: "academics", label: "Academics" },
              { id: "gallery", label: "Gallery" },
              { id: "admissions", label: "Admissions" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <li key={id}>
                <button onClick={() => setPage(id)} className="focus-ring footer-link">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-gold mb-3 text-sm uppercase tracking-wide">Reach Us</h4>
          <ul className="flex flex-col gap-3 font-body text-sm text-gold-light-85">
            <li className="flex gap-2"><MapPin size={18} className="shrink-0 mt-0.5" /><span>Bharsare, Bhadaiyan, Sultanpur, Uttar Pradesh</span></li>
            <li className="flex gap-2"><Phone size={18} className="shrink-0 mt-0.5" /><span className="italic text-gold-light-60">[Add phone number]</span></li>
            <li className="flex gap-2"><Clock size={18} className="shrink-0 mt-0.5" /><span>Mon – Sat, 8:00 AM – 2:00 PM</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white-10 py-5 text-center font-body text-xs text-gold-light-60">
        © {new Date().getFullYear()} Model Primary School — Model in Education. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingCall() {
  return (
    <a
      href="tel:"
      className="focus-ring fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-gold text-maroon-dark font-display font-bold px-4 py-3 rounded-full shadow-2xl hover-lift"
      title="[Add phone number]"
    >
      <Phone size={18} />
      <span className="hidden sm:inline text-sm">Call Us</span>
    </a>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
const whyChooseUsTabs = [
  {
    id: 'academics',
    label: 'Academics & Teachers',
    icon: GraduationCap,
    features: [
      { icon: Languages,    title: 'English Medium Education',         desc: 'Structured English-medium instruction that builds strong communication skills from the very first year.' },
      { icon: HeartHandshake, title: 'Caring & Experienced Teachers',  desc: 'Warm, experienced teachers who know each child by name and nurture them like their own.' },
      { icon: Puzzle,       title: 'Activity-Based & Joyful Learning', desc: 'Lessons built around hands-on activities, so children learn by doing, not just by listening.' },
      { icon: Trophy,       title: 'Co-Curricular & Sports Activities',desc: 'Regular sports, games and co-curricular events that build confidence beyond the classroom.' },
    ],
  },
  {
    id: 'safety',
    label: 'Campus Safety',
    icon: ShieldCheck,
    features: [
      { icon: ShieldCheck,  title: 'Government Recognized Institution', desc: 'A fully government-recognized school, so your child\'s early education stands on solid, certified ground.' },
      { icon: Video,        title: 'Safe & Secure Campus with CCTV',    desc: 'The full campus is monitored with CCTV surveillance, giving parents complete peace of mind through the school day.' },
      { icon: Bus,          title: 'Safe & Reliable Transport',          desc: 'Convenient transport facilities available for students to ensure a safe and comfortable commute every day.' },
      { icon: SmilePlus,    title: 'Discipline with a Friendly Environment', desc: 'A gently disciplined, friendly campus where children feel secure enough to be themselves.' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: Library,
    features: [
      { icon: TreePine,     title: 'Dedicated Outdoor Play Area',       desc: 'A generous, green outdoor play area where children run, climb and play every single day.' },
      { icon: Droplets,     title: 'Health & Hygiene First',            desc: '24/7 running water supply and RO water coolers on campus to keep children hydrated and healthy.' },
      { icon: Library,      title: 'Well-Stocked Reading Library',      desc: 'A curated knowledge hub library with books that spark curiosity and instill a love of reading from an early age.' },
    ],
  },
];

const classLevels = [
  { level: "LKG", age: "3 – 4 yrs", focus: "Rhymes, play-based learning, motor skills" },
  { level: "UKG", age: "4 – 5 yrs", focus: "Phonics, pre-writing, number sense" },
  { level: "Class 1", age: "5 – 6 yrs", focus: "Foundational English, Hindi & Maths" },
  { level: "Class 2", age: "6 – 7 yrs", focus: "Reading fluency, EVS, basic science" },
  { level: "Class 3", age: "7 – 8 yrs", focus: "Grammar, applied Maths, GK" },
  { level: "Class 4", age: "8 – 9 yrs", focus: "Composition, EVS projects, mental Maths" },
  { level: "Class 5", age: "9 – 10 yrs", focus: "Exam readiness for upper primary" },
];

function WhyTabs({ light = false }) {
  const [activeTab, setActiveTab] = useState('academics');
  const active = whyChooseUsTabs.find((t) => t.id === activeTab);
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-stretch">
      {/* Tab buttons — left column / mobile top row */}
      <div className="flex flex-row md:flex-col gap-2.5 w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
        {whyChooseUsTabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`focus-ring flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-4 rounded-2xl font-display font-bold text-xs sm:text-sm md:text-base text-left transition-all whitespace-nowrap md:whitespace-normal shrink-0 md:shrink ${
                isActive
                  ? light
                    ? 'bg-gold text-maroon-dark shadow-lg scale-[1.02]'
                    : 'bg-maroon text-white shadow-lg scale-[1.02]'
                  : light
                    ? 'bg-white-10 text-white border border-white-20 hover:bg-white-20'
                    : 'bg-white text-maroon-dark border-2 border-gold-light hover:border-maroon-light'
              }`}
              style={{ minWidth: '150px' }}
            >
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isActive ? (light ? 'bg-maroon text-white' : 'bg-gold text-maroon-dark') : (light ? 'bg-white-20 text-white' : 'bg-cream2 text-maroon')
              }`}>
                <TabIcon size={16} strokeWidth={2} />
              </div>
              <span>{tab.label}</span>
              {isActive && (
                <ChevronRight size={16} className="ml-auto shrink-0 hidden md:block" />
              )}
            </button>
          );
        })}
      </div>
      {/* Content panel — right side */}
      <div className={`flex-1 rounded-2xl md:rounded-3xl shadow-lg p-5 md:p-8 border-t-4 ${
        light ? 'bg-white-95 border-gold text-maroon-dark' : 'bg-white border-gold'
      }`}>
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-maroon flex items-center justify-center shrink-0">
            <active.icon size={20} className="text-gold" strokeWidth={2} />
          </div>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-maroon-dark">{active.label}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
          {active.features.map((f) => (
            <div key={f.title} className="flex gap-3.5 items-start p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-cream2 hover:bg-cream3 transition-colors">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-maroon flex items-center justify-center shrink-0 mt-0.5">
                <f.icon size={16} className="text-gold" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-display font-bold text-maroon-dark text-xs md:text-sm leading-snug">{f.title}</h4>
                <p className="font-body text-xs text-ink-60 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-cream overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-90 animate-spin-slow hidden md:block" aria-hidden="true">
          <Emblem size={200} ring={false} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24 flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-center relative">
          {/* Left Column wrapper: contents on mobile so children participate in main flex container, flex-col on desktop */}
          <div className="contents md:flex md:flex-col md:col-span-5">
            {/* 1. Headings & Paragraph text */}
            <div className="order-1 md:order-1">
              <SectionLabel>Admissions Open 2026–27</SectionLabel>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-maroon-dark leading-tight mt-4 md:mt-5">
                Nurturing Little Minds, <span className="text-gold-dark">Building Bright Futures</span>
              </h1>
              <p className="font-body text-ink-70 text-base md:text-lg mt-4 md:mt-5 leading-relaxed">
                Model Primary School is a government-recognized English medium school for LKG to Class 5 in Bharsare,
                Bhadaiyan, Sultanpur — where every child learns, plays & grows.
              </p>
            </div>

            {/* 3. Facility Tags (Mobile Order 3, Desktop Order 3) */}
            <div className="order-3 md:order-3 flex flex-wrap gap-2.5 sm:gap-3 mt-1 md:mt-8">
              {["English Medium", "Govt. Recognized", "CCTV Campus", "LKG – Class 5"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 bg-white-80 border border-gold-light rounded-full px-3.5 py-1.5 text-xs md:text-sm font-body font-semibold text-maroon-dark shadow-sm">
                  <CheckCircle2 size={14} className="text-green" /> {t}
                </span>
              ))}
            </div>

            {/* 4. Call-to-Action Buttons (Mobile Order 4, Desktop Order 2) */}
            <div className="order-4 md:order-2 flex flex-col sm:flex-row flex-wrap gap-3 mt-2 md:mt-8">
              <CTAButton variant="primary" onClick={() => setPage("admissions")} className="w-full sm:w-auto">Enroll Now — Admissions 2026-27</CTAButton>
              <CTAButton variant="outline" icon={ChevronRight} onClick={() => setPage("about")} className="w-full sm:w-auto">Explore Programs</CTAButton>
            </div>
          </div>

          {/* 2. School Image (Mobile Order 2, Desktop Right Column) */}
          <div className="order-2 md:order-none md:col-span-7 relative w-full my-2 md:my-0">
            <ImagePlaceholder src="/hero_home.png" label="School building & entrance" caption="Pencil-and-book branded exterior" ratio="4 / 3" className="w-full shadow-2xl" />
            <div className="absolute -bottom-8 -left-8 hidden sm:block animate-bob">
              <Mascot variant="girl" size={120} />
            </div>
            <div className="absolute -top-6 -right-6 hidden sm:flex bg-white glass-card rounded-2xl shadow-xl px-4 py-3 items-center gap-2">
              <Emblem size={30} ring={false} />
              <span className="font-display font-bold text-maroon-dark text-xs leading-tight">Model in<br />Education</span>
            </div>
          </div>
        </div>
        <PencilDivider />
      </section>

      {/* WHY CHOOSE US — Interactive Tabs */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>Why Families Choose Us</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">A School Built Around Every Child</h2>
          </div>
          <WhyTabs />
        </div>
      </section>

      <PencilDivider thin />

      {/* CLASSES WE OFFER — Vertical Timeline */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center"><Eyebrow>Classes We Offer</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">LKG to Class 5</h2>
            <p className="font-body text-ink-60 mt-3 text-sm">A clear learning journey from early play-based discovery to exam-ready foundations.</p>
          </div>
          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, var(--gold), var(--maroon))' }} />
            <div className="flex flex-col gap-10">
              {classLevels.map((c, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={c.level} className={`flex items-center gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block bg-white rounded-2xl px-6 py-4 shadow-md border-2 ${isLeft ? 'border-l-4 border-l-maroon border-t border-r border-b border-gold-light' : 'border-r-4 border-r-maroon border-t border-l border-b border-gold-light'}`}>
                        <h3 className="font-display font-extrabold text-xl text-maroon-dark">{c.level}</h3>
                        <p className="font-body text-xs font-bold mt-0.5" style={{ color: 'var(--gold-dark)' }}>{c.age}</p>
                        <p className="font-body text-sm text-ink-60 mt-1.5 leading-snug">{c.focus}</p>
                      </div>
                    </div>
                    {/* Node */}
                    <div className="relative z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white" style={{ background: 'var(--gold)' }}>
                      <GraduationCap size={22} className="text-maroon-dark" strokeWidth={2} />
                    </div>
                    {/* Spacer for the other side */}
                    <div className="flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BRIEF */}
      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative">
          <ImagePlaceholder src="/students_assembly.png" label="Morning assembly" caption="Students in maroon & pink uniforms" tone="pink" ratio="5 / 4" />
          <div>
            <Eyebrow light>About Our School</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">Where Every Child Learns, Plays & Grows</h2>
            <p className="font-body text-gold-light-85 mt-4 leading-relaxed">
              Model Primary School has been a trusted name for early education in Bharsare and the surrounding
              Bhadaiyan community, offering a government-recognized, English medium curriculum from LKG to Class 5
              in a safe, joyful and disciplined environment.
            </p>
            <CTAButton variant="gold" onClick={() => setPage("about")} className="mt-6">Read Our Story</CTAButton>
          </div>
        </div>
      </section>

      {/* EVENT HIGHLIGHTS */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <Eyebrow>Life at School</Eyebrow>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Event Highlights</h2>
            </div>
            <button onClick={() => setPage("gallery")} className="focus-ring font-display font-bold link-arrow flex items-center gap-1">
              View Full Gallery <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <ImagePlaceholder src="/annual_event.png" label="Prize Distribution" caption="Annual event under the tent canopy" />
            <ImagePlaceholder src="/outdoor_fun.png" label="Outdoor Group Activity" caption="Games on the school ground" tone="green" />
            <ImagePlaceholder src="/yoga_activity.png" label="Playground Fun" caption="Slide & greenery play area" tone="pink" />
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="bg-gold py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <PartyPopper className="mx-auto text-maroon-dark mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">Admissions 2026-27 Open — Limited Seats Available</h2>
          <p className="font-body text-maroon-dark-80 mt-2">Secure your child's seat at Model Primary School today.</p>
          <CTAButton variant="primary" onClick={() => setPage("admissions")} className="mt-6">Start Admission Process</CTAButton>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ABOUT US PAGE
   ============================================================ */
function AboutPage({ setPage }) {
  /* ── Count-up hooks (all fire together via one section ref) ── */
  const [statsRef, statsInView] = useInView(0.25);
  const c38  = useCountUp(38,  '+', 1600, statsInView);
  const c350 = useCountUp(350, '+', 1800, statsInView);
  const c4   = useCountUp(4,   '',  1000, statsInView);
  const c7   = useCountUp(7,   '',  1000, statsInView);

  const statsData = [
    { num: c38,  label: 'Years of Trust',     sub: 'Est. 1988',        icon: BookOpen      },
    { num: c350, label: 'Happy Students',     sub: '& growing',        icon: Users         },
    { num: c4,   label: 'Dedicated Teachers', sub: 'Expert educators', icon: GraduationCap },
    { num: c7,   label: 'Grade Levels',       sub: 'LKG to Class 5',   icon: Star          },
  ];

  /* ── Stagger for Why Choose Us ── */
  const [whyRef, whyVisible] = useInView(0.15);

  const features = [
    { icon: Languages,   title: 'English Medium',    desc: 'Structured English-medium instruction building strong communication from day one.' },
    { icon: ShieldCheck, title: 'Govt. Recognized',  desc: "Fully government-recognized, so your child's early education stands on certified ground." },
    { icon: Video,       title: 'CCTV Campus',       desc: 'Full campus CCTV surveillance giving parents peace of mind throughout the school day.' },
    { icon: TreePine,    title: 'Outdoor Play Area', desc: 'A generous green outdoor play area where children run, climb and play every single day.' },
    { icon: Bus,         title: 'Safe Transport',    desc: 'Reliable transport facilities ensuring a safe and comfortable daily commute for every student.' },
    { icon: Droplets,    title: 'Health & Hygiene',  desc: '24/7 running water and RO water coolers on campus keep children hydrated and healthy all day.' },
    { icon: Library,     title: 'Knowledge Hub',     desc: 'A well-stocked reading library that nurtures curiosity and builds a lifelong love of reading.' },
  ];

  const teachers = [
    { name: '[Teacher Name]', role: 'Class Teacher — Primary' },
    { name: '[Teacher Name]', role: 'Class Teacher — Primary' },
    { name: '[Teacher Name]', role: 'Class Teacher — Primary' },
    { name: '[Teacher Name]', role: 'Class Teacher — Primary' },
  ];

  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Model in Education — for the Children of Bharsare"
        subtitle="A government-recognized English medium school proudly serving Bharsare, Bhadaiyan & Sultanpur since 1988."
      />

      {/* HISTORY */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Serving Bharsare &amp; Bhadaiyan Since 1988</h2>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              Model Primary School was founded with a simple purpose: to give the children of Bharsare, Bhadaiyan and
              the wider Sultanpur area access to quality, English-medium primary education close to home. What began
              as a small neighbourhood school has grown into a trusted name for early learning in the community.
            </p>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              Today the school is a fully government-recognized institution, combining a structured academic
              curriculum with a warm, activity-driven classroom culture — because young children learn best when
              they are curious, active and cared for.
            </p>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              Since our establishment in 1988, we have grown from a small neighborhood initiative into a trusted
              educational hub. Today, we proudly stand as one of the leading primary schools in the Sultanpur
              district, trusted by over 350 families for their children's foundational years.
            </p>
            <div className="mt-6 flex items-center gap-3 bg-green-light rounded-2xl p-4 border border-green-30">
              <ShieldCheck className="text-green shrink-0" size={30} />
              <p className="font-body text-sm text-ink-80"><strong className="text-maroon-dark">Government-Recognized Institution</strong> — verified and compliant with state education norms.</p>
            </div>
          </div>
          <ImagePlaceholder label="Entrance Gate &amp; Signage" caption="Model Primary School main entrance" ratio="4 / 5" />
        </div>
      </section>

      <PencilDivider thin />

      {/* MODEL AT A GLANCE */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>By the Numbers</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Model at a Glance</h2>
            <p className="font-body mt-3 text-base" style={{ color: 'var(--gold-dark)' }}>
              Numbers that reflect our 38-year commitment to quality education in Bharsare.
            </p>
          </div>
          <div ref={statsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((item) => (
              <div
                key={item.label}
                className="hover-lift bg-white rounded-3xl p-7 shadow-md text-center border-b-4 border-maroon flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-maroon flex items-center justify-center">
                  <item.icon size={26} className="text-gold" strokeWidth={2} />
                </div>
                <span className="font-display font-extrabold text-4xl text-maroon-dark">{item.num}</span>
                <div>
                  <p className="font-display font-bold text-maroon-dark text-base leading-tight">{item.label}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "var(--gold-dark)" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider />

      {/* FROM THE PRINCIPAL'S DESK */}
      <section className="bg-maroon-dark py-16 md:py-20 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 opacity-10 animate-spin-slow" aria-hidden="true">
          <Emblem size={340} ring={false} />
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <ImagePlaceholder
              label="Principal — Model Primary School"
              caption="Photo of the Principal"
              ratio="4 / 5"
              tone="pink"
              className="max-w-sm mx-auto"
            />
          </div>
          <div>
            <span className="font-display font-bold uppercase tracking-widest text-xs md:text-sm" style={{ color: "var(--gold)" }}>
              Leadership
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3 mb-5">
              A Message from Our Principal
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "rgba(251,217,138,0.9)" }}>
              Welcome to Model Primary School. When we started this journey in 1988, our vision was simple: to
              provide high-quality, English-medium education to the children of Bharsare and Bhadaiyan. Today, I
              am incredibly proud to say that we are the first and most trusted primary school in the Sultanpur
              district to educate and nurture over 350 students simultaneously.
            </p>
            <p className="font-body leading-relaxed mt-4" style={{ color: "rgba(251,217,138,0.9)" }}>
              This milestone is a testament to the unwavering trust of our community and the hard work of our
              dedicated staff. We don't just teach; we build strong foundations for a bright future.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gold rounded-full" />
              <p className="font-body italic text-white text-base">
                [Principal Name], <span style={{ color: "var(--gold-light)" }}>Principal</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITIONS */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>Honours & Awards</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Awards &amp; Recognitions</h2>
            <p className="font-body text-ink-60 mt-3 text-sm">Decades of dedication honoured by the highest offices of the state and nation.</p>
          </div>

          {/* ── Crown Jewels: 3-column highlight row ── */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Trophy,
                color: 'bg-gold',
                textColor: 'text-maroon-dark',
                title: 'State Teacher Award',
                body: 'Honored by the Uttar Pradesh Government for outstanding contribution to primary education.',
                ribbon: 'UP Government',
              },
              {
                icon: Crown,
                color: 'bg-maroon',
                textColor: 'text-white',
                title: "Governor's Excellence",
                body: 'Awarded by the Governor of Uttar Pradesh for excellence in school leadership and management.',
                ribbon: 'Governor of UP',
              },
              {
                icon: Award,
                color: 'bg-gold',
                textColor: 'text-maroon-dark',
                title: 'National Recognition',
                body: 'Awarded by Smt. Maneka Gandhi, Member of Parliament, for exemplary service to child education.',
                ribbon: 'MP Smt. Maneka Gandhi',
              },
            ].map((award) => (
              <div key={award.title} className="hover-lift relative bg-white rounded-3xl p-7 shadow-lg border-t-4 border-gold flex flex-col items-center text-center gap-4 overflow-hidden">
                {/* Decorative bg circle */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-5 bg-maroon" />
                {/* Icon badge */}
                <div className={`w-16 h-16 rounded-2xl ${award.color} flex items-center justify-center shadow-md shrink-0`}>
                  <award.icon size={30} className={award.textColor} strokeWidth={1.8} />
                </div>
                {/* Title */}
                <h3 className="font-display font-extrabold text-lg text-maroon-dark leading-snug">{award.title}</h3>
                <p className="font-body text-sm text-ink-70 leading-relaxed">{award.body}</p>
                {/* Ribbon tag */}
                <span className="inline-flex items-center gap-1.5 bg-cream2 border border-gold-light rounded-full px-3 py-1 text-xs font-body font-semibold text-maroon-dark mt-auto">
                  <Medal size={12} className="text-gold-dark" strokeWidth={2} />
                  {award.ribbon}
                </span>
              </div>
            ))}
          </div>

          {/* ── District & Local Honours: Auto-scrolling marquee ── */}
          <div className="rounded-2xl overflow-hidden shadow-md" style={{ background: 'var(--maroon)' }}>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white-20">
              <Star size={16} className="text-gold shrink-0" strokeWidth={2} />
              <span className="font-display font-bold text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>District &amp; Local Honours</span>
            </div>
            <div className="py-4 px-3 overflow-hidden">
              <div className="marquee-track whitespace-nowrap inline-block">
                {[
                  'Honored by DM C. Indumati, Sultanpur',
                  'Honored by DM Ravish Gupta, Sultanpur',
                  'Honored by DM Kritika Jyotsna, Sultanpur',
                  'Recognized by Basic Shiksha Adhikari Diwan Singh',
                  'Recognized by Basic Shiksha Adhikari Kaustubh Singh',
                  'Recognized by Basic Shiksha Adhikari Santosh Saxena',
                  'Awarded for Nari Sashaktikaran',
                  'Honored by Local MLAs & SDM Lambhua',
                  'Recognized by Team Amar Ujala',
                ].concat([
                  'Honored by DM C. Indumati, Sultanpur',
                  'Honored by DM Ravish Gupta, Sultanpur',
                  'Honored by DM Kritika Jyotsna, Sultanpur',
                  'Recognized by Basic Shiksha Adhikari Diwan Singh',
                  'Recognized by Basic Shiksha Adhikari Kaustubh Singh',
                  'Recognized by Basic Shiksha Adhikari Santosh Saxena',
                  'Awarded for Nari Sashaktikaran',
                  'Honored by Local MLAs & SDM Lambhua',
                  'Recognized by Team Amar Ujala',
                ]).map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 mx-5">
                    <Trophy size={12} className="text-gold shrink-0" strokeWidth={2} />
                    <span className="font-body text-sm" style={{ color: 'rgba(255,248,234,0.92)' }}>{item}</span>
                    <span className="text-gold opacity-40 ml-3">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* 3 ─ MEET OUR FACULTY — Swiper draggable carousel */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-display font-bold uppercase tracking-widest text-xs md:text-sm" style={{ color: 'var(--gold-dark)' }}>
              Our Team
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mt-2">
              The Pillars of Model Primary School
            </h2>
            <p className="font-body text-ink-70 mt-3">
              Our close-knit team of 4 expert educators ensures every child gets the personal attention they deserve.
            </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.2}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640:  { slidesPerView: 2,   spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
            }}
            className="faculty-swiper"
          >
            {teachers.map((teacher, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-3xl p-7 shadow-md text-center flex flex-col items-center gap-4 border-t-4 border-gold h-full">
                  <div
                    className="w-28 h-28 rounded-full border-4 border-gold-light shadow-md flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, var(--cream3) 0%, var(--gold-light) 100%)' }}
                  >
                    <Camera size={30} className="text-maroon-dark-50" strokeWidth={1.5} />
                    <span className="font-body text-xs text-maroon-dark-50 mt-1">Photo</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-maroon-dark text-base">{teacher.name}</p>
                    <p className="font-body text-xs font-semibold mt-1" style={{ color: 'var(--gold-dark)' }}>{teacher.role}</p>
                    <p className="font-body text-sm text-ink-60 mt-2 leading-snug">Focused on interactive and joyful learning.</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <PencilDivider thin />

      {/* 4 ─ VISION & MISSION — asymmetric overlapping layout */}
      <section className="bg-cream2 py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center"><Eyebrow>Our Purpose</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Vision &amp; Mission</h2>
          </div>
          {/* Decorative blob behind Vision card */}
          <div className="relative">
            <div
              className="absolute bg-maroon rounded-full opacity-10 hidden md:block"
              style={{ width: '320px', height: '320px', top: '-60px', left: '-80px', zIndex: 0 }}
              aria-hidden="true"
            />
            <div className="grid md:grid-cols-2 gap-8 items-start relative" style={{ zIndex: 1 }}>
              {/* Vision — shifted UP */}
              <div className="vision-card bg-white rounded-3xl p-8 shadow-xl border-t-4 border-maroon" style={{ marginTop: 0 }}>
                <div className="w-12 h-12 rounded-2xl bg-maroon flex items-center justify-center mb-4">
                  <Star size={22} className="text-gold" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-bold text-xl text-maroon-dark mb-3">Our Vision</h3>
                <p className="font-body text-ink-70 leading-relaxed">
                  To be the most trusted primary school in Sultanpur — a place where every child from Bharsare,
                  Bhadaiyan and the surrounding villages can access quality English-medium education and grow
                  into a confident, curious and responsible individual.
                </p>
              </div>
              {/* Mission — shifted DOWN for asymmetric feel */}
              <div className="mission-card bg-white rounded-3xl p-8 shadow-xl border-t-4 border-gold md:mt-16">
                <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center mb-4">
                  <HeartHandshake size={22} className="text-maroon-dark" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-bold text-xl text-maroon-dark mb-3">Our Mission</h3>
                <p className="font-body text-ink-70 leading-relaxed">
                  To nurture every child's potential through joyful, activity-based learning in a safe, disciplined
                  and loving environment — building strong academic foundations while celebrating each child's
                  unique strengths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider />

      {/* 5 ─ WHY CHOOSE US — staggered entrance animation */}
      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-10 animate-spin-slow" aria-hidden="true">
          <Emblem size={320} ring={false} />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <Eyebrow light>Why Families Choose Us</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-10">What Makes Model Primary School Different</h2>
          <div ref={whyRef} className="flex flex-wrap justify-center items-stretch gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`feature-scale stagger-card bg-white-95 rounded-3xl p-6 shadow-lg flex flex-col gap-3 ${whyVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: whyVisible ? `${i * 0.18}s` : '0s', flexBasis: 'calc(25% - 15px)', minWidth: '220px', maxWidth: '280px', flexGrow: 0 }}
              >
                <div className="w-11 h-11 rounded-2xl bg-gold flex items-center justify-center mb-3 shrink-0">
                  <f.icon size={20} className="text-maroon-dark" />
                </div>
                <h3 className="font-display font-bold text-maroon-dark">{f.title}</h3>
                <p className="font-body text-sm text-ink-70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <PencilDivider thin />

      {/* CTA to Academics */}
      <section className="bg-cream py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4"><Eyebrow>Explore Further</Eyebrow></div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">Curious About What We Teach?</h2>
          <p className="font-body text-ink-70 mt-2">Visit our Academics page to explore the full curriculum, daily schedule and teaching methodology.</p>
          <CTAButton variant="primary" onClick={() => setPage("academics")} className="mt-6">View Academics</CTAButton>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ACADEMICS PAGE
   ============================================================ */
const curriculumSubjects = [
  { stage: "LKG – UKG", subjects: "Rhymes & Stories, Phonics, Pre-Writing, Number Sense, Art & Craft, Free Play" },
  { stage: "Class 1 – 2", subjects: "English, Hindi, Mathematics, EVS, GK, Art & Craft, Physical Education" },
  { stage: "Class 3 – 5", subjects: "English, Hindi, Mathematics, EVS/Science, GK, Computer Basics, Art, Physical Education" },
];

const dailyRoutine = [
  { time: "8:00 AM", activity: "Morning Assembly & Prayer" },
  { time: "8:20 AM", activity: "First Teaching Period" },
  { time: "9:50 AM", activity: "Short Break" },
  { time: "10:00 AM", activity: "Core Subject Periods" },
  { time: "12:00 PM", activity: "Lunch & Outdoor Play" },
  { time: "12:40 PM", activity: "Activity / Co-Curricular Period" },
  { time: "1:30 PM", activity: "Closing Assembly & Dismissal" },
];

const methodologyPillars = [
  { icon: Puzzle, title: "Activity-Based Learning", desc: "Concepts introduced through hands-on activities, stories and play rather than rote memorization." },
  { icon: HeartHandshake, title: "Individual Attention", desc: "Small, manageable class sizes so every child gets noticed, encouraged and gently corrected." },
  { icon: Trophy, title: "Co-Curricular Balance", desc: "Sports, art and cultural events treated as seriously as textbook learning." },
  { icon: SmilePlus, title: "Friendly Discipline", desc: "Clear routines and gentle discipline that build good habits without fear." },
];

function AcademicsPage({ setPage }) {
  return (
    <div>
      <PageHero
        eyebrow="Academics"
        title="A Curriculum Built for Curious Young Minds"
        subtitle="From playful phonics in LKG to exam-ready foundations in Class 5 — every stage is purposefully designed."
      />

      {/* CURRICULUM */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>Curriculum</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">What Children Learn, Stage by Stage</h2>
          <p className="font-body text-ink-60 mt-2 mb-10">Our curriculum follows government-prescribed syllabi, enriched with activity-based learning at every level.</p>
          <div className="grid gap-5">
            {curriculumSubjects.map((c) => (
              <div key={c.stage} className="bg-white rounded-3xl p-6 md:p-7 shadow-md flex flex-col md:flex-row md:items-center gap-3 md:gap-8 border-l-4 border-gold">
                <span className="font-display font-extrabold text-maroon-dark text-lg md:w-40 shrink-0">{c.stage}</span>
                <p className="font-body text-ink-70 text-sm md:text-base">{c.subjects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* CLASSES OFFERED */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>Classes We Offer</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">LKG to Class 5</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {classLevels.map((c) => (
              <div
                key={c.level}
                className="hover-lift bg-white rounded-3xl p-6 shadow-md text-center border-b-4 border-maroon"
                style={{ flexBasis: "calc(25% - 15px)", minWidth: "180px", maxWidth: "280px", flexGrow: 0 }}
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gold-light flex items-center justify-center mb-3">
                  <GraduationCap size={24} className="text-maroon-dark" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-maroon-dark">{c.level}</h3>
                <p className="font-body text-xs text-gold-dark font-bold mt-1">{c.age}</p>
                <p className="font-body text-sm text-ink-60 mt-2">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY ROUTINE */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <Eyebrow>A Day at School</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mb-2">Daily Routine</h2>
            <p className="font-body text-ink-60 text-sm mb-8">Sample schedule — actual timings may vary by class.</p>
            <ol className="relative border-l-2 border-gold-light pl-6 flex flex-col gap-6">
              {dailyRoutine.map((r) => (
                <li key={r.time} className="relative">
                  <span className="absolute -left-8 top-0.5 w-4 h-4 rounded-full bg-maroon border-2 border-cream" />
                  <span className="font-display font-bold text-gold-dark text-sm">{r.time}</span>
                  <p className="font-body text-ink-80 text-sm md:text-base">{r.activity}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <ImagePlaceholder src="/outdoor_fun.png" label="Outdoor Group Activity" caption="Games on the school ground" tone="green" ratio="4 / 5" className="max-w-sm mx-auto" />
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* MODERN LEARNING */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Modern Learning</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mt-2 mb-6">A Future-Ready Classroom Experience</h2>
            <p className="font-body text-ink-70 mb-8">We combine time-tested teaching with modern infrastructure to give every student the best of both worlds.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Monitor,  title: 'Smart Classrooms',  desc: 'Projector-enabled interactive learning that makes every lesson vivid and engaging.' },
                { icon: Computer, title: 'Computer Education', desc: 'Dedicated tech-ready labs to introduce students to computers from an early age.' },
                { icon: Brain,    title: 'GK & Remedial Classes', desc: 'Specialized GK enrichment and remedial support so no child is ever left behind.' },
                { icon: Star,     title: '360° Holistic Development', desc: 'Equal focus on academics, arts, sports and character for complete student growth.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 bg-white rounded-2xl p-4 shadow-sm border-l-4 border-gold">
                  <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-maroon-dark text-sm">{item.title}</h3>
                    <p className="font-body text-xs text-ink-60 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ImagePlaceholder label="Smart Classroom" caption="Projector-enabled interactive class" ratio="4 / 3" tone="gold" />
        </div>
      </section>

      <PencilDivider />

      {/* METHODOLOGY */}
      <section className="bg-maroon py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow light>Teaching Methodology</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">Joyful Learning, Real Habits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {methodologyPillars.map((m) => (
              <div key={m.title} className="hover-lift bg-white-95 rounded-3xl p-6 shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-gold flex items-center justify-center mb-3">
                  <m.icon size={20} className="text-maroon-dark" />
                </div>
                <h3 className="font-display font-bold text-maroon-dark">{m.title}</h3>
                <p className="font-body text-sm text-ink-70 mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* BEYOND THE BOOKS */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>Student Life</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">Beyond the Books</h2>
            <p className="font-body text-ink-70 mt-3">Every child at Model Primary School gets to explore, create, move and perform — every single day.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Palette,   title: 'Art & Craft',          desc: 'Dedicated creative sessions where children express themselves through drawing, painting, and crafting.', accent: 'border-gold' },
              { icon: Music,     title: 'Dance & Cultural Arts', desc: 'Vibrant dance and cultural performances that build confidence and celebrate expression on stage.', accent: 'border-maroon' },
              { icon: Dumbbell,  title: 'Sports & Physical Education', desc: 'Daily games, sports activities, and outdoor swing areas that build fitness, teamwork and resilience.', accent: 'border-gold' },
            ].map((item) => (
              <div key={item.title} className={`hover-lift bg-white rounded-3xl p-7 shadow-md border-b-4 ${item.accent} flex flex-col items-center text-center gap-4`}>
                <div className="w-16 h-16 rounded-full bg-maroon flex items-center justify-center">
                  <item.icon size={28} className="text-gold" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-maroon-dark">{item.title}</h3>
                  <p className="font-body text-sm text-ink-70 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* CTA to Admissions */}
      <section className="bg-gold py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <PartyPopper className="mx-auto text-maroon-dark mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">Ready to Enroll Your Child?</h2>
          <p className="font-body text-maroon-dark-80 mt-2">Admissions for 2026–27 are open. Secure your child's seat today.</p>
          <CTAButton variant="primary" onClick={() => setPage("admissions")} className="mt-6">Start Admission Process</CTAButton>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   GALLERY PAGE
   ============================================================ */
const galleryItems = [
  { cat: "Assembly", label: "Morning Assembly", caption: "Lines of students in uniform", tone: "gold", src: "/students_assembly.png" },
  { cat: "Assembly", label: "Prayer & Announcements", caption: "Daily assembly routine", tone: "pink" },
  { cat: "Playground", label: "Slide & Play Area", caption: "Greenery around the playground", tone: "green", src: "/yoga_activity.png" },
  { cat: "Playground", label: "Recess Time", caption: "Children at play", tone: "gold" },
  { cat: "Events", label: "Prize Distribution", caption: "Annual event under the tent", tone: "pink", src: "/annual_event.png" },
  { cat: "Events", label: "Cultural Program", caption: "Stage event under canopy", tone: "gold" },
  { cat: "Campus", label: "School Building", caption: "Pencil-and-book branded exterior", tone: "gold" },
  { cat: "Campus", label: "Entrance Gate", caption: "Main gate & signage", tone: "green" },
  { cat: "Activity", label: "Outdoor Group Activity", caption: "Games on the ground", tone: "green", src: "/outdoor_fun.png" },
  { cat: "Activity", label: "Sports Day", caption: "Co-curricular activity", tone: "pink" },
];

function GalleryPage() {
  const cats = ["All", "Assembly", "Playground", "Events", "Campus", "Activity"];
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? galleryItems : galleryItems.filter((i) => i.cat === filter);
  return (
    <div>
      <PageHero eyebrow="Gallery" title="Life at Model Primary School" subtitle="Assemblies, play, events and campus moments from around the school." />
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`focus-ring font-display font-semibold text-sm px-5 py-2 rounded-full border-2 transition-colors ${
                  filter === c ? "bg-maroon border-maroon text-white" : "bg-white border-gold-light text-maroon-dark filter-btn-inactive"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {items.map((it, idx) => (
              <div key={it.label + idx} className="mb-5 break-inside-avoid">
                <ImagePlaceholder
                  src={it.src}
                  label={it.label}
                  caption={it.caption}
                  tone={it.tone}
                  ratio={idx % 3 === 0 ? "3 / 4" : "4 / 3"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ADMISSIONS PAGE
   ============================================================ */
const admissionSteps = [
  { title: "Visit & Enquire", desc: "Visit the school office in Bharsare or call to enquire about seat availability." },
  { title: "Collect the Form", desc: "Collect the admission application form from the school reception." },
  { title: "Submit Form & Documents", desc: "Fill out the form and submit it along with the required documents." },
  { title: "Meet & Greet", desc: "A short, friendly interaction with the child and parents at the school." },
  { title: "Confirm the Seat", desc: "Complete admission formalities and fee payment to confirm the seat." },
];

const eligibility = [
  { level: "LKG", age: "3+ years as of intake" },
  { level: "UKG", age: "4+ years as of intake" },
  { level: "Class 1", age: "5+ years as of intake" },
  { level: "Class 2", age: "6+ years as of intake" },
  { level: "Class 3", age: "7+ years as of intake" },
  { level: "Class 4", age: "8+ years as of intake" },
  { level: "Class 5", age: "9+ years as of intake" },
];

const requiredDocs = [
  "Child's birth certificate (original + photocopy)",
  "4 recent passport-size photographs of the child",
  "Aadhar card copy — child and parent/guardian",
  "Address proof of parent/guardian",
  "Transfer Certificate (for admission to Class 1 and above, if applicable)",
  "Previous school report card, if applicable",
];

function AdmissionsPage({ setPage }) {
  return (
    <div>
      <PageHero eyebrow="Admissions 2026–27" title="Begin Your Child's Journey With Us" subtitle="A simple, guided admission process for LKG to Class 5." />

      {/* LIMITED SEATS NOTICE */}
      <section className="bg-gold">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-3 text-center">
          <Sparkles size={20} className="text-maroon-dark" />
          <p className="font-display font-bold text-maroon-dark text-sm md:text-base">Limited Seats Available for Session 2026-27 — Enquire Early to Avoid Disappointment</p>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>Application Process</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mb-10">5 Simple Steps to Enroll</h2>
          <div className="grid md:grid-cols-5 gap-5">
            {admissionSteps.map((s, i) => (
              <div key={s.title} className="hover-lift bg-white rounded-3xl p-6 shadow-md relative">
                <span className="font-display font-extrabold text-4xl text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display font-bold text-maroon-dark mt-2">{s.title}</h3>
                <p className="font-body text-sm text-ink-60 mt-2">{s.desc}</p>
                {i < admissionSteps.length - 1 && (
                  <ChevronRight size={20} className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-gold" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* ELIGIBILITY + DOCS */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <Eyebrow>Age Eligibility</Eyebrow>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark mb-6">Eligibility by Class</h2>
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              {eligibility.map((e, i) => (
                <div key={e.level} className={`flex items-center justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-cream-60" : ""}`}>
                  <span className="font-display font-bold text-maroon-dark">{e.level}</span>
                  <span className="font-body text-sm text-ink-70">{e.age}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Documents Checklist</Eyebrow>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark mb-6">Required Documents</h2>
            <ul className="bg-white rounded-3xl shadow-md p-6 flex flex-col gap-4">
              {requiredDocs.map((d) => (
                <li key={d} className="flex items-start gap-3 font-body text-sm text-ink-75">
                  <FileText size={18} className="text-maroon shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* PARENT PARTNERSHIP & CARE */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>Parent Partnership</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">A Community That Cares Together</h2>
            <p className="font-body text-ink-70 mt-3">We believe the best education happens when school and family work hand in hand.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { icon: UsersRound, title: 'PTM & MTA Meetings',    desc: 'Regular Parent-Teacher Meetings (PTM) and Mother-Teacher Association (MTA) sessions keep families closely involved in their child\'s progress.' },
              { icon: Utensils,   title: 'Mid-Day Meal Programme', desc: 'Government-supported, nutritious Mid-Day Meals (MDM) provided daily to ensure every child is nourished and energized to learn.' },
            ].map((item) => (
              <div key={item.title} className="hover-lift bg-white rounded-3xl p-7 shadow-md border-l-4 border-maroon flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-maroon flex items-center justify-center shrink-0">
                  <item.icon size={26} className="text-gold" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-maroon-dark">{item.title}</h3>
                  <p className="font-body text-sm text-ink-70 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <CalendarCheck className="mx-auto text-gold mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">Ready to Enroll for 2026-27?</h2>
          <p className="font-body text-gold-light-85 mt-2">Reach out to the school office and we'll guide you through every step.</p>
          <CTAButton variant="gold" onClick={() => setPage("contact")} className="mt-6">Contact the School</CTAButton>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div>
      <PageHero eyebrow="Contact Us" title="We'd Love to Hear From You" subtitle="Questions about admissions, academics or a school visit — reach out anytime." />

      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          {/* FORM */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <h2 className="font-display font-extrabold text-2xl text-maroon-dark mb-1">Send an Enquiry</h2>
            <p className="font-body text-sm text-ink-60 mb-6">We usually respond within a school day.</p>
            {sent ? (
              <div className="bg-green-light border border-green-30 rounded-2xl p-6 flex items-start gap-3">
                <CheckCircle2 className="text-green shrink-0" size={26} />
                <div>
                  <p className="font-display font-bold text-maroon-dark">Enquiry sent</p>
                  <p className="font-body text-sm text-ink-70 mt-1">Thank you — the school office will get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-semibold text-maroon-dark">Parent's Name</label>
                    <input required type="text" placeholder="Your full name" className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-semibold text-maroon-dark">Phone Number</label>
                    <input required type="tel" placeholder="10-digit mobile number" className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-sm font-semibold text-maroon-dark">Class Interested In</label>
                  <select required className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50">
                    <option value="">Select a class</option>
                    {["LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-sm font-semibold text-maroon-dark">Message</label>
                  <textarea rows={4} placeholder="Tell us a little about your enquiry" className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50 resize-none" />
                </div>
                <CTAButton variant="primary" icon={Send} className="self-start mt-2">Send Enquiry</CTAButton>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-maroon rounded-3xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Emblem size={30} ring={false} /> School Details</h3>
              <ul className="flex flex-col gap-4 font-body text-sm text-gold-light-90">
                <li className="flex gap-3"><MapPin size={20} className="shrink-0" /><span>Model Primary School, Bharsare, Bhadaiyan, Sultanpur, Uttar Pradesh</span></li>
                <li className="flex gap-3"><Phone size={20} className="shrink-0" /><span className="italic text-gold-light-60 border border-dashed border-gold-light-40 rounded-lg px-2 py-0.5">[Add phone number]</span></li>
                <li className="flex gap-3"><Mail size={20} className="shrink-0" /><span className="italic text-gold-light-60 border border-dashed border-gold-light-40 rounded-lg px-2 py-0.5">[Add email address]</span></li>
                <li className="flex gap-3"><Clock size={20} className="shrink-0" /><span>Mon – Sat, 8:00 AM – 2:00 PM</span></li>
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-md border-4 border-white bg-cream3 flex flex-col items-center justify-center gap-2" style={{ aspectRatio: "4 / 3" }}>
              <MapPin size={30} className="text-maroon-dark-50" />
              <span className="font-display font-bold text-maroon-dark-70 text-sm">Map — Bharsare, Bhadaiyan, Sultanpur</span>
              <span className="font-body text-xs text-maroon-dark-50">Embed Google Map here</span>
              <div className="absolute top-0 left-0 w-full h-2 pencil-stripe-thin" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    academics: <AcademicsPage setPage={setPage} />,
    gallery: <GalleryPage />,
    admissions: <AdmissionsPage setPage={setPage} />,
    contact: <ContactPage />,
  };

  return (
    <div className="font-body bg-cream min-h-screen">
      <BrandStyles />
      <Navbar page={page} setPage={setPage} />
      {pages[page]}
      <Footer setPage={setPage} />
      <FloatingCall />
    </div>
  );
}

