import { Link } from "react-router-dom";
import { ArrowRight } from "./Icons";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden mesh-bg text-white -mt-[72px] md:-mt-[calc(72px+36px)] pt-[72px] md:pt-[calc(72px+36px)]">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-brand-500/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-coral-500/15 blur-3xl animate-float-slow" />

      <div className="container-x relative pt-24 pb-24 md:pt-28 md:pb-32">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="reveal mb-6 flex items-center gap-2 text-sm text-white/60">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          <span className="reveal pill bg-white/10 text-brand-200 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse-soft" />
            {eyebrow}
          </span>

          <h1 className="reveal delay-100 heading-xl mt-5 text-balance">
            {title}{" "}
            {highlight && (
              <span className="font-serif italic font-medium text-brand-200">
                {highlight}
              </span>
            )}
          </h1>

          <p className="reveal delay-200 mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Curved separator */}
      <svg
        className="block w-full text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,80 C240,30 480,60 720,40 C960,20 1200,50 1440,20 L1440,80 Z"
        />
      </svg>
    </section>
  );
}
