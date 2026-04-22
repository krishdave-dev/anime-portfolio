import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import HeroSection        from './components/HeroSection';
import { Domain1About, Domain2Skills, Domain3Projects, Domain4Contact }
                          from './components/DomainSections';
import MangaTransition    from './components/DomainTransition';
import AudioPlayer        from './components/AudioPlayer';
import Footer             from './components/Footer';

const FluidSurface3D = React.lazy(() => import('./components/FluidSurface3D'));

gsap.registerPlugin(ScrollTrigger);

/* ─── Loading Screen ─────────────────────────────────────────────── */
const LoadingScreen = ({ show, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [burst,    setBurst]    = useState(false);

  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 5 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setBurst(true);
        setTimeout(onComplete, 900);
      }
      setProgress(Math.min(p, 100));
    }, 55);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'radial-gradient(ellipse at center, #0d0820 0%, #020308 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Halftone texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.07) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            pointerEvents: 'none',
          }} />

          {/* Rotating outer seal */}
          <div style={{
            position: 'absolute',
            width: '600px', height: '600px',
            opacity: burst ? 0.25 : 0.06,
            animation: 'spin 10s linear infinite',
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 600 600" fill="none" width="100%" height="100%">
              <circle cx="300" cy="300" r="298" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="8 4" />
              <circle cx="300" cy="300" r="248" stroke="#60a5fa" strokeWidth="1"   strokeDasharray="4 8" />
              <polygon points="300,50 521,175 521,425 300,550 79,425 79,175"
                stroke="#7c3aed" strokeWidth="1.5" fill="none" />
              <polygon points="300,100 486,200 486,400 300,500 114,400 114,200"
                stroke="#f472b6" strokeWidth="0.8" fill="none" />
              <circle cx="300" cy="300" r="178" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="3 5" />
              <circle cx="300" cy="300" r="118" stroke="#60a5fa" strokeWidth="1" />
            </svg>
          </div>

          {/* Pulsing inner ring */}
          <div style={{
            position: 'absolute',
            width: '180px', height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(124,58,237,0.5)',
            animation: 'pulseRing 2s linear infinite',
            top: '50%', left: '50%',
            pointerEvents: 'none',
          }} />

          {/* Text block */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                fontFamily: 'Noto Sans JP, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(24px, 5vw, 48px)',
                color: 'white',
                letterSpacing: '0.2em',
                marginBottom: '0.4rem',
                textShadow: '0 0 40px rgba(124,58,237,0.9), 0 0 80px rgba(124,58,237,0.4)',
              }}
            >
              術式展開
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(28px, 7vw, 68px)',
                letterSpacing: '0.3em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #7c3aed, #60a5fa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.3em',
              }}
            >
              TECHNIQUE OPEN
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.5em',
                color: 'rgba(148,163,184,0.5)',
                marginBottom: '3rem',
              }}
            >
              LOADING KRISH DAVE · PORTFOLIO
            </motion.div>

            {/* Progress */}
            <div style={{ width: '280px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '10px', letterSpacing: '0.5em',
                  color: 'rgba(124,58,237,0.8)',
                }}>
                  CURSED ENERGY
                </span>
                <span style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '18px', color: '#7c3aed',
                  letterSpacing: '0.05em',
                }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{
                height: '2px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '1px', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width:  `${progress}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #60a5fa, #f472b6)',
                  transition: 'width 0.08s ease',
                  boxShadow: '0 0 12px rgba(124,58,237,0.9)',
                }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── App ────────────────────────────────────────────────────────── */
const App = () => {
  const [loaded,      setLoaded]      = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleDone = () => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 600);
  };

  return (
    <>
      <CustomCursor />
      <LoadingScreen show={!loaded} onComplete={handleDone} />

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Navbar />

            {/* Fixed 3D fluid orbs — behind everything */}
            <Suspense fallback={null}>
              <div style={{
                position: 'fixed', inset: 0,
                zIndex: 0, pointerEvents: 'none',
                opacity: 0.35,
              }}>
                <FluidSurface3D />
              </div>
            </Suspense>

            {/* Hero — scroll-scrub video + clip overlay */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <HeroSection />
            </div>

            {/* ── Domain Sections ─────────────────────────── */}
            <div style={{ position: 'relative', zIndex: 2 }}>

              <MangaTransition chapter="01" label="WHO I AM"         color="#7c3aed" />
              <Domain1About />

              <MangaTransition chapter="02" label="CURSED TECHNIQUES" color="#60a5fa" />
              <Domain2Skills />

              <MangaTransition chapter="03" label="BATTLES FOUGHT"   color="#f472b6" />
              <Domain3Projects />

              <MangaTransition chapter="04" label="IN THE FIELD"     color="#fbbf24" />
              <Domain4Contact />

              <Footer />
            </div>

            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
