import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Phone, Link2, GitFork, ExternalLink,
  Code2, Server, Cloud, Terminal, Wrench,
  Trophy, Star, Zap, MapPin, Calendar,
  GraduationCap, User, Award, Briefcase, Users, Palette,
} from 'lucide-react';

// Brand icon SVGs (not in lucide-react)
const GithubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const LinkedinIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
gsap.registerPlugin(ScrollTrigger);

// ─── Shared helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Fluid ink blob blobs
const InkBlob = ({ color, size, style }) => (
  <div style={{
    position: 'absolute',
    width: size, height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    filter: 'blur(70px)',
    pointerEvents: 'none',
    ...style,
  }} />
);

// Manga panel section wrapper — NO video/clip bg here (performance)
const MangaSection = ({ id, children, blobColors = ['rgba(124,58,237,0.18)', 'rgba(37,99,235,0.12)'], style = {} }) => (
  <section
    id={id}
    style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--section-pad) 5%',
      background: 'var(--abyss)',
      ...style,
    }}
  >
    {/* Ink blobs — CSS only, zero GPU overhead */}
    <InkBlob color={blobColors[0]} size="500px" style={{ top: '-120px', left: '-100px' }} />
    <InkBlob color={blobColors[1]} size="400px" style={{ bottom: '-80px', right: '5%' }} />

    {/* Halftone texture */}
    <div className="halftone-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

    {/* Grid lines */}
    <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }} />

    {/* Static manga speed-lines corner decoration */}
    <svg
      style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }}
      viewBox="0 0 200 200"
    >
      {[0,15,30,45,60,75,90].map(a => (
        <line key={a} x1="200" y1="0" x2="0" y2="200"
          stroke="white" strokeWidth="0.8"
          transform={`rotate(${a - 45}, 200, 0)`}
        />
      ))}
    </svg>

    <div style={{ maxWidth: '1260px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  </section>
);


// Big section heading — manga chapter style
const ChapterHead = ({ panel, kanji, title, subtitle, accent = '#7c3aed' }) => (
  <div style={{ marginBottom: '4.5rem', position: 'relative' }}>
    {/* Ghost number */}
    <div style={{
      position: 'absolute',
      top: '-30px',
      left: '-10px',
      fontFamily: 'Bebas Neue, sans-serif',
      fontSize: 'clamp(100px, 18vw, 200px)',
      color: 'rgba(255,255,255,0.025)',
      lineHeight: 1,
      userSelect: 'none',
      letterSpacing: '-0.02em',
    }}>
      {panel}
    </div>

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Panel tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '0.75rem',
      }}>
        <div style={{ width: '28px', height: '2px', background: accent }} />
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '11px', letterSpacing: '0.5em',
          color: accent, textTransform: 'uppercase',
        }}>
          CHAPTER {panel}
        </span>
        <div style={{ width: '28px', height: '2px', background: accent }} />
      </div>

      {/* Main title */}
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(52px, 10vw, 110px)',
        lineHeight: 0.9,
        color: '#f8fafc',
        textShadow: `0 0 50px ${accent}44`,
        letterSpacing: '0.02em',
        marginBottom: '0.3em',
      }}>
        {title}
      </h2>

      {/* Kanji */}
      {kanji && (
        <div style={{
          fontFamily: 'Noto Sans JP, sans-serif',
          fontSize: '13px',
          letterSpacing: '0.35em',
          color: `${accent}77`,
          marginBottom: '0.5rem',
        }}>
          {kanji}
        </div>
      )}

      {/* Subtitle */}
      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(14px, 1.8vw, 17px)',
        color: 'rgba(148,163,184,0.8)',
        maxWidth: '560px',
        lineHeight: 1.7,
      }}>
        {subtitle}
      </p>

      {/* Rule */}
      <div style={{
        width: '80px', height: '3px',
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        marginTop: '1.5rem',
      }} />
    </motion.div>
  </div>
);


