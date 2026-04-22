import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Who I Am',   href: '#domain1', jp: '起源', id: '1' },
  { label: 'Techniques', href: '#domain2', jp: '技法', id: '2' },
  { label: 'Battles',    href: '#domain3', jp: '戦い', id: '3' },
  { label: 'In The Field', href: '#domain4', jp: '経験', id: '4' },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeNav,   setActiveNav]   = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 5%' : '1.25rem 5%',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: scrolled ? 'rgba(4,4,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.18)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          id="navbar-logo"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ textDecoration: 'none', cursor: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          {/* Seal SVG */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="16" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="17,4 28,10.5 28,23.5 17,30 6,23.5 6,10.5"
              fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="1.2" />
            <circle cx="17" cy="17" r="5" fill="rgba(124,58,237,0.25)" stroke="#7c3aed" strokeWidth="1" />
          </svg>
          <div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '22px', letterSpacing: '0.2em', color: '#f8fafc', lineHeight: 1,
            }}>
              KRISH DAVE
            </div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '9px', letterSpacing: '0.45em',
              color: 'rgba(124,58,237,0.8)', textTransform: 'uppercase',
            }}>
              Portfolio
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              id={`nav-item-${item.id}`}
              href={item.href}
              onClick={e => { e.preventDefault(); goTo(item.href); setActiveNav(item.id); }}
              style={{
                textDecoration: 'none', cursor: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.nl').style.color = '#7c3aed';
                e.currentTarget.querySelector('.nj').style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.nl').style.color = activeNav === item.id ? '#7c3aed' : 'rgba(148,163,184,0.8)';
                e.currentTarget.querySelector('.nj').style.opacity = activeNav === item.id ? '1' : '0.3';
              }}
            >
              <span className="nl" style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '16px', letterSpacing: '0.12em',
                color: activeNav === item.id ? '#7c3aed' : 'rgba(148,163,184,0.8)',
                transition: 'color 0.3s',
              }}>
                {item.label}
              </span>
              <span className="nj" style={{
                fontFamily: 'Noto Sans JP, sans-serif',
                fontSize: '9px', color: '#7c3aed',
                opacity: activeNav === item.id ? 1 : 0.3,
                transition: 'opacity 0.3s',
              }}>
                {item.jp}
              </span>
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          id="mobile-menu-btn"
          className="hamburger"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'none', color: '#7c3aed', padding: '4px',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '65px', left: 0, right: 0,
              background: 'rgba(4,4,8,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(124,58,237,0.2)',
              zIndex: 99, padding: '0.5rem 5% 1.5rem',
            }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={e => { e.preventDefault(); goTo(item.href); }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  textDecoration: 'none', cursor: 'none',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(124,58,237,0.1)',
                }}
              >
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.08em', color: '#f8fafc' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: 'rgba(124,58,237,0.7)' }}>
                  {item.jp}
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
