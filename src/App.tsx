import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Contents from './pages/Contents';
import Topic from './pages/Topic';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import MindMap from './pages/MindMap';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Router basename="/Websites">
      <div className="app" style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
          : 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
        minHeight: '100vh',
        transition: 'background 0.5s ease',
      }}>
        {/* Navigation Header */}
        <header style={{
          background: isDarkMode ? 'rgba(10, 10, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderBottom: isDarkMode ? '2px solid rgba(0, 212, 255, 0.3)' : '2px solid rgba(0, 100, 200, 0.2)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(20px)',
          transition: 'all 0.5s ease',
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link to="/" style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}>
              Basic Arithmetic Operations
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <nav style={{
                display: 'flex',
                gap: '2rem',
              }}>
                <Link to="/" style={{
                  color: isDarkMode ? 'white' : '#1a202c',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease',
                }}>Home</Link>
                <Link to="/mindmap" style={{
                  color: isDarkMode ? 'white' : '#1a202c',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease',
                }}>Mind-map</Link>
                <Link to="/contents" style={{
                  color: isDarkMode ? 'white' : '#1a202c',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease',
                }}>Lessons</Link>
              </nav>
              
              {/* Global Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  width: '50px',
                  height: '50px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #FDB813 0%, #FF6B35 100%)' 
                    : 'linear-gradient(135deg, #4B0082 0%, #191970 100%)',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDarkMode 
                    ? '0 5px 20px rgba(253, 184, 19, 0.4)' 
                    : '0 5px 20px rgba(75, 0, 130, 0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isDarkMode ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/topic/:topicId" element={<Topic />} />
          <Route path="/quiz/:topicId" element={<Quiz />} />
          <Route path="/result/:topicId" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
