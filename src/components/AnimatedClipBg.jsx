import React, { useState, useEffect, useRef } from 'react';
import { CLIP_PATHS } from '../clipPaths';

/**
 * AnimatedClipBg
 * Cycles through the extracted JJK WebP clips as a full-screen background.
 * Each clip auto-advances; blend uses opacity cross-fade.
 */
const AnimatedClipBg = ({
  opacity = 0.18,
  blendMode = 'screen',
  cycleMs = 4000,
  style = {},
}) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    if (CLIP_PATHS.length < 2) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % CLIP_PATHS.length;
      });
      setFading(true);
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => setFading(false), 700);
    }, cycleMs);
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [cycleMs]);

  const imgStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    mixBlendMode: blendMode,
    animation: 'zoomGif 8s ease-in-out infinite',
    imageRendering: 'auto',
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Current clip */}
      {CLIP_PATHS[current] && (
        <img
          key={`cur-${current}`}
          src={CLIP_PATHS[current]}
          alt=""
          aria-hidden="true"
          style={{
            ...imgStyle,
            opacity: opacity,
            transition: 'opacity 0.7s ease',
          }}
        />
      )}
      {/* Fading-out previous clip */}
      {prev !== null && fading && CLIP_PATHS[prev] && (
        <img
          key={`prev-${prev}`}
          src={CLIP_PATHS[prev]}
          alt=""
          aria-hidden="true"
          style={{
            ...imgStyle,
            opacity: 0,
            transition: 'opacity 0.7s ease',
          }}
        />
      )}

      {/* Purple color overlay to tint the clips */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(74,14,143,0.25) 0%, rgba(37,99,235,0.15) 100%)',
          mixBlendMode: 'color',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default AnimatedClipBg;
