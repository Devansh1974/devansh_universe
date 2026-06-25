import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Feather } from 'lucide-react';
import { universeNodes } from '../data/universe';
import type { UniverseNode } from '../data/universe';

interface ShayariWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const ShayariWorld: React.FC<ShayariWorldProps> = ({ onBack, selectedNode }) => {
  const shayariItems = universeNodes.filter((node) => node.group === 'shayari' && node.level === 2);
  const initialItem = shayariItems.find((s) => s.id === selectedNode?.id) || shayariItems[0];
  const [activeItem, setActiveItem] = useState<UniverseNode>(initialItem);

  const content = activeItem.content || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-shayari"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        {/* Left Side: Journal Entries */}
        <div style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>
            <h2 style={sidebarTitleStyle}>SHAYARI</h2>
            <p style={sidebarSubStyle}>Urdu & Hindi Couplets</p>
          </div>
          <div style={listStyle}>
            {shayariItems.map((item) => {
              const isActive = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  style={{
                    ...itemButtonStyle,
                    borderColor: isActive ? 'var(--accent)' : 'rgba(139, 90, 43, 0.1)',
                    background: isActive ? 'rgba(139, 90, 43, 0.05)' : 'transparent',
                    color: 'var(--text-main)'
                  }}
                >
                  <div style={itemLabelStyle}>{item.label}</div>
                  <div style={itemDescStyle}>{item.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={diaryAreaStyle}>
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="diary-page"
            style={diaryPageStyle}
          >
            {/* Header info */}
            <div style={diaryHeaderStyle}>
              <div style={diaryDateRowStyle}>
                <Feather size={14} style={{ color: 'var(--accent)' }} />
                <span style={diaryTitleFont}>{content.title || activeItem.label}</span>
              </div>
            </div>

            {/* Couplets List */}
            <div style={coupletsContainerStyle}>
              {content.couplets?.map((c: any, index: number) => (
                <div key={index} style={coupletBlockStyle}>
                  {/* Original Hindi/Urdu text */}
                  <p style={originalTextStyle}>{c.original}</p>
                  
                  {/* Transliteration */}
                  {c.transliteration && (
                    <p style={transliterationStyle}>{c.transliteration}</p>
                  )}
                  
                  {/* Translation */}
                  {c.translation && (
                    <p style={translationStyle}>“ {c.translation} ”</p>
                  )}
                </div>
              ))}
            </div>

            <div style={diaryFooterStyle}>
              <span>- Devansh Singh</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Inline Styles matching Shayari notebook aesthetic (dark theme to prevent bright flash)
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto',
  background: '#0d0b0a',
  color: '#f5f0ea'
};


const containerStyle: React.CSSProperties = {
  display: 'flex',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
  gap: '4rem',
  minHeight: '100vh',
  flexWrap: 'wrap'
};

const sidebarStyle: React.CSSProperties = {
  flex: '1 1 250px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  lineHeight: 'normal' // Reset lined paper line height in sidebar
};

const sidebarHeaderStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  paddingBottom: '1rem'
};

const sidebarTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-handwriting)',
  fontSize: '2.2rem',
  fontWeight: 700,
  color: 'var(--accent)',
  lineHeight: '1.2'
};

const sidebarSubStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-sans)',
  marginTop: '0.2rem'
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const itemButtonStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '1.25rem',
  borderRadius: '8px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'var(--transition-fast)',
  outline: 'none',
  fontFamily: 'var(--font-serif)',
  lineHeight: '1.4rem'
};

const itemLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.95rem'
};

const itemDescStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  marginTop: '0.5rem'
};

const diaryAreaStyle: React.CSSProperties = {
  flex: '2 2 500px',
  minWidth: '320px',
  lineHeight: 'normal' // Reset lined paper line height in diary wrapper
};

const diaryPageStyle: React.CSSProperties = {
  borderLeft: '2px solid rgba(139, 90, 43, 0.2)', // Red margin line look (using accent-ish brown)
  paddingLeft: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const diaryHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '0.5rem'
};

const diaryDateRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem'
};

const diaryTitleFont: React.CSSProperties = {
  fontFamily: 'var(--font-handwriting)',
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--text-main)'
};

const coupletsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem'
};

const coupletBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem'
};

const originalTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.3rem',
  lineHeight: '2.2rem', // Matches CSS gradient line-height exactly
  color: 'var(--text-main)',
  fontWeight: 600,
  whiteSpace: 'pre-line'
};

const transliterationStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '0.95rem',
  lineHeight: '1.5rem',
  color: 'var(--text-muted)',
  fontStyle: 'italic',
  whiteSpace: 'pre-line',
  paddingLeft: '0.5rem'
};

const translationStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  lineHeight: '1.4rem',
  color: 'var(--accent)',
  paddingLeft: '0.5rem'
};

const diaryFooterStyle: React.CSSProperties = {
  fontFamily: 'var(--font-handwriting)',
  fontSize: '1.5rem',
  color: 'var(--text-muted)',
  textAlign: 'right',
  marginTop: '2rem'
};
