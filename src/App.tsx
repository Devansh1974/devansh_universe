import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UniverseGraph } from './components/UniverseGraph';
import { PreviewOverlay } from './components/PreviewOverlay';
import { ProjectsWorld } from './worlds/ProjectsWorld';
import { WritingWorld } from './worlds/WritingWorld';
import { ShayariWorld } from './worlds/ShayariWorld';
import { CommunityWorld } from './worlds/CommunityWorld';
import { ExperienceWorld } from './worlds/ExperienceWorld';
import { SkillsWorld } from './worlds/SkillsWorld';
import { FutureWorld } from './worlds/FutureWorld';
import { universeNodes } from './data/universe';
import type { UniverseNode } from './data/universe';

function App() {
  const [selectedNode, setSelectedNode] = useState<UniverseNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<UniverseNode | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('Initializing Digital Universe...');
  const [scrollY, setScrollY] = useState(0);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (!showSplash) return;
    const steps = [
      { t: 550, text: 'Calibrating Neural Synapses...' },
      { t: 1100, text: 'Mapping Star Constellations...' },
      { t: 1700, text: 'Opening Portal Gateways...' },
      { t: 2300, text: 'Synchronizing Dimensions...' },
      { t: 2750, text: 'Welcome to Devansh\'s Universe.' }
    ];
    const timers = steps.map(step => 
      setTimeout(() => setLoadingMsg(step.text), step.t)
    );
    return () => timers.forEach(clearTimeout);
  }, [showSplash]);

  // Track scroll position for progress tracker
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when a world or splash screen is open
  useEffect(() => {
    if (selectedNode || showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedNode, showSplash]);


  // Direct navigation from top HUD
  const handleDirectNavigate = (groupId: string) => {
    const node = universeNodes.find((n) => n.id === groupId);
    if (node) {
      handleNodeClick(node);
    }
  };

  const handleNodeClick = (node: UniverseNode) => {
    if (node.id === 'devansh') {
      if (graphRef.current) {
        if (window.innerWidth < 768) {
          graphRef.current.cameraPosition({ x: 0, y: 0, z: 350 }, { x: 0, y: 0, z: 0 }, 1200);
        } else {
          graphRef.current.cameraPosition({ x: 0, y: 0, z: 400 }, { x: 0, y: 0, z: 0 }, 1200);
        }
      }
      return;
    }

    if (node.id === 'connect') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSelectedNode(node);
  };

  const handleBackToGalaxy = () => {
    setSelectedNode(null);
    
    if (graphRef.current) {
      setTimeout(() => {
        if (window.innerWidth < 768) {
          graphRef.current.cameraPosition(
            { x: 0, y: 0, z: 550 },
            { x: 0, y: 0, z: 0 },
            1200
          );
        } else {
          graphRef.current.cameraPosition(
            { x: 0, y: 0, z: 400 },
            { x: 0, y: 0, z: 0 },
            1200
          );
        }
      }, 100);
    }
  };

  const renderActiveWorld = () => {
    if (!selectedNode) return null;

    const group = selectedNode.group;

    switch (group) {
      case 'projects':
        return <ProjectsWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'writing':
        return <WritingWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'shayari':
        return <ShayariWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'community':
        return <CommunityWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'experience':
        return <ExperienceWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'skills':
        return <SkillsWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      case 'future':
        return <FutureWorld onBack={handleBackToGalaxy} selectedNode={selectedNode} />;
      default:
        return null;
    }
  };

  const hudCategories = [
    { id: 'projects', label: 'Projects', color: '#38bdf8' },
    { id: 'writing', label: 'Writing & Research', color: '#fb923c' },
    { id: 'future', label: 'Future', color: '#f43f5e' },
    { id: 'connect', label: 'Connect', color: '#f472b6' },
    { id: 'experience', label: 'Experience', color: '#818cf8' },
    { id: 'skills', label: 'Skills', color: '#34d399' },
    { id: 'community', label: 'Public Speaker', color: '#c5a880' },
    { id: 'shayari', label: 'Shayari', color: '#d97706' }
  ];

  return (
    <div style={{
      ...appContainerStyle,
      overflowY: selectedNode || showSplash ? 'hidden' : 'visible'
    }}>
      {/* Cinematic Landing Splash */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={splashScreenStyle}
          >
            {/* Brain background with slow scale zoom */}
            <motion.div
              initial={{ opacity: 0.12, scale: 0.98 }}
              animate={{ opacity: 0.22, scale: 1.04 }}
              transition={{ duration: 3.2, ease: 'easeOut' }}
              style={splashBrainBgStyle}
            />
            {/* Radial glow pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.35, 0.15, 0.3], scale: [0.6, 1.2, 1, 1.1] }}
              transition={{ duration: 2.8, ease: 'easeOut', times: [0, 0.4, 0.7, 1] }}
              style={splashGlowStyle}
            />

            <div style={splashContentStyle}>
              {/* Profile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.9, ease: 'easeOut' }}
                style={splashPhotoStyle}
              >
                <img
                  src="/devansh_photo.png"
                  alt="Devansh Singh"
                  style={splashPhotoImgStyle}
                />
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                  style={splashPhotoRingStyle}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                style={splashTagStyle}
              >
                WELCOME TO THE UNIVERSE OF
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.9, ease: 'easeOut' }}
                style={splashTitleStyle}
              >
                DEVANSH SINGH
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                style={splashSubStyle}
              >
                Builder · Researcher · Writer · Dreamer
              </motion.p>

              {/* Loading bar & Dynamic message logs */}
              <motion.div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 2.1, ease: 'easeInOut' }}
                  onAnimationComplete={() => {
                    setTimeout(() => setShowSplash(false), 400);
                  }}
                  style={splashLoaderStyle}
                />
                <motion.span
                  key={loadingMsg}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.68rem',
                    color: '#38bdf8',
                    opacity: 0.75,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginTop: '4px'
                  }}
                >
                  {loadingMsg}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D/2D Galaxy Canvas Graph (Always fixed in background) */}
      <UniverseGraph
        graphRef={graphRef}
        hoveredNode={hoveredNode}
        onNodeClick={handleNodeClick}
        onNodeHover={setHoveredNode}
      />

      {/* Galaxy UI HUD Overlays */}
      <AnimatePresence>
        {!selectedNode && !showSplash && (
          <>
            {/* Top Navigation HUD */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={headerStyle}
            >
              <div style={logoContainerStyle}>
                <h1 style={logoStyle}>DEVANSH</h1>
                <span style={subLogoStyle} className="sub-logo-mobile">LIVING DIGITAL UNIVERSE</span>
              </div>

              <nav style={navStyle}>
                {hudCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleDirectNavigate(cat.id)}
                    style={{
                      ...navBadgeStyle,
                      borderColor: `${cat.color}22`,
                      color: cat.color
                    }}
                    onMouseEnter={() => {
                      const node = universeNodes.find((n) => n.id === cat.id);
                      if (node) setHoveredNode(node);
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </motion.header>

            {/* Bottom Preview Overlay Card */}
            <PreviewOverlay node={hoveredNode} />

            {/* Floating Social Icons Dock */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="floating-social-dock-mobile"
              style={{
                ...floatingSocialDockStyle,
                opacity: scrollY >= (window.innerHeight * 1.4) ? 0 : 1,
                pointerEvents: scrollY >= (window.innerHeight * 1.4) ? 'none' : 'auto',
                transition: 'opacity 0.3s ease'
              }}
            >
              {[
                { href: 'https://instagram.com/devansh_raghuvanshi', label: 'Instagram', color: '#e1306c', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                )},
                { href: 'https://github.com/Devansh1974', label: 'GitHub', color: '#ffffff', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                )},
                { href: 'https://leetcode.com/u/devanshsingh1974/', label: 'LeetCode', color: '#ffa116', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.480 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
                )},
                { href: 'https://medium.com/@devanshsingh1974', label: 'Medium', color: '#00ab6c', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                )},
                { href: 'https://x.com/devansh_s19', label: 'X.com', color: '#e7e9ea', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                )},
                { href: 'https://www.linkedin.com/in/devanshsingh2006/', label: 'LinkedIn', color: '#0a66c2', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )}
              ].map(({ href, label, color, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{ ...floatingSocialLinkStyle, color }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${color}22`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.15) translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================================
          Homepage 3-Section Scroll (only when no world/splash active)
      ===================================================================== */}
      {!selectedNode && !showSplash && (
        <div style={homeScrollWrapperStyle}>

          {/* ── Scroll Progress Tracker (right edge) ── */}
          <div style={scrollTrackerStyle}>
            {['Galaxy', 'About', 'Contact'].map((label, idx) => (
              <button
                key={label}
                title={label}
                onClick={() => {
                  if (idx === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (idx === 1) document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                  if (idx === 2) document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  ...scrollDotStyle,
                  background: idx === 0
                    ? scrollY < window.innerHeight * 0.5
                      ? 'rgba(56,189,248,0.9)'
                      : 'rgba(255,255,255,0.25)'
                    : idx === 1
                      ? scrollY >= window.innerHeight * 0.5 && scrollY < window.innerHeight * 1.5
                        ? 'rgba(56,189,248,0.9)'
                        : 'rgba(255,255,255,0.25)'
                      : scrollY >= window.innerHeight * 1.5
                        ? 'rgba(56,189,248,0.9)'
                        : 'rgba(255,255,255,0.25)'
                }}
              />
            ))}
          </div>

          {/* ── Section 0: Transparent viewport spacer (galaxy view) ── */}
          <div style={graphSpacerStyle} />

          {/* ── Section 1: About Me + Stats ── */}
          <div id="about-section" style={aboutSectionStyle}>
            {/* Ambient bg glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(56,189,248,0.05) 0%, rgba(99,102,241,0.04) 50%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            <div style={aboutContentStyle}>
              {/* Big hero quote */}
              <div style={heroQuoteWrapStyle}>
                <div style={heroQuoteLineStyle} />
                <p style={heroQuoteStyle}>"I will always try one more time"</p>
                <div style={heroQuoteLineStyle} />
              </div>

              {/* Who I am */}
              <div style={aboutBioBoxStyle}>
                <span style={aboutBioTagStyle}>HELLO, I'M DEVANSH SINGH</span>
                <h1 style={aboutBioTitleStyle}>Full-Stack Developer & SDE Intern</h1>
                <p style={aboutBioDescStyle}>
                  Building scalable web applications with the MERN stack and Next.js. Currently SDE Intern at AIRIZZ and Secretary of the Microsoft Azure Developer Community at Alliance University. 1st Place winner at Code Sangram Hackathon out of 100+ teams.
                </p>
                <p style={aboutBioDescStyle}>
                  I bridge complex backend systems with intuitive user experiences — from AI-integrated platforms and REST APIs to responsive UIs and CI/CD pipelines. Select any galaxy node above to explore my world.
                </p>
              </div>

              {/* Stats Grid */}
              <div style={statsGridStyle}>
                {[
                  { number: '4000+', label: 'GitHub Contributions', icon: '💻', color: '#38bdf8' },
                  { number: '180+', label: 'LeetCode Problems Solved', icon: '🧩', color: '#ffa116' },
                  { number: '7+', label: 'Full-Stack Apps Deployed', icon: '🚀', color: '#34d399' },
                  { number: '1st Place', label: 'Code Sangram Hackathon (100+ Teams)', icon: '🏆', color: '#f59e0b' },
                  { number: '300+', label: 'Students Impacted via Azure Community', icon: '🎓', color: '#a78bfa' },
                  { number: '9+', label: 'Internships & Work Experiences', icon: '💼', color: '#818cf8' },
                  { number: '500+', label: 'Social Media Reach', icon: '📱', color: '#e1306c' },
                  { number: 'Medium', label: 'Technical Article Writer', icon: '✍️', color: '#fb923c' },
                ].map((stat, i) => (
                  <div key={i} className="stat-card-anim" style={{ ...statCardStyle, animationDelay: `${i * 0.07}s` }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{ ...statNumberStyle, color: stat.color }}>{stat.number}</div>
                    <div style={statLabelStyle}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div style={certsBoxStyle}>
                <h3 style={certsTitleStyle}>CERTIFICATIONS</h3>
                <div style={certsGridStyle}>
                  {[
                    { name: 'Financial Markets', issuer: 'Yale University', icon: '🎓' },
                    { name: 'Gen AI: Beyond the Chatbot', issuer: 'Google', icon: '🤖' },
                    { name: 'Data Analytics Job Simulation', issuer: 'Deloitte', icon: '📊' },
                    { name: 'The Power of Team Culture', issuer: 'Leadership', icon: '🤝' },
                  ].map((cert, i) => (
                    <div key={i} style={certCardStyle}>
                      <span style={{ fontSize: '1.4rem' }}>{cert.icon}</span>
                      <div>
                        <div style={certNameStyle}>{cert.name}</div>
                        <div style={certIssuerStyle}>{cert.issuer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 2: Contact Me ── */}
          <div id="contact-section" style={contactSectionStyle}>
            {/* Ambient bg */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, rgba(56,189,248,0.03) 50%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            <div style={contactContentStyle}>
              <div style={contactHeaderStyle}>
                <span style={contactTagStyle}>GET IN TOUCH</span>
                <h2 style={contactTitleStyle}>Let's Build Something Together</h2>
                <p style={contactSubStyle}>Open to internships, collaborations, and full-time opportunities.</p>
              </div>

              <div style={{ ...contactBodyStyle, justifyContent: 'center' }}>
                {/* Contact form (centered, no duplicate social list) */}
                <div style={{ ...contactFormColStyle, flex: '1 1 100%', maxWidth: '640px', margin: '0 auto' }}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name') || '';
                      const email = formData.get('email') || '';
                      const message = formData.get('message') || '';
                      window.location.href = `mailto:devanshsingh1974@gmail.com?subject=Connect request from ${name} (${email})&body=${encodeURIComponent(String(message))}`;
                    }}
                    style={formStyle}
                  >
                    <h3 style={formHeaderStyle}>Send a Direct Message</h3>
                    <input type="text" name="name" placeholder="Your Name" required style={formInputStyle} />
                    <input type="email" name="email" placeholder="Your Email" required style={formInputStyle} />
                    <textarea name="message" placeholder="Write your message here..." required rows={5} style={formTextareaStyle} />
                    <button type="submit" style={formSubmitBtnStyle}>Send Message →</button>
                    <p style={directMailSubStyle}>
                      Or email directly: <a href="mailto:devanshsingh1974@gmail.com" style={directMailLinkStyle}>devanshsingh1974@gmail.com</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={footerStyle}>
              <span>© 2025 Devansh Singh · Living Digital Universe · Made with ❤️ in Bengaluru</span>
            </div>
          </div>

        </div>
      )}

      {/* World Portals Details Router */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key="world-portal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={worldOverlayStyle}
          >
            {renderActiveWorld()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// App Layout Styles
const appContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  background: '#050508'
};

const splashScreenStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: '#030306',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
};

const splashBrainBgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: 'url(/neural_brain.png)',
  backgroundSize: '70%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 0.08,
  pointerEvents: 'none'
};

const splashGlowStyle: React.CSSProperties = {
  position: 'absolute',
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(99,102,241,0.1) 50%, transparent 75%)',
  pointerEvents: 'none'
};

const splashContentStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  maxWidth: '420px',
  width: '88%',
  zIndex: 2
};

const splashPhotoStyle: React.CSSProperties = {
  position: 'relative',
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  overflow: 'hidden',
  marginBottom: '0.5rem',
  flexShrink: 0,
  background: 'radial-gradient(circle, #0f172a 0%, #030306 100%)'
};

const splashPhotoImgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 15%',
  zIndex: 1
};

const splashPhotoRingStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  border: '2px solid rgba(56,189,248,0.6)',
  boxShadow: '0 0 20px rgba(56,189,248,0.3)'
};

const splashTagStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.68rem',
  fontWeight: 700,
  color: 'rgba(255, 255, 255, 0.35)',
  letterSpacing: '0.22em',
  margin: '0.5rem 0 0 0'
};

const splashTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '2.6rem',
  fontWeight: 900,
  color: '#ffffff',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  margin: '0.2rem 0'
};

const splashSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.82rem',
  color: 'rgba(56,189,248,0.7)',
  letterSpacing: '0.08em',
  margin: '0.2rem 0'
};

const splashLoaderStyle: React.CSSProperties = {
  width: '100%',
  height: '2px',
  background: 'linear-gradient(to right, #38bdf8, #6366f1)',
  transformOrigin: 'left'
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 100,
  padding: '1rem 1.25rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(to bottom, rgba(5, 5, 8, 0.95) 20%, transparent)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  pointerEvents: 'none',
  flexWrap: 'nowrap',
  gap: '0.75rem'
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'auto'
};

const logoStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  color: '#ffffff',
  lineHeight: '1'
};

const subLogoStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.6rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: 'rgba(255, 255, 255, 0.4)',
  marginTop: '0.35rem'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.4rem',
  pointerEvents: 'auto',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  maxWidth: 'calc(100vw - 160px)',
  paddingBottom: '2px'
};

const navBadgeStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid',
  padding: '0.28rem 0.6rem',
  borderRadius: '9999px',
  fontSize: '0.7rem',
  fontWeight: 600,
  fontFamily: 'var(--font-sans)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0
};

const floatingSocialDockStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '1.5rem',
  left: '1.25rem',
  zIndex: 100,
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column'
};

const floatingSocialLinkStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
};

// ─────────────────────────────────────────────────────────────────
// Scroll Layers Styles
// ─────────────────────────────────────────────────────────────────
const homeScrollWrapperStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  minHeight: '300vh',
  zIndex: 5,
  pointerEvents: 'none'
};

const graphSpacerStyle: React.CSSProperties = {
  height: '100vh',
  width: '100%',
  pointerEvents: 'none'
};

// Right-edge scroll progress tracker
const scrollTrackerStyle: React.CSSProperties = {
  position: 'fixed',
  right: '18px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 200,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  pointerEvents: 'auto'
};

const scrollDotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: 0
};

// ─── About Section ────────────────────────────────────────────────
const aboutSectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'rgba(5,5,8,0.97)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderTop: '1px solid rgba(56,189,248,0.08)',
  position: 'relative',
  zIndex: 10,
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center'
};

const aboutContentStyle: React.CSSProperties = {
  maxWidth: '1100px',
  width: '100%',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) 4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem'
};

// Big hero quote
const heroQuoteWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  width: '100%'
};

const heroQuoteLineStyle: React.CSSProperties = {
  flex: 1,
  height: '1px',
  background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.3), transparent)'
};

const heroQuoteStyle: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
  fontWeight: 400,
  fontStyle: 'italic',
  color: 'rgba(255,255,255,0.88)',
  textAlign: 'center',
  letterSpacing: '-0.01em',
  lineHeight: 1.4,
  flexShrink: 1,
  textShadow: '0 0 40px rgba(56,189,248,0.2)',
  padding: '0 0.5rem'
};


// About bio block
const aboutBioBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  textAlign: 'center',
  alignItems: 'center'
};

const aboutBioTagStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: 'rgba(56,189,248,0.7)',
  fontFamily: 'Inter, sans-serif'
};

const aboutBioTitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
  fontWeight: 800,
  color: '#ffffff',
  lineHeight: 1.15,
  letterSpacing: '-0.025em'
};

const aboutBioDescStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
  lineHeight: 1.7,
  color: '#9ca3af',
  maxWidth: '720px'
};

// Stats grid
const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1rem'
};

const statCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
  padding: '1.5rem 1.25rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '0.25rem',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  transition: 'border-color 0.3s ease, transform 0.3s ease',
  opacity: 0
};

const statNumberStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: '-0.02em'
};

const statLabelStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.78rem',
  color: 'rgba(255,255,255,0.5)',
  lineHeight: 1.4,
  marginTop: '0.25rem'
};

// Certifications
const certsBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const certsTitleStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  color: 'rgba(255,255,255,0.4)',
  fontFamily: 'Inter, sans-serif',
  textAlign: 'center'
};

const certsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '0.75rem'
};

const certCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '12px',
  padding: '1rem 1.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const certNameStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#e2e8f0'
};

const certIssuerStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.72rem',
  color: 'rgba(255,255,255,0.4)',
  marginTop: '2px'
};

// ─── Contact Section ──────────────────────────────────────────────
const contactSectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'rgba(5,5,8,0.98)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderTop: '1px solid rgba(99,102,241,0.08)',
  position: 'relative',
  zIndex: 10,
  pointerEvents: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const contactContentStyle: React.CSSProperties = {
  maxWidth: '1100px',
  width: '100%',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
  flex: 1
};

const contactHeaderStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'center'
};

const contactTagStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: 'rgba(99,102,241,0.7)',
  fontFamily: 'Inter, sans-serif'
};

const contactTitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
  fontWeight: 800,
  color: '#ffffff',
  letterSpacing: '-0.02em'
};

const contactSubStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  color: 'rgba(255,255,255,0.45)',
  lineHeight: 1.6
};

const contactBodyStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2.5rem',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

const contactLeftStyle: React.CSSProperties = {
  flex: '1 1 280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const socialsColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem'
};

const socialRowLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.65rem 1rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px',
  textDecoration: 'none',
  transition: 'all 0.2s ease'
};

const contactFormColStyle: React.CSSProperties = {
  flex: '1 1 340px'
};

const connectHubTitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: 'rgba(255, 255, 255, 0.4)',
  fontFamily: 'var(--font-mono)'
};

// Form styles (kept from before)
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '20px',
  padding: '2rem',
  width: '100%'
};

const formHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '0.5rem'
};

const formInputStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '10px',
  padding: '0.75rem 1.25rem',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.2s ease'
};

const formTextareaStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '10px',
  padding: '0.75rem 1.25rem',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  resize: 'none',
  transition: 'border-color 0.2s ease'
};

const formSubmitBtnStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
  border: 'none',
  borderRadius: '10px',
  padding: '0.9rem 1.5rem',
  color: '#ffffff',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  letterSpacing: '0.02em'
};

const directMailSubStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#6b7280',
  textAlign: 'center',
  marginTop: '0.25rem'
};

const directMailLinkStyle: React.CSSProperties = {
  color: '#38bdf8',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(56,189,248,0.25)'
};

// Footer
const footerStyle: React.CSSProperties = {
  width: '100%',
  borderTop: '1px solid rgba(255,255,255,0.05)',
  padding: '1.25rem 2rem',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  color: 'rgba(255,255,255,0.25)',
  letterSpacing: '0.05em'
};

const worldOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 50,
  overflowY: 'auto'
};

// ─── Unused styles kept for reference ─────────────────────────────
const socialsRowStyle: React.CSSProperties = { display: 'none' };
const socialBtnStyle: React.CSSProperties = { display: 'none' };
const sectionTagStyle: React.CSSProperties = { display: 'none' };
const introRowStyle: React.CSSProperties = { display: 'none' };
const introLeftColStyle: React.CSSProperties = { display: 'none' };
const introRightColStyle: React.CSSProperties = { display: 'none' };
const introTitleStyle: React.CSSProperties = { display: 'none' };
const introDescStyle: React.CSSProperties = { display: 'none' };
const connectHubStyle: React.CSSProperties = { display: 'none' };
const contentContainerStyle: React.CSSProperties = { display: 'none' };
const bioOverlayStyle: React.CSSProperties = { display: 'none' };

export default App;
