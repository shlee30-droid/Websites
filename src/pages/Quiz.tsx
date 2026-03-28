import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topics } from '../data';
import type { Section, Quiz, QuizSession } from '../types';

const Quiz: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const sectionId = parseInt(topicId || '1');
  
  const topic = topics[0]; // Systems of Equations
  const section = topic?.sections.find((s: Section) => s.id === sectionId);
  const sectionQuizzes = topic?.quizzes.filter((q: Quiz) => q.sectionId === sectionId) || [];

  // Initialize session state with section quizzes
  const [session, setSession] = useState<QuizSession>(() => ({
    topicId: topicId || '1',
    questions: sectionQuizzes,
    currentIndex: 0,
    answers: {},
  }));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!section || sectionQuizzes.length === 0) {
    return <div className="page loading text-center" style={{ padding: '4rem' }}>
      <h2>Loading quiz...</h2>
    </div>;
  }

  const currentQuestion = session.questions[session.currentIndex];
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Save answer
    setSession({
      ...session,
      answers: {
        ...session.answers,
        [currentQuestion.id]: selectedAnswer,
      },
    });
  };

  const handleNext = () => {
    if (session.currentIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
      });
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz complete, navigate to results
      const finalAnswers = {
        ...session.answers,
        [currentQuestion.id]: selectedAnswer,
      };
      
      // Calculate correct count
      const correctCount = session.questions.reduce((count, question) => {
        const userAnswer = finalAnswers[question.id];
        return userAnswer === question.correctAnswer ? count + 1 : count;
      }, 0);
      
      // Convert answers object to array format
      const answersArray = session.questions.map(q => finalAnswers[q.id] ?? -1);
      
      navigate(`/result/${sectionId}`, {
        state: {
          answers: answersArray,
          correctCount: correctCount,
        },
      });
    }
  };

  return (
    <div className="page quiz" style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}>
      {/* Quiz Header with 3D Badge */}
      <div className="quiz-header" style={{
        textAlign: 'center',
        marginBottom: '3rem',
        transform: 'translateZ(60px)',
        transition: 'all 0.4s ease'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.8rem 2rem',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.2rem',
          borderRadius: '50px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0, 212, 255, 0.5)',
          animation: 'floatBadge 3s ease-in-out infinite',
          letterSpacing: '3px'
        }}>
          QUIZ
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Lesson {sectionId}: {section.title}
        </h2>
        <p style={{ color: '#e5e5e5', fontSize: '1.2rem' }}>
          Test your understanding with 5 challenging questions
        </p>
        
        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(0, 212, 255, 0.2)',
          borderRadius: '10px',
          marginTop: '2rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
            borderRadius: '10px',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
          }}></div>
        </div>
        <p style={{ marginTop: '0.5rem', color: '#a855f7', fontWeight: 600 }}>
          Question {session.currentIndex + 1} of {session.questions.length}
        </p>
      </div>

      {/* Question Card with 3D Effect */}
      <div className="question-card" style={{
        position: 'relative',
        padding: '2.5rem',
        marginBottom: '2.5rem',
        background: 'rgba(20, 20, 50, 0.7)',
        borderRadius: '25px',
        border: '2px solid rgba(0, 212, 255, 0.3)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
        transform: 'translateZ(30px)',
        transition: 'all 0.4s ease'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '30px',
          width: '50px',
          height: '50px',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          color: '#fff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '1.1rem',
          boxShadow: '0 5px 20px rgba(0, 212, 255, 0.6)'
        }}>
          Q{session.currentIndex + 1}
        </div>
        
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.4rem',
          fontWeight: 700,
          marginTop: '1rem',
          marginBottom: '1.5rem',
          lineHeight: 1.6
        }}>
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {currentQuestion.options.map((option: string, index: number) => (
            <label key={index} className="option-label" style={{
              background: selectedAnswer === index ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 212, 255, 0.05)',
              borderColor: selectedAnswer === index ? '#00d4ff' : 'rgba(0, 212, 255, 0.2)',
              boxShadow: selectedAnswer === index ? '0 10px 30px rgba(0, 212, 255, 0.3)' : 'none',
              ...(showFeedback && index === currentQuestion.correctAnswer && {
                borderColor: '#10b981',
                background: 'rgba(16, 185, 129, 0.2)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
              }),
              ...(showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && {
                borderColor: '#ef4444',
                background: 'rgba(239, 68, 68, 0.2)',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)'
              })
            }}>
              <input
                type="radio"
                name="answer"
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                style={{ marginRight: '1rem', width: '20px', height: '20px', accentColor: '#00d4ff' }}
              />
              <span style={{ color: '#e5e5e5', fontSize: '1.1rem', fontWeight: 600 }}>
                {option}
              </span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        {!showFeedback && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn"
              style={{
                padding: '1.2rem 3rem',
                fontSize: '1.2rem',
                opacity: selectedAnswer === null ? 0.5 : 1,
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderRadius: '15px',
            border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`
          }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              color: isCorrect ? '#10b981' : '#ef4444',
              marginBottom: '1rem'
            }}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </h3>
            <p style={{ 
              color: '#e5e5e5',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '1rem'
            }}>
              {currentQuestion.explanation}
            </p>
            {!isCorrect && (
              <p style={{ color: '#a855f7', fontSize: '1.05rem' }}>
                The correct answer is: <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
              </p>
            )}
            <button onClick={handleNext} className="btn" style={{ marginTop: '1rem' }}>
              {session.currentIndex < session.questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

