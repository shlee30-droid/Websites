import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { topics } from '../data';
import type { Section, Quiz } from '../types';

interface LocationState {
  answers: number[];
  correctCount: number;
}

const Result: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const state = location.state as LocationState;

  const sectionId = parseInt(topicId || '1');
  const section = topics[0].sections.find((s: Section) => s.id === sectionId);
  const sectionQuizzes = topics[0].quizzes.filter((q: Quiz) => q.sectionId === sectionId);

  if (!section || !state) {
    return (
      <div className="page error" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #ef4444, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          No Results Found
        </h1>
        <Link
          to="/contents"
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
          }}
        >
          Back to Contents
        </Link>
      </div>
    );
  }

  const { answers, correctCount } = state;
  const totalCount = sectionQuizzes.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: 'Excellent!', emoji: '🌟', color: '#10b981' };
    if (pct >= 70) return { label: 'Good Job!', emoji: '👍', color: '#3b82f6' };
    if (pct >= 50) return { label: 'Keep Practicing!', emoji: '💪', color: '#f59e0b' };
    return { label: 'Review the Material', emoji: '📚', color: '#ef4444' };
  };

  const grade = getGrade(percentage);

  // Find next section
  const nextSection = topics[0].sections.find((s: Section) => s.id === sectionId + 1);

  return (
    <div className="page result" style={{
      minHeight: '100vh',
      paddingBottom: '80px',
      perspective: '1500px',
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
        LESSON {sectionId}
      </div>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        transform: 'translateZ(40px)',
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>
          Quiz Complete!
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 400,
        }}>
          {section.title}
        </h2>
      </div>

      {/* Score Card with 3D Effect */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 60px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
        transform: 'translateZ(60px)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Glowing Background Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${grade.color}15, transparent 70%)`,
          borderRadius: '32px',
          pointerEvents: 'none',
        }} />

        {/* Emoji */}
        <div style={{
          fontSize: '5rem',
          marginBottom: '24px',
          animation: 'float 3s ease-in-out infinite',
        }}>
          {grade.emoji}
        </div>

        {/* Grade Label */}
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: grade.color,
          marginBottom: '32px',
        }}>
          {grade.label}
        </h3>

        {/* Score Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontSize: '4rem',
            fontWeight: 800,
            color: grade.color,
            textShadow: `0 0 40px ${grade.color}80`,
          }}>
            {correctCount}
          </span>
          <span style={{
            fontSize: '3rem',
            color: 'rgba(255, 255, 255, 0.3)',
          }}>
            /
          </span>
          <span style={{
            fontSize: '4rem',
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            {totalCount}
          </span>
        </div>

        {/* Percentage */}
        <div style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          background: `linear-gradient(135deg, ${grade.color}, #a855f7)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {percentage}% Correct
        </div>

        {/* Progress Bar */}
        <div style={{
          marginTop: '32px',
          height: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${percentage}%`,
            background: `linear-gradient(90deg, #00d4ff, ${grade.color})`,
            borderRadius: '12px',
            transition: 'width 1s ease-out',
            boxShadow: `0 0 20px ${grade.color}80`,
          }} />
        </div>
      </div>

      {/* Question Breakdown */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '32px',
          textAlign: 'center',
          color: 'white',
        }}>
          Question Breakdown
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {sectionQuizzes.map((quiz: Quiz, index: number) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === quiz.correctAnswer;

            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  borderRadius: '20px',
                  padding: '28px',
                  position: 'relative',
                  transform: 'translateZ(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Header Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    Question {index + 1}
                  </span>
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: isCorrect ? '#10b981' : '#ef4444',
                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  }}>
                    {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                  </span>
                </div>

                {/* Question */}
                <p style={{
                  fontSize: '1.1rem',
                  color: 'white',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                }}>
                  {quiz.question}
                </p>

                {/* Options */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  {quiz.options.map((option: string, optIndex: number) => {
                    const isUserAnswer = userAnswer === optIndex;
                    const isCorrectAnswer = optIndex === quiz.correctAnswer;
                    
                    let borderColor = 'rgba(255, 255, 255, 0.1)';
                    let bgColor = 'rgba(255, 255, 255, 0.02)';
                    
                    if (isCorrectAnswer) {
                      borderColor = 'rgba(16, 185, 129, 0.5)';
                      bgColor = 'rgba(16, 185, 129, 0.1)';
                    } else if (isUserAnswer && !isCorrect) {
                      borderColor = 'rgba(239, 68, 68, 0.5)';
                      bgColor = 'rgba(239, 68, 68, 0.1)';
                    }

                    return (
                      <div
                        key={optIndex}
                        style={{
                          padding: '14px 18px',
                          background: bgColor,
                          border: `1px solid ${borderColor}`,
                          borderRadius: '12px',
                          fontSize: '0.95rem',
                          color: isCorrectAnswer ? '#10b981' : isUserAnswer ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <span style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isCorrectAnswer ? '#10b981' : isUserAnswer ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: isCorrectAnswer || isUserAnswer ? 'white' : 'rgba(255, 255, 255, 0.5)',
                          flexShrink: 0,
                        }}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{option}</span>
                        {isCorrectAnswer && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        {isUserAnswer && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '60px',
        flexWrap: 'wrap',
        padding: '0 20px',
      }}>
        <Link
          to={`/quiz/${sectionId}`}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.3)';
          }}
        >
          🔄 Try Again
        </Link>

        <Link
          to={`/topic/${sectionId}`}
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          📖 Review Lesson
        </Link>

        {nextSection && (
          <Link
            to={`/topic/${nextSection.id}`}
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
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Next Lesson →
          </Link>
        )}

        <Link
          to="/contents"
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          📚 All Lessons
        </Link>
      </div>
    </div>
  );
};

export default Result;
