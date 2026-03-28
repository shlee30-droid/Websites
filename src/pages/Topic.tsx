import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { topics } from '../data';
import type { Section, Example } from '../types';
import { GraphVisualizer } from '../components/GraphVisualizer';

const Topic: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const sectionId = parseInt(topicId || '1');
  
  const topic = topics[0]; // Systems of Equations
  const section = topic?.sections.find((s: Section) => s.id === sectionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectionId]);

  if (!section) {
    return (
      <div className="page error text-center">
        <h1>Lesson Not Found</h1>
        <Link to="/contents" className="btn">
          Back to Contents
        </Link>
      </div>
    );
  }

  const handleStartQuiz = () => {
    navigate(`/quiz/${sectionId}`);
  };

  return (
    <div className="page topic" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
      {/* Lesson Header with 3D Effect */}
      <div className="lesson-header" style={{
        textAlign: 'center',
        marginBottom: '3rem',
        position: 'relative',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(168, 85, 247, 0.1))',
        borderRadius: '25px',
        border: '2px solid rgba(0, 212, 255, 0.3)',
        transform: 'translateZ(50px)',
        transition: 'transform 0.3s ease'
      }}>
        <div className="lesson-number" style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#fff',
          boxShadow: '0 10px 40px rgba(0, 212, 255, 0.6)',
          animation: 'float 3s ease-in-out infinite'
        }}>
          {sectionId}
        </div>
        <h2 style={{ fontSize: '2.8rem', marginTop: '2rem', marginBottom: '0.5rem' }}>
          {section.title}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a855f7', fontWeight: 600 }}>
          📖 Comprehensive Study Guide
        </p>
      </div>

      {/* Summary Card with 3D Hover */}
      <div className="summary-card" style={{
        position: 'relative',
        padding: '2.5rem',
        marginBottom: '3rem',
        background: 'rgba(20, 20, 50, 0.9)',
        borderRadius: '25px',
        border: '2px solid rgba(0, 212, 255, 0.4)',
        transform: 'translateZ(30px)',
        transition: 'all 0.4s ease',
        overflow: 'hidden'
      }}>
        <h3 style={{ color: '#00d4ff', fontSize: '1.8rem', marginBottom: '1rem' }}>
          📌 Overview
        </h3>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#e5e5e5' }}>
          {section.content}
        </p>
      </div>

      {/* Key Concepts Section */}
      <div className="concepts-section" style={{
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(168, 85, 247, 0.05)',
        borderRadius: '25px',
        transform: 'translateZ(20px)'
      }}>
        <h3 style={{ color: '#a855f7', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          💡 Key Concepts
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {section.concepts.map((concept: string, index: number) => (
            <li key={index} className="concept-item">
              <span style={{ fontSize: '1.1rem', color: '#e5e5e5', lineHeight: 1.6 }}>
                {concept}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Worked Examples Section */}
      <div className="examples-section" style={{ marginBottom: '3rem' }}>
        <h3 style={{ color: '#00d4ff', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          📝 Worked Examples
        </h3>
        
        {/* Interactive Graphs for Lesson 7 */}
        {sectionId === 7 && (
          <div style={{ marginBottom: '3rem' }}>
            <GraphVisualizer
              title="Interactive Example 1: Two Lines Intersecting at (1, 3)"
              equations={[
                {
                  label: 'y = 2x + 1',
                  equation: (x) => 2 * x + 1,
                  color: '#00d4ff',
                },
                {
                  label: 'y = -x + 4',
                  equation: (x) => -x + 4,
                  color: '#ff006e',
                },
              ]}
              solution={{ x: 1, y: 3 }}
            />
            
            <GraphVisualizer
              title="Interactive Example 2: Parallel Lines (No Solution)"
              equations={[
                {
                  label: 'y = 2x + 1',
                  equation: (x) => 2 * x + 1,
                  color: '#00d4ff',
                },
                {
                  label: 'y = 2x - 3',
                  equation: (x) => 2 * x - 3,
                  color: '#a855f7',
                },
              ]}
            />
            
            <GraphVisualizer
              title="Interactive Example 3: Same Line (Infinitely Many Solutions)"
              equations={[
                {
                  label: 'y = x + 2',
                  equation: (x) => x + 2,
                  color: '#00d4ff',
                },
                {
                  label: '2y = 2x + 4 (same as y = x + 2)',
                  equation: (x) => x + 2,
                  color: '#00d4ff',
                },
              ]}
            />
          </div>
        )}
        
        {section.examples.map((example: Example, index: number) => (
          <div key={index} className="example-card">
            <div className="example-number">{index + 1}</div>
            <h4 style={{ color: '#a855f7', fontSize: '1.5rem', marginBottom: '1rem' }}>
              {example.heading}
            </h4>
            <pre style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '1.5rem',
              borderRadius: '12px',
              borderLeft: '4px solid #00d4ff',
              color: '#e5e5e5',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              overflowX: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {example.text}
            </pre>
          </div>
        ))}
      </div>

      {/* Quiz Section with 3D Button */}
      <div className="quiz-section" style={{ textAlign: 'center', margin: '4rem 0 3rem 0' }}>
        <button onClick={handleStartQuiz} className="quiz-button">
          <span>Take Lesson {sectionId} Quiz</span>
          <span>→</span>
        </button>
      </div>

      {/* Contact Card */}
      <div className="contact-card" style={{
        padding: '1.5rem',
        background: 'rgba(20, 20, 50, 0.6)',
        borderRadius: '15px',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        textAlign: 'center',
        transform: 'translateZ(15px)',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1rem', color: '#d0d0d0' }}>
          📧 Questions? Contact: <strong style={{ color: '#00d4ff' }}>010-5103-3405</strong>,{' '}
          <a href="mailto:shlee110115@gmail.com" style={{ color: '#a855f7', textDecoration: 'none' }}>
            shlee110115@gmail.com
          </a>, or <strong style={{ color: '#00d4ff' }}>@eddieweirdo13</strong> on Instagram
        </p>
      </div>

      {/* Navigation */}
      <div className="nav-actions text-center">
        <Link to="/contents" className="btn">
          ← Back to Contents
        </Link>
      </div>
    </div>
  );
};

export default Topic;

