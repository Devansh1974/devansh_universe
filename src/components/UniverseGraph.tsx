import React, { useEffect, useRef, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { universeNodes, universeLinks } from '../data/universe';
import type { UniverseNode } from '../data/universe';

interface UniverseGraphProps {
  onNodeHover: (node: UniverseNode | null) => void;
  onNodeClick: (node: UniverseNode) => void;
  hoveredNode: UniverseNode | null;
  graphRef: React.MutableRefObject<any>;
}

// Emoji mapping for each section
const NODE_EMOJI: Record<string, string> = {
  projects: '🚀',
  research: '🔬',
  writing: '✍️',
  future: '🌟',
  experience: '💼',
  skills: '⚡',
  shayari: '📖',
  community: '🎤',
  connect: '✉️',
  devansh: '👤'
};

// Node accent colors
const NODE_COLOR: Record<string, string> = {
  projects: '#38bdf8',
  research: '#a78bfa',
  writing: '#fb923c',
  future: '#f43f5e',
  experience: '#818cf8',
  skills: '#34d399',
  shayari: '#fbbf24',
  community: '#c5a880',
  connect: '#f472b6'
};

const LEFT_NODES = ['projects', 'writing', 'future', 'connect'];
const RIGHT_NODES = ['experience', 'skills', 'community', 'shayari'];

const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  future: { x: -110, y: -105 },
  projects: { x: -38, y: -105 },
  skills: { x: 38, y: -105 },
  community: { x: 110, y: -105 },
  connect: { x: -110, y: 125 },
  writing: { x: -38, y: 125 },
  shayari: { x: 38, y: 125 },
  experience: { x: 110, y: 125 }
};

