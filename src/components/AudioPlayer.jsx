import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const AudioPlayer = () => {
  const baseBars = useMemo(() => Array(10).fill(0.2), []);
  const audioRef    = useRef(null);
  const [playing,   setPlaying]   = useState(false);
  const [volume,    setVolume]    = useState(0.2);
  const [bars,      setBars]      = useState(baseBars);
  const animRef     = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.2;
    audio.loop   = true;

    return () => {
      clearTimeout(animRef.current);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (playing) {
      const tick = () => {
        setBars(prev => prev.map(() => 0.15 + Math.random() * 0.85));
        animRef.current = setTimeout(tick, 140);
      };
      animRef.current = setTimeout(tick, 140);
    } else {
      clearTimeout(animRef.current);
      setBars(baseBars);
    }
    return () => clearTimeout(animRef.current);
  }, [playing, baseBars]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else {
      try { await audio.play(); setPlaying(true); }
      catch (e) { console.log('Audio blocked:', e); }
    }
  }, [playing]);

  const onVol = useCallback((e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
    }}>
      <audio ref={audioRef} src="/assets/aizo.mp3" preload="auto" />

      {/* Waveform bars */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '2px',
        height: '28px', opacity: playing ? 1 : 0.35,
        transition: 'opacity 0.4s',
      }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            width: '3px',
            height: `${h * 28}px`,
            background: `hsl(${265 + i * 10}, 75%, 62%)`,
            borderRadius: '2px',
            transition: 'height 0.09s ease',
          }} />
        ))}
      </div>

      {/* Seal button */}
      <button
        id="audio-toggle-btn"
        onClick={toggle}
        title={playing ? 'Pause' : 'Play King Gnu — AIZO'}
        style={{
          width: '56px', height: '56px',
          background: playing
            ? 'radial-gradient(circle, rgba(124,58,237,0.9), rgba(74,14,143,0.95))'
            : 'radial-gradient(circle, rgba(13,8,32,0.92), rgba(74,14,143,0.5))',
          border: `2px solid ${playing ? '#7c3aed' : 'rgba(124,58,237,0.35)'}`,
          borderRadius: '50%',
          cursor: 'none',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.35s ease',
          boxShadow: playing
            ? '0 0 24px rgba(124,58,237,0.8), 0 0 48px rgba(124,58,237,0.3)'
            : '0 0 10px rgba(124,58,237,0.25)',
        }}
      >
        {/* Rotating rings */}
        <svg viewBox="0 0 72 72" style={{
          position: 'absolute', inset: '-8px', width: '72px', height: '72px',
          animation: playing ? 'spin 5s linear infinite' : 'none',
          pointerEvents: 'none',
        }}>
          <circle cx="36" cy="36" r="34" fill="none"
            stroke="rgba(124,58,237,0.4)" strokeWidth="0.8" strokeDasharray="5 4" />
        </svg>
        <svg viewBox="0 0 88 88" style={{
          position: 'absolute', inset: '-16px', width: '88px', height: '88px',
          animation: playing ? 'spin-reverse 8s linear infinite' : 'none',
          pointerEvents: 'none',
        }}>
          <circle cx="44" cy="44" r="42" fill="none"
            stroke="rgba(96,165,250,0.25)" strokeWidth="0.6" strokeDasharray="8 6" />
        </svg>

        {/* Icon */}
        <span style={{ position: 'relative', zIndex: 1, color: 'white', display: 'flex' }}>
          {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
        </span>
      </button>

      {/* Track name */}
      <span style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '9px', letterSpacing: '0.18em',
        color: 'rgba(148,163,184,0.55)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        KING GNU — AIZO
      </span>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {volume === 0 ? <VolumeX size={11} color="rgba(148,163,184,0.5)" /> : <Volume2 size={11} color="rgba(148,163,184,0.5)" />}
        <input
          type="range" min="0" max="1" step="0.02"
          value={volume} onChange={onVol}
          style={{ width: '50px', accentColor: '#7c3aed', cursor: 'none' }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
