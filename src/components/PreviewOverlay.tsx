import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { UniverseNode } from '../data/universe';

interface PreviewOverlayProps {
  node: UniverseNode | null;
}

export const PreviewOverlay: React.FC<PreviewOverlayProps> = ({ node }) => {
  return (
    <div style={containerStyle}>
      <AnimatePresence>
        {node && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            style={{
              ...cardStyle,
              borderColor: node.color ? `${node.color}33` : 'rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Top Indicator bar */}
            <div style={barStyle}>
              <span style={{ ...tagStyle, color: node.color || '#fff' }}>
                {node.group.toUpperCase()}
              </span>
              <span style={hintStyle}>Click node to enter</span>
            </div>

            {/* Core Info */}
            <h3 style={titleStyle}>{node.preview.title}</h3>
            <p style={subtitleStyle}>{node.preview.subtitle}</p>

            {/* Divider */}
            <div style={dividerStyle} />

            {/* Action */}
            <div style={actionStyle}>
              <span style={actionTextStyle}>{node.preview.actionText}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowRight size={14} style={{ color: node.color || '#38bdf8' }} />
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '2.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  pointerEvents: 'none', // Allow clicking through container to graph
  width: '100%',
  maxWidth: '380px',
  padding: '0 1rem'
};

const cardStyle: React.CSSProperties = {
  pointerEvents: 'auto', // Re-enable pointer events for the card itself
  background: 'rgba(9, 10, 15, 0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  padding: '1.25rem 1.5rem',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const barStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.25rem'
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  fontFamily: 'var(--font-sans)'
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  color: 'rgba(255, 255, 255, 0.3)',
  fontFamily: 'var(--font-sans)'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#ffffff',
  lineHeight: '1.2',
  letterSpacing: '-0.02em'
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'rgba(255, 255, 255, 0.6)',
  lineHeight: '1.4'
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(to right, rgba(255, 255, 255, 0.08), transparent)',
  margin: '0.5rem 0'
};

const actionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.8rem',
  fontWeight: 500,
  color: '#ffffff',
  alignSelf: 'flex-start',
  cursor: 'pointer'
};

const actionTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)'
};
