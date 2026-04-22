import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return undefined;

    let rafId;
    const interactiveSelector = 'a,button,[data-cursor]';

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const animate = () => {
      followPos.current.x += (pos.current.x - followPos.current.x) * 0.1;
      followPos.current.y += (pos.current.y - followPos.current.y) * 0.1;
      follower.style.transform = `translate(${followPos.current.x - 20}px, ${followPos.current.y - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('follower--hover');
    };
    const onLeaveLink = () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('follower--hover');
    };

    const onHoverStart = (e) => {
      if (e.target.closest(interactiveSelector)) onEnterLink();
    };

    const onHoverEnd = (e) => {
      if (e.target.closest(interactiveSelector)) onLeaveLink();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    rafId = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          background: #7c3aed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          top: 0; left: 0;
          mix-blend-mode: difference;
          transition: width 0.2s, height 0.2s, background 0.2s;
          box-shadow: 0 0 10px rgba(124,58,237,0.8);
        }
        .cursor--hover {
          width: 20px;
          height: 20px;
          background: #f472b6;
        }
        .cursor-follower {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(124,58,237,0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          top: 0; left: 0;
          transition: border-color 0.3s;
        }
        .follower--hover {
          border-color: rgba(244,114,182,0.8);
          transform: scale(1.5) !important;
        }
        @media(max-width:768px) { .cursor, .cursor-follower { display: none; } }
      `}</style>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
};

export default CustomCursor;
