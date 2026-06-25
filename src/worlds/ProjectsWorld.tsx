import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Cpu, Database } from 'lucide-react';
import { universeNodes } from '../data/universe';
import type { UniverseNode } from '../data/universe';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectsWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const ProjectsWorld: React.FC<ProjectsWorldProps> = ({ onBack, selectedNode }) => {
  // Find all projects from the universe
  const projects = universeNodes.filter((node) => node.group === 'projects' && node.level === 2);
  
  // Set initial selected project (default to the node user clicked on, or first project)
  const initialProject = projects.find((p) => p.id === selectedNode?.id) || projects[0];
  const [activeProject, setActiveProject] = useState<UniverseNode>(initialProject);

  const content = activeProject.content || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-projects"
      style={worldStyle}
    >
      {/* Back button */}
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        {/* Left Side: Projects List */}
        <div style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>
            <h2 style={sidebarTitleStyle}>PROJECTS</h2>
            <p style={sidebarSubStyle}>Software & Pipelines</p>
          </div>
          <div style={projectListStyle} className="project-list-mobile">
            {projects.map((proj) => {
              const isActive = proj.id === activeProject.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="project-item-mobile"
                  style={{
                    ...projectItemStyle,
                    borderColor: isActive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                    background: isActive ? 'rgba(56, 189, 248, 0.06)' : 'transparent',
                    color: isActive ? '#38bdf8' : '#9ca3af'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{proj.label}</div>
                  <div style={projectDescShortStyle} className="project-desc-short-mobile">{proj.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Case Study */}
        <div style={detailAreaStyle}>
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={detailContentStyle}
          >
            {/* Header section */}
            <div style={detailHeaderStyle}>
              <span style={tagStyle}>PRODUCTION PORTAL</span>
              <h1 style={titleStyle}>{activeProject.label}</h1>
              <p style={taglineStyle}>{content.tagline}</p>
              
              {/* Tech Stack */}
              <div style={techContainerStyle}>
                {content.tech?.map((t: string) => (
                  <span key={t} style={techBadgeStyle}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Row */}
            <div style={linksRowStyle}>
              {content.github && (
                <a href={content.github} target="_blank" rel="noreferrer" style={linkBtnStyle}>
                  <GithubIcon size={16} />
                  Code Repository
                </a>
              )}
              {content.demo && (
                <a href={content.demo} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, color: '#38bdf8' }}>
                  <ExternalLink size={16} />
                  Live Deployment
                </a>
              )}
            </div>

            {/* Main Description */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>OVERVIEW</h3>
              <p style={bodyTextStyle}>{content.description}</p>
            </div>

            {/* Architecture / Pipeline diagram */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>SYSTEM ARCHITECTURE</h3>
              <div style={diagramBoxStyle}>
                <div style={diagramNodeStyle}>
                  <Cpu size={16} />
                  <span>Ingestion Feed</span>
                </div>
                <div style={diagramArrowStyle}>⟶</div>
                <div style={{ ...diagramNodeStyle, borderColor: '#38bdf8', color: '#38bdf8' }}>
                  <Database size={16} />
                  <span>LSTM Model</span>
                </div>
                <div style={diagramArrowStyle}>⟶</div>
                <div style={diagramNodeStyle}>
                  <Code size={16} />
                  <span>Outpost Handler</span>
                </div>
              </div>
              <p style={diagramLabelStyle}>{content.diagram}</p>
            </div>

            {/* Code Sandbox View */}
            {content.codeSnippet && (
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>TECHNICAL RUNTIME</h3>
                <div style={codeBoxStyle}>
                  <div style={codeHeaderStyle}>
                    <span style={codeFileStyle}>main.ts</span>
                    <span style={codeLangStyle}>TypeScript</span>
                  </div>
                  <pre style={preStyle}>
                    <code>{content.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Styles
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto'
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
  gap: '3rem',
  minHeight: '100vh',
  flexWrap: 'wrap'
};

const sidebarStyle: React.CSSProperties = {
  flex: '1 1 300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const sidebarHeaderStyle: React.CSSProperties = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '1rem'
};

const sidebarTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '0.05em',
  color: '#ffffff'
};

const sidebarSubStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#9ca3af',
  marginTop: '0.25rem'
};

const projectListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const projectItemStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '1.25rem',
  borderRadius: '12px',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'var(--transition-fast)',
  outline: 'none'
};

const projectDescShortStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#6b7280',
  marginTop: '0.5rem',
  lineHeight: '1.4'
};

const detailAreaStyle: React.CSSProperties = {
  flex: '2 2 600px',
  minWidth: '320px'
};

const detailContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem'
};

const detailHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: '#38bdf8',
  letterSpacing: '0.15em'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '3rem',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: '1.1',
  letterSpacing: '-0.03em'
};

const taglineStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  color: '#9ca3af',
  lineHeight: '1.4'
};

const techContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '0.75rem'
};

const techBadgeStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontFamily: 'var(--font-mono)',
  background: 'rgba(56, 189, 248, 0.08)',
  border: '1px solid rgba(56, 189, 248, 0.15)',
  color: '#38bdf8',
  padding: '0.25rem 0.6rem',
  borderRadius: '4px'
};

const linksRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const linkBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#e2e8f0',
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: 500,
  transition: 'var(--transition-fast)'
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#4b5563',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '0.5rem'
};

const bodyTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#9ca3af'
};

const diagramBoxStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '12px',
  padding: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  margin: '0.5rem 0',
  flexWrap: 'wrap'
};

const diagramNodeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  padding: '0.4rem 0.8rem',
  fontSize: '0.8rem',
  fontFamily: 'var(--font-mono)'
};

const diagramArrowStyle: React.CSSProperties = {
  color: '#4b5563',
  fontWeight: 'bold'
};

const diagramLabelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontFamily: 'var(--font-mono)',
  color: '#6b7280',
  textAlign: 'center'
};

const codeBoxStyle: React.CSSProperties = {
  background: 'var(--code-bg)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  overflow: 'hidden'
};

const codeHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.02)',
  padding: '0.6rem 1.2rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
};

const codeFileStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  color: '#9ca3af'
};

const codeLangStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#4b5563',
  fontWeight: 500
};

const preStyle: React.CSSProperties = {
  padding: '1.25rem',
  overflowX: 'auto',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  lineHeight: '1.5',
  color: '#38bdf8',
  textAlign: 'left'
};