/* ══════════════════════════════════════════════════════════════════
   CHAPTER 01 — WHO I AM
   ══════════════════════════════════════════════════════════════════ */
export const Domain1About = () => (
  <MangaSection
    id="domain1"
    blobColors={['rgba(124,58,237,0.18)', 'rgba(74,14,143,0.12)']}
    style={{ background: 'linear-gradient(180deg, #060810 0%, #0d0820 100%)' }}
  >
    <ChapterHead
      panel="01"
      kanji="起 源 の 章"
      title="WHO I AM"
      subtitle="A full-stack developer with a creative eye and the drive to build what matters — forged in hackathons, classrooms, and countless commits."
      accent="#7c3aed"
    />

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: '1.5rem',
      gridAutoRows: 'auto',
    }}>

      {/* ── About Me — spans 8 cols ─────────────────────── */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ gridColumn: 'span 8' }}
      >
        <div
          className="glass-card manga-ink-box panel-slash-tr"
          style={{ padding: '2.5rem', height: '100%' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <User size={14} color="#7c3aed" />
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '11px', letterSpacing: '0.5em', color: '#7c3aed',
            }}>ABOUT ME</span>
          </div>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.85,
            color: 'rgba(248,250,252,0.85)',
            marginBottom: '2rem',
          }}>
            I'm <span style={{ color: '#7c3aed', fontWeight: 700 }}>Krish Dave</span> — a passionate full-stack developer with a flair for graphic design. I thrive in fast-paced, collaborative environments and have honed my skills through multiple hackathons, building impactful projects across EdTech, safety systems, and AI platforms. A natural leader and communicator, I've led technical events, guided design teams, and anchored literature events.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { Icon: Mail,         text: 'krishdave1308@gmail.com', href: 'mailto:krishdave1308@gmail.com' },
              { Icon: Phone,        text: '+91-99137 13824',         href: 'tel:+919913713824' },
              { Icon: GithubIcon,   text: 'krishdave-dev',           href: 'https://github.com/krishdave-dev' },
              { Icon: LinkedinIcon, text: 'KrishDave',               href: 'https://linkedin.com/in/KrishDave' },
            ].map(({ Icon, text, href }) => (
              <a
                key={text}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  fontFamily: 'Outfit, sans-serif', fontSize: '14px',
                  color: 'rgba(148,163,184,0.8)',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,0.8)'}
              >
                <Icon size={15} />
                {text}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Education panel — spans 4 cols ─────────────── */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ gridColumn: 'span 4' }}
      >
        <div
          className="glass-card panel-slash-tl"
          style={{
            padding: '2.5rem',
            border: '3px solid rgba(251,191,36,0.2)',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <GraduationCap size={14} color="#fbbf24" />
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '11px', letterSpacing: '0.5em', color: '#fbbf24',
            }}>EDUCATION</span>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '20px', color: '#f8fafc',
              letterSpacing: '0.03em', marginBottom: '0.3rem',
            }}>
              G H Patel College of Engg & Technology
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.7)', marginBottom: '0.6rem' }}>
              B.Tech — Anand, India · Sept 2022 – Present
            </div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '42px', color: '#fbbf24',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(251,191,36,0.5)',
            }}>
              8.65
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.6)' }}>
              CGPA — up to 7th Semester
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem' }}>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '18px', color: '#f8fafc',
              letterSpacing: '0.03em', marginBottom: '0.3rem',
            }}>
              Krishna International School
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.7)' }}>
              HSC · Rajkot · July 2020
            </div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '32px', color: '#fbbf24',
              lineHeight: 1.2,
            }}>
              71.23%
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat cards ─────────────────────────────────── */}
      {[
        { Icon: Trophy, num: '2×',   label: 'Hackathon\nWinner',      color: '#fbbf24' },
        { Icon: Users,  num: '500+', label: 'Event\nParticipants',    color: '#7c3aed' },
        { Icon: Palette, num: '50+', label: 'Design\nProjects',       color: '#f472b6' },
        { Icon: Star,   num: '8.65', label: 'CGPA',                   color: '#60a5fa' },
      ].map(({ Icon, num, label, color }, i) => (
        <motion.div
          key={num}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          style={{ gridColumn: 'span 3' }}
        >
          <div
            className="glass-card panel-slash-both"
            style={{
              padding: '2rem',
              border: `2px solid ${color}30`,
              textAlign: 'center',
              boxShadow: `0 0 30px ${color}10`,
              height: '100%',
            }}
          >
            <Icon size={22} color={color} style={{ margin: '0 auto 0.75rem' }} />
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '52px', color, lineHeight: 1,
              textShadow: `0 0 20px ${color}66`,
            }}>
              {num}
            </div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '12px', color: 'rgba(148,163,184,0.75)',
              marginTop: '0.4rem', lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}>
              {label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </MangaSection>
);


