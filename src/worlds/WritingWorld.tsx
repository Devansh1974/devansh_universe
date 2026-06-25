import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ExternalLink, BookOpen, Award, GraduationCap, FileText } from 'lucide-react';
import { universeNodes } from '../data/universe';
import type { UniverseNode } from '../data/universe';

interface WritingWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

const stripHtml = (html: string) => {
  if (!html) return '';
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.length > 300 ? text.substring(0, 300) + '...' : text;
};

export const WritingWorld: React.FC<WritingWorldProps> = ({ onBack, selectedNode }) => {
  const staticArticles = universeNodes.filter((node) => node.group === 'writing' && node.level === 2);
  const researchArticles = staticArticles.filter((art) => art.content?.isResearch);
  const philosophyArticles = staticArticles.filter((art) => !art.content?.isResearch);

  const [mediumArticles, setMediumArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Default selection order: Selected node from Graph -> Research Publication -> First Static Article
  const initialItem =
    staticArticles.find((a) => a.id === selectedNode?.id) ||
    researchArticles[0] ||
    staticArticles[0];

  const [activeItem, setActiveItem] = useState<any>(initialItem);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@devanshsingh1974')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setMediumArticles(data.items);
          // If the user didn't enter a specific article, they clicked the main "Writing" node.
          // Keep the default initial item (research paper), but make the Medium feed available in the sidebar.
        }
      })
      .catch((err) => {
        console.error('Error loading Medium feed:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isResearch = activeItem && activeItem.content?.isResearch;
  const isMedium = activeItem && activeItem.guid !== undefined;
  const isPhilosophy = activeItem && activeItem.id !== undefined && !activeItem.content?.isResearch;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-writing"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        {/* Left Side: Sidebar list divided into sections */}
        <div style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>
            <h2 style={sidebarTitleStyle}>WRITING & RESEARCH</h2>
            <p style={sidebarSubStyle}>Academic preprints & dynamic publications</p>
          </div>

          {/* Profile redirect button */}
          <a
            href="https://medium.com/@devanshsingh1974"
            target="_blank"
            rel="noreferrer"
            style={profileLinkStyle}
          >
            <BookOpen size={14} />
            <span>Visit Medium Profile</span>
            <ExternalLink size={12} />
          </a>

          <div style={listStyle} className="writing-list-container">
            {/* 1. Academic Research Section */}
            {researchArticles.length > 0 && (
              <>
                <div style={sectionHeaderStyle}>ACADEMIC RESEARCH</div>
                {researchArticles.map((art) => {
                  const isActive = activeItem && art.id === activeItem.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setActiveItem(art)}
                      style={{
                        ...itemButtonStyle,
                        borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                        background: isActive ? 'var(--accent-light)' : 'transparent',
                        color: isActive ? 'var(--text-main)' : 'var(--text-muted)'
                      }}
                    >
                      <div style={itemLabelStyle}>{art.label}</div>
                      <div style={itemDescStyle}>Preprint • Basic Details & Links</div>
                    </button>
                  );
                })}
              </>
            )}

            {/* 2. Philosophy & Tech Section */}
            {philosophyArticles.length > 0 && (
              <>
                <div style={sectionHeaderStyle}>PHILOSOPHY & TECH</div>
                {philosophyArticles.map((art) => {
                  const isActive = activeItem && art.id === activeItem.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setActiveItem(art)}
                      style={{
                        ...itemButtonStyle,
                        borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                        background: isActive ? 'var(--accent-light)' : 'transparent',
                        color: isActive ? 'var(--text-main)' : 'var(--text-muted)'
                      }}
                    >
                      <div style={itemLabelStyle}>{art.label}</div>
                      <div style={itemDescStyle}>Essay • {art.description}</div>
                    </button>
                  );
                })}
              </>
            )}

            {/* 3. Medium Articles Section */}
            {(mediumArticles.length > 0 || isLoading) && (
              <>
                <div style={sectionHeaderStyle}>MEDIUM BLOG FEED</div>
                {isLoading && <div style={loadingTextStyle}>Fetching Medium feed...</div>}
                {mediumArticles.map((post, idx) => {
                  const isActive = activeItem && activeItem.guid === post.guid;
                  const formattedDate = post.pubDate ? post.pubDate.split(' ')[0] : '';
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveItem(post)}
                      style={{
                        ...itemButtonStyle,
                        borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                        background: isActive ? 'var(--accent-light)' : 'transparent',
                        color: isActive ? 'var(--text-main)' : 'var(--text-muted)'
                      }}
                    >
                      <div style={itemLabelStyle}>{post.title}</div>
                      <div style={itemDescStyle}>Medium • {formattedDate}</div>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Right Side: Detail reading view */}
        <div style={readAreaStyle} className="read-area-sticky">
          {activeItem && (
            <motion.div
              key={activeItem.id || activeItem.guid}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={articleCardStyle}
            >
              {/* RESEARCH PUBLICATION DETAILED VIEW */}
              {isResearch && (
                <div style={researchDetailContainerStyle}>
                  <div style={badgeHeaderStyle}>
                    <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
                    <span style={badgeTextStyle}>ACADEMIC PREPRINT / DRAFT</span>
                  </div>

                  <h1 style={titleStyle}>{activeItem.content.title}</h1>
                  <p style={authorsStyle}>By {activeItem.content.authors}</p>
                  
                  <div style={dividerStyle} />

                  <div style={sectionStyle}>
                    <h3 style={sectionTitleStyle}>ABSTRACT</h3>
                    <p style={abstractTextStyle}>{activeItem.content.abstract}</p>
                  </div>

                  {activeItem.content.highlights && (
                    <div style={sectionStyle}>
                      <h3 style={sectionTitleStyle}>KEY CONTRIBUTIONS</h3>
                      <ul style={highlightsListStyle}>
                        {activeItem.content.highlights.map((h: string, idx: number) => (
                          <li key={idx} style={highlightItemStyle}>
                            <Award size={14} style={{ color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeItem.content.link && (
                    <a
                      href={activeItem.content.link}
                      target="_blank"
                      rel="noreferrer"
                      style={readFullBtnStyle}
                    >
                      <span>{activeItem.content.linkText || 'View Publication Draft'}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}

              {/* DYNAMIC MEDIUM POST DETAILED VIEW */}
              {isMedium && (
                <div style={mediumDetailContainerStyle}>
                  <div style={badgeHeaderStyle}>
                    <BookOpen size={16} style={{ color: 'var(--accent)' }} />
                    <span style={badgeTextStyle}>MEDIUM BLOG POST</span>
                  </div>

                  <div style={metaHeaderStyle}>
                    <div style={metaItemStyle}>
                      <Calendar size={14} />
                      <span>{activeItem.pubDate?.split(' ')[0]}</span>
                    </div>
                  </div>

                  <h1 style={titleStyle}>{activeItem.title}</h1>
                  
                  <div style={dividerStyle} />

                  <p style={previewParaStyle}>
                    {stripHtml(activeItem.description || activeItem.content)}
                  </p>

                  {activeItem.thumbnail && (
                    <img
                      src={activeItem.thumbnail}
                      alt=""
                      style={articleThumbnailStyle}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}

                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noreferrer"
                    style={readFullBtnStyle}
                  >
                    <span>Read Full Article on Medium</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* LOCAL PHILOSOPHICAL ESSAY DETAILED VIEW */}
              {isPhilosophy && (
                <div style={philosophyDetailContainerStyle}>
                  <div style={badgeHeaderStyle}>
                    <FileText size={16} style={{ color: 'var(--accent)' }} />
                    <span style={badgeTextStyle}>PHILOSOPHY & TECHNOLOGY</span>
                  </div>

                  <div style={metaHeaderStyle}>
                    <div style={metaItemStyle}>
                      <Calendar size={14} />
                      <span>{activeItem.content?.date || 'April 2026'}</span>
                    </div>
                    <div style={metaItemStyle}>
                      <Clock size={14} />
                      <span>{activeItem.content?.readTime || '5 min read'}</span>
                    </div>
                  </div>

                  <h1 style={titleStyle}>{activeItem.content?.title || activeItem.label}</h1>
                  
                  <p style={introTextStyle}>
                    {activeItem.content?.introduction}
                  </p>

                  <div style={dividerStyle} />

                  <div style={essayBodyStyle}>
                    {activeItem.content?.body}
                  </div>

                  {activeItem.content?.outro && (
                    <p style={outroTextStyle}>
                      {activeItem.content?.outro}
                    </p>
                  )}

                  <a
                    href="https://medium.com/@devanshsingh1974"
                    target="_blank"
                    rel="noreferrer"
                    style={readFullBtnStyle}
                  >
                    <span>Discuss on Medium</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {!activeItem && (
            <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
              Select a research paper or article from the list to preview it.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Inline Styles matching Writing theme
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto'
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
  gap: '3.5rem',
  minHeight: '100vh',
  flexWrap: 'wrap'
};

const sidebarStyle: React.CSSProperties = {
  flex: '1 1 300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const sidebarHeaderStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  paddingBottom: '0.75rem'
};

const sidebarTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '1.4rem',
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

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 700,
  color: 'rgba(255, 255, 255, 0.42)',
  letterSpacing: '0.12em',
  marginTop: '1.25rem',
  marginBottom: '0.25rem',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  paddingBottom: '0.3rem'
};

const profileLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  background: 'var(--accent-light)',
  border: '1px solid var(--border)',
  color: 'var(--accent)',
  borderRadius: '8px',
  padding: '0.6rem 1rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  textDecoration: 'none',
  fontFamily: 'var(--font-sans)',
  transition: 'all 0.2s ease'
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-sans)',
  textAlign: 'center',
  padding: '1rem 0'
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const itemButtonStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '1.1rem 1.25rem',
  borderRadius: '8px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'var(--transition-fast)',
  outline: 'none',
  fontFamily: 'var(--font-sans)'
};

const itemLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.9rem',
  lineHeight: '1.3'
};

const itemDescStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: 'var(--text-muted)',
  marginTop: '0.4rem',
  lineHeight: '1.3'
};

const readAreaStyle: React.CSSProperties = {
  flex: '2 2 550px',
  minWidth: '320px',
  position: 'sticky',
  top: '6rem',
  alignSelf: 'flex-start'
};

const articleCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  background: 'rgba(5,5,8,0.4)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '2.25rem',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
};

const articleThumbnailStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '10px',
  maxHeight: '220px',
  objectFit: 'cover',
  marginTop: '0.5rem'
};

const badgeHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.25rem'
};

const badgeTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'var(--accent)'
};

const metaHeaderStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 500,
  marginTop: '-0.25rem'
};

const metaItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
  fontWeight: 700,
  color: 'var(--text-main)',
  lineHeight: '1.25',
  letterSpacing: '-0.01em'
};

const authorsStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-serif)',
  fontStyle: 'italic',
  marginTop: '-0.5rem'
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: 'var(--border)',
  margin: '0.25rem 0'
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginTop: '0.5rem'
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.4)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  paddingBottom: '0.4rem'
};

const abstractTextStyle: React.CSSProperties = {
  fontSize: '0.94rem',
  lineHeight: '1.65',
  color: 'rgba(255,255,255,0.82)',
  fontFamily: 'var(--font-sans)',
  textAlign: 'justify'
};

const highlightsListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const highlightItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'flex-start',
  fontSize: '0.9rem',
  lineHeight: '1.45',
  color: 'rgba(255,255,255,0.8)',
  fontFamily: 'var(--font-sans)'
};

const introTextStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: '1.6',
  color: 'var(--text-main)',
  fontStyle: 'italic',
  marginBottom: '0.5rem',
  fontFamily: 'var(--font-serif)'
};

const essayBodyStyle: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  lineHeight: '1.75',
  fontSize: '0.96rem',
  color: 'rgba(255,255,255,0.78)',
  fontFamily: 'var(--font-sans)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  marginTop: '0.5rem'
};

const outroTextStyle: React.CSSProperties = {
  fontSize: '0.98rem',
  lineHeight: '1.6',
  color: 'var(--accent)',
  fontStyle: 'italic',
  marginTop: '1.5rem',
  borderLeft: '2.5px solid var(--accent)',
  paddingLeft: '1rem',
  fontFamily: 'var(--font-sans)'
};

const previewParaStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: '1.65',
  color: 'rgba(255,255,255,0.78)',
  fontFamily: 'var(--font-sans)'
};

const readFullBtnStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  background: 'var(--accent)',
  border: 'none',
  borderRadius: '8px',
  padding: '0.75rem 1.5rem',
  color: '#ffffff',
  fontSize: '0.85rem',
  fontWeight: 600,
  textDecoration: 'none',
  fontFamily: 'var(--font-sans)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1.5rem',
  transition: 'transform 0.15s ease'
};

const researchDetailContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const mediumDetailContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const philosophyDetailContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};
