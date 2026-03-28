import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data';

const Contents: React.FC = () => {
  const systemsOfEquations = topics[0];
  const sections = systemsOfEquations.sections;

  return (
    <div className="page contents" style={{ 
      minHeight: '100vh',
      paddingBottom: '80px'
    }}>
      {/* Floating Badge */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: 700,
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
        animation: 'floatBadge 3s ease-in-out infinite',
        transform: 'translateZ(50px)',
      }}>
        📚 ALL LESSONS
      </div>

      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        transform: 'translateZ(40px)',
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}>
          Course Contents
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Master Systems of Equations with {sections.length} comprehensive lessons
        </p>
      </div>

      {/* Lessons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        perspective: '1500px',
      }}>
        {sections.map((section) => {
          const quizCount = systemsOfEquations.quizzes.filter(q => q.sectionId === section.id).length;
          
          return (
            <Link
              key={section.id}
              to={`/topic/${section.id}`}
              style={{
                textDecoration: 'none',
                color: 'white',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: 'translateZ(0)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-12px) translateZ(40px) rotateX(5deg)';
                  el.style.boxShadow = '0 30px 80px rgba(0, 212, 255, 0.3), inset 0 0 60px rgba(168, 85, 247, 0.1)';
                  el.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0) translateZ(0) rotateX(0deg)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {/* Lesson Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(0, 212, 255, 0.4)',
                }}>
                  {section.id}
                </div>

                {/* Content */}
                <div style={{ paddingRight: '60px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'white',
                  }}>
                    {section.title}
                  </h3>
                  
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                  }}>
                    {section.content.substring(0, 100)}...
                  </p>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span>💡</span>
                      <span>{section.concepts.length} concepts</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span>📝</span>
                      <span>{quizCount} quizzes</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span>📖</span>
                      <span>{section.examples.length} examples</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  fontSize: '1.5rem',
                  opacity: 0.5,
                  transition: 'all 0.3s ease',
                }}>
                  →
                </div>

                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '60px',
      }}>
        <Link
          to="/"
          style={{
            padding: '16px 32px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contents;
