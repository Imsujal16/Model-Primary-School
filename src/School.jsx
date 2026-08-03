import { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useLocation, NavLink, Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Menu, X, Phone, MapPin, Mail, Clock, Camera, ChevronRight, ChevronDown,
  Sparkles, GraduationCap, Users, BookOpen, CalendarCheck, FileText,
  CheckCircle2, ArrowRight, Send, Languages, ShieldCheck, Video, TreePine,
  HeartHandshake, Puzzle, Trophy, SmilePlus, Star, PartyPopper,
  Bus, Droplets, Library, Monitor, Computer, Brain, Palette, Music, Dumbbell, UsersRound, Utensils,
  Award, Medal, Crown, Building2, Compass, Megaphone,
} from "lucide-react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

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
      html {
        max-width: 100vw;
        width: 100%;
      }
      body {
        overflow-x: clip;
        max-width: 100vw;
        width: 100%;
      }
      #root {
        max-width: 100vw;
        width: 100%;
      }
      html.lenis, html.lenis body {
        height: auto;
      }
      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }
      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      .lenis.lenis-stopped {
        overflow: hidden;
      }
      .lenis.lenis-smooth iframe {
        pointer-events: none;
      }

      .routine-swiper .swiper-pagination-bullet {
        background: #FBD98A !important;
        opacity: 0.6;
      }
      .routine-swiper .swiper-pagination-bullet-active {
        background: #F0A828 !important;
        opacity: 1;
        width: 20px !important;
        border-radius: 6px !important;
        transition: all 0.3s ease;
      }
      .routine-swiper .swiper-pagination {
        bottom: 10px !important;
      }
      .card-inner-swiper .swiper-pagination {
        bottom: 120px !important;
        z-index: 25 !important;
      }
      .card-inner-swiper .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.7) !important;
        opacity: 0.7;
      }
      .card-inner-swiper .swiper-pagination-bullet-active {
        background: #F0A828 !important;
        opacity: 1;
        width: 18px !important;
        border-radius: 6px !important;
        transition: all 0.3s ease;
      }

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
        background:rgba(255,248,234,0.82) !important;
        backdrop-filter:blur(16px) saturate(180%) !important;
        -webkit-backdrop-filter:blur(16px) saturate(180%) !important;
        border-bottom:1px solid rgba(240,168,40,0.3);
        box-shadow:0 4px 20px rgba(58,42,30,0.06);
      }
      .glass-card{
        background:rgba(255,255,255,0.6);
        backdrop-filter:blur(10px);
        -webkit-backdrop-filter:blur(10px);
        border:1px solid rgba(255,255,255,0.7);
      }

      .hover-lift{ transition:transform .25s ease, box-shadow .25s ease; }
      .hover-lift:hover{ transform:translateY(-6px); box-shadow:0 20px 40px -12px rgba(122,35,49,0.25); }

      /* Interactive states written as real :hover rules - Tailwind's hover: prefix
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
      @keyframes slide-up-bottom{ from{ transform:translateY(100%); } to{ transform:translateY(0); } }
      .animate-slide-up{ animation:slide-up-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      @media (prefers-reduced-motion: reduce){
        .animate-spin-slow, .animate-bob, .marquee-track, .animate-slide-up{ animation:none; }
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
      /* ── iPhone-style Liquid Glass ── */
      .liquid-glass{
        background: rgba(255,255,255,0.12);
        -webkit-backdrop-filter: saturate(180%) blur(28px);
        backdrop-filter: saturate(180%) blur(28px);
        border: 1px solid rgba(255,255,255,0.45);
        box-shadow: 0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.45);
        transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
      }
      .liquid-glass:hover{
        background: rgba(255,255,255,0.22);
        border-color: rgba(255,255,255,0.75);
        box-shadow: 0 8px 36px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.65);
      }
      .liquid-glass-pill{
        background: rgba(255,255,255,0.20);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        backdrop-filter: saturate(180%) blur(20px);
        border: 1px solid rgba(255,255,255,0.50);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.50);
      }

      /* ── Voice Assistant ── */
      @keyframes va-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.75); transform:scale(1); }
        50%  { box-shadow: 0 0 0 14px rgba(239,68,68,0);  transform:scale(1.06); }
        100% { box-shadow: 0 0 0 0 rgba(239,68,68,0);    transform:scale(1); }
      }
      .va-mic-pulse { animation: va-pulse 1.1s ease-in-out infinite; }

      @keyframes va-fadeup {
        from { opacity:0; transform:translateY(20px); }
        to   { opacity:1; transform:translateY(0); }
      }
      .va-fadeup { animation: va-fadeup 0.3s ease forwards; }

      .va-dot-bounce {
        display:inline-block;
        animation: va-dot-bounce-kf 1.2s ease-in-out infinite;
      }
      @keyframes va-dot-bounce-kf {
        0%, 60%, 100% { transform:translateY(0); }
        30%            { transform:translateY(-6px); }
      }
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
   SIGNATURE ELEMENT - Emblem (sunburst over open book)
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

/* Diagonal pencil-stripe divider - used between major sections on every page */
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

/* Social Media Icons */
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
}

function YouTubeIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  );
}

/* ============================================================
   MASCOTS - simple flat illustrations echoing the school's
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

/* Reusable placeholder for a real photo - sized/composed like the actual shot would be.
   Uses an inline aspectRatio style rather than a Tailwind aspect-[] class, since this
   environment has no JIT compiler to generate arbitrary-value utility classes. */