/* ══════════════════════════════════════════════════════════════════
   CHAPTER 02 — CURSED TECHNIQUES  (Skills)
   ══════════════════════════════════════════════════════════════════ */
const SKILLS = [
  {
    Icon: Code2,
    category: 'Frontend',
    color: '#7c3aed',
    items: [
      { name: 'React.js',      pct: 95 },
      { name: 'Next.js',       pct: 88 },
      { name: 'TypeScript',    pct: 78 },
      { name: 'HTML5 / CSS3',  pct: 95 },
      { name: 'Tailwind CSS',  pct: 90 },
    ],
  },
  {
    Icon: Server,
    category: 'Backend & DB',
    color: '#2563eb',
    items: [
      { name: 'Node.js',     pct: 82 },
      { name: 'Express.js',  pct: 80 },
      { name: 'MongoDB',     pct: 78 },
      { name: 'PostgreSQL',  pct: 72 },
      { name: 'MySQL',       pct: 70 },
    ],
  },
  {
    Icon: Cloud,
    category: 'Cloud & DevOps',
    color: '#f472b6',
    items: [
      { name: 'Supabase',        pct: 85 },
      { name: 'Firebase',        pct: 80 },
      { name: 'GitHub Actions',  pct: 75 },
      { name: 'Vercel / Netlify', pct: 88 },
    ],
  },
  {
    Icon: Terminal,
    category: 'Languages',
    color: '#fbbf24',
    items: [
      { name: 'JavaScript', pct: 93 },
      { name: 'Java',       pct: 85 },
      { name: 'C++',        pct: 70 },
      { name: 'Python',     pct: 65 },
    ],
  },
];

const TOOLS = ['Git', 'Figma', 'Adobe Suite', 'VS Code', 'GitHub Copilot', 'Agile', 'Cursor', 'ChatGPT', 'Redis', 'Prisma', 'Flutter', 'ShadcnUI'];

