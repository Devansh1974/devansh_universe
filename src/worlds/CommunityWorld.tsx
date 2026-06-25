import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { universeNodes } from '../data/universe';
import type { UniverseNode } from '../data/universe';

const YoutubeIcon = ({ size = 16, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    style={style}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.001 3.001 0 0 0 2.11 2.107C4.472 20.455 12 20.455 12 20.455s7.528 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ size = 16, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface PublicSpeakerProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const CommunityWorld: React.FC<PublicSpeakerProps> = ({ onBack, selectedNode }) => {
  const commItems = universeNodes.filter((node) => node.group === 'community' && node.level === 2);
  const initialItem = commItems.find((c) => c.id === selectedNode?.id) || commItems[0];
  const [activeItem, setActiveItem] = useState<UniverseNode>(initialItem);

  const content = activeItem.content || {};

  const youtubeVideos = [
    {
      title: 'Interpreting Anomalies in Graph Structures',
      event: 'Tech Horizons Summit 2024',
      duration: '18:45',
      url: 'https://youtube.com',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Building Algorithmic Trading Engines with LSTM Networks',
      event: 'ML Developers Webinar 2023',
      duration: '24:12',
      url: 'https://youtube.com',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-community"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        {/* Left Side: Summary & Items list */}
        <div style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>
            <h2 style={sidebarTitleStyle}>PUBLIC SPEAKER</h2>
            <p style={sidebarSubStyle}>Talks, Seminars & Workshops</p>
          </div>
          
          {/* Quick links to platforms */}
          <div style={platformsCardStyle}>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={platformLinkStyle}>
              <YoutubeIcon size={16} style={{ color: '#ff0000' }} />
              <span>YouTube Channel</span>
              <ExternalLink size={12} />
            </a>
            <a href="https://instagram.com/devansh_raghuvanshi" target="_blank" rel="noreferrer" style={platformLinkStyle}>
              <InstagramIcon size={16} style={{ color: '#e1306c' }} />
              <span>Instagram Page</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div style={listStyle}>
            {commItems.map((item) => {
              const isActive = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  style={{
                    ...itemButtonStyle,
                    borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                    background: isActive ? 'rgba(69, 243, 255, 0.05)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)'
                  }}
                >
                  <div style={itemLabelStyle}>Speakers Summary</div>
                  <div style={itemDescStyle}>Keynotes & Organized Events</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Keynotes & Youtube Slots */}
        <div style={detailAreaStyle}>
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={detailContentStyle}
          >
            {/* Featured Videos Section */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>FEATURED PRESENTATIONS</h3>
              <div style={videoGridStyle}>
                {youtubeVideos.map((video, idx) => (
                  <div key={idx} style={videoCardStyle}>
                    <div style={{ ...videoThumbnailStyle, backgroundImage: `url(${video.thumbnail})` }}>
                      <div style={durationBadgeStyle}>{video.duration}</div>
                      <a href={video.url} target="_blank" rel="noreferrer" style={playBtnStyle}>
                        <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
                      </a>
                    </div>
                    <div style={videoMetaStyle}>
                      <span style={videoEventStyle}>{video.event}</span>
                      <h4 style={videoTitleStyle}>{video.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            {content.metrics && (
              <div style={metricsGridStyle}>
                {content.metrics.map((metric: any, idx: number) => (
                  <div key={idx} style={metricCardStyle}>
                    <div style={metricValueStyle}>{metric.value}</div>
                    <div style={metricLabelStyle}>{metric.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline */}
            {content.timeline && (
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>MILESTONES & LEADERSHIP</h3>
                <div style={timelineContainerStyle}>
                  {content.timeline.map((item: any, idx: number) => (
                    <div key={idx} style={timelineItemStyle}>
                      <div style={timelineGraphicStyle}>
                        <div style={timelineDotStyle} />
                        {idx !== content.timeline.length - 1 && <div style={timelineLineStyle} />}
                      </div>

                      <div style={timelineContentCardStyle}>
                        <div style={timelineHeaderStyle}>
                          <span style={timelineYearStyle}>{item.year}</span>
                          <span style={timelineRoleStyle}>{item.role}</span>
                        </div>
                        <h4 style={timelineTitleStyle}>{item.title}</h4>
                        <p style={timelineDetailsStyle}>{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Styles matching Public Speaker theme
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto'
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  maxWidth: '1150px',
  margin: '0 auto',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
  gap: '4rem',
  minHeight: '100vh',
  flexWrap: 'wrap'
};

const sidebarStyle: React.CSSProperties = {
  flex: '1 1 280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const sidebarHeaderStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  paddingBottom: '0.75rem'
};

const sidebarTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '0.05em',
  color: 'var(--text-main)'
};

const sidebarSubStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  marginTop: '0.25rem',
  fontFamily: 'var(--font-sans)'
};

const platformsCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '1rem'
};

const platformLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  color: '#e2e8f0',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontWeight: 600,
  fontFamily: 'var(--font-sans)',
  transition: 'transform 0.15s ease'
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
  borderRadius: '12px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'var(--transition-fast)',
  outline: 'none',
  fontFamily: 'var(--font-sans)'
};

const itemLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.95rem'
};

const itemDescStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
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
  gap: '3rem'
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  color: '#6b7280',
  borderBottom: '1px solid var(--border)',
  paddingBottom: '0.5rem'
};

const videoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.5rem'
};

const videoCardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const videoThumbnailStyle: React.CSSProperties = {
  height: '150px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const durationBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#ffffff',
  fontSize: '0.65rem',
  fontFamily: 'var(--font-mono)',
  padding: '0.2rem 0.4rem',
  borderRadius: '4px'
};

const playBtnStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(244, 63, 94, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  textDecoration: 'none'
};

const videoMetaStyle: React.CSSProperties = {
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem'
};

const videoEventStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: 'var(--accent)',
  fontWeight: 600,
  letterSpacing: '0.05em',
  fontFamily: 'var(--font-sans)'
};

const videoTitleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: '1.4',
  fontWeight: 600,
  color: '#ffffff'
};

const metricsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '1.5rem'
};

const metricCardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '1.5rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem'
};

const metricValueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '2.25rem',
  fontWeight: 800,
  color: 'var(--accent)',
  letterSpacing: '-0.02em'
};

const metricLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#9ca3af',
  letterSpacing: '0.05em'
};

const timelineContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const timelineItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem'
};

const timelineGraphicStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '12px',
  flexShrink: 0
};

const timelineDotStyle: React.CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'var(--accent)',
  boxShadow: '0 0 10px var(--accent)',
  marginTop: '0.75rem',
  zIndex: 2
};

const timelineLineStyle: React.CSSProperties = {
  width: '2px',
  background: 'linear-gradient(to bottom, var(--accent), transparent)',
  position: 'absolute',
  top: '1.25rem',
  bottom: '-1.5rem',
  zIndex: 1
};

const timelineContentCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px solid rgba(255, 255, 255, 0.03)',
  borderRadius: '12px',
  padding: '1.25rem 1.5rem',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const timelineHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const timelineYearStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1rem',
  fontWeight: 800,
  color: 'var(--accent)'
};

const timelineRoleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  color: 'var(--text-main)',
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px'
};

const timelineTitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#ffffff'
};

const timelineDetailsStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  lineHeight: '1.5',
  color: '#9ca3af'
};
