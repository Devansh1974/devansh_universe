import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Hourglass, Terminal } from 'lucide-react';
import type { UniverseNode } from '../data/universe';

interface FutureWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const FutureWorld: React.FC<FutureWorldProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-future"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <h2 style={tagStyle}>FUTURE</h2>
          <h1 style={titleStyle}>Horizons Sandbox</h1>
          <p style={subTitleStyle}>Upcoming experimental models and compute pipelines.</p>
        </div>

        <div style={contentBoxStyle}>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={cardStyle}
          >
            <div style={iconBoxStyle}>
              <Hourglass size={32} style={{ color: '#f43f5e' }} />
            </div>

            <h2 style={cardTitleStyle}>UNDER DEVELOPMENT</h2>
            
            <p style={cardDescStyle}>
              We are currently designing and staging next-generation spatial canvas systems, multi-agent terminal runners, and decentralized data schemas.
            </p>

            <div style={codeWrapperStyle}>
              <div style={codeHeaderStyle}>
                <Terminal size={14} />
                <span>sandbox_status.sh</span>
              </div>
              <pre style={preStyle}>
                <code>
{`$ git status
On branch feature/agentic-orchestration
Your branch is up to date with 'origin/feature/agentic-orchestration'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   pipelines/agent_runner.py
	modified:   canvas/spatial_layout.ts

no changes added to commit (use "git add" and/or "git commit -a")`}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Styles for FutureWorld (Under Development Edition)
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto',
  background: '#06060a',
  color: '#e2e8f0'
};

const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  minHeight: '100vh'
};

const headerSectionStyle: React.CSSProperties = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: '#f43f5e',
  fontFamily: 'var(--font-sans)'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: '1.1',
  letterSpacing: '-0.02em'
};

const subTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  color: '#9ca3af'
};

const contentBoxStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0'
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(9, 10, 15, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '20px',
  padding: '3rem 2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  width: '100%',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
};

const iconBoxStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  background: 'rgba(244, 63, 94, 0.05)',
  border: '1px solid rgba(244, 63, 94, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.5rem'
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.75rem',
  fontWeight: 800,
  color: '#ffffff',
  letterSpacing: '0.05em'
};

const cardDescStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  lineHeight: '1.6',
  color: '#9ca3af',
  maxWidth: '500px'
};

const codeWrapperStyle: React.CSSProperties = {
  width: '100%',
  background: '#030408',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  overflow: 'hidden',
  marginTop: '1rem',
  textAlign: 'left'
};

const codeHeaderStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  padding: '0.6rem 1.2rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.75rem',
  fontFamily: 'var(--font-mono)',
  color: '#6b7280'
};

const preStyle: React.CSSProperties = {
  padding: '1.25rem',
  overflowX: 'auto',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  lineHeight: '1.5',
  color: '#38bdf8'
};