const SkillBar = ({ name, pct, color }) => {
  const fillRef = useRef(null);
  const rowRef  = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: rowRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(fillRef.current, {
          width: `${pct}%`,
          duration: 1.3,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [pct]);

  return (
    <div ref={rowRef} style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13.5px', color: 'rgba(248,250,252,0.9)' }}>
          {name}
        </span>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '17px', color, letterSpacing: '0.05em' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          ref={fillRef}
          style={{
            height: '100%', width: '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: '2px',
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};

export const Domain2Skills = () => (
  <MangaSection
    id="domain2"
    blobColors={['rgba(37,99,235,0.16)', 'rgba(124,58,237,0.12)']}
    style={{ background: 'linear-gradient(180deg, #0d0820 0%, #080416 100%)' }}
  >
    <ChapterHead
      panel="02"
      kanji="技 法 の 章"
      title="CURSED TECHNIQUES"
      subtitle="Every skill is a technique honed through real projects, hackathon nights, and shippped code. These are my weapons."
      accent="#60a5fa"
    />

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.75rem',
      marginBottom: '3rem',
    }}>
      {SKILLS.map(({ Icon, category, color, items }) => (
        <motion.div
          key={category}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className="glass-card panel-slash-both"
            style={{
              padding: '2rem',
              border: `2px solid ${color}25`,
              height: '100%',
            }}
          >
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${color}18`,
                border: `1px solid ${color}40`,
                borderRadius: '4px',
              }}>
                <Icon size={15} color={color} />
              </div>
              <span style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                letterSpacing: '0.12em',
                color: '#f8fafc',
              }}>
                {category}
              </span>
            </div>

            {items.map(s => <SkillBar key={s.name} {...s} color={color} />)}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Tools tag cloud */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
        <Wrench size={13} color="#94a3b8" />
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '11px', letterSpacing: '0.5em', color: '#94a3b8',
        }}>
          ARSENAL & TOOLS
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
        {TOOLS.map(tool => (
          <motion.div
            key={tool}
            whileHover={{ y: -3, borderColor: '#7c3aed', color: '#f8fafc' }}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '12.5px',
              color: 'rgba(148,163,184,0.85)',
              border: '1px solid rgba(124,58,237,0.2)',
              padding: '0.4rem 1rem',
              background: 'rgba(124,58,237,0.06)',
              cursor: 'default',
              transition: 'all 0.25s',
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            {tool}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </MangaSection>
);


/* ══════════════════════════════════════════════════════════════════
   CHAPTER 03 — BATTLES FOUGHT  (Projects & Hackathons)
   ══════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 'p1',
    name: 'MINDHAVEN',
    subtitle: 'Mental Health Support App',
    event: "FootPrints'25 — MSU × ODOO",
    date: 'Feb – Mar 2025',
    role: 'UI/UX Design & Backend',
    tools: ['Flutter', 'Figma', 'Supabase', 'Canva'],
    description: 'A Flutter app for mood tracking, daily assessments, and AI-driven mental health support. Features Braino chatbot, journaling, dashboards, and personalised self-care suggestions.',
    color: '#f472b6',
    badge: 'Finalist',
    BadgeIcon: Star,
  },
  {
    id: 'p2',
    name: 'INDIGENIOUS',
    subtitle: 'Campus Threat Prediction System',
    event: 'WINNER — Navrachna University Hackathon',
    date: 'September 2025',
    role: 'Frontend Developer',
    tools: ['React.js', 'Tailwind CSS', 'Supabase'],
    description: 'Real-time campus monitoring & threat prediction. Predicts assaults, thefts, fires, and intrusions before they happen. Maps risk hotspots for preventive action.',
    color: '#fbbf24',
    badge: 'WINNER',
    BadgeIcon: Trophy,
  },
  {
    id: 'p3',
    name: 'ONEFLOW',
    subtitle: 'Project Management Platform',
    event: 'ODOO × IIT Gandhinagar',
    date: 'November 2025',
    role: 'Frontend Developer',
    tools: ['Next.js', 'TypeScript', 'ShadcnUI', 'PostgreSQL', 'Prisma'],
    description: 'Combines projects, tasks, timesheets, multi-tenant RBAC, and financial tracking. Rich analytics with KPI cards, charts, PDF export, and a robust Prisma/PostgreSQL backend.',
    color: '#60a5fa',
    badge: 'Hackathon',
    BadgeIcon: Zap,
  },
  {
    id: 'p4',
    name: 'INNOAITION',
    subtitle: 'Disaster Monitoring System',
    event: 'WINNER — InnovAItion, DAIICT',
    date: 'January 2026',
    role: 'Frontend + DevOps',
    tools: ['React.js', 'Tailwind CSS', 'Redis', 'Supabase'],
    description: 'Sophisticated disaster monitoring for tracking disaster-affected regions across India in real-time. Combines satellite maps with a futuristic radar detection view for emergency response.',
    color: '#7c3aed',
    badge: 'WINNER',
    BadgeIcon: Trophy,
  },
];

const ProjectCard = ({ project, index }) => {
  const { BadgeIcon } = project;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={`project-${project.id}`}
      variants={isEven ? fadeLeft : fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div
        className="glass-card manga-ink-box"
        style={{
          padding: '0',
          border: `2px solid ${project.color}30`,
          clipPath: isEven
            ? 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))'
            : 'polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease',
          boxShadow: `0 0 40px ${project.color}0a`,
        }}
      >
        {/* Top accent bar */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${project.color}, ${project.color}44, transparent)`,
        }} />

        <div style={{ padding: '2.2rem' }}>
          {/* Ghost index */}
          <div style={{
            position: 'absolute', right: '1rem', bottom: '0.5rem',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '120px', color: `${project.color}07`,
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Header row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem',
            marginBottom: '1.1rem',
          }}>
            <div>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(28px, 4vw, 36px)',
                color: '#f8fafc',
                letterSpacing: '0.04em',
                lineHeight: 1,
                marginBottom: '0.2rem',
              }}>
                {project.name}
              </div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                color: `${project.color}cc`,
                fontWeight: 500,
              }}>
                {project.subtitle}
              </div>
            </div>

            {/* Badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.3rem 0.75rem',
              background: `${project.color}18`,
              border: `1px solid ${project.color}44`,
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}>
              <BadgeIcon size={11} color={project.color} />
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', color: project.color }}>
                {project.badge}
              </span>
            </div>
          </div>

          {/* Event stripe */}
          <div style={{
            background: `${project.color}0d`,
            borderLeft: `3px solid ${project.color}`,
            padding: '0.65rem 1rem',
            marginBottom: '1.1rem',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '15px', letterSpacing: '0.06em', color: project.color }}>
              {project.event}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.7)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Briefcase size={11} /> {project.role}
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.7)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={11} /> {project.date}
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '13.5px',
            lineHeight: 1.75,
            color: 'rgba(148,163,184,0.85)',
            marginBottom: '1.4rem',
          }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {project.tools.map(tool => (
              <span key={tool} style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                padding: '0.25rem 0.6rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(148,163,184,0.75)',
                clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Domain3Projects = () => (
  <MangaSection
    id="domain3"
    blobColors={['rgba(244,114,182,0.14)', 'rgba(124,58,237,0.12)']}
    style={{ background: 'linear-gradient(180deg, #080416 0%, #0d0820 100%)' }}
  >
    <ChapterHead
      panel="03"
      kanji="戦 い の 章"
      title="BATTLES FOUGHT"
      subtitle="Real deadlines. Real team pressure. Four projects that shaped the developer I am — built under fire, shipped with pride."
      accent="#f472b6"
    />

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
      gap: '2rem',
    }}>
      {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
    </div>
  </MangaSection>
);


/* ══════════════════════════════════════════════════════════════════
   CHAPTER 04 — IN THE FIELD  (Experience + Contact)
   ══════════════════════════════════════════════════════════════════ */
export const Domain4Contact = () => (
  <MangaSection
    id="domain4"
    blobColors={['rgba(251,191,36,0.12)', 'rgba(124,58,237,0.12)']}
    style={{ background: 'linear-gradient(180deg, #0d0820 0%, #040408 100%)' }}
  >
    <ChapterHead
      panel="04"
      kanji="経 験 の 章"
      title="IN THE FIELD"
      subtitle="From internships to student leadership — the real-world clashes that built the engineer behind the code."
      accent="#fbbf24"
    />

    {/* ── eSparkBiz Internship ──────────────────────── */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ marginBottom: '2rem' }}
    >
      <div
        className="glass-card panel-slash-both-lg"
        style={{
          padding: '2.5rem',
          border: '2px solid rgba(251,191,36,0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #fbbf24, #f59e0b40, transparent)',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '1.5rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          {/* Icon */}
          <div style={{
            width: '56px', height: '56px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.3)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          }}>
            <Briefcase size={22} color="#fbbf24" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Briefcase size={12} color="#fbbf24" />
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', letterSpacing: '0.5em', color: '#fbbf24' }}>
                INTERNSHIP
              </span>
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.04em', color: '#f8fafc', marginBottom: '0.2rem' }}>
              Software Developer Intern
            </div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '22px',
              letterSpacing: '0.06em',
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem',
            }}>
              eSparkBiz Technologies
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Hands-on training in Node.js, MySQL, HTML, CSS, and JavaScript',
                'Implemented CRUD operations and developed dynamic, database-driven web features',
              ].map(item => (
                <li key={item} style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '14px',
                  color: 'rgba(148,163,184,0.85)',
                  display: 'flex', gap: '0.6rem',
                }}>
                  <Zap size={14} color="#fbbf24" style={{ marginTop: '2px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '13px', letterSpacing: '0.1em',
            color: '#fbbf24',
            textAlign: 'right',
            display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-end',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={11} />
              Jan 2026 – Mar 2026
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(148,163,184,0.6)', fontSize: '11px' }}>
              <MapPin size={11} />
              Backend Dev · DB Management
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* ── Leadership cards ──────────────────────────── */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3.5rem',
    }}>
      {[
        {
          Icon: Users,
          role: 'Vice President',
          org: 'CSI-GCET',
          period: 'Feb 2024 – Dec 2025',
          points: ['Led technical events with 500+ participants', 'Boosted workshop turnout by 40% through targeted publicity'],
          color: '#7c3aed',
        },
        {
          Icon: Palette,
          role: 'Freelance Designer',
          org: 'Graphics & Visual Branding',
          period: 'Jan 2023 – Present',
          points: ['50+ high-quality designs for diverse clients', 'Client satisfaction maintained across all projects'],
          color: '#f472b6',
        },
      ].map(({ Icon, role, org, period, points, color }) => (
        <motion.div
          key={role}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
          <div
            className="glass-card panel-slash-both"
            style={{
              padding: '2rem',
              border: `2px solid ${color}25`,
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Icon size={16} color={color} />
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', letterSpacing: '0.5em', color }}>
                LEADERSHIP
              </span>
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '0.04em', color: '#f8fafc', marginBottom: '0.2rem' }}>
              {role}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '0.08em', color, marginBottom: '0.3rem' }}>
              {org}
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.6)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={11} /> {period}
            </div>
            {points.map(p => (
              <div key={p} style={{
                display: 'flex', gap: '0.5rem', marginBottom: '0.5rem',
                fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.8)',
              }}>
                <Award size={12} color={color} style={{ marginTop: '2px', flexShrink: 0 }} />
                {p}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    {/* ── Contact grid ─────────────────────────────── */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4))' }} />
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', letterSpacing: '0.5em', color: '#94a3b8' }}>
          OPEN TO WORK
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), transparent)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
      }}>
        {[
          { Icon: Mail,         label: 'Email',    value: 'krishdave1308@gmail.com', href: 'mailto:krishdave1308@gmail.com', color: '#7c3aed' },
          { Icon: GithubIcon,   label: 'GitHub',   value: 'krishdave-dev',           href: 'https://github.com/krishdave-dev', color: '#60a5fa' },
          { Icon: LinkedinIcon, label: 'LinkedIn', value: 'KrishDave',               href: 'https://linkedin.com/in/KrishDave', color: '#f472b6' },
          { Icon: Phone,        label: 'Phone',    value: '+91-99137 13824',         href: 'tel:+919913713824', color: '#fbbf24' },
        ].map(({ Icon, label, value, href, color }) => (
          <motion.a
            key={label}
            id={`contact-${label.toLowerCase()}`}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: `0 20px 40px ${color}18` }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              padding: '1.75rem 1rem',
              background: 'rgba(6,8,16,0.8)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${color}28`,
              textDecoration: 'none',
              cursor: 'none',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              transition: 'all 0.3s',
            }}
          >
            <Icon size={22} color={color} />
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', letterSpacing: '0.25em', color }}>
              {label}
            </span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', color: 'rgba(148,163,184,0.7)', textAlign: 'center', wordBreak: 'break-all' }}>
              {value}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  </MangaSection>
);
