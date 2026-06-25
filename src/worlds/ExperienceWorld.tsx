import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import type { UniverseNode } from '../data/universe';

interface ExperienceWorldProps {
  onBack: () => void;
  selectedNode: UniverseNode | null;
}

export const ExperienceWorld: React.FC<ExperienceWorldProps> = ({ onBack }) => {
  const experiences = [
    {
      role: 'Software Development Engineer Intern',
      company: 'Stealth SaaS Startup',
      location: 'Bengaluru, India',
      period: 'June 2026 – Present',
      color: '#38bdf8',
      details: [
        'Building AI-integrated product features using Next.js and Node.js for the SaaS platform.',
        'Developing REST APIs and backend microservices with scalable architecture patterns.',
        'Collaborating cross-functionally on product sprints using Agile/Scrum methodology.'
      ]
    },
    {
      role: 'Tech & Operations Intern',
      company: 'WingMann',
      location: 'Remote',
      period: 'March 2026 – June 2026',
      color: '#a78bfa',
      details: [
        'Managed technical operations and platform tooling for an early-stage startup.',
        'Contributed to product development discussions and operational workflows.',
        'Supported UI/UX improvements and feature implementation using React.'
      ]
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'UdrCrafts',
      location: 'Remote',
      period: 'November 2025 – April 2026',
      color: '#34d399',
      details: [
        'Built and maintained full-stack e-commerce features with MERN stack (MongoDB, Express, React, Node.js).',
        'Integrated payment gateways and product management dashboards.',
        'Improved site performance by 30% through code-splitting and image optimization.'
      ]
    },
    {
      role: 'Secretary — Azure Developer Community',
      company: 'Microsoft (Alliance University)',
      location: 'Bengaluru, India',
      period: 'September 2025 – Present',
      color: '#0ea5e9',
      details: [
        'Organized 10+ technical workshops and hackathons impacting 300+ students.',
        'Led hands-on sessions on Microsoft Azure services — Functions, App Services, Cosmos DB.',
        'Coordinated with Microsoft team leads for event planning and resource distribution.'
      ]
    },
    {
      role: 'Google Student Ambassador',
      company: 'Google',
      location: 'Bengaluru, India',
      period: 'July 2025 – December 2025',
      color: '#f59e0b',
      details: [
        'Represented Google technologies on campus and promoted Google Cloud and AI tools.',
        'Hosted bootcamps and led study jams for Google Developer certifications.',
        'Connected students with Google programs and internship opportunities.'
      ]
    },
    {
      role: 'Backend Developer',
      company: 'BREYUS',
      location: 'Remote',
      period: 'August 2025 – October 2025',
      color: '#f43f5e',
      details: [
        'Developed RESTful backend services using Node.js and Express.js.',
        'Implemented database schemas and queries with MongoDB and Mongoose.',
        'Built authentication systems with JWT and OAuth 2.0 integration.'
      ]
    },
    {
      role: 'Student Coordinator',
      company: 'PeerHub',
      location: 'Remote',
      period: 'June 2025 – July 2025',
      color: '#c5a880',
      details: [
        'Coordinated peer-to-peer learning sessions and study groups for engineering students.',
        'Managed scheduling and content for collaborative coding sessions.',
        'Helped onboard and mentor junior peers in web development fundamentals.'
      ]
    },
    {
      role: 'Frontend Web Developer Intern',
      company: 'InternDev',
      location: 'Remote',
      period: 'January 2025 – February 2025',
      color: '#fb923c',
      details: [
        'Built responsive web UI components using HTML5, CSS3, and vanilla JavaScript.',
        'Collaborated on component libraries and design system implementation.',
        'Delivered 3 feature modules under tight deadlines with high code quality.'
      ]
    },
    {
      role: 'Full-Stack Work-Integrated Learning Student',
      company: 'Kalvium',
      location: 'Bengaluru, India',
      period: 'August 2024 – Present',
      color: '#818cf8',
      details: [
        'Pursuing industry-integrated B.Tech with real-world project experience from day one.',
        'Built 7+ full-stack applications with React, Node.js, Express, and MongoDB.',
        'Won 1st place at Code Sangram Hackathon (100+ teams) for AI-powered project.'
      ]
    }
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="world-experience"
      style={worldStyle}
    >
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} />
        Back to Galaxy
      </button>

      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <h2 style={tagStyle}>ROADMAP</h2>
          <h1 style={titleStyle}>Professional Experience</h1>
          <p style={subTitleStyle}>9+ internships & roles · Full-stack · Backend · Cloud · Community Leadership</p>
        </div>

        <div style={timelineStyle}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="experience-card"
              style={timelineCardStyle}
            >
              {/* Left Column: Role, Company, Period */}
              <div style={cardLeftColStyle}>
                <div style={{ ...iconWrapperStyle, background: (exp as any).color ? `${(exp as any).color}18` : iconWrapperStyle.background, borderColor: (exp as any).color ? `${(exp as any).color}44` : '' }}>
                  <Briefcase size={16} style={{ color: (exp as any).color || '#818cf8' }} />
                </div>
                <h3 style={roleStyle}>{exp.role}</h3>
                <div style={companyRowStyle}>
                  <span style={companyStyle}>{exp.company}</span>
                  <span style={dotDividerStyle}>•</span>
                  <div style={locationStyle}>
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <div style={periodStyle}>
                  <Calendar size={12} />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Right Column: Accomplishments checklist */}
              <div style={cardRightColStyle}>
                {exp.details.map((detail, dIdx) => (
                  <div key={dIdx} style={bulletRowStyle}>
                    <CheckCircle size={14} style={bulletIconStyle} />
                    <p style={bulletTextStyle}>{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Styles for ExperienceWorld
const worldStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  overflowY: 'auto',
  background: '#090a0f',
  color: '#e2e8f0'
};

const containerStyle: React.CSSProperties = {
  maxWidth: '900px',
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
  color: '#818cf8',
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

const timelineStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const timelineCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '2rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  transition: 'border-color 0.2s ease',
  alignItems: 'flex-start'
};

const cardLeftColStyle: React.CSSProperties = {
  flex: '1 1 250px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem'
};

const iconWrapperStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  background: 'rgba(129, 137, 248, 0.08)',
  border: '1px solid rgba(129, 137, 248, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.5rem'
};

const roleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ffffff'
};

const companyRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
  fontSize: '0.85rem',
  color: '#9ca3af'
};

const companyStyle: React.CSSProperties = {
  fontWeight: 600
};

const dotDividerStyle: React.CSSProperties = {
  color: '#4b5563'
};

const locationStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
};

const periodStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.75rem',
  color: '#818cf8',
  fontFamily: 'var(--font-mono)',
  marginTop: '0.2rem'
};

const cardRightColStyle: React.CSSProperties = {
  flex: '2 2 400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minWidth: '280px'
};

const bulletRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'flex-start'
};

const bulletIconStyle: React.CSSProperties = {
  color: '#818cf8',
  marginTop: '3px',
  flexShrink: 0
};

const bulletTextStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  lineHeight: '1.5',
  color: '#9ca3af'
};