function ImagePlaceholder({ src, label, caption, ratio = "4 / 3", tone = "gold", className = "" }) {
  if (src) {
    return (
      <div
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white w-full max-w-full ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <img src={src} alt={label || "School Image"} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 pencil-stripe-thin" />
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
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white w-full max-w-full ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center" style={{ backgroundImage: grad }}>
        <Camera size={30} className="text-maroon-dark-50 shrink-0" strokeWidth={1.6} />
        <span className="font-display font-bold text-maroon-dark-70 text-xs sm:text-sm md:text-base leading-snug">{label}</span>
      </div>
      <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 pencil-stripe-thin" />
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
    <section className="relative bg-maroon overflow-hidden w-full max-w-full">
      <div className="absolute -right-6 -top-6 md:hidden opacity-20 animate-spin-slow pointer-events-none" aria-hidden="true">
        <Emblem size={180} ring={false} />
      </div>
      <div className="absolute hidden md:block -right-10 -top-10 opacity-20 animate-spin-slow pointer-events-none" aria-hidden="true">
        <Emblem size={300} ring={false} />
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14 md:py-24 relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-white leading-tight max-w-2xl mt-1.5 md:mt-3">{title}</h1>
        {subtitle && <p className="font-body text-gold-light-90 mt-2.5 sm:mt-4 max-w-xl text-xs sm:text-base md:text-lg leading-relaxed">{subtitle}</p>}
      </div>
      <PencilDivider />
    </section>
  );
}

/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
function LangToggle({ className = "" }) {
  const { lang, toggle } = useLanguage();
  const isHindi = lang === 'hi';
  return (
    <button
      onClick={toggle}
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      className={`focus-ring inline-flex items-center bg-white border-2 border-maroon rounded-full p-0.5 shadow-sm hover:shadow cursor-pointer transition-all duration-200 shrink-0 select-none ${className}`}
    >
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-display font-bold transition-all duration-200 ${
          !isHindi ? 'bg-maroon text-white' : 'text-maroon-dark hover:text-maroon'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
          isHindi ? 'bg-maroon text-white' : 'text-maroon-dark hover:text-maroon'
        }`}
        style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif" }}
      >
        हिंदी
      </span>
    </button>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { id: "home",       path: "/",           label: t("nav.home") },
    { id: "about",      path: "/about",       label: t("nav.about") },
    { id: "academics",  path: "/academics",   label: t("nav.academics") },
    { id: "gallery",    path: "/gallery",     label: t("nav.gallery") },
    { id: "admissions", path: "/admissions",  label: t("nav.admissions") },
    { id: "contact",    path: "/contact",     label: t("nav.contact") },
  ];
  const go = (path) => {
    navigate(path);
    setOpen(false);
  };
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button onClick={() => go("/")} className="focus-ring flex items-center gap-2 sm:gap-3 text-left min-w-0 flex-1 lg:flex-initial">
          <Emblem size={38} className="shrink-0 w-9 h-9 sm:w-[46px] sm:h-[46px]" />
          <span className="leading-tight min-w-0">
            <span className="block font-display font-extrabold text-maroon-dark text-xs sm:text-base md:text-lg truncate max-w-[145px] min-[380px]:max-w-[195px] sm:max-w-none">
              {t('school.name')}
            </span>
            <span className="block font-body text-[9px] sm:text-xs text-ink-60 truncate max-w-[145px] min-[380px]:max-w-[195px] sm:max-w-none">
              {t('nav.tagline')}
            </span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.path)}
              className={`focus-ring font-display font-semibold text-sm px-3.5 py-2 rounded-full transition-colors ${
                isActive(l.path) ? "bg-maroon text-white" : "text-maroon-dark nav-link-inactive"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop Controls (LangToggle + CTA) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LangToggle />
          <CTAButton variant="gold" onClick={() => go("/admissions")}>
            {t('nav.enroll')}
          </CTAButton>
        </div>

        {/* Mobile Header Controls (LangToggle + Hamburger) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <LangToggle />
          <button
            className="focus-ring p-2 rounded-xl bg-white-70 border border-gold-light text-maroon-dark"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-gold-light px-5 pb-5 pt-3 flex flex-col gap-1.5 shadow-xl">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.path)}
              className={`focus-ring text-left font-display font-semibold text-sm px-4 py-2.5 rounded-2xl ${
                isActive(l.path) ? "bg-maroon text-white" : "text-maroon-dark nav-link-inactive"
              }`}
            >
              {l.label}
            </button>
          ))}
          <CTAButton variant="primary" onClick={() => go("/admissions")} className="mt-2 w-full">
            {t('nav.enroll')}
          </CTAButton>
        </div>
      )}
    </header>
  );
}


/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/mpsbharsare?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: InstagramIcon,
      hoverBg: "hover:bg-[#E4405F] hover:border-[#E4405F]",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61564437598896",
      icon: FacebookIcon,
      hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/919454826921?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20admissions%20%26%20enrollment%20at%20Model%20Primary%20School%2C%20Bharsare.",
      icon: WhatsAppIcon,
      hoverBg: "hover:bg-[#25D366] hover:border-[#25D366]",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@vandanayadav7071",
      icon: YouTubeIcon,
      hoverBg: "hover:bg-[#FF0000] hover:border-[#FF0000]",
    },
  ];

  return (
    <footer className="bg-maroon-dark text-cream relative">
      <PencilDivider />
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div className="sm:col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <Emblem size={44} className="sm:w-[48px] sm:h-[48px]" />
            <span className="font-display font-extrabold text-base sm:text-lg text-white">{t('school.name')}</span>
          </div>
          <p className="font-body text-xs sm:text-sm text-gold-light-80 max-w-sm leading-relaxed mb-5">
            {t('footer.about')}
          </p>

          {/* Social Media Section */}
          <div className="mt-4">
            <span className="block font-display font-bold text-gold text-xs uppercase tracking-wider mb-2.5">
              Follow Us / हमसे जुड़ें
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, url, icon: Icon, hoverBg }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className={`w-9 h-9 rounded-full bg-white/10 text-gold-light hover:text-white transition-all duration-300 flex items-center justify-center border border-white/15 shadow-sm hover:scale-110 ${hoverBg}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-gold mb-3 text-xs sm:text-sm uppercase tracking-wide">{t('footer.links')}</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 font-body text-xs sm:text-sm text-gold-light-85">
            {[
              { path: "/",           key: "nav.home" },
              { path: "/about",      key: "nav.about" },
              { path: "/academics",  key: "nav.academics" },
              { path: "/gallery",    key: "nav.gallery" },
              { path: "/admissions", key: "nav.admissions" },
              { path: "/contact",    key: "nav.contact" },
            ].map(({ path, key }) => (
              <li key={path}>
                <button onClick={() => navigate(path)} className="focus-ring footer-link text-left">
                  {t(key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-gold mb-3 text-xs sm:text-sm uppercase tracking-wide">{t('footer.reach')}</h4>
          <ul className="flex flex-col gap-2.5 font-body text-xs sm:text-sm text-gold-light-85">
            <li className="flex gap-2.5"><MapPin size={16} className="shrink-0 mt-0.5 text-gold" /><span>{t('contact.address')}</span></li>
            <li className="flex gap-2.5"><Phone size={16} className="shrink-0 mt-0.5 text-gold" /><a href="tel:9454826921" className="hover:underline text-gold-light-90 font-semibold">+91 9454826921</a></li>
            <li className="flex gap-2.5"><WhatsAppIcon size={16} className="shrink-0 mt-0.5 text-gold" /><a href="https://wa.me/919454826921?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20admissions%20%26%20enrollment%20at%20Model%20Primary%20School%2C%20Bharsare." target="_blank" rel="noopener noreferrer" className="hover:underline text-gold-light-90 font-semibold">+91 9454826921 (WhatsApp)</a></li>
            <li className="flex gap-2.5"><Mail size={16} className="shrink-0 mt-0.5 text-gold" /><a href="mailto:psbharsare@gmail.com" className="hover:underline text-gold-light-90 font-semibold">psbharsare@gmail.com</a></li>
            <li className="flex gap-2.5"><Clock size={16} className="shrink-0 mt-0.5 text-gold" /><span>{t('footer.hours')}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white-10 py-5 pb-20 sm:pb-5 text-center font-body text-[11px] sm:text-xs text-gold-light-60 px-4">
        © {new Date().getFullYear()} {t('footer.copy')}
      </div>
    </footer>
  );
}



/* ============================================================
   HOME PAGE
   ============================================================ */
function WhyTabs({ light = false }) {
  const { t } = useLanguage();
  const [activeMobileTab, setActiveMobileTab] = useState('academics');

  const whyChooseUsTabs = [
    {
      id: 'academics',
      label: t("why.tab.academics.label"),
      icon: GraduationCap,
      features: [
        { icon: Languages,    title: t("why.tab.academics.f1.title"), desc: t("why.tab.academics.f1.desc") },
        { icon: HeartHandshake, title: t("why.tab.academics.f2.title"), desc: t("why.tab.academics.f2.desc") },
        { icon: Puzzle,       title: t("why.tab.academics.f3.title"), desc: t("why.tab.academics.f3.desc") },
        { icon: Compass,      title: t("why.tab.academics.f4.title"), desc: t("why.tab.academics.f4.desc") },
        { icon: Megaphone,    title: t("why.tab.academics.f5.title"), desc: t("why.tab.academics.f5.desc") },
      ],
    },
    {
      id: 'safety',
      label: t("why.tab.safety.label"),
      icon: ShieldCheck,
      features: [
        { icon: ShieldCheck,  title: t("why.tab.safety.f1.title"), desc: t("why.tab.safety.f1.desc") },
        { icon: Video,        title: t("why.tab.safety.f2.title"), desc: t("why.tab.safety.f2.desc") },
        { icon: Bus,          title: t("why.tab.safety.f3.title"), desc: t("why.tab.safety.f3.desc") },
        { icon: SmilePlus,    title: t("why.tab.safety.f4.title"), desc: t("why.tab.safety.f4.desc") },
      ],
    },
    {
      id: 'infrastructure',
      label: t("why.tab.infra.label"),
      icon: Library,
      features: [
        { icon: TreePine,     title: t("why.tab.infra.f1.title"), desc: t("why.tab.infra.f1.desc") },
        { icon: Droplets,     title: t("why.tab.infra.f2.title"), desc: t("why.tab.infra.f2.desc") },
        { icon: Library,      title: t("why.tab.infra.f3.title"), desc: t("why.tab.infra.f3.desc") },
      ],
    },
  ];

  const whyChooseUsPillars = [
    {
      icon: GraduationCap,
      title: t("why.p1.title"),
      tagline: t("why.p1.tagline"),
      color: "bg-maroon",
      highlights: [
        t("why.p1.h1"),
        t("why.p1.h2"),
        t("why.p1.h3"),
        t("why.p1.h4"),
      ],
    },
    {
      icon: ShieldCheck,
      title: t("why.p2.title"),
      tagline: t("why.p2.tagline"),
      color: "bg-gold",
      highlights: [
        t("why.p2.h1"),
        t("why.p2.h2"),
        t("why.p2.h3"),
        t("why.p2.h4"),
      ],
    },
    {
      icon: Building2,
      title: t("why.p3.title"),
      tagline: t("why.p3.tagline"),
      color: "bg-maroon",
      highlights: [
        t("why.p3.h1"),
        t("why.p3.h2"),
        t("why.p3.h3"),
        t("why.p3.h4"),
      ],
    },
    {
      icon: Award,
      title: t("why.p4.title"),
      tagline: t("why.p4.tagline"),
      color: "bg-gold",
      highlights: [
        t("why.p4.h1"),
        t("why.p4.h2"),
        t("why.p4.h3"),
        t("why.p4.h4"),
      ],
    },
  ];

  return (
    <div>
      {/* 📱 MOBILE VIEW (< md): Segmented Tab Control + Active Content Card */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Mobile Pill Tabs */}
        <div className="flex bg-cream3 p-1.5 rounded-full border border-gold-light shadow-inner w-full">
          {whyChooseUsTabs.map((tab) => {
            const isActive = tab.id === activeMobileTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMobileTab(tab.id)}
                className={`flex-1 py-2.5 px-2 rounded-full font-display font-bold text-xs text-center transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-maroon text-white shadow-md scale-[1.02]'
                    : 'text-maroon-dark opacity-75 hover:opacity-100'
                }`}
              >
                <tab.icon size={15} className={isActive ? 'text-gold' : 'text-maroon'} strokeWidth={2} />
                <span>{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Active Showcase Card */}
        {whyChooseUsTabs.map((tab) => {
          if (tab.id !== activeMobileTab) return null;
          return (
            <div key={tab.id} className="bg-white rounded-3xl p-5 shadow-xl border-t-4 border-gold">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cream2">
                <div className="w-11 h-11 rounded-2xl bg-maroon flex items-center justify-center shrink-0 shadow-md">
                  <tab.icon size={22} className="text-gold" strokeWidth={2} />
                </div>
                <div>
                  <span className="font-display font-bold uppercase tracking-widest text-[9px] text-gold-dark block">{t("why.pillarCategory")}</span>
                  <h3 className="font-display font-extrabold text-xl text-maroon-dark">{tab.label}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {tab.features.map((f) => (
                  <div key={f.title} className="flex gap-3 items-start p-3.5 rounded-2xl bg-cream border border-cream2">
                    <div className="w-9 h-9 rounded-xl bg-maroon flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <f.icon size={17} className="text-gold" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-maroon-dark text-sm leading-snug">{f.title}</h4>
                      <p className="font-body text-xs text-ink-80 mt-0.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 💻 DESKTOP VIEW (>= md): 4-Column Feature Cards Deck */}
      <div className="hidden md:grid md:grid-cols-4 gap-5 lg:gap-6 items-stretch">
        {whyChooseUsPillars.map((p) => {
          const Icon = p.icon;
          const isGoldHeader = p.color === "bg-gold";

          return (
            <div
              key={p.title}
              className="hover-lift bg-white rounded-3xl p-6 shadow-md border-t-4 border-gold border-x border-b border-gold-light/60 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Header Badge & Titles */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon size={26} className={isGoldHeader ? "text-maroon-dark" : "text-gold"} strokeWidth={2} />
                  </div>
                  <span className="bg-cream2 text-maroon-dark font-body text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold-light">
                    {t("why.pillar")}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-maroon-dark leading-tight">{p.title}</h3>
                <p className="font-body text-xs font-bold text-gold-dark mt-1">{p.tagline}</p>

                <div className="my-4 border-b border-cream2" />

                {/* Highlights List */}
                <div className="flex flex-col gap-2.5">
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 font-body text-xs md:text-sm text-ink-80 font-medium">
                      <CheckCircle2 size={16} className="text-green shrink-0 mt-0.5" strokeWidth={2.2} />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Assurance */}
              <div className="mt-6 pt-3 border-t border-cream2 flex items-center justify-between text-[11px] font-display font-bold text-maroon-dark">
                <span>{t("why.standard")}</span>
                <Star size={14} className="text-gold fill-gold shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



export function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const classLevels = [
    { level: "LKG", age: "3 - 4 yrs", focus: t("classes.lkg.focus") },
    { level: "UKG", age: "4 - 5 yrs", focus: t("classes.ukg.focus") },
    { level: "Class 1", age: "5 - 6 yrs", focus: t("classes.c1.focus") },
    { level: "Class 2", age: "6 - 7 yrs", focus: t("classes.c2.focus") },
    { level: "Class 3", age: "7 - 8 yrs", focus: t("classes.c3.focus") },
    { level: "Class 4", age: "8 - 9 yrs", focus: t("classes.c4.focus") },
    { level: "Class 5", age: "9 - 10 yrs", focus: t("classes.c5.focus") },
  ];

  return (
    <article aria-label="Model Primary School Home Page">
      <Helmet>
        <title>Model Primary School, Bharsare | मॉडल प्राइमरी स्कूल भरसारे</title>
        <meta name="description" content="Model Primary School in Bharsare, Sultanpur (LKG to Class 5). सुल्तानपुर का सर्वश्रेष्ठ इंग्लिश मीडियम प्राइमरी स्कूल। Admissions open 2026-27." />
        <meta name="keywords" content="Model Primary School Bharsare, मॉडल प्राइमरी स्कूल भरसारे, सुल्तानपुर में प्राइमरी स्कूल, best school in Sultanpur, बच्चों का स्कूल भदैयां, LKG admission, प्राइमरी स्कूल सुल्तानपुर" />
        <link rel="canonical" href="https://modelprimaryschool.in/" />
        <meta property="og:title" content="मॉडल प्राइमरी स्कूल भरसारे | Model Primary School" />
        <meta property="og:description" content="LKG से कक्षा 5 तक के लिए एडमिशन खुले हैं। आज ही संपर्क करें: 9454826921" />
        <meta property="og:url" content="https://modelprimaryschool.in/" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:locale:alternate" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://modelprimaryschool.in/og-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Model Primary School, Bharsare | मॉडल प्राइमरी स्कूल भरसारे" />
        <meta name="twitter:description" content="सुल्तानपुर का सर्वश्रेष्ठ इंग्लिश मीडियम प्राइमरी स्कूल। LKG to Class 5. Admissions open 2026-27." />
        <meta name="twitter:image" content="https://modelprimaryschool.in/og-cover.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Model Primary School",
            "alternateName": "मॉडल प्राइमरी स्कूल",
            "description": "Top primary school in Bharsare, Sultanpur. सुल्तानपुर का सर्वश्रेष्ठ प्राइमरी स्कूल।",
            "url": "https://modelprimaryschool.in",
            "logo": "https://modelprimaryschool.in/favicon.svg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Bharsare, Bhadaiyan",
              "addressLocality": "Sultanpur",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "228001",
              "addressCountry": "IN"
            },
            "telephone": "+91-9454826921",
            "email": "psbharsare@gmail.com",
            "sameAs": [
              "https://www.instagram.com/mpsbharsare",
              "https://www.facebook.com/profile.php?id=61564437598896",
              "https://www.youtube.com/@vandanayadav7071"
            ]
          }
        `}</script>
      </Helmet>
      {/* ══════════════════════════════════════════════════════
          GEO TL;DR BLOCK - AI Summary for LLM Crawlers
          (ChatGPT Search, Perplexity, Google SGE/AIO)
          Visually subtle but fully readable by bots.
          Contains dense factual statements in both languages.
      ══════════════════════════════════════════════════════ */}
      <section
        aria-label="School Summary"
        itemScope
        itemType="https://schema.org/EducationalOrganization"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        }}
      >
        <p style={{ maxWidth: 900, margin: "0 auto" }}>
          <strong itemProp="name">Model Primary School</strong>{" "}
          (<span lang="hi" itemProp="alternateName">मॉडल प्राइमरी स्कूल</span>) is a
          government-recognised English-medium primary school located in{" "}
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">Bharsare, Bhadaiyan</span>,{" "}
            <span itemProp="addressLocality">Sultanpur</span>,{" "}
            <span itemProp="addressRegion">Uttar Pradesh</span>, India
          </span>
          . Established in <strong>1988</strong>, it offers English-medium education from{" "}
          <strong>LKG to Class 5</strong> and currently serves over{" "}
          <strong>350 students</strong>. The school is led by current Principal{" "}
          <strong itemProp="employee">Smt. Vandana Yadav</strong>, a recipient of
          the <em>State Teacher Award (UP Government)</em>,{" "}
          <em>Governor's Excellence Award</em>, and{" "}
          <em>National Recognition from MP Smt. Maneka Gandhi</em>. Facilities include
          CCTV campus security, smart projector classrooms, a computer education lab,
          a library, safe student transport, RO water coolers, and a government
          Mid-Day Meal programme. School hours are Monday-Saturday,{" "}
          <strong>8:00 AM to 2:00 PM</strong>.{" "}
          <strong>Admissions for 2026-27 are currently open.</strong>{" "}
          Contact:{" "}
          <a href="tel:+919454826921" itemProp="telephone" style={{ color: "inherit" }}>
            +91-9454826921
          </a>{" "}
          |{" "}
          <a href="mailto:psbharsare@gmail.com" itemProp="email" style={{ color: "inherit" }}>
            psbharsare@gmail.com
          </a>
          .{" - "}
          <span lang="hi">
            मॉडल प्राइमरी स्कूल, भरसारे, सुल्तानपुर - LKG से कक्षा 5 तक अंग्रेज़ी
            माध्यम शिक्षा। वर्तमान प्रधानाचार्य: श्रीमती वंदना यादव (राज्य शिक्षक
            पुरस्कार विजेता)। प्रवेश 2026-27 खुले हैं। संपर्क: 9454826921।
          </span>
        </p>
      </section>

      {/* HERO */}
      <section className="relative bg-cream overflow-hidden">
        <div className="absolute -top-6 -right-6 md:hidden opacity-70 animate-spin-slow pointer-events-none" aria-hidden="true">
          <Emblem size={160} ring={false} />
        </div>
        <div className="absolute hidden md:block -top-8 -right-8 opacity-90 animate-spin-slow pointer-events-none" aria-hidden="true">
          <Emblem size={240} ring={false} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24 flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-center relative">
          {/* Left Column wrapper: contents on mobile so children participate in main flex container, flex-col on desktop */}
          <div className="contents md:flex md:flex-col md:col-span-5">
            {/* 1. Headings & Paragraph text */}
            <div className="order-1 md:order-1">
              <SectionLabel>{t('hero.badge')}</SectionLabel>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-maroon-dark leading-tight mt-4 md:mt-5">
                {t('hero.h1a')} <span className="text-gold-dark">{t('hero.h1b')}</span>
              </h1>
              <p className="font-body text-ink-70 text-base md:text-lg mt-4 md:mt-5 leading-relaxed">
                {t('hero.body')}
              </p>
            </div>

            {/* Call-to-Action Buttons (Mobile Order 3, Desktop Order 2) */}
            <div className="order-3 md:order-2 flex flex-row items-center gap-2.5 sm:gap-4 mt-3 md:mt-8 w-full">
              <CTAButton
                variant="primary"
                onClick={() => navigate("/admissions")}
                className="flex-1 sm:flex-none px-3.5 sm:px-6 py-3 text-xs sm:text-base whitespace-nowrap justify-center"
              >
                {t('hero.cta1')}
              </CTAButton>
              <CTAButton
                variant="outline"
                icon={ChevronRight}
                onClick={() => navigate("/about")}
                className="flex-1 sm:flex-none px-3.5 sm:px-6 py-3 text-xs sm:text-base whitespace-nowrap justify-center"
              >
                {t('hero.cta2')}
              </CTAButton>
            </div>

            {/* Facility Tags (Mobile Order 4, Desktop Order 3) */}
            <div className="order-4 md:order-3 flex flex-wrap gap-2.5 sm:gap-3 mt-1 md:mt-8">
              {[t('hero.tag1'), t('hero.tag2'), t('hero.tag3'), t('hero.tag4')].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 bg-white-80 border border-gold-light rounded-full px-3.5 py-1.5 text-xs md:text-sm font-body font-semibold text-maroon-dark shadow-sm">
                  <CheckCircle2 size={14} className="text-green" /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 2. School Image (Mobile Order 2, Desktop Right Column) */}
          <div className="order-2 md:order-none md:col-span-7 relative w-full my-2 md:my-0">
            <ImagePlaceholder src="/hero_home.png" label="School building & entrance" caption="Pencil-and-book branded exterior" ratio="4 / 3" className="w-full shadow-2xl" />
            {/* Mascot illustration - visible on mobile & desktop */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-8 sm:-left-8 z-10 animate-bob">
              <Mascot variant="girl" size={90} className="w-20 sm:w-28" />
            </div>
            {/* Model in Education floating badge - visible on mobile & desktop */}
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 flex bg-white glass-card rounded-2xl shadow-xl px-3 py-2 sm:px-4 sm:py-3 items-center gap-1.5 sm:gap-2 z-10 border border-gold-light">
              <Emblem size={28} ring={false} />
              <span className="font-display font-bold text-maroon-dark text-[11px] sm:text-xs leading-tight">{t('hero.badge2')}</span>
            </div>
          </div>
        </div>
        <PencilDivider />
      </section>

      {/* WHY CHOOSE US - Interactive Tabs */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>{t('why.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('why.h2')}</h2>
          </div>
          <WhyTabs />
        </div>
      </section>

      <PencilDivider thin />

      {/* CLASSES WE OFFER - Vertical Timeline */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center"><Eyebrow>{t('classes.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('classes.h2')}</h2>
            <p className="font-body text-ink-60 mt-3 text-sm">{t('classes.body')}</p>
          </div>
          {/* 📱 MOBILE VIEW: Premium Left-Aligned Vertical Educational Stepper (< md) */}
          <div className="md:hidden relative pl-2 pr-1">
            {/* Left vertical connector line */}
            <div
              className="absolute left-[21px] top-6 bottom-6 w-1.5 rounded-full shadow-xs"
              style={{ background: 'linear-gradient(to bottom, var(--gold) 0%, var(--maroon) 100%)' }}
            />
            <div className="flex flex-col gap-6">
              {classLevels.map((c, i) => {
                const stepIcons = [Palette, BookOpen, Languages, TreePine, Sparkles, Trophy, GraduationCap];
                const StepIcon = stepIcons[i % stepIcons.length];
                const isMaroonNode = i % 2 !== 0;

                return (
                  <div key={c.level} className="relative flex items-start gap-4">
                    {/* Node Badge on Left Line */}
                    <div
                      className={`relative z-10 shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-md border-2 border-white mt-0.5 ${
                        isMaroonNode ? 'bg-maroon' : 'bg-gold'
                      }`}
                    >
                      <StepIcon size={20} className={isMaroonNode ? 'text-gold' : 'text-maroon-dark'} strokeWidth={2.2} />
                    </div>

                    {/* Timeline Content Card */}
                    <div className="flex-1 bg-white rounded-3xl p-5 shadow-lg border-2 border-gold-light border-l-4 border-l-maroon relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="font-display font-bold uppercase tracking-widest text-[9px] text-gold-dark block">
                            {t('classes.stage')} {i + 1} {t('classes.of')} 7
                          </span>
                          <h3 className="font-display font-extrabold text-xl text-maroon-dark">{c.level}</h3>
                        </div>
                        <span className="bg-cream2 border border-gold-light text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full shrink-0 shadow-xs">
                          {c.age}
                        </span>
                      </div>
                      
                      <p className="font-body text-xs text-ink-80 leading-relaxed bg-cream p-3 rounded-2xl border border-cream2 font-medium">
                        {c.focus}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 💻 DESKTOP VIEW: Alternating Centered Timeline (>= md) */}
          <div className="hidden md:block relative">
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

      <PencilDivider thin />

      {/* ABOUT BRIEF */}
      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative">
          <ImagePlaceholder src="/students_assembly.png" label="Morning assembly" caption="Students in maroon & pink uniforms" tone="pink" ratio="5 / 4" />
          <div>
            <Eyebrow light>{t('home.about.eyebrow')}</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">{t('home.about.h2')}</h2>
            <p className="font-body text-gold-light-85 mt-4 leading-relaxed">
              {t('home.about.body')}
            </p>
            <CTAButton variant="gold" onClick={() => navigate("/about")} className="mt-6">{t('home.about.btn')}</CTAButton>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* EVENT HIGHLIGHTS */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <Eyebrow>{t('home.events.eyebrow')}</Eyebrow>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('home.events.h2')}</h2>
            </div>
            <button onClick={() => navigate("/gallery")} className="focus-ring font-display font-bold link-arrow flex items-center gap-1">
              {t('home.events.btn')} <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <ImagePlaceholder src="/annual_event.png" label={t('home.events.e1.label')} caption={t('home.events.e1.caption')} />
            <ImagePlaceholder src="/outdoor_fun.png" label={t('home.events.e2.label')} caption={t('home.events.e2.caption')} tone="green" />
            <ImagePlaceholder src="/tour.png" label={t('home.events.e3.label')} caption={t('home.events.e3.caption')} tone="pink" />
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* FINAL CTA BANNER */}
      <section className="bg-gold py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <PartyPopper className="mx-auto text-maroon-dark mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">{t('home.cta.h2')}</h2>
          <p className="font-body text-maroon-dark-80 mt-2">{t('home.cta.body')}</p>
          <CTAButton variant="primary" onClick={() => navigate("/admissions")} className="mt-6">{t('home.cta.btn')}</CTAButton>
        </div>
      </section>
    </article>
  );
}

/* ============================================================
   VISION & MISSION COMPONENT (Mobile-Optimized)
   ============================================================ */
function VisionMissionSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("vision");

  return (
    <section className="bg-cream2 py-16 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <div className="flex justify-center"><Eyebrow>{t('vm.eyebrow')}</Eyebrow></div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('vm.h2')}</h2>
          <p className="font-body text-ink-60 text-sm mt-2 hidden md:block">{t('vm.sub')}</p>
        </div>

        {/* 📱 MOBILE VIEW: Interactive Segmented Control & Rich Card Deck */}
        <div className="md:hidden">
          {/* Segmented Control Pill */}
          <div className="flex bg-cream3 p-1.5 rounded-full mb-6 border border-gold-light shadow-inner">
            <button
              onClick={() => setActiveTab("vision")}
              className={`flex-1 py-3 px-4 rounded-full font-display font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "vision"
                  ? "bg-maroon text-white shadow-md scale-[1.02]"
                  : "text-maroon-dark opacity-75 hover:opacity-100"
              }`}
            >
              <Star size={18} className={activeTab === "vision" ? "text-gold" : "text-maroon"} strokeWidth={2.2} />
              {t('vm.tab.vision')}
            </button>
            <button
              onClick={() => setActiveTab("mission")}
              className={`flex-1 py-3 px-4 rounded-full font-display font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "mission"
                  ? "bg-gold text-maroon-dark shadow-md scale-[1.02]"
                  : "text-maroon-dark opacity-75 hover:opacity-100"
              }`}
            >
              <HeartHandshake size={18} className="text-maroon-dark" strokeWidth={2.2} />
              {t('vm.tab.mission')}
            </button>
          </div>

          {/* Dynamic Mobile Card */}
          <div className="relative">
            {activeTab === "vision" ? (
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-maroon relative overflow-hidden transition-all duration-300">
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-cream2 opacity-60 flex items-center justify-center pointer-events-none z-0">
                  <Star size={60} className="text-gold opacity-25" />
                </div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-maroon flex items-center justify-center shadow-md">
                      <Star size={22} className="text-gold" strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-display font-bold uppercase tracking-widest text-[10px] text-gold-dark">{t('vm.dest')}</span>
                      <h3 className="font-display font-extrabold text-xl text-maroon-dark">{t('vm.tab.vision')}</h3>
                    </div>
                  </div>
                  <span className="bg-cream2 border border-gold-light text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full relative z-10 shadow-xs shrink-0">
                    {t('vm.future')}
                  </span>
                </div>

                <p className="font-body text-ink-80 text-sm leading-relaxed mb-5">
                  {t('vm.vision.body')}
                </p>

                {/* Scannable Pillars */}
                <div className="pt-4 border-t border-cream3 space-y-2">
                  <span className="font-display font-bold text-[11px] uppercase tracking-wider text-ink-50 block mb-1.5">{t('vm.vision.pillars')}</span>
                  {[
                    { icon: Sparkles, text: t('vm.vision.p1') },
                    { icon: Users, text: t('vm.vision.p2') },
                    { icon: GraduationCap, text: t('vm.vision.p3') }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-cream px-3 py-2 rounded-xl border border-cream2">
                      <p.icon size={15} className="text-maroon shrink-0" strokeWidth={2} />
                      <span className="font-body text-xs font-semibold text-maroon-dark">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gold relative overflow-hidden transition-all duration-300">
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-cream2 opacity-60 flex items-center justify-center pointer-events-none z-0">
                  <HeartHandshake size={60} className="text-maroon opacity-20" />
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gold flex items-center justify-center shadow-md">
                      <HeartHandshake size={22} className="text-maroon-dark" strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-display font-bold uppercase tracking-widest text-[10px] text-gold-dark">{t('vm.commit')}</span>
                      <h3 className="font-display font-extrabold text-xl text-maroon-dark">{t('vm.tab.mission')}</h3>
                    </div>
                  </div>
                  <span className="bg-gold-light border border-gold text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full relative z-10 shadow-xs shrink-0">
                    {t('vm.action')}
                  </span>
                </div>

                <p className="font-body text-ink-80 text-sm leading-relaxed mb-5">
                  {t('vm.mission.body')}
                </p>

                {/* Scannable Pillars */}
                <div className="pt-4 border-t border-cream3 space-y-2">
                  <span className="font-display font-bold text-[11px] uppercase tracking-wider text-ink-50 block mb-1.5">{t('vm.mission.pillars')}</span>
                  {[
                    { icon: Puzzle, text: t('vm.mission.p1') },
                    { icon: ShieldCheck, text: t('vm.mission.p2') },
                    { icon: Trophy, text: t('vm.mission.p3') }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-cream px-3 py-2 rounded-xl border border-cream2">
                      <p.icon size={15} className="text-gold-dark shrink-0" strokeWidth={2} />
                      <span className="font-body text-xs font-semibold text-maroon-dark">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 💻 DESKTOP VIEW: Asymmetric Overlapping Cards Grid */}
        <div className="hidden md:block relative">
          <div
            className="absolute bg-maroon rounded-full opacity-10"
            style={{ width: '320px', height: '320px', top: '-60px', left: '-80px', zIndex: 0 }}
            aria-hidden="true"
          />
          <div className="grid md:grid-cols-2 gap-8 items-start relative" style={{ zIndex: 1 }}>
            {/* Vision - shifted UP */}
            <div className="vision-card bg-white rounded-3xl p-8 shadow-xl border-t-4 border-maroon relative overflow-hidden" style={{ marginTop: 0 }}>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-maroon flex items-center justify-center shadow-md">
                    <Star size={22} className="text-gold" strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="font-display font-bold uppercase tracking-widest text-[10px] text-gold-dark block">{t('vm.dest')}</span>
                    <h3 className="font-display font-bold text-xl text-maroon-dark">{t('vm.tab.vision')}</h3>
                  </div>
                </div>
                <span className="bg-cream2 border border-gold-light text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full relative z-10 shadow-xs shrink-0">
                  {t('vm.future')}
                </span>
              </div>
              <p className="font-body text-ink-70 leading-relaxed mb-6">
                {t('vm.vision.body')}
              </p>
              <div className="pt-4 border-t border-cream3 space-y-2">
                {[
                  { icon: Sparkles, text: t('vm.vision.p1') },
                  { icon: Users, text: t('vm.vision.p2') },
                  { icon: GraduationCap, text: t('vm.vision.p3') }
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-cream px-3.5 py-2 rounded-xl border border-cream2">
                    <p.icon size={15} className="text-maroon shrink-0" strokeWidth={2} />
                    <span className="font-body text-xs font-semibold text-maroon-dark">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Mission - shifted DOWN for asymmetric feel */}
            <div className="mission-card bg-white rounded-3xl p-8 shadow-xl border-t-4 border-gold md:mt-16 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-md">
                    <HeartHandshake size={22} className="text-maroon-dark" strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="font-display font-bold uppercase tracking-widest text-[10px] text-gold-dark block">{t('vm.commit')}</span>
                    <h3 className="font-display font-bold text-xl text-maroon-dark">{t('vm.tab.mission')}</h3>
                  </div>
                </div>
                <span className="bg-gold-light border border-gold text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full relative z-10 shadow-xs shrink-0">
                  {t('vm.action')}
                </span>
              </div>
              <p className="font-body text-ink-70 leading-relaxed mb-6">
                {t('vm.mission.body')}
              </p>
              <div className="pt-4 border-t border-cream3 space-y-2">
                {[
                  { icon: Puzzle, text: t('vm.mission.p1') },
                  { icon: ShieldCheck, text: t('vm.mission.p2') },
                  { icon: Trophy, text: t('vm.mission.p3') }
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-cream px-3.5 py-2 rounded-xl border border-cream2">
                    <p.icon size={15} className="text-gold-dark shrink-0" strokeWidth={2} />
                    <span className="font-body text-xs font-semibold text-maroon-dark">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT US PAGE
   ============================================================ */
export function AboutPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  /* ── Count-up hooks (all fire together via one section ref) ── */
  const [statsRef, statsInView] = useInView(0.25);
  const c38  = useCountUp(38,  '+', 1600, statsInView);
  const c350 = useCountUp(350, '+', 1800, statsInView);
  const c4   = useCountUp(4,   '',  1000, statsInView);
  const c7   = useCountUp(7,   '',  1000, statsInView);

  const statsData = [
    { num: c38,  label: t('about.stat.years'),     sub: t('about.stat.years.sub'),        icon: BookOpen      },
    { num: c350, label: t('about.stat.students'),  sub: t('about.stat.students.sub'),     icon: Users         },
    { num: c4,   label: t('about.stat.teachers'),  sub: t('about.stat.teachers.sub'),     icon: GraduationCap },
    { num: c7,   label: t('about.stat.classes'),   sub: t('about.stat.classes.sub'),      icon: Star          },
  ];

  /* ── Stagger for Why Choose Us ── */
  const [whyRef, whyVisible] = useInView(0.15);

  const features = [
    { icon: Languages,   title: t('why.tab.academics.f1.title'),    desc: t('why.tab.academics.f1.desc') },
    { icon: ShieldCheck, title: t('why.tab.safety.f1.title'),       desc: t('why.tab.safety.f1.desc') },
    { icon: Video,       title: t('why.tab.safety.f2.title'),       desc: t('why.tab.safety.f2.desc') },
    { icon: TreePine,    title: t('why.tab.infra.f1.title'),        desc: t('why.tab.infra.f1.desc') },
    { icon: Bus,         title: t('why.tab.safety.f3.title'),       desc: t('why.tab.safety.f3.desc') },
    { icon: Droplets,    title: t('why.tab.infra.f2.title'),        desc: t('why.tab.infra.f2.desc') },
    { icon: Library,     title: t('why.tab.infra.f3.title'),        desc: t('why.tab.infra.f3.desc') },
  ];

  const teachers = [
    {
      name: 'Diksha Shrivastav',
      role: t('about.faculty.role1'),
      award: t('about.faculty.award1'),
      src: '/teacher-1.png',
    },
    {
      name: 'Sunil Singh',
      role: t('about.faculty.role2'),
      src: '/teacher-2.png',
    },
    {
      name: 'Janki Devi',
      role: t('about.faculty.role3'),
      src: '/teacher-3.png',
    },
    {
      name: 'Pradeep Kumar',
      role: t('about.faculty.role4'),
      src: '/teacher-4.png',
    },
    {
      name: t('about.faculty.name5'),
      role: t('about.faculty.role5'),
      src: '/teacher-5.png',
    },
  ];

  return (
    <article aria-label="About Model Primary School">
      <Helmet>
        <title>मॉडल प्राइमरी स्कूल शिक्षक | About Our Faculty | Model Primary School Bharsare</title>
        <meta name="description" content="Meet our dedicated faculty led by State Awardee Smt. Vandana Yadav. मॉडल प्राइमरी स्कूल भरसारे की समर्पित शिक्षिकाएं एवं स्टाफ।" />
        <meta name="keywords" content="Vandana Yadav, श्रीमती वंदना यादव प्रधानाचार्या, Diksha Shrivastav ICT award, Pradeep Kumar teacher, Dr. Ashok Kumar Verma designer, MPS Bharsare faculty, मॉडल स्कूल शिक्षक" />
        <link rel="canonical" href="https://modelprimaryschool.in/about" />
        <meta property="og:title" content="मॉडल प्राइमरी स्कूल भरसारे - हमारे शिक्षक | About Our Faculty" />
        <meta property="og:description" content="समर्पित शिक्षिकाओं की टीम जो बच्चों का भविष्य संवारती हैं। Led by State Teacher Awardee Smt. Vandana Yadav." />
        <meta property="og:url" content="https://modelprimaryschool.in/about" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:locale:alternate" content="en_IN" />
      </Helmet>
      <PageHero
        eyebrow={t('nav.about')}
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
      />

      {/* HISTORY */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>{t('about.story.eyebrow')}</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('about.story.h2')}</h2>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              {t('about.story.p1')}
            </p>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              {t('about.story.p2')}
            </p>
            <p className="font-body text-ink-70 mt-4 leading-relaxed">
              {t('about.story.p3')}
            </p>
            <div className="mt-6 flex items-center gap-3 bg-green-light rounded-2xl p-4 border border-green-30">
              <ShieldCheck className="text-green shrink-0" size={30} />
              <p className="font-body text-sm text-ink-80"><strong className="text-maroon-dark">{t('about.story.badge.title')}</strong>{t('about.story.badge.desc')}</p>
            </div>
          </div>
          <ImagePlaceholder src="/entrance_gate.png" label="Entrance Gate &amp; Signage" caption="Model Primary School main entrance" ratio="4 / 5" />
        </div>
      </section>

      <PencilDivider thin />

      {/* MODEL AT A GLANCE */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>{t('about.glance.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('about.glance.h2')}</h2>
            <p className="font-body mt-3 text-base" style={{ color: 'var(--gold-dark)' }}>
              {t('about.glance.sub')}
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
              src="/principal.png"
              label="Smt. Vandana Yadav - Principal"
              caption="Principal of Model Primary School"
              ratio="4 / 5"
              tone="pink"
              className="max-w-sm mx-auto shadow-2xl rounded-3xl"
            />
          </div>
          <div>
            <span className="font-display font-bold uppercase tracking-widest text-xs md:text-sm" style={{ color: "var(--gold)" }}>
              {t('about.principal.eyebrow')}
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3 mb-5">
              {t('about.principal.h2')}
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "rgba(251,217,138,0.9)" }}>
              {t('about.principal.p1')}
            </p>
            <p className="font-body leading-relaxed mt-4" style={{ color: "rgba(251,217,138,0.9)" }}>
              {t('about.principal.p2')}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gold rounded-full" />
              <p className="font-body italic text-white text-base">
                {t('about.principal.name')}<span style={{ color: "var(--gold-light)" }}>{t('about.principal.title')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* AWARDS & RECOGNITIONS */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>{t('about.awards.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t('about.awards.h2')}</h2>
            <p className="font-body text-maroon-dark font-semibold mt-3 text-sm md:text-base">
              {t('about.awards.sub.pre')}<span className="text-gold-dark font-bold underline decoration-gold">{t('about.awards.sub.name')}</span>{t('about.awards.sub.post')}
            </p>
          </div>

          {/* ── Crown Jewels: 3-column highlight row ── */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Trophy,
                color: 'bg-gold',
                textColor: 'text-maroon-dark',
                title: t('about.award.1.title'),
                body: t('about.award.1.body'),
                ribbon: t('about.award.1.ribbon'),
              },
              {
                icon: Crown,
                color: 'bg-maroon',
                textColor: 'text-white',
                title: t('about.award.2.title'),
                body: t('about.award.2.body'),
                ribbon: t('about.award.2.ribbon'),
              },
              {
                icon: Award,
                color: 'bg-gold',
                textColor: 'text-maroon-dark',
                title: t('about.award.3.title'),
                body: t('about.award.3.body'),
                ribbon: t('about.award.3.ribbon'),
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
                <p className="font-body text-xs md:text-sm text-ink-80 leading-relaxed">{award.body}</p>
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
              <span className="font-display font-bold text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                {t('about.awards.marquee')}
              </span>
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

      {/* 3 ─ MEET OUR FACULTY - Portrait Photo Spotlight (5 Staff Members) */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center"><Eyebrow>{t('about.faculty.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mt-2">
              {t('about.faculty.h2')}
            </h2>
            <p className="font-body text-ink-70 mt-3 text-sm md:text-base">
              {t('about.faculty.sub')}
            </p>
          </div>

          {/* 5 Photo Portrait Cards - 3 top row + 2 centered bottom row */}
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {teachers.map((teacher, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.35rem)] max-w-[350px] hover-lift bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-gold-light/60 hover:border-gold hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Large Portrait Photo Container */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-cream3 border-2 border-gold-light flex flex-col items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  {teacher.src ? (
                    <img src={teacher.src} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera size={44} className="text-maroon-dark-50 mb-2" strokeWidth={1.5} />
                      <span className="font-display font-bold text-sm text-maroon-dark-60 uppercase tracking-wider">{t('about.faculty.photo')}</span>
                    </>
                  )}
                  <div className="absolute top-3 right-3 bg-maroon text-white font-display text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-gold">
                    {teacher.award || `Educator ${idx + 1}`}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 pencil-stripe-thin" />
                </div>

                {/* Teacher Name & Role */}
                <div className="text-center pt-5 pb-2 flex flex-col items-center gap-2">
                  <h3 className="font-display font-extrabold text-2xl text-maroon-dark leading-snug">
                    {teacher.name}
                  </h3>
                  <span className="bg-cream2 text-maroon-dark font-display text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-gold-light shadow-xs">
                    {teacher.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* 4 ─ VISION & MISSION - interactive mobile tab switcher + desktop asymmetric layout */}
      <VisionMissionSection />

      <PencilDivider />

      {/* 5 ─ WHY CHOOSE US - staggered entrance animation */}
      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-10 animate-spin-slow" aria-hidden="true">
          <Emblem size={320} ring={false} />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <Eyebrow light>{t('about.why.eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-10">{t('about.why.h2')}</h2>
          <div ref={whyRef} className="flex flex-wrap justify-center items-stretch gap-3.5 sm:gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`feature-scale stagger-card bg-white-95 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg flex flex-row sm:flex-col gap-3.5 sm:gap-3 items-center sm:items-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-16px)] sm:max-w-[270px] ${whyVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: whyVisible ? `${i * 0.1}s` : '0s' }}
              >
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gold flex items-center justify-center shrink-0 shadow-sm">
                  <f.icon size={18} className="text-maroon-dark" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-maroon-dark text-sm md:text-base leading-snug">{f.title}</h3>
                  <p className="font-body text-xs md:text-sm text-ink-70 leading-relaxed mt-0.5 md:mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <PencilDivider thin />

      {/* CTA to Academics */}
      <section className="bg-cream py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4"><Eyebrow>{t('about.cta.eyebrow')}</Eyebrow></div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">{t('about.cta.h2')}</h2>
          <p className="font-body text-ink-70 mt-2">{t('about.cta.body')}</p>
          <CTAButton variant="primary" onClick={() => navigate("/academics")} className="mt-6">{t('about.cta.btn')}</CTAButton>
        </div>
      </section>
    </article>
  );
}

/* ============================================================
   ACADEMICS PAGE
   ============================================================ */
export function AcademicsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const curriculumStages = [
    {
      stage: t('acad.curr.s1.stage'),
      shortName: t('acad.curr.s1.stage'),
      badge: t('acad.curr.s1.badge'),
      age: t('acad.curr.s1.age'),
      headline: t('acad.curr.s1.headline'),
      desc: t('acad.curr.s1.desc'),
      outcome: t('acad.curr.s1.outcome'),
      subjects: [
        { name: t('acad.curr.s1.sub.1'), icon: Music },
        { name: t('acad.curr.s1.sub.2'), icon: BookOpen },
        { name: t('acad.curr.s1.sub.3'), icon: Sparkles },
        { name: t('acad.curr.s1.sub.4'), icon: Brain },
        { name: t('acad.curr.s1.sub.5'), icon: Palette },
        { name: t('acad.curr.s1.sub.6'), icon: SmilePlus },
      ],
      subjectsStr: t('acad.curr.s1.subjects_str'),
    },
    {
      stage: t('acad.curr.s2.stage'),
      shortName: t('acad.curr.s2.stage'),
      badge: t('acad.curr.s2.badge'),
      age: t('acad.curr.s2.age'),
      headline: t('acad.curr.s2.headline'),
      desc: t('acad.curr.s2.desc'),
      outcome: t('acad.curr.s2.outcome'),
      subjects: [
        { name: t('acad.curr.s2.sub.1'), icon: BookOpen },
        { name: t('acad.curr.s2.sub.2'), icon: Languages },
        { name: t('acad.curr.s2.sub.3'), icon: Brain },
        { name: t('acad.curr.s2.sub.4'), icon: TreePine },
        { name: t('acad.curr.s2.sub.5'), icon: Sparkles },
        { name: t('acad.curr.s2.sub.6'), icon: Palette },
      ],
      subjectsStr: t('acad.curr.s2.subjects_str'),
    },
    {
      stage: t('acad.curr.s3.stage'),
      shortName: t('acad.curr.s3.stage'),
      badge: t('acad.curr.s3.badge'),
      age: t('acad.curr.s3.age'),
      headline: t('acad.curr.s3.headline'),
      desc: t('acad.curr.s3.desc'),
      outcome: t('acad.curr.s3.outcome'),
      subjects: [
        { name: t('acad.curr.s3.sub.1'), icon: BookOpen },
        { name: t('acad.curr.s3.sub.2'), icon: Languages },
        { name: t('acad.curr.s3.sub.3'), icon: Brain },
        { name: t('acad.curr.s3.sub.4'), icon: TreePine },
        { name: t('acad.curr.s3.sub.5'), icon: Computer },
        { name: t('acad.curr.s3.sub.6'), icon: Trophy },
      ],
      subjectsStr: t('acad.curr.s3.subjects_str'),
    },
  ];

  const classLevels = [
    { level: "LKG", age: "3 - 4 yrs", focus: t("classes.lkg.focus") },
    { level: "UKG", age: "4 - 5 yrs", focus: t("classes.ukg.focus") },
    { level: "Class 1", age: "5 - 6 yrs", focus: t("classes.c1.focus") },
    { level: "Class 2", age: "6 - 7 yrs", focus: t("classes.c2.focus") },
    { level: "Class 3", age: "7 - 8 yrs", focus: t("classes.c3.focus") },
    { level: "Class 4", age: "8 - 9 yrs", focus: t("classes.c4.focus") },
    { level: "Class 5", age: "9 - 10 yrs", focus: t("classes.c5.focus") },
  ];

  const dailyRoutine = [
    { time: t('acad.routine.r1.time'), activity: t('acad.routine.r1.act') },
    { time: t('acad.routine.r2.time'), activity: t('acad.routine.r2.act') },
    { time: t('acad.routine.r3.time'), activity: t('acad.routine.r3.act') },
    { time: t('acad.routine.r4.time'), activity: t('acad.routine.r4.act') },
    { time: t('acad.routine.r5.time'), activity: t('acad.routine.r5.act') },
    { time: t('acad.routine.r6.time'), activity: t('acad.routine.r6.act') },
    { time: t('acad.routine.r7.time'), activity: t('acad.routine.r7.act') },
  ];

  const methodologyPillars = [
    { icon: Puzzle, title: t('acad.method.m1.title'), desc: t('acad.method.m1.desc') },
    { icon: HeartHandshake, title: t('acad.method.m2.title'), desc: t('acad.method.m2.desc') },
    { icon: Trophy, title: t('acad.method.m3.title'), desc: t('acad.method.m3.desc') },
    { icon: SmilePlus, title: t('acad.method.m4.title'), desc: t('acad.method.m4.desc') },
  ];

  const activeStage = curriculumStages[activeStageIndex] || curriculumStages[0];

  return (
    <article aria-label="Academics and Curriculum">
      <Helmet>
        <title>Academics &amp; Curriculum | Model Primary School Bharsare</title>
        <meta name="description" content="Full curriculum from LKG to Class 5 at Model Primary School, Bharsare. Smart Classes, Computer Lab, co-curricular activities and personalised learning." />
        <link rel="canonical" href="https://modelprimaryschool.in/academics" />
        <meta property="og:title" content="Academics & Curriculum | Model Primary School" />
        <meta property="og:url" content="https://modelprimaryschool.in/academics" />
      </Helmet>
      <PageHero
        eyebrow={t('acad.hero.eyebrow')}
        title={t('acad.hero.title')}
        subtitle={t('acad.hero.subtitle')}
      />

      {/* CURRICULUM - Concept 1: Interactive Segmented Stage Switcher & Dynamic Canvas */}
      <section className="bg-cream py-14 md:py-24 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="flex justify-center"><Eyebrow>{t('acad.curr.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-maroon-dark mt-2 mb-3">
              {t('acad.curr.h2')}
            </h2>
            <p className="font-body text-ink-70 text-xs sm:text-sm md:text-base leading-relaxed">
              {t('acad.curr.sub')}
            </p>
          </div>

          {/* 📱 MOBILE VIEW: Segmented Stage Switcher & Dynamic Active Stage Canvas (< md) */}
          <div className="md:hidden flex flex-col gap-4">
            {/* Mobile Pill Tabs - exact match to Screenshot 2 */}
            <div className="flex bg-cream3 p-1.5 rounded-full border border-gold-light shadow-inner w-full">
              {curriculumStages.map((stg, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stg.stage}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    className={`flex-1 py-2.5 px-2 rounded-full font-display font-bold text-xs text-center transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-maroon text-white shadow-md scale-[1.02]'
                        : 'text-maroon-dark opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span>{stg.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Active Showcase Card - exact match to Screenshot 2 */}
            <div key={activeStage.stage} className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-t-4 border-gold border-x border-b border-gold-light/60 animate-slide-up">
              {/* Header Row */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-cream2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-maroon flex items-center justify-center shrink-0 shadow-md">
                    <GraduationCap size={22} className="text-gold" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-display font-bold uppercase tracking-widest text-[9px] text-gold-dark block">
                      {activeStage.badge}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-maroon-dark leading-tight">
                      {activeStage.headline}
                    </h3>
                  </div>
                </div>
                <span className="bg-gold-light text-maroon-dark font-body text-xs font-bold px-3 py-1 rounded-full border border-gold-light shrink-0">
                  {activeStage.age}
                </span>
              </div>

              <p className="font-body text-xs sm:text-sm text-ink-80 leading-relaxed mb-5 font-medium">
                {activeStage.desc}
              </p>

              {/* Key Subjects Grid */}
              <div className="mb-5">
                <span className="font-display font-bold uppercase tracking-widest text-[9px] text-gold-dark block mb-2.5">
                  {t('acad.curr.keysubjects')}
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeStage.subjects.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex gap-2.5 items-center p-3 rounded-2xl bg-cream border border-cream2"
                    >
                      <div className="w-8 h-8 rounded-xl bg-maroon flex items-center justify-center shrink-0 shadow-xs">
                        <sub.icon size={16} className="text-gold" strokeWidth={2} />
                      </div>
                      <span className="font-display font-bold text-maroon-dark text-xs leading-snug">
                        {sub.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome Footer */}
              <div className="pt-3.5 border-t border-cream2 flex items-center justify-between text-xs font-display font-extrabold text-maroon-dark">
                <span>{activeStage.outcome}</span>
                <Sparkles size={16} className="text-gold fill-gold shrink-0 animate-pulse" />
              </div>
            </div>
          </div>

          {/* 💻 DESKTOP VIEW: 100% Original Layout Restored (>= md) */}
          <div className="hidden md:grid gap-3.5 sm:gap-5">
            {curriculumStages.map((c) => (
              <div key={c.stage} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-md flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 md:gap-8 border-l-4 border-gold">
                <span className="font-display font-extrabold text-maroon-dark text-base sm:text-lg md:w-40 shrink-0">{c.stage}</span>
                <p className="font-body text-ink-70 text-xs sm:text-sm md:text-base leading-relaxed">{c.subjectsStr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* CLASSES OFFERED */}
      <section className="bg-cream2 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="flex justify-center"><Eyebrow>{t('acad.classes.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-maroon-dark">{t('acad.classes.h2')}</h2>
          </div>
          {/* 📱 MOBILE VIEW: 2-Column App Icon Grid (< md) with Full-Width 7th Item */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {classLevels.map((c, i) => {
              const stepIcons = [Palette, BookOpen, Languages, TreePine, Sparkles, Trophy, GraduationCap];
              const StepIcon = stepIcons[i % stepIcons.length];
              const isLast = i === classLevels.length - 1;

              return (
                <button
                  key={c.level}
                  type="button"
                  onClick={() => setSelectedClass(c)}
                  className={`bg-white rounded-2xl p-3.5 shadow-sm border-2 transition-all active:scale-95 hover:border-gold hover:shadow-md cursor-pointer group flex ${
                    isLast
                      ? 'col-span-2 flex-row items-center justify-center gap-3.5 border-gold bg-cream/50'
                      : 'flex-col items-center justify-center text-center border-gold-light/70'
                  }`}
                >
                  <div
                    className={`rounded-2xl bg-gold-light flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 border border-gold ${
                      isLast ? 'w-11 h-11' : 'w-12 h-12 mb-2'
                    }`}
                  >
                    <StepIcon size={24} className="text-maroon-dark" strokeWidth={2.2} />
                  </div>
                  <div className={isLast ? 'text-left' : 'text-center'}>
                    <span className="font-display font-extrabold text-xs sm:text-sm text-maroon-dark leading-tight block">{c.level}</span>
                    <span className="text-[10px] font-bold text-gold-dark mt-0.5 block">{c.age}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 📱 MOBILE BOTTOM SHEET MODAL */}
          {selectedClass && (
            <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
              <div
                className="fixed inset-0 bg-maroon-dark/60 backdrop-blur-xs transition-opacity"
                onClick={() => setSelectedClass(null)}
              />
              
              <div className="relative w-full bg-white rounded-t-3xl border-t-4 border-maroon p-6 shadow-2xl z-10 animate-slide-up max-h-[85vh] overflow-y-auto">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-1.5 bg-cream3 rounded-full cursor-pointer hover:bg-gold-light transition-colors"
                    onClick={() => setSelectedClass(null)}
                  />
                </div>

                <div className="flex items-start justify-between gap-3 pb-4 border-b border-cream2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-md border-2 border-white shrink-0">
                      <GraduationCap size={24} className="text-maroon-dark" strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-display font-bold uppercase tracking-wider text-[10px] text-gold-dark block">
                        {t('acad.modal.details')}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-maroon-dark leading-tight">{selectedClass.level}</h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedClass(null)}
                    className="w-8 h-8 rounded-full bg-cream2 hover:bg-gold-light text-maroon-dark flex items-center justify-center transition-colors shrink-0"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div className="flex items-center justify-between bg-cream2 p-3.5 rounded-2xl border border-gold-light/60">
                    <span className="font-display font-bold text-xs text-maroon-dark uppercase tracking-wide">{t('acad.modal.age')}</span>
                    <span className="bg-white border border-gold text-maroon-dark font-body text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                      {selectedClass.age}
                    </span>
                  </div>

                  <div>
                    <span className="font-display font-bold text-xs text-gold-dark uppercase tracking-wider block mb-1.5">
                      {t('acad.modal.focus')}
                    </span>
                    <div className="bg-cream p-4 rounded-2xl border border-cream2">
                      <p className="font-body text-xs sm:text-sm text-ink-80 leading-relaxed font-medium">{selectedClass.focus}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedClass(null)}
                  className="w-full mt-5 py-3 bg-maroon hover:bg-maroon-dark text-white font-display font-bold text-sm rounded-2xl shadow-md transition-colors"
                >
                  {t('acad.modal.close')}
                </button>
              </div>
            </div>
          )}

          {/* 💻 DESKTOP VIEW: 7-Column Grid Layout (>= md) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-5 justify-center">
            {classLevels.map((c) => (
              <div
                key={c.level}
                className="hover-lift bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-md text-center border-b-4 border-maroon flex flex-col items-center justify-between"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-full bg-gold-light flex items-center justify-center mb-2 sm:mb-3 shrink-0">
                  <GraduationCap size={20} className="text-maroon-dark sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display font-extrabold text-base sm:text-xl text-maroon-dark">{c.level}</h3>
                <p className="font-body text-[11px] sm:text-xs text-gold-dark font-bold mt-0.5 sm:mt-1">{c.age}</p>
                <p className="font-body text-xs sm:text-sm text-ink-60 mt-1 sm:mt-2 leading-snug">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* DAILY ROUTINE */}
      <section className="bg-cream py-14 md:py-20 w-full overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 md:px-10 w-full min-w-0">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-14 w-full min-w-0">
            {/* Left Timeline Column (40% width) */}
            <div className="w-full md:w-[40%] lg:w-[38%] shrink-0 min-w-0">
              <Eyebrow>{t('acad.routine.eyebrow')}</Eyebrow>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-maroon-dark mb-2">{t('acad.routine.h2')}</h2>
              <p className="font-body text-ink-60 text-xs sm:text-sm mb-6 sm:mb-8">{t('acad.routine.sub')}</p>
              <ol className="relative border-l-2 border-gold-light ml-3 sm:ml-4 pl-6 flex flex-col gap-6 w-full min-w-0">
                {dailyRoutine.map((r, rIdx) => (
                  <li key={rIdx} className="relative">
                    <span className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-maroon border-2 border-cream shrink-0" />
                    <span className="font-display font-bold text-gold-dark text-xs sm:text-sm block">{r.time}</span>
                    <p className="font-body text-ink-80 text-sm md:text-base mt-0.5">{r.activity}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Image Column (60% width) */}
            <div className="w-full md:w-[60%] lg:w-[62%] min-w-0 mt-6 md:mt-0">
              <div className="w-full relative rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-white overflow-hidden bg-cream3">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="w-full routine-swiper"
                >
                  {[
                    { src: '/outdoor_fun.png', label: t('acad.routine.img1') },
                    { src: '/yoga_activity.png', label: t('acad.routine.img2') },
                    { src: '/students_assembly.png', label: t('acad.routine.img3') },
                    { src: '/tour.png', label: t('acad.routine.img4') },
                  ].map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img src={img.src} alt={img.label} className="w-full h-full object-cover block" />
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 pt-10 pb-8 bg-gradient-to-t from-maroon-dark/95 via-maroon-dark/60 to-transparent text-white">
                          <p className="font-display font-bold text-xs sm:text-sm text-gold-light tracking-wide">{img.label}</p>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 pencil-stripe-thin" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* MODERN LEARNING */}
      <section className="bg-cream py-14 md:py-20 w-full overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 md:px-10 w-full min-w-0">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-14 w-full min-w-0">
            {/* Left Column: Text & 2x2 Cards Grid */}
            <div className="w-full md:w-[48%] lg:w-[46%] shrink-0 min-w-0">
              <Eyebrow>{t('acad.modern.eyebrow')}</Eyebrow>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-maroon-dark mt-1.5 md:mt-2 mb-4 md:mb-6">{t('acad.modern.h2')}</h2>
              <p className="font-body text-ink-70 text-xs sm:text-sm md:text-base mb-6 md:mb-8">{t('acad.modern.sub')}</p>
              <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 w-full min-w-0">
                {[
                  { icon: Monitor,  title: t('acad.modern.i1.title'), desc: t('acad.modern.i1.desc') },
                  { icon: Computer, title: t('acad.modern.i2.title'), desc: t('acad.modern.i2.desc') },
                  { icon: Brain,    title: t('acad.modern.i3.title'), desc: t('acad.modern.i3.desc') },
                  { icon: Star,     title: t('acad.modern.i4.title'), desc: t('acad.modern.i4.desc') },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border-l-4 border-gold items-start w-full min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-gold" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-maroon-dark text-xs sm:text-sm">{item.title}</h3>
                      <p className="font-body text-[11px] sm:text-xs text-ink-60 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Image - Directly Beside Left Column */}
            <div className="w-full md:w-[52%] lg:w-[54%] min-w-0 mt-6 md:mt-0">
              <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-cream3">
                <ImagePlaceholder src="/Smart-classroom.png" label={t('acad.modern.i1.title')} caption="Projector-enabled interactive class" ratio="4 / 3" tone="gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider />

      {/* METHODOLOGY */}
      <section className="bg-maroon py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow light>{t('acad.method.eyebrow')}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">{t('acad.method.h2')}</h2>
          {/* 📱 MOBILE VIEW: Glassmorphic Translucent 2x2 Cards (< md) */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mt-8 md:hidden text-center">
            {methodologyPillars.map((m, idx) => (
              <div
                key={idx}
                className="bg-maroon-dark/45 border border-gold-light/30 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col items-center justify-between text-center relative overflow-hidden backdrop-blur-xs"
              >
                {/* Top subtle golden accent bar */}
                <div className="w-8 h-1 bg-gold/60 rounded-full mb-3" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center mb-3 shrink-0 shadow-md border-2 border-white/20">
                    <m.icon size={22} className="text-maroon-dark" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight mb-1.5">
                    {m.title}
                  </h3>
                  <p className="font-body text-xs text-gold-light-90 leading-relaxed font-medium">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: 4-Card Grid (>= md) - 100% Original Layout Restored */}
          <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {methodologyPillars.map((m, idx) => (
              <div key={idx} className="hover-lift bg-white-95 rounded-3xl p-6 shadow-lg">
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

      {/* BEYOND THE BOOKS - Concept 1: Full-Bleed Photo Cards with Floating Glass Drawers */}
      <section className="bg-cream2 py-16 md:py-24 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <div className="flex justify-center"><Eyebrow>{t('acad.beyond.eyebrow')}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-maroon-dark mt-2 mb-3">{t('acad.beyond.h2')}</h2>
            <p className="font-body text-ink-70 text-xs sm:text-sm md:text-base leading-relaxed">
              {t('acad.beyond.sub')}
            </p>
          </div>

          {/* Data Array & Layout */}
          {(() => {
            const studentLifeItems = [
              {
                icon: Palette,
                title: t('acad.beyond.i1.title'),
                tag: t('acad.beyond.i1.tag'),
                desc: t('acad.beyond.i1.desc'),
                images: [
                  '/art_craft_gallery_1.jpg',
                  '/art_craft_gallery_2.jpg',
                  '/art_craft_gallery_3.jpg',
                  '/art_craft_gallery_4.jpg',
                ],
              },
              {
                icon: Music,
                title: t('acad.beyond.i2.title'),
                tag: t('acad.beyond.i2.tag'),
                desc: t('acad.beyond.i2.desc'),
                images: [
                  '/dance_cultural_1.jpg',
                  '/dance_cultural_2.jpg',
                  '/dance_cultural_3.jpg',
                  '/dance_cultural_4.jpg',
                ],
              },
              {
                icon: Dumbbell,
                title: t('acad.beyond.i3.title'),
                tag: t('acad.beyond.i3.tag'),
                desc: t('acad.beyond.i3.desc'),
                images: [
                  '/yoga_activity.png',
                  '/outdoor_fun.png',
                  '/school_gate.jpg',
                  '/students_assembly.png',
                ],
              },
              {
                icon: Compass,
                title: t('acad.beyond.i4.title'),
                tag: t('acad.beyond.i4.tag'),
                desc: t('acad.beyond.i4.desc'),
                images: [
                  '/tour_trip_1.jpg',
                  '/tour_trip_2.jpg',
                  '/tour_trip_11.jpg',
                  '/tour_trip_15.jpg',
                ],
              },
            ];

            return (
              <>
                {/* 📱 MOBILE VIEW: Horizontal Snap-Swipe Carousel (< md) */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 hide-scrollbar md:hidden pb-4">
                  {studentLifeItems.map((item, cardIdx) => (
                    <div
                      key={cardIdx}
                      className="flex-none w-[84vw] snap-center aspect-[4/5] rounded-3xl overflow-hidden shadow-xl relative border-2 border-white bg-cream3 group"
                    >
                      {/* Inner 4-Image Slideshow */}
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3200 + cardIdx * 800, disableOnInteraction: false }}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        className="w-full h-full card-inner-swiper"
                      >
                        {item.images.map((imgSrc, imgIdx) => (
                          <SwiperSlide key={imgIdx} className="w-full h-full">
                            <img
                              src={imgSrc}
                              alt={`${item.title} ${imgIdx + 1}`}
                              className="w-full h-full object-cover object-center"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* NO full overlay - keep photo bright and vivid */}
                      <div className="absolute top-0 left-0 w-full h-1.5 pencil-stripe-thin z-10 pointer-events-none" />

                      {/* Liquid Glass Pill Badge */}
                      <div className="absolute top-4 right-4 z-20 pointer-events-none">
                        <span className="liquid-glass-pill inline-flex items-center gap-1.5 text-white font-display font-extrabold text-xs px-3.5 py-1.5 rounded-full" style={{textShadow:'0 1px 5px rgba(0,0,0,0.55)'}}>
                          {item.tag}
                        </span>
                      </div>

                      {/* iPhone-Style Liquid Glass Bottom Drawer */}
                      <div className="liquid-glass absolute bottom-4 left-4 right-4 rounded-2xl p-4 text-white z-20 pointer-events-none">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gold text-maroon-dark flex items-center justify-center shrink-0 shadow-md border-2 border-white/70">
                            <item.icon size={20} strokeWidth={2.2} />
                          </div>
                          <div>
                            <h3 className="font-display font-extrabold text-lg text-white leading-tight" style={{textShadow:'0 1px 6px rgba(0,0,0,0.65)'}}>{item.title}</h3>
                          </div>
                        </div>
                        <p className="font-body text-xs text-white leading-relaxed font-semibold" style={{textShadow:'0 1px 5px rgba(0,0,0,0.6)'}}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 💻 DESKTOP VIEW: 4-Card Full-Bleed Media Deck (>= md) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                  {studentLifeItems.map((item, cardIdx) => (
                    <div
                      key={cardIdx}
                      className="h-[480px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl relative group border-4 border-white bg-cream3 cursor-pointer"
                    >
                      {/* Inner 4-Image Slideshow */}
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3200 + cardIdx * 800, disableOnInteraction: false }}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        className="w-full h-full card-inner-swiper"
                      >
                        {item.images.map((imgSrc, imgIdx) => (
                          <SwiperSlide key={imgIdx} className="w-full h-full">
                            <img
                              src={imgSrc}
                              alt={`${item.title} ${imgIdx + 1}`}
                              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* NO full overlay - keep photo bright and vivid */}
                      <div className="absolute top-0 left-0 w-full h-2 pencil-stripe-thin z-10 pointer-events-none" />

                      {/* Liquid Glass Pill Badge */}
                      <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
                        <span className="liquid-glass-pill inline-flex items-center gap-1 text-white font-display font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md" style={{textShadow:'0 1px 5px rgba(0,0,0,0.55)'}}>
                          {item.tag}
                        </span>
                      </div>

                      {/* iPhone-Style Liquid Glass Bottom Drawer */}
                      <div className="liquid-glass absolute bottom-3.5 left-3.5 right-3.5 rounded-2xl p-3.5 text-white z-20 pointer-events-none">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className="w-9 h-9 rounded-xl bg-gold text-maroon-dark flex items-center justify-center shrink-0 shadow-md border-2 border-white/70 group-hover:scale-110 transition-transform duration-300">
                            <item.icon size={18} strokeWidth={2.2} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight truncate" style={{textShadow:'0 1px 6px rgba(0,0,0,0.65)'}}>{item.title}</h3>
                          </div>
                        </div>
                        <p className="font-body text-xs text-white leading-snug font-medium line-clamp-3" style={{textShadow:'0 1px 5px rgba(0,0,0,0.6)'}}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <PencilDivider thin />

      {/* CTA to Admissions */}
      <section className="bg-gold py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <PartyPopper className="mx-auto text-maroon-dark mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-maroon-dark">{t('acad.cta.h2')}</h2>
          <p className="font-body text-maroon-dark-80 mt-2">{t('acad.cta.sub')}</p>
          <CTAButton variant="primary" onClick={() => navigate("/admissions")} className="mt-6">{t('acad.cta.btn')}</CTAButton>
        </div>
      </section>
    </article>
  );
}

/* ============================================================
   GALLERY PAGE
   ============================================================ */
const galleryItems = [
  // Featured Priority Award
  { cat: "Awards & Recognition", label: "State Teacher Award & Official Honors", caption: "Prestigious recognition and official honors awarded to Principal Smt. Vandana Yadav & Model Primary School", tone: "gold", src: "/awards2priority.png" },

  // Art & Craft Category
  { cat: "Art & Craft", label: "Creative Handcraft", caption: "Students expressing themselves through art", tone: "gold", src: "/art_craft_gallery_1.jpg" },
  { cat: "Art & Craft", label: "Paper Craft & Origami", caption: "Hands-on creative paper folding activity", tone: "pink", src: "/art_craft_gallery_2.jpg" },
  { cat: "Art & Craft", label: "Drawing & Painting Workshop", caption: "Young artists sketching and coloring", tone: "green", src: "/art_craft_gallery_3.jpg" },
  { cat: "Art & Craft", label: "Clay Modeling & Sculpting", caption: "Expressive clay modeling by primary students", tone: "gold", src: "/art_craft_gallery_4.jpg" },
  { cat: "Art & Craft", label: "Festival Decor & Craft", caption: "Designing handmade decorations for school events", tone: "pink", src: "/art_craft_gallery_5.jpg" },
  { cat: "Art & Craft", label: "Canvas Painting Project", caption: "Students experimenting with vibrant colors", tone: "green", src: "/art_craft_gallery_6.jpg" },
  { cat: "Art & Craft", label: "Handmade Card Creation", caption: "Greeting card making activity", tone: "gold", src: "/art_craft_gallery_7.jpg" },
  { cat: "Art & Craft", label: "Student Artwork Display", caption: "Exhibiting creative student crafts", tone: "pink", src: "/art_craft_gallery_8.jpg" },
  { cat: "Art & Craft", label: "Recycled Art Creation", caption: "Best out of waste craft projects", tone: "green", src: "/art_craft_gallery_9.jpg" },
  { cat: "Art & Craft", label: "Poster Making Competition", caption: "Creative poster designing on social themes", tone: "gold", src: "/art_craft_gallery_10.jpg" },
  { cat: "Art & Craft", label: "Pattern & Mask Craft", caption: "Designing colorful paper masks and hats", tone: "pink", src: "/art_craft_gallery_11.jpg" },
  { cat: "Art & Craft", label: "Guided Art Session", caption: "Teacher guiding students in drawing techniques", tone: "green", src: "/art_craft_gallery_12.jpg" },
  { cat: "Art & Craft", label: "Finger Painting & Sketching", caption: "Tactile artistic expression for primary classes", tone: "gold", src: "/art_craft_gallery_13.jpg" },
  { cat: "Art & Craft", label: "Cultural Craft Showcase", caption: "Traditional folk art & craft creations", tone: "pink", src: "/art_craft_gallery_14.jpg" },
  { cat: "Art & Craft", label: "Art Exhibition & Honors", caption: "Displaying award-winning student art pieces", tone: "green", src: "/art_craft_gallery_15.jpg" },
  { cat: "Art & Craft", label: "Creative Handcraft Project", caption: "Students expressing themselves through art", tone: "gold", src: "/art_craft_1.png" },

  // Assembly item under Campus
  { cat: "Campus", label: "Morning Assembly & Prayer", caption: "Lines of students in uniform at assembly", tone: "gold", src: "/students_assembly.png" },

  // Events Category
  { cat: "Events", label: "Dance Performance", caption: "Vibrant cultural dance stage act", tone: "gold", src: "/dance_cultural_1.jpg" },
  { cat: "Events", label: "Cultural Arts Show", caption: "Stage performance by students", tone: "pink", src: "/dance_cultural_2.jpg" },
  { cat: "Events", label: "Traditional Drama", caption: "Annual day cultural event", tone: "green", src: "/dance_cultural_3.jpg" },
  { cat: "Events", label: "Stage Celebration", caption: "Students performing on stage", tone: "gold", src: "/dance_cultural_4.jpg" },
  { cat: "Events", label: "Prize Distribution & Function", caption: "Annual event under the canopy tent", tone: "pink", src: "/annual_event.png" },
  { cat: "Events", label: "Annual Day Stage Performance", caption: "Students celebrating annual day function", tone: "green", src: "/events_gallery_1.jpg" },
  { cat: "Events", label: "Cultural Dance Celebration", caption: "Traditional folk dance performance", tone: "gold", src: "/events_gallery_2.jpg" },
  { cat: "Events", label: "Independence Day Parade", caption: "Patriotic celebration and flag hoisting", tone: "pink", src: "/events_gallery_3.jpg" },
  { cat: "Events", label: "Student Drama & Skit", caption: "Educational skit performed by primary classes", tone: "green", src: "/events_gallery_4.jpg" },
  { cat: "Events", label: "Republic Day Event", caption: "Festive celebration on school stage", tone: "gold", src: "/events_gallery_5.jpg" },
  { cat: "Events", label: "Music & Choir Performance", caption: "School choir singing patriotic songs", tone: "pink", src: "/events_gallery_6.jpg" },
  { cat: "Events", label: "Teachers' Day Celebration", caption: "Student felicitation of school teachers", tone: "green", src: "/events_gallery_7.jpg" },
  { cat: "Events", label: "Children's Day Carnival", caption: "Fun activities and games on stage", tone: "gold", src: "/events_gallery_8.jpg" },
  { cat: "Events", label: "Annual Sports Function", caption: "Prize ceremony for athletic winners", tone: "pink", src: "/events_gallery_9.jpg" },
  { cat: "Events", label: "Folk Costume Pageant", caption: "Traditional attire parade by young students", tone: "green", src: "/events_gallery_10.jpg" },
  { cat: "Events", label: "Cultural Event Group Photo", caption: "Staff and participants at annual day", tone: "gold", src: "/events_gallery_11.jpg" },
  { cat: "Events", label: "Stage Presentation & Speech", caption: "Student address during school celebration", tone: "pink", src: "/events_gallery_12.jpg" },
  { cat: "Events", label: "Science & Craft Exhibition", caption: "Student project showcase for parents", tone: "green", src: "/events_gallery_13.jpg" },
  { cat: "Events", label: "Patriotic Song Performance", caption: "Group song performance on national festival", tone: "gold", src: "/events_gallery_14.jpg" },
  { cat: "Events", label: "Annual Function Canopy Audience", caption: "Parents and community attending school function", tone: "pink", src: "/events_gallery_15.jpg" },
  { cat: "Events", label: "Stage Lighting & Decor", caption: "Decorated stage for annual celebration", tone: "green", src: "/events_gallery_16.jpg" },
  { cat: "Events", label: "Classical Dance Recital", caption: "Graceful classical dance by primary pupils", tone: "gold", src: "/events_gallery_17.jpg" },
  { cat: "Events", label: "Chief Guest Welcome", caption: "Welcoming dignitaries to annual function", tone: "pink", src: "/events_gallery_18.jpg" },
  { cat: "Events", label: "Student Felicitation Ceremony", caption: "Awarding academic badges and medals", tone: "green", src: "/events_gallery_19.jpg" },
  { cat: "Events", label: "National Flag Hoisting", caption: "Honoring national flag on campus", tone: "gold", src: "/events_gallery_20.jpg" },
  { cat: "Events", label: "Stage Musical Act", caption: "Rhythmic instrument performance", tone: "pink", src: "/events_gallery_21.jpg" },
  { cat: "Events", label: "Parent Guest Gathering", caption: "Parents cheering student performances", tone: "green", src: "/events_gallery_22.jpg" },
  { cat: "Events", label: "School Function Finale", caption: "Grand curtain call with all participants", tone: "gold", src: "/events_gallery_23.jpg" },
  { cat: "Events", label: "Annual Day Opening Prayer", caption: "Auspicious lamp lighting ceremony", tone: "pink", src: "/events_gallery_24.jpg" },
  { cat: "Events", label: "Student Prize Presentation", caption: "Trophies awarded for co-curricular achievements", tone: "green", src: "/events_gallery_25.jpg" },
  { cat: "Events", label: "Cultural Event Celebration", caption: "Vibrant memories from school annual event", tone: "gold", src: "/events_gallery_26.jpg" },

  // Playground item under Campus
  { cat: "Campus", label: "Outdoor Recess & Games", caption: "Children playing on school grounds", tone: "gold", src: "/outdoor_fun.png" },

  // Campus Category
  { cat: "Campus", label: "School Main Building", caption: "Pencil-and-book painted exterior wall", tone: "gold", src: "/hero_home.png" },
  { cat: "Campus", label: "School Entrance Gate", caption: "Pencil-topped main gate & signage", tone: "green", src: "/school_gate.jpg" },
  { cat: "Campus", label: "Smart Classroom Lab", caption: "Interactive tech-enabled classroom", tone: "gold", src: "/Smart-classroom.png" },
  { cat: "Campus", label: "Front Entrance View", caption: "Pencil-style campus entrance", tone: "pink", src: "/entrance_gate.png" },
  { cat: "Campus", label: "Principal Office & Mentorship", caption: "Dedicated guidance and leadership", tone: "gold", src: "/principal.png" },
  { cat: "Campus", label: "Primary Classroom Interior", caption: "Spacious and well-lit classroom setup", tone: "green", src: "/campus_gallery_1.jpg" },
  { cat: "Campus", label: "Campus Courtyard View", caption: "Clean and vibrant school courtyard", tone: "gold", src: "/campus_gallery_2.jpg" },
  { cat: "Campus", label: "Student Reading Nook", caption: "Dedicated quiet reading and learning area", tone: "pink", src: "/campus_gallery_3.jpg" },
  { cat: "Campus", label: "School Corridor & Hallway", caption: "Brightly decorated educational hallways", tone: "green", src: "/campus_gallery_4.jpg" },
  { cat: "Campus", label: "Interactive Board Classroom", caption: "Smart teaching tools in primary classrooms", tone: "gold", src: "/campus_gallery_5.jpg" },
  { cat: "Campus", label: "Outdoor Play Area & Swings", caption: "Safe play area for young students", tone: "pink", src: "/campus_gallery_6.jpg" },
  { cat: "Campus", label: "Campus Greenery & Garden", caption: "Lush green trees surrounding campus grounds", tone: "green", src: "/campus_gallery_7.jpg" },
  { cat: "Campus", label: "School Office & Reception", caption: "Parent enquiry and administrative office", tone: "gold", src: "/campus_gallery_8.jpg" },
  { cat: "Campus", label: "Classroom Activity Area", caption: "Group activity desks for collaborative learning", tone: "pink", src: "/campus_gallery_9.jpg" },
  { cat: "Campus", label: "School Front Architecture", caption: "Pencil painted campus exterior view", tone: "green", src: "/campus_gallery_10.jpg" },
  { cat: "Campus", label: "Student Activity Corner", caption: "Hands-on learning and puzzle area", tone: "gold", src: "/campus_gallery_11.jpg" },
  { cat: "Campus", label: "Mid-Day Meal Dining Zone", caption: "Hygienic area for daily student meals", tone: "pink", src: "/campus_gallery_12.jpg" },
  { cat: "Campus", label: "Classroom Wall Art & Displays", caption: "Educational posters and charts on walls", tone: "green", src: "/campus_gallery_13.jpg" },
  { cat: "Campus", label: "Sports & Fitness Court", caption: "Open ground for physical education", tone: "gold", src: "/campus_gallery_14.jpg" },
  { cat: "Campus", label: "Clean Drinking Water Point", caption: "Purified drinking water facility for students", tone: "pink", src: "/campus_gallery_15.jpg" },
  { cat: "Campus", label: "Student Desk Layout", caption: "Ergonomic seating for young learners", tone: "green", src: "/campus_gallery_16.jpg" },
  { cat: "Campus", label: "Early Learning Activity Room", caption: "LKG & UKG play-based learning environment", tone: "gold", src: "/campus_gallery_17.jpg" },
  { cat: "Campus", label: "Campus Boundary & Gate View", caption: "Secure gated primary school premises", tone: "pink", src: "/campus_gallery_18.jpg" },
  { cat: "Campus", label: "Teacher Guidance Station", caption: "Mentorship and teacher desk space", tone: "green", src: "/campus_gallery_19.jpg" },
  { cat: "Campus", label: "Campus Panoramic Overview", caption: "Full view of Model Primary School campus", tone: "gold", src: "/campus_gallery_20.jpg" },
  { cat: "Campus", label: "Primary Science Corner", caption: "Simple science kits and observation charts", tone: "pink", src: "/campus_gallery_21.jpg" },
  { cat: "Campus", label: "Campus Entry Walkway", caption: "Paved walkway leading to classrooms", tone: "green", src: "/campus_gallery_22.jpg" },
  { cat: "Campus", label: "Student Assembly Ground", caption: "Open space for morning prayers and events", tone: "gold", src: "/campus_gallery_23.jpg" },
  { cat: "Campus", label: "Creative Classroom Board", caption: "Student craft and notice board display", tone: "pink", src: "/campus_gallery_24.jpg" },
  { cat: "Campus", label: "Campus Environment & Shade", caption: "Shaded seating areas under green trees", tone: "green", src: "/campus_gallery_25.jpg" },

  // Tours & Trips Category
  { cat: "Tours & Trips", label: "Educational Field Tour", caption: "Students exploring cultural sites and historical landmarks", tone: "green", src: "/tour_trip_1.jpg" },
  { cat: "Tours & Trips", label: "Group Learning Excursion", caption: "Interactive outdoor group discovery session", tone: "gold", src: "/tour_trip_2.jpg" },
  { cat: "Tours & Trips", label: "Heritage Site Visit", caption: "Students learning local history and architecture", tone: "pink", src: "/tour_trip_3.jpg" },
  { cat: "Tours & Trips", label: "Student Bus Journey", caption: "Exciting travel experience with teachers and classmates", tone: "green", src: "/tour_trip_4.jpg" },
  { cat: "Tours & Trips", label: "Nature & Park Exploration", caption: "Observing plants, wildlife and natural ecosystems", tone: "gold", src: "/tour_trip_5.jpg" },
  { cat: "Tours & Trips", label: "Museum & Science Exhibit", caption: "Hands-on learning outside the classroom walls", tone: "pink", src: "/tour_trip_6.jpg" },
  { cat: "Tours & Trips", label: "Cultural Landmark Tour", caption: "Group photo at famous historical monument", tone: "green", src: "/tour_trip_7.jpg" },
  { cat: "Tours & Trips", label: "Outdoor Picnic & Bonding", caption: "Sharing meals and playing team games outdoors", tone: "gold", src: "/tour_trip_8.jpg" },
  { cat: "Tours & Trips", label: "Guided Site Orientation", caption: "Teachers explaining historical significance", tone: "pink", src: "/tour_trip_9.jpg" },
  { cat: "Tours & Trips", label: "Environmental Discovery", caption: "Learning environmental conservation firsthand", tone: "green", src: "/tour_trip_10.jpg" },
  { cat: "Tours & Trips", label: "Adventure Excursion", caption: "Fun team building activities during school trip", tone: "gold", src: "/tour_trip_11.jpg" },
  { cat: "Tours & Trips", label: "Educational Landmark Study", caption: "Studying architecture and local culture", tone: "pink", src: "/tour_trip_12.jpg" },
  { cat: "Tours & Trips", label: "Student Group Reflection", caption: "Sharing key takeaways from the field trip", tone: "green", src: "/tour_trip_13.jpg" },
  { cat: "Tours & Trips", label: "Scenic Outdoor Gathering", caption: "Unwinding amidst nature after educational tours", tone: "gold", src: "/tour_trip_14.jpg" },
  { cat: "Tours & Trips", label: "Memorable Tour Farewell", caption: "Group celebration wrapping up an unforgettable trip", tone: "pink", src: "/tour_trip_15.jpg" },
  { cat: "Tours & Trips", label: "Nature & Cultural Excursion", caption: "Outdoor discovery and field excursion", tone: "gold", src: "/tour_awareness_4.jpg" },

  // Village Awareness Category
  { cat: "Village Awareness", label: "Village Rally & Community Drive", caption: "Students and staff conducting awareness rally in village", tone: "gold", src: "/village_awareness_gallery_1.jpg" },
  { cat: "Village Awareness", label: "Health & Hygiene Campaign", caption: "Educating local villagers on health and clean living habits", tone: "pink", src: "/village_awareness_gallery_2.jpg" },
  { cat: "Village Awareness", label: "Literacy & Education Drive", caption: "Spreading awareness on the importance of child education", tone: "green", src: "/village_awareness_gallery_3.jpg" },
  { cat: "Village Awareness", label: "Student Slogan Rally", caption: "Students holding banners and chanting positive social messages", tone: "gold", src: "/village_awareness_gallery_4.jpg" },
  { cat: "Village Awareness", label: "Cleanliness & Environment March", caption: "Community clean-up and environmental protection rally", tone: "pink", src: "/village_awareness_gallery_5.jpg" },
  { cat: "Village Awareness", label: "Village Elders Interaction", caption: "Students engaging with village elders and residents", tone: "green", src: "/village_awareness_gallery_6.jpg" },
  { cat: "Village Awareness", label: "Social Harmony Outreach", caption: "Promoting unity, respect, and social harmony in the village", tone: "gold", src: "/village_awareness_gallery_7.jpg" },
  { cat: "Village Awareness", label: "Girl Child Education Drive", caption: "Banners promoting equal education rights for young girls", tone: "pink", src: "/village_awareness_gallery_8.jpg" },
  { cat: "Village Awareness", label: "Community Health Demonstration", caption: "Demonstrating proper handwashing and sanitation practices", tone: "green", src: "/village_awareness_gallery_9.jpg" },
  { cat: "Village Awareness", label: "Village Street Procession", caption: "Colorful parade through village streets spreading positivity", tone: "gold", src: "/village_awareness_gallery_10.jpg" },
  { cat: "Village Awareness", label: "Parental Guidance & Outreach", caption: "Encouraging parents to send children regularly to school", tone: "pink", src: "/village_awareness_gallery_11.jpg" },
  { cat: "Village Awareness", label: "Student Civic Engagement", caption: "Fostering civic responsibility from a young primary age", tone: "green", src: "/village_awareness_gallery_12.jpg" },
  { cat: "Village Awareness", label: "Village Rally Assembly", caption: "Staff and students preparing for community march", tone: "gold", src: "/village_awareness_gallery_13.jpg" },
  { cat: "Village Awareness", label: "Community Awareness Conclusion", caption: "Successful wrap-up of student village awareness program", tone: "pink", src: "/village_awareness_gallery_14.jpg" },
  { cat: "Village Awareness", label: "Health & Literacy Awareness", caption: "Community outreach program for village residents", tone: "pink", src: "/tour_awareness_2.jpg" },

  // Yoga item under Campus
  { cat: "Campus", label: "Morning Yoga & Exercises", caption: "Daily fitness and mindfulness session", tone: "green", src: "/yoga_activity.png" },

  // Awards & Recognition Category
  { cat: "Awards & Recognition", label: "State Teacher Award & Recognitions", caption: "Honors and awards presented to Principal Smt. Vandana Yadav & Model Primary School", tone: "gold", src: "/awards.png" },
  { cat: "Awards & Recognition", label: "Best School Leadership Honor", caption: "Principal receiving prestige leadership award for educational excellence", tone: "gold", src: "/principal_award_1.jpg" },
  { cat: "Awards & Recognition", label: "District Educational Excellence Award", caption: "Honored by district education officials for outstanding academic contribution", tone: "pink", src: "/principal_award_2.jpg" },
  { cat: "Awards & Recognition", label: "Model Educator Felicitation", caption: "Special recognition for innovative primary teaching methodologies", tone: "green", src: "/principal_award_3.jpg" },
  { cat: "Awards & Recognition", label: "Community Service Recognition", caption: "Felicitation for student welfare & village literacy outreach", tone: "gold", src: "/principal_award_4.jpg" },
  { cat: "Awards & Recognition", label: "State Education Board Honor", caption: "Principal recognized for exemplary school administration", tone: "pink", src: "/principal_award_5.jpg" },
  { cat: "Awards & Recognition", label: "Academic Distinction Trophy", caption: "Awarded trophy for high literacy rates & student development", tone: "green", src: "/principal_award_6.jpg" },
  { cat: "Awards & Recognition", label: "Primary Education Leadership Award", caption: "Honoring dedication towards foundational child education", tone: "gold", src: "/principal_award_7.jpg" },
  { cat: "Awards & Recognition", label: "Special Certificate of Appreciation", caption: "Certificate awarded by district magistrate & education board", tone: "pink", src: "/principal_award_8.jpg" },
  { cat: "Awards & Recognition", label: "Inspirational Educator Shield", caption: "Receiving commemorative shield for outstanding school governance", tone: "green", src: "/principal_award_9.jpg" },
  { cat: "Awards & Recognition", label: "Child Welfare & Care Honor", caption: "Recognizing efforts in student nutrition and health awareness", tone: "gold", src: "/principal_award_10.jpg" },
  { cat: "Awards & Recognition", label: "Excellence in Co-Curricular Management", caption: "Award for holistic student growth & sports promotion", tone: "pink", src: "/principal_award_11.jpg" },
  { cat: "Awards & Recognition", label: "Distinguished Principal Felicitation", caption: "Honoring years of selfless service in rural education", tone: "green", src: "/principal_award_12.jpg" },
];

export function GalleryPage() {
  const { t } = useLanguage();
  const cats = ["All", "Awards & Recognition", "Tours & Trips", "Village Awareness", "Art & Craft", "Events", "Campus"];
  const [filter, setFilter] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState(null);

  const items = filter === "All" ? galleryItems : galleryItems.filter((i) => i.cat === filter);
  const activeItem = selectedIdx !== null ? items[selectedIdx] : null;

  // Touch & Mouse Drag Swipe State
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diffX = touchStartX.current - endX;
    const threshold = 40; // min swipe distance in px

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") setSelectedIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      if (e.key === "ArrowRight") setSelectedIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, items.length]);

  return (
    <article aria-label="School Gallery">
      <Helmet>
        <title>Gallery | Model Primary School Bharsare</title>
        <meta name="description" content="Browse photos from events, campus life, cultural programs, tours, village awareness drives and award ceremonies at Model Primary School, Bharsare." />
        <link rel="canonical" href="https://modelprimaryschool.in/gallery" />
        <meta property="og:title" content="Gallery | Model Primary School" />
        <meta property="og:url" content="https://modelprimaryschool.in/gallery" />
      </Helmet>
    <div>
      <PageHero eyebrow={t('gallery.hero.eyebrow')} title={t('gallery.hero.title')} subtitle={t('gallery.hero.subtitle')} />
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setFilter(c);
                  setSelectedIdx(null);
                }}
                className={`focus-ring font-display font-semibold text-sm px-5 py-2 rounded-full border-2 transition-colors ${
                  filter === c ? "bg-maroon border-maroon text-white" : "bg-white border-gold-light text-maroon-dark filter-btn-inactive"
                }`}
              >
                {t('gallery.filter.' + c) || c}
              </button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {items.map((it, idx) => (
              <div
                key={it.label + idx}
                onClick={() => setSelectedIdx(idx)}
                className="mb-5 break-inside-avoid cursor-pointer group hover:scale-[1.02] transition-transform duration-300 relative"
              >
                <ImagePlaceholder
                  src={it.src}
                  label={it.label}
                  caption={it.caption}
                  tone={it.tone}
                  ratio={idx % 3 === 0 ? "3 / 4" : "4 / 3"}
                />
                {/* Hover / Tap to View Overlay */}
                <div className="absolute inset-0 bg-maroon-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl flex items-center justify-center pointer-events-none">
                  <span className="bg-maroon text-white font-display font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Camera size={14} className="text-gold" /> {t('gallery.tap')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🖼️ FULLSCREEN LIGHTBOX MODAL WITH SWIPE GESTURES */}
      {activeItem && (
        <div
          onClick={() => setSelectedIdx(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-slide-up select-none"
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="w-full max-w-5xl flex items-center justify-between z-20 text-white pt-2">
            <span className="font-display font-bold text-xs sm:text-sm bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
              {t('gallery.photo')} {selectedIdx + 1} {t('gallery.of')} {items.length} {t('gallery.swipe')}
            </span>
            <button
              onClick={() => setSelectedIdx(null)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Close viewer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Image View + Navigation Arrows */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            {items.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/50 hover:bg-maroon text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Previous photo"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
            )}

            {/* Main Photo with Swipe & Drag handlers */}
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              className="max-h-[75vh] max-w-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl relative flex items-center justify-center bg-black cursor-grab active:cursor-grabbing select-none"
            >
              {activeItem.src ? (
                <img
                  src={activeItem.src}
                  alt={activeItem.label}
                  className="max-h-[75vh] max-w-full object-contain pointer-events-none"
                />
              ) : (
                <div className="p-12 text-center text-white">
                  <Camera size={48} className="mx-auto mb-3 text-gold" />
                  <p className="font-display font-bold text-lg">{activeItem.label}</p>
                </div>
              )}
            </div>

            {/* Next Button */}
            {items.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/50 hover:bg-maroon text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    </article>
  );
}

/* ============================================================
   ADMISSIONS PAGE
   ============================================================ */
export function AdmissionsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const admissionSteps = [
    { title: t("adm.s1.title"), desc: t("adm.s1.desc") },
    { title: t("adm.s2.title"), desc: t("adm.s2.desc") },
    { title: t("adm.s3.title"), desc: t("adm.s3.desc") },
    { title: t("adm.s4.title"), desc: t("adm.s4.desc") },
    { title: t("adm.s5.title"), desc: t("adm.s5.desc") },
  ];

  const eligibility = [
    { level: "LKG", age: t("adm.elig.lkg") },
    { level: "UKG", age: t("adm.elig.ukg") },
    { level: "Class 1", age: t("adm.elig.c1") },
    { level: "Class 2", age: t("adm.elig.c2") },
    { level: "Class 3", age: t("adm.elig.c3") },
    { level: "Class 4", age: t("adm.elig.c4") },
    { level: "Class 5", age: t("adm.elig.c5") },
  ];

  const requiredDocs = [
    t("adm.doc.1"),
    t("adm.doc.2"),
    t("adm.doc.3"),
    t("adm.doc.4"),
    t("adm.doc.5"),
    t("adm.doc.6"),
  ];

  return (
    <article aria-label="Admissions Information">
      <Helmet>
        <title>Admissions Open 2026-27 | दाखिला शुरू | Model Primary School</title>
        <meta name="description" content="Apply for LKG to Class 5 at Model Primary School. 2026-27 के लिए बच्चों के एडमिशन (दाखिले) खुले हैं। सीमित सीटें उपलब्ध।" />
        <meta name="keywords" content="मॉडल प्राइमरी स्कूल प्रवेश, दाखिला 2026-27, LKG admission Sultanpur, primary school admission Bharsare, school registration Sultanpur, सुल्तानपुर स्कूल दाखिला" />
        <link rel="canonical" href="https://modelprimaryschool.in/admissions" />
        <meta property="og:title" content="दाखिला शुरू 2026-27 | Admissions Open | Model Primary School Bharsare" />
        <meta property="og:description" content="2026-27 के लिए अभी आवेदन करें। LKG से कक्षा 5 तक। सीमित सीटें उपलब्ध। संपर्क: 9454826921" />
        <meta property="og:url" content="https://modelprimaryschool.in/admissions" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:locale:alternate" content="en_IN" />
        <meta property="og:image" content="https://modelprimaryschool.in/og-cover.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "When do admissions open at Model Primary School Bharsare?",
                "acceptedAnswer": { "@type": "Answer", "text": "Admissions are open for the academic year 2026-27. Contact us at +91-9454826921 to confirm seat availability." }
              },
              {
                "@type": "Question",
                "name": "मॉडल प्राइमरी स्कूल भरसारे में दाखिला कब होता है?",
                "acceptedAnswer": { "@type": "Answer", "text": "मॉडल प्राइमरी स्कूल भरसारे में 2026-27 सत्र के लिए दाखिला खुले हैं। LKG से कक्षा 5 तक सीमित सीटें उपलब्ध हैं। संपर्क: 9454826921" }
              },
              {
                "@type": "Question",
                "name": "What are the school timings at Model Primary School Bharsare?",
                "acceptedAnswer": { "@type": "Answer", "text": "School timings are Monday to Saturday, 7:30 AM to 1:30 PM." }
              },
              {
                "@type": "Question",
                "name": "मॉडल प्राइमरी स्कूल का समय क्या है?",
                "acceptedAnswer": { "@type": "Answer", "text": "सोमवार से शनिवार सुबह 7:30 बजे से दोपहर 1:30 बजे तक।" }
              },
              {
                "@type": "Question",
                "name": "Which classes are available at Model Primary School Bharsare?",
                "acceptedAnswer": { "@type": "Answer", "text": "We offer classes from LKG (Lower Kindergarten) to Class 5." }
              },
              {
                "@type": "Question",
                "name": "What documents are required for admission?",
                "acceptedAnswer": { "@type": "Answer", "text": "Required documents include: child's birth certificate, 4 passport-size photographs, Aadhar card (child and parent), address proof, Transfer Certificate (for Class 1 and above, if applicable), and previous school report card." }
              },
              {
                "@type": "Question",
                "name": "दाखिले के लिए कौन से दस्तावेज़ चाहिए?",
                "acceptedAnswer": { "@type": "Answer", "text": "जन्म प्रमाण पत्र, 4 पासपोर्ट फोटो, आधार कार्ड (बच्चे और माता-पिता दोनों का), निवास प्रमाण, TC (कक्षा 1 से ऊपर के लिए)।" }
              },
              {
                "@type": "Question",
                "name": "What is the minimum age for LKG admission?",
                "acceptedAnswer": { "@type": "Answer", "text": "The minimum age for LKG admission is 3+ years as of the date of intake." }
              }
            ]
          }
        `}</script>
      </Helmet>
    <div>
      <PageHero eyebrow={t("adm.hero.eyebrow")} title={t("adm.h1")} subtitle={t("adm.body")} />

      {/* LIMITED SEATS NOTICE */}
      <section className="bg-gold">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-3 text-center">
          <Sparkles size={20} className="text-maroon-dark" />
          <p className="font-display font-bold text-maroon-dark text-sm md:text-base">{t("adm.notice")}</p>
        </div>
      </section>

      <PencilDivider thin />

      {/* STEPS */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>{t("adm.steps.eyebrow")}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mb-10">{t("adm.steps.h2")}</h2>
          <div className="grid md:grid-cols-5 gap-5">
            {admissionSteps.map((s, i) => (
              <div key={s.title + i} className="hover-lift bg-white rounded-3xl p-6 shadow-md relative">
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
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center"><Eyebrow>{t("adm.elig.eyebrow")} &amp; {t("adm.docs.eyebrow")}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark mt-2">{t("adm.elig.h2")} &amp; {t("adm.docs.h2")}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Eligibility */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gold-light/40">
              <div className="flex items-center gap-3 px-6 py-4 bg-maroon">
                <GraduationCap size={20} className="text-gold" />
                <span className="font-display font-bold text-white text-sm uppercase tracking-widest">{t("adm.elig.eyebrow")}</span>
              </div>
              <div className="p-2">
                {eligibility.map((e, i) => (
                  <div key={e.level} className={`flex items-center justify-between px-5 py-3.5 rounded-xl ${i % 2 === 0 ? "bg-cream" : "bg-white"}`}>
                    <span className="font-display font-bold text-maroon-dark">{e.level}</span>
                    <span className="font-body text-sm text-ink-70 bg-cream2 px-3 py-1 rounded-full border border-gold-light">{e.age}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Documents */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gold-light/40">
              <div className="flex items-center gap-3 px-6 py-4 bg-maroon">
                <FileText size={20} className="text-gold" />
                <span className="font-display font-bold text-white text-sm uppercase tracking-widest">{t("adm.docs.eyebrow")}</span>
              </div>
              <ul className="p-6 flex flex-col gap-4">
                {requiredDocs.map((d, index) => (
                  <li key={index} className="flex items-start gap-3 font-body text-sm text-ink-75">
                    <div className="w-6 h-6 rounded-full bg-maroon flex items-center justify-center shrink-0 mt-0.5">
                      <FileText size={12} className="text-gold" />
                    </div>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PencilDivider thin />

      {/* PARENT PARTNERSHIP & CARE */}
      <section className="bg-cream2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Eyebrow>{t("adm.parent.eyebrow")}</Eyebrow></div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-maroon-dark">{t("adm.parent.h2")}</h2>
            <p className="font-body text-ink-70 mt-3">{t("adm.parent.sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { icon: UsersRound, title: t("adm.parent.i1.title"), desc: t("adm.parent.i1.desc") },
              { icon: Utensils,   title: t("adm.parent.i2.title"), desc: t("adm.parent.i2.desc") },
            ].map((item, index) => (
              <div key={index} className="hover-lift bg-white rounded-3xl p-7 shadow-md border-l-4 border-maroon flex gap-5 items-start">
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

      <PencilDivider thin />

      {/* CTA */}
      <section className="bg-maroon py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <CalendarCheck className="mx-auto text-gold mb-3" size={34} />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">{t("adm.cta.h2")}</h2>
          <p className="font-body text-gold-light-85 mt-2">{t("adm.cta.sub")}</p>
          <CTAButton variant="gold" onClick={() => navigate("/contact")} className="mt-6">{t("adm.cta.btn")}</CTAButton>
        </div>
      </section>
    </div>
    </article>
  );
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
export function ContactPage() {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      setStatus("sent");
    } catch (err) {
      console.error("Contact API error:", err);
      setStatus("error");
    }
  };

  return (
    <article aria-label="Contact Model Primary School">
      <Helmet>
        <title>संपर्क करें | Contact Model Primary School Bharsare, Sultanpur</title>
        <meta name="description" content="Contact Model Primary School, Bharsare. Call or WhatsApp: +91-9454826921. | मॉडल प्राइमरी स्कूल से संपर्क करें। फोन / WhatsApp: 9454826921" />
        <meta name="keywords" content="मॉडल प्राइमरी स्कूल संपर्क, Model Primary School contact, school phone Bharsare, psbharsare@gmail.com, 9454826921" />
        <link rel="canonical" href="https://modelprimaryschool.in/contact" />
        <meta property="og:title" content="संपर्क करें | Contact Model Primary School Bharsare" />
        <meta property="og:description" content="फोन / WhatsApp: 9454826921 | Email: psbharsare@gmail.com | सुल्तानपुर, उत्तर प्रदेश" />
        <meta property="og:url" content="https://modelprimaryschool.in/contact" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:locale:alternate" content="en_IN" />
      </Helmet>
    <div>
      <PageHero eyebrow={t("contact.hero.eyebrow")} title={t("contact.hero.title")} subtitle={t("contact.hero.subtitle")} />

      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          {/* FORM */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <h2 className="font-display font-extrabold text-2xl text-maroon-dark mb-1">{t("contact.form.h2")}</h2>
            <p className="font-body text-sm text-ink-60 mb-6">{t("contact.form.sub")}</p>

            {/* ── SUCCESS ── */}
            {status === "sent" ? (
              <div className="bg-green-light border border-green-30 rounded-2xl p-6 flex items-start gap-3">
                <CheckCircle2 className="text-green shrink-0" size={26} />
                <div>
                  <p className="font-display font-bold text-maroon-dark">{t("contact.form.sent.title")}</p>
                  <p className="font-body text-sm text-ink-70 mt-1">{t("contact.form.sent.sub")}</p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-semibold text-maroon-dark">{t("contact.form.name.label")}</label>
                    <input
                      required
                      name="from_name"
                      type="text"
                      placeholder={t("contact.form.name.place")}
                      className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50"
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-semibold text-maroon-dark">{t("contact.form.phone.label")}</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder={t("contact.form.phone.place")}
                      className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50"
                      disabled={status === "sending"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-sm font-semibold text-maroon-dark">{t("contact.form.class.label")}</label>
                  <select
                    required
                    name="class_interest"
                    className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50"
                    disabled={status === "sending"}
                  >
                    <option value="">{t("contact.form.class.place")}</option>
                    {["LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-sm font-semibold text-maroon-dark">{t("contact.form.msg.label")}</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t("contact.form.msg.place")}
                    className="focus-ring border-2 border-gold-light rounded-2xl px-4 py-2.5 font-body text-sm outline-none bg-cream-50 resize-none"
                    disabled={status === "sending"}
                  />
                </div>

                {/* ── ERROR BANNER ── */}
                {status === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-body">
                    ⚠️ कुछ गड़बड़ हुई / Something went wrong. कृपया दोबारा कोशिश करें या सीधे{" "}
                    <a href="tel:+919454826921" className="font-bold underline">9454826921</a> पर कॉल करें।
                  </div>
                )}

                <CTAButton
                  variant="primary"
                  icon={Send}
                  className="self-start mt-2"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "भेजा जा रहा है… / Sending…" : t("contact.form.submit")}
                </CTAButton>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-maroon rounded-3xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Emblem size={30} ring={false} /> {t("contact.info.h3")}</h3>
              <ul className="flex flex-col gap-4 font-body text-sm text-gold-light-90">
                <li className="flex gap-3"><MapPin size={20} className="shrink-0" /><span>{t("school.name")}, {t("contact.address")}</span></li>
                <li className="flex gap-3"><Phone size={20} className="shrink-0 text-gold" /><a href="tel:9454826921" className="hover:underline font-semibold text-white">+91 9454826921</a></li>
                <li className="flex gap-3"><WhatsAppIcon size={20} className="shrink-0 text-gold" /><a href="https://wa.me/919454826921?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20admissions%20%26%20enrollment%20at%20Model%20Primary%20School%2C%20Bharsare." target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-white">+91 9454826921 (WhatsApp)</a></li>
                <li className="flex gap-3"><Mail size={20} className="shrink-0 text-gold" /><a href="mailto:psbharsare@gmail.com" className="hover:underline font-semibold text-white">psbharsare@gmail.com</a></li>
                <li className="flex gap-3"><Clock size={20} className="shrink-0" /><span>{t("contact.hours")}</span></li>
              </ul>
            </div>
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-yellow-700/20 shadow-sm relative">
              <iframe
                src="https://maps.google.com/maps?q=26.134750,82.142278+(🏫+Model+Primary+School,+Bharsare)&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Model Primary School, Bharsare, Sultanpur — Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
    </article>
  );
}

/* ============================================================
   LAYOUT - persistent shell (Navbar + page content + Footer)
   Lenis smooth scroll lives here so it persists across routes.
   EVChatbot is mounted in App.jsx OUTSIDE <Routes> so it also
   never re-mounts on navigation.
   ============================================================ */
export function Layout() {
  const lenisRef = useRef(null);
  const location = useLocation();

  // ── Lenis smooth scroll init (once) ──────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // ── Scroll to top + refresh ScrollTrigger on route change ─
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <div className="font-body bg-cream min-h-screen">
        <BrandStyles />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
