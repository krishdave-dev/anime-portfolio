import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

// Brand SVGs (not in lucide-react)
const GithubIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const LinkedinIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Footer = () => (
  <footer style={{
    padding: '3.5rem 5%',
    background: '#040408',
    borderTop: '1px solid rgba(124,58,237,0.12)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Faint glow */}
    <div style={{
      position: 'absolute', bottom: '-60px', left: '50%',
      transform: 'translateX(-50%)',
      width: '500px', height: '200px',
      background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
      filter: 'blur(40px)',
      pointerEvents: 'none',
    }} />

    {/* Halftone */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
      pointerEvents: 'none',
    }} />

    <div style={{
      maxWidth: '1260px', margin: '0 auto',
      position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem',
    }}>
      {/* Rotating seal */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.2 }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="21" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="22,5 36,13 36,31 22,39 8,31 8,13"
            fill="none" stroke="#7c3aed" strokeWidth="1.2" />
          <circle cx="22" cy="22" r="7" fill="none" stroke="#7c3aed" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Name */}
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(28px, 5vw, 44px)',
        letterSpacing: '0.25em',
        color: 'rgba(248,250,252,0.12)',
        textAlign: 'center',
      }}>
        KRISH DAVE · 呪術廻戦
      </div>

      {/* Social links */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { Icon: GithubIcon,   href: 'https://github.com/krishdave-dev',  id: 'footer-github' },
          { Icon: LinkedinIcon, href: 'https://linkedin.com/in/KrishDave',  id: 'footer-linkedin' },
          { Icon: Mail,         href: 'mailto:krishdave1308@gmail.com',     id: 'footer-email' },
        ].map(({ Icon, href, id }) => (
          <motion.a
            key={id}
            id={id}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ y: -4, color: '#7c3aed' }}
            style={{
              color: 'rgba(148,163,184,0.4)',
              textDecoration: 'none',
              cursor: 'none',
              transition: 'color 0.3s',
              display: 'flex',
            }}
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        color: 'rgba(148,163,184,0.3)',
        letterSpacing: '0.08em',
        textAlign: 'center',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
        © 2026 Krish Dave — Built with React, GSAP & Three.js
        <Heart size={11} fill="rgba(244,114,182,0.5)" color="rgba(244,114,182,0.5)" />
        Inspired by JJK
      </p>
    </div>
  </footer>
);

export default Footer;