export const UniverseGraph: React.FC<UniverseGraphProps> = ({
  onNodeHover,
  onNodeClick,
  hoveredNode,
  graphRef
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredNodeRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Node positions: wider L/R spread, more vertical spacing — Z always 0
  const visibleNodes = useMemo(() => {
    const leftYPos  = [-115, -45, 45, 115];
    const rightYPos = [-115, -45, 45, 115];
    let li = 0, ri = 0;
    return universeNodes
      .filter(n => n.level <= 1)
      .map(node => {
        if (node.id === 'devansh') {
          return { ...node, fx: 0, fy: 0, fz: 0, x: 0, y: 0, z: 0, vz: 0 };
        }
        if (isMobile && MOBILE_POSITIONS[node.id]) {
          const pos = MOBILE_POSITIONS[node.id];
          return { ...node, x: pos.x, y: pos.y, z: 0, fz: 0, vz: 0 };
        }
        if (LEFT_NODES.includes(node.id)) {
          const y = leftYPos[li++] ?? 0;
          return { ...node, x: -240, y, z: 0, fz: 0, vz: 0 };
        }
        if (RIGHT_NODES.includes(node.id)) {
          const y = rightYPos[ri++] ?? 0;
          return { ...node, x: 240, y, z: 0, fz: 0, vz: 0 };
        }
        return { ...node, z: 0, fz: 0, vz: 0 };
      });
  }, [isMobile]);


  const visibleLinks = useMemo(() => {
    const cats = [...LEFT_NODES, ...RIGHT_NODES];
    return universeLinks
      .filter(l => {
        const s = typeof l.source === 'object' ? (l.source as any).id : l.source;
        const t = typeof l.target === 'object' ? (l.target as any).id : l.target;
        return (s === 'devansh' && cats.includes(t)) || (t === 'devansh' && cats.includes(s));
      })
      .map(l => ({ ...l }));
  }, []);

  // Side force: pull nodes to their columns with wave motion
  const makeSideForce = () => {
    let nodes: any[] = [];
    const force = (alpha: number) => {
      const t = Date.now() * 0.0007;
      for (const node of nodes) {
        if (node.id === 'devansh') continue;
        if (hoveredNodeRef.current?.id === node.id) continue;
        
        let baseX = 0;
        let baseY = 0;
        let idx = 0;
        
        if (isMobile) {
          if (MOBILE_POSITIONS[node.id]) {
            baseX = MOBILE_POSITIONS[node.id].x;
            baseY = MOBILE_POSITIONS[node.id].y;
            idx = Object.keys(MOBILE_POSITIONS).indexOf(node.id);
          }
        } else {
          const isLeft = LEFT_NODES.includes(node.id);
          baseX = isLeft ? -240 : 240;
          idx = isLeft ? LEFT_NODES.indexOf(node.id) : RIGHT_NODES.indexOf(node.id);
          baseY = [-115, -45, 45, 115][idx] ?? 0;
        }

        // Small gentle wave — XY only, NO Z movement to avoid perspective size changes
        const wX = Math.sin(t + idx * 1.9) * (isMobile ? 3 : 10);
        const wY = Math.cos(t * 0.65 + idx * 1.7) * (isMobile ? 4 : 16);
        node.vx += (baseX + wX - node.x) * 0.14 * alpha;
        node.vy += (baseY + wY - node.y) * 0.14 * alpha;
        // Strongly pin Z to 0 — prevents perspective size inconsistency as camera rotates
        node.vz += (0 - (node.z || 0)) * 0.5 * alpha;
        node.z = (node.z || 0) * 0.85; // damp Z drift quickly
      }

    };
    force.initialize = (_nodes: any[]) => { nodes = _nodes; };
    return force;
  };

  useEffect(() => {
    if (!graphRef.current) return;
    graphRef.current.d3Force('side', makeSideForce());
    if (isMobile) {
      graphRef.current.d3Force('charge')?.strength(-50);
      graphRef.current.d3Force('link')?.distance(90);
    } else {
      graphRef.current.d3Force('charge')?.strength(-120);
      graphRef.current.d3Force('link')?.distance(170);
    }
  }, [isMobile, visibleNodes]);

  // Subtle camera oscillation/sway for 3D depth effect without full 360-degree rotation
  useEffect(() => {
    const dist = isMobile ? 550 : 430;
    const anim = () => {
      if (graphRef.current) {
        const t = Date.now() * 0.00045;
        const angleX = isMobile ? Math.sin(t) * 0.03 : Math.sin(t) * 0.065;
        const angleY = isMobile ? Math.cos(t * 0.72) * 0.015 : Math.cos(t * 0.72) * 0.035;
        graphRef.current.cameraPosition({
          x: dist * Math.sin(angleX),
          y: (isMobile ? 12 : 18) + dist * Math.sin(angleY),
          z: dist * Math.cos(angleX)
        });
      }
      animFrameRef.current = requestAnimationFrame(anim);
    };
    animFrameRef.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isMobile]);

  // Redirect wheel scroll to page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();
      window.scrollBy({ top: e.deltaY });
    };
    el.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => el.removeEventListener('wheel', onWheel, { capture: true });
  }, []);

  const handleNodeHover = (node: any) => {
    if (hoveredNodeRef.current?.id !== 'devansh') {
      if (hoveredNodeRef.current) {
        hoveredNodeRef.current.fx = undefined;
        hoveredNodeRef.current.fy = undefined;
        hoveredNodeRef.current.fz = 0; // Lock Z back to 0
      }
    }
    if (node && node.id !== 'devansh') {
      node.fx = node.x;
      node.fy = node.y;
      node.fz = 0; // Keep Z locked to 0 during hover
    }
    hoveredNodeRef.current = node;
    onNodeHover(node);
  };

  const getState = (node: any) => {
    if (!hoveredNode) return { hovered: false, dimmed: false };
    return {
      hovered: node.id === hoveredNode.id,
      dimmed: node.id !== hoveredNode.id && node.id !== 'devansh' && hoveredNode.id !== 'devansh'
    };
  };

  // 3D: emoji + label sprite — fixed consistent canvas size for all nodes
  const nodeThreeObject = (node: any) => {
    if (node.id === 'devansh') {
      const c = document.createElement('canvas');
      c.width = 1; c.height = 1;
      const tx = new THREE.CanvasTexture(c);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true, opacity: 0 }));
      sp.scale.set(1, 1, 1);
      return sp;
    }

    const { hovered, dimmed } = getState(node);
    const color = NODE_COLOR[node.id] || node.color || '#ffffff';
    const emoji = NODE_EMOJI[node.id] || '●';
    const label = node.label;

    // Fixed canvas size — SAME for all nodes (no size difference L vs R)
    const CW = 260, CH = 130;
    const c = document.createElement('canvas');
    c.width = CW;
    c.height = CH;
    const ctx = c.getContext('2d')!;

    // Glow bg
    const cx = CW / 2, cy = 52;
    const r = hovered ? 36 : 30;
    const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 3.2);
    glow.addColorStop(0, color + (hovered ? 'dd' : '88'));
    glow.addColorStop(0.4, color + '33');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 3.2, 0, Math.PI * 2);
    ctx.fill();

    // Background circle behind emoji
    ctx.fillStyle = `rgba(5,5,8,${hovered ? 0.85 : 0.7})`;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Border ring
    ctx.strokeStyle = color + (hovered ? 'ff' : 'aa');
    ctx.lineWidth = hovered ? 3 : 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Emoji (bigger)
    ctx.font = `${hovered ? 36 : 30}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = dimmed ? 0.22 : 1;
    ctx.fillText(emoji, cx, cy);

    // Label (below circle)
    ctx.font = `700 ${hovered ? 15 : 13}px Inter, sans-serif`;
    ctx.fillStyle = dimmed ? '#374151' : (hovered ? '#ffffff' : color);
    ctx.textBaseline = 'top';
    ctx.globalAlpha = dimmed ? 0.22 : 1;
    ctx.fillText(label, cx, cy + r + 6);
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    // Fixed sprite scale — identical for all nodes so L/R look the same
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: dimmed ? 0.22 : 1
    }));
    sp.scale.set(CW / 3.2, CH / 3.2, 1);
    return sp;
  };

  // 2D: emoji + label
  const nodeCanvasObject = (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isCenter = node.id === 'devansh';
    const { dimmed } = getState(node);
    const color = NODE_COLOR[node.id] || node.color || '#ffffff';
    const emoji = NODE_EMOJI[node.id] || '●';
    const label = node.label;
    const r = Math.max(12, 18 / globalScale);
    const fontSize = Math.max(6, 11 / globalScale);
    const emojiSize = Math.max(12, 20 / globalScale);

    ctx.save();
    ctx.globalAlpha = dimmed ? 0.18 : 1;

    if (!isCenter) {
      // Glow
      const glow = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, r * 3);
      glow.addColorStop(0, color + '44');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      // Bg circle
      ctx.fillStyle = 'rgba(5,5,8,0.75)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Ring
      ctx.strokeStyle = color + 'bb';
      ctx.lineWidth = 1.5 / globalScale;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.stroke();

      // Emoji
      ctx.font = `${emojiSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, node.x, node.y);

      // Label
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = dimmed ? '#374151' : color;
      ctx.textBaseline = 'top';
      ctx.fillText(label, node.x, node.y + r + 2 / globalScale);
    }
    ctx.restore();
  };

  const getLinkColor = (link: any) => {
    if (!hoveredNode) return 'rgba(56, 189, 248, 0.85)';
    const s = typeof link.source === 'object' ? link.source.id : link.source;
    const t = typeof link.target === 'object' ? link.target.id : link.target;
    return (s === hoveredNode.id || t === hoveredNode.id) ? '#38bdf8' : 'rgba(56, 189, 248, 0.12)';
  };

  const getLinkWidth = (link: any) => {
    if (!hoveredNode) return 3.2;
    const s = typeof link.source === 'object' ? link.source.id : link.source;
    const t = typeof link.target === 'object' ? link.target.id : link.target;
    return (s === hoveredNode.id || t === hoveredNode.id) ? 6.0 : 0.8;
  };

  const handleNodeClick = (node: any) => {
    if (node.id === 'devansh') return;
    if (graphRef.current) {
      const d = isMobile ? 40 : 50;
      const mag = Math.hypot(node.x, node.y, node.z || 0) || 1;
      const r = 1 + d / mag;
      graphRef.current.cameraPosition(
        { x: node.x * r, y: node.y * r, z: (node.z || 0) * r },
        node,
        isMobile ? 900 : 1200
      );
      setTimeout(() => onNodeClick(node), isMobile ? 950 : 1250);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: '#050508'
      }}
    >
      {/* Neural brain watermark */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/neural_brain.png)',
        backgroundSize: isMobile ? '92%' : '54%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Ambient glow — left side behind left nodes */}
      <div style={{
        position: 'absolute',
        left: isMobile ? '-5%' : '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: isMobile ? '200px' : '320px',
        height: isMobile ? '380px' : '580px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, rgba(99,102,241,0.04) 40%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(30px)'
      }} />

      {/* Ambient glow — right side behind right nodes */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '-5%' : '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: isMobile ? '200px' : '320px',
        height: isMobile ? '380px' : '580px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(129,140,248,0.07) 0%, rgba(244,63,94,0.03) 40%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(30px)'
      }} />

      {/* Photo overlay — centered on brain */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -58%)',
        width: isMobile ? '92px' : '128px',
        height: isMobile ? '92px' : '128px',
        borderRadius: '50%',
        overflow: 'hidden',
        zIndex: 2,
        pointerEvents: 'none',
        border: '2.5px solid rgba(56,189,248,0.6)',
        boxShadow: '0 0 0 5px rgba(56,189,248,0.08), 0 0 50px rgba(56,189,248,0.25)'
      }}>
        {/* Gradient bg behind transparent photo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, #0f172a 0%, #050508 100%)',
          zIndex: 0
        }} />
        <img
          src="/devansh_photo.png"
          alt="Devansh Singh"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            zIndex: 1
          }}
        />
        {/* Subtle vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 55%, rgba(5,5,8,0.65) 100%)',
          zIndex: 2,
          borderRadius: '50%'
        }} />
      </div>

      {/* Name below photo — bigger, no quote */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, calc(-58% + ${isMobile ? 80 : 110}px))`,
        zIndex: 3,
        pointerEvents: 'none',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: isMobile ? '0.7rem' : '0.9rem',
          fontWeight: 800,
          letterSpacing: '0.22em',
          color: 'rgba(56,189,248,0.9)',
          textShadow: '0 0 16px rgba(56,189,248,0.6)',
          display: 'block'
        }}>DEVANSH SINGH</span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '0.52rem' : '0.62rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.08em',
          display: 'block'
        }}>Full-Stack Developer · SDE Intern</span>
        <a
          href="/Devansh_Singh_Resume.pdf"
          download="Devansh_Singh_Resume.pdf"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '12px',
            padding: '5px 12px',
            borderRadius: '16px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            color: 'rgba(56, 189, 248, 0.95)',
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? '0.54rem' : '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            pointerEvents: 'auto',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(56,189,248,0.06)',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Resume</span>
        </a>
      </div>

      {/* Scroll to explore hint at bottom */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          animation: 'scrollBounce 2.2s ease-in-out infinite'
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'rgba(56,189,248,0.6)',
            textTransform: 'uppercase'
          }}>Scroll to Explore</span>
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="16" height="22" rx="8" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5"/>
            <rect x="7.5" y="5" width="3" height="5" rx="1.5" fill="rgba(56,189,248,0.7)">
              <animate attributeName="y" values="5;11;5" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
            </rect>
          </svg>
        </div>
      )}

      {/* Graph */}
      <ForceGraph3D
        ref={graphRef}
        graphData={{ nodes: visibleNodes, links: visibleLinks }}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={false}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        linkColor={getLinkColor}
        linkWidth={getLinkWidth}
        linkLabel={() => ''}
        nodeLabel={() => ''}
      />
    </div>
  );
};
