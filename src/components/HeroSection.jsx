import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedClipBg from './AnimatedClipBg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const videoRef    = useRef(null);
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.preload  = 'auto';
    video.muted    = true;
    video.playsInline = true;

    const onLoaded = () => {
      const dur = video.duration;
      ScrollTrigger.create({
        trigger: scrollTrackRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        pin: containerRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          const t = self.progress * dur;
          if (isFinite(t)) video.currentTime = Math.min(t, dur - 0.01);
        },
      });

      // Parallax on floating layers
      gsap.utils.toArray('.hero-float').forEach((el, i) => {
        gsap.to(el, {
          y: -(i + 1) * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    };

    video.addEventListener('loadedmetadata', onLoaded);
    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div ref={scrollTrackRef} style={{ height: '420vh' }} />

      {/* ── Pinned hero container ─────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Scroll-scrubbed master video */}
        <video
          ref={videoRef}
          src="/assets/jjk_video.mp4"
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.28) saturate(1.6) hue-rotate(10deg)',
            zIndex: 0,
          }}
        />

        {/* Animated clips overlay — screened on top for action flashes */}
        <AnimatedClipBg opacity={0.22} blendMode="screen" cycleMs={3500} />

        {/* Halftone texture */}
        <div className="halftone-bg" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

        {/* Speed lines */}
        <div className="speed-lines-bg" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(4,4,8,0.75) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '28%', zIndex: 3,
          background: 'linear-gradient(to bottom, rgba(4,4,8,1), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', zIndex: 3,
          background: 'linear-gradient(to top, rgba(4,4,8,1), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', width: '100%', height: '1px', zIndex: 4,
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(96,165,250,0.5), transparent)',
          animation: 'scanLine 5s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Manga panel border lines — decorative */}
        <div className="hero-float" style={{
          position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', zIndex: 3,
          borderLeft: '2px solid rgba(124,58,237,0.12)',
          pointerEvents: 'none',
        }} />
        <div className="hero-float" style={{
          position: 'absolute', top: 0, right: '42%', width: 0, height: '60%', zIndex: 3,
          borderLeft: '1px solid rgba(124,58,237,0.07)',
          pointerEvents: 'none',
        }} />

        {/* Japanese watermark */}
        <motion.div
          className="hero-float"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 0.08, x: 0 }}
          transition={{ duration: 2.5, delay: 1.2 }}
          style={{
            position: 'absolute', right: '3%', top: '8%',
            fontFamily: 'Noto Sans JP, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(64px, 11vw, 130px)',
            color: 'white',
            writingMode: 'vertical-rl',
            lineHeight: 1,
            zIndex: 4, pointerEvents: 'none',
            letterSpacing: '0.06em',
            userSelect: 'none',
          }}
        >
          呪術廻戦
        </motion.div>

        {/* ── Hero Text Block ─────────────────────── */}
        <div style={{
          position: 'absolute', bottom: '14%', left: '5%',
          zIndex: 5, maxWidth: '720px',
        }}>

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ width: '36px', height: '2px', background: 'linear-gradient(90deg, #7c3aed, #60a5fa)', display: 'inline-block' }} />
            <span className="label-tag" style={{ color: '#7c3aed', fontSize: '10px', letterSpacing: '0.5em' }}>
              FULL STACK DEVELOPER
            </span>
            <span style={{ width: '36px', height: '2px', background: 'linear-gradient(90deg, #60a5fa, transparent)', display: 'inline-block' }} />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.04em' }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-title"
            style={{
              fontSize: 'clamp(68px, 14vw, 160px)',
              color: '#f8fafc',
              textShadow: '0 0 40px rgba(124,58,237,0.4), 0 0 120px rgba(124,58,237,0.15)',
              marginBottom: '0.1em',
            }}
          >
            KRISH
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(90deg, #7c3aed, #60a5fa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DAVE
            </span>
          </motion.h1>

          {/* Sub tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4 }}
            className="body-text"
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 300,
              color: 'rgba(148,163,184,0.9)',
              marginBottom: '2.5rem',
              letterSpacing: '0.02em',
            }}
          >
            React · Next.js · Node.js · Creative Design · 2× Hackathon Winner
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="#domain3"
              id="hero-projects-btn"
              onClick={e => { e.preventDefault(); document.getElementById('domain3').scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                padding: '0.85rem 2.2rem',
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                border: 'none',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                color: 'white',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                cursor: 'none',
                boxShadow: '0 0 24px rgba(124,58,237,0.5)',
                transition: 'box-shadow 0.3s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 48px rgba(124,58,237,0.8)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View Projects
            </a>
            <a
              href="mailto:krishdave1308@gmail.com"
              id="hero-contact-btn"
              style={{
                padding: '0.85rem 2.2rem',
                background: 'transparent',
                border: '2px solid rgba(124,58,237,0.5)',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                color: 'rgba(248,250,252,0.85)',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'border-color 0.3s, color 0.3s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.color = 'rgba(248,250,252,0.85)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{
            position: 'absolute', bottom: '3.5rem', right: '5%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            zIndex: 5,
          }}
        >
          <span className="small-label" style={{ color: 'rgba(124,58,237,0.8)', fontSize: '9px' }}>SCROLL</span>
          <div style={{
            width: '1px', height: '64px',
            background: 'linear-gradient(to bottom, rgba(124,58,237,0.9), transparent)',
            animation: 'float 2.2s ease-in-out infinite',
          }} />
        </motion.div>

        {/* Corner SVG accent */}
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', opacity: 0.12, zIndex: 4 }}>
          {[0, 20, 40, 60].map((offset, i) => (
            <line key={i} x1="180" y1={offset} x2={offset} y2="180"
              stroke={['#7c3aed', '#60a5fa', '#f472b6', '#fbbf24'][i]}
              strokeWidth="0.8" />
          ))}
        </svg>

        {/* Bottom-left manga panel # tag */}
        <div style={{
          position: 'absolute', bottom: '3rem', left: '5%', zIndex: 5,
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '11px', letterSpacing: '0.5em',
          color: 'rgba(124,58,237,0.5)',
        }}>
          PAGE 001 · JJK × PORTFOLIO
        </div>
      </div>

      {/* Spacer to allow content below pinned section */}
      <div style={{ height: '100vh' }} />
    </>
  );
};

export default HeroSection;
