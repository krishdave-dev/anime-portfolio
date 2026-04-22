import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * MangaTransition
 * A thick comic-book chapter break with sweep line and chapter label.
 */
const MangaTransition = ({ chapter, label, color = '#7c3aed' }) => {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 88%', once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{
      position: 'relative',
      height: '90px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#040408',
      overflow: 'hidden',
    }}>
      {/* Full-width sweep line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          height: '1px',
          width: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
          transformOrigin: 'left',
          opacity: 0,
        }}
      />

      {/* Dots flanking label */}
      {[-240, -160, -80, 80, 160, 240].map((x, i) => (
        <motion.div
          key={x}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: Math.abs(x) > 160 ? 0.2 : 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.05 }}
          style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            width: Math.abs(x) > 160 ? '3px' : '4px',
            height: Math.abs(x) > 160 ? '3px' : '4px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}

      {/* Centre label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', gap: '1rem',
          padding: '0.35rem 1.5rem',
          background: '#040408',
          border: `1px solid ${color}30`,
          clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        }}
      >
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '10px', letterSpacing: '0.6em',
          color: `${color}80`,
        }}>
          CHAPTER {chapter}
        </span>
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '13px', letterSpacing: '0.35em',
          color: `${color}cc`,
        }}>
          {label}
        </span>
      </motion.div>
    </div>
  );
};

export default MangaTransition;
