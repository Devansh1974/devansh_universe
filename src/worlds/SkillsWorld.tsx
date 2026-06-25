import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Database, Cpu, Layout, TrendingUp } from 'lucide-react';
import type { UniverseNode } from '../data/universe';

interface SkillsWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const SkillsWorld: React.FC<SkillsWorldProps> = ({ onBack }) => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code size={18} style={{ color: '#10b981' }} />,
      color: '#10b981',
      skills: [
        { name: 'JavaScript / TypeScript', level: 95, icon: 'JS' },
        { name: 'Python (Advanced)', level: 88, icon: 'PY' },
        { name: 'Java (Intermediate)', level: 72, icon: 'JV' },
        { name: 'SQL', level: 80, icon: 'DB' }
      ]
    },
    {
      title: 'Frontend',
      icon: <Layout size={18} style={{ color: '#f97316' }} />,
      color: '#f97316',
      skills: [
        { name: 'React.js / Next.js', level: 95, icon: 'RE' },
        { name: 'HTML5 / CSS3', level: 92, icon: 'CS' },
        { name: 'Tailwind CSS / Bootstrap', level: 88, icon: 'TW' },
        { name: 'Figma / UI Design', level: 80, icon: 'FG' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: <Database size={18} style={{ color: '#0ea5e9' }} />,
      color: '#0ea5e9',
      skills: [
        { name: 'Node.js / Express.js', level: 92, icon: 'NO' },
        { name: 'FastAPI / NestJS', level: 78, icon: 'FA' },
        { name: 'MongoDB / Mongoose', level: 90, icon: 'MG' },
        { name: 'PostgreSQL / MySQL', level: 80, icon: 'PG' }
      ]
    },
    {
      title: 'DevTools & Cloud',
      icon: <Cpu size={18} style={{ color: '#f43f5e' }} />,
      color: '#f43f5e',
      skills: [
        { name: 'Git / GitHub (4000+ contributions)', level: 95, icon: 'GH' },
        { name: 'Docker / CI-CD', level: 78, icon: 'DK' },
        { name: 'AWS / Azure / Vercel / Render', level: 75, icon: 'CL' },
        { name: 'Gemini API / OpenAI / ElevenLabs', level: 85, icon: 'AI' }
      ]
    },
    {
      title: 'Digital Marketing & Growth',
      icon: <TrendingUp size={18} style={{ color: '#fbbf24' }} />,
      color: '#fbbf24',
      skills: [
        { name: 'Digital Marketing (Meta & Google Ads)', level: 92, icon: 'DM' },
        { name: 'Ad Copywriting & Creatives Design', level: 88, icon: 'AC' },
        { name: 'Campaign Optimization & Budgeting', level: 90, icon: 'CO' },
        { name: 'Growth Marketing & SEO Strategy', level: 86, icon: 'GM' }
      ]
    }
  ];

  const certifications = [
    { name: 'Financial Markets', issuer: 'Yale University', color: '#38bdf8', icon: '🎓' },
    { name: 'Gen AI: Beyond the Chatbot', issuer: 'Google', color: '#f59e0b', icon: '🤖' },
    { name: 'Data Analytics Job Simulation', issuer: 'Deloitte', color: '#34d399', icon: '📊' },
    { name: 'The Power of Team Culture', issuer: 'Leadership Program', color: '#a78bfa', icon: '🤝' },
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-skills"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <h2 style={tagStyle}>CONSTELLATION</h2>
          <h1 style={titleStyle}>Technical Skills</h1>
          <p style={subTitleStyle}>Flat-design modern layout mapping systems and neural competencies.</p>
        </div>

        <div style={gridStyle} className="skills-grid">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.08, duration: 0.4 }}
              className="skills-card"
              style={{
                ...cardStyle,
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Category Header */}
              <div style={cardHeaderStyle}>
                <div style={{
                  ...iconWrapperStyle,
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)'
                }}>
                  {category.icon}
                </div>
                <h3 style={categoryTitleStyle}>{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div style={skillsListStyle}>
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} style={skillRowStyle}>
                    {/* Skill Badge Icon Logo & Name */}
                    <div style={skillMetaStyle}>
                      <div style={skillLabelGroupStyle}>
                        <div style={{ ...skillBadgeLogoStyle, color: category.color, borderColor: `${category.color}33` }}>
                          {skill.icon}
                        </div>
                        <span style={skillNameStyle}>{skill.name}</span>
                      </div>
                      <span style={{ ...skillLevelStyle, color: category.color }}>{skill.level}%</span>
                    </div>
                    {/* Outer Bar */}
                    <div style={barOuterStyle}>
                      {/* Inner Flat Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.2 + skillIdx * 0.05, duration: 0.6, ease: 'easeOut' }}
                        style={{
                          ...barInnerStyle,
                          background: category.color // Solid flat color, no gradient
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif' }}>CERTIFICATIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                style={{
                  background: `${cert.color}08`,
                  border: `1px solid ${cert.color}25`,
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{cert.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '2px' }}>{cert.name}</div>
                  <div style={{ fontSize: '0.72rem', color: cert.color, opacity: 0.8 }}>{cert.issuer}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};


// Styles for SkillsWorld (Flat UI Edition)
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto',
  background: '#040508',
  color: '#e2e8f0'
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1000px',
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
  color: '#10b981',
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

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  alignItems: 'start'
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(9, 10, 15, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '16px',
  padding: '1.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)'
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const iconWrapperStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const categoryTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ffffff'
};

const skillsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const skillRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const skillMetaStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.85rem'
};

const skillLabelGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const skillBadgeLogoStyle: React.CSSProperties = {
  width: '26px',
  height: '26px',
  borderRadius: '6px',
  border: '1px solid',
  background: 'rgba(255, 255, 255, 0.01)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.65rem',
  fontWeight: 700,
  fontFamily: 'var(--font-mono)'
};

const skillNameStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 500,
  color: '#e2e8f0'
};

const skillLevelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 600
};

const barOuterStyle: React.CSSProperties = {
  height: '5px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.04)',
  borderRadius: '2.5px',
  overflow: 'hidden'
};

const barInnerStyle: React.CSSProperties = {
  height: '100%',
  borderRadius: '2.5px'
};
