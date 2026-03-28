import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { topics } from '../data';

// 3D Node class
class Node3D {
  lesson: { id: number; title: string; color: string };
  index: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  floatOffset: number;
  floatSpeed: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  hovered: boolean;
  scale: number;
  pulsePhase: number;
  rotationX: number;
  rotationY: number;
  isDarkMode: boolean;
  ctx: CanvasRenderingContext2D;

  constructor(
    lesson: { id: number; title: string; color: string },
    index: number,
    total: number,
    ctx: CanvasRenderingContext2D,
    rotationXRef: { current: number },
    rotationYRef: { current: number },
    isDarkModeRef: { current: boolean }
  ) {
    this.lesson = lesson;
    this.index = index;
    this.ctx = ctx;
    this.rotationX = rotationXRef.current;
    this.rotationY = rotationYRef.current;
    this.isDarkMode = isDarkModeRef.current;
    
    // Position nodes in a circular 3D formation
    const angle = (index / total) * Math.PI * 2;
    const radius = 280;
    const heightVariation = Math.sin(angle * 3) * 100;
    
    this.baseX = Math.cos(angle) * radius;
    this.baseY = Math.sin(angle) * radius;
    this.baseZ = heightVariation;
    
    this.x = this.baseX;
    this.y = this.baseY;
    this.z = this.baseZ;
    
    // Animation properties
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = 0.02 + Math.random() * 0.01;
    this.orbitSpeed = 0.001 + Math.random() * 0.0005;
    this.orbitAngle = angle;
    
    this.size = 40;
    this.hovered = false;
    this.scale = 1;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update(time: number) {
    // Floating animation
    const floatY = Math.sin(time * this.floatSpeed + this.floatOffset) * 15;
    const floatZ = Math.cos(time * this.floatSpeed + this.floatOffset) * 10;
    
    // Orbital movement
    this.orbitAngle += this.orbitSpeed;
    const orbitRadius = 280 + Math.sin(time * 0.001) * 25;
    
    this.x = Math.cos(this.orbitAngle) * orbitRadius;
    this.y = Math.sin(this.orbitAngle) * orbitRadius + floatY;
    this.z = Math.sin(this.orbitAngle * 3) * 100 + floatZ;
    
    // Pulse animation
    this.pulsePhase += 0.05;
    const pulseScale = 1 + Math.sin(this.pulsePhase) * 0.1;
    this.scale = this.hovered ? 1.3 : pulseScale;
  }

  project(width: number, height: number, rotX: number, rotY: number) {
    const perspective = 1000;
    const rotatedX = this.x * Math.cos(rotY) - this.z * Math.sin(rotY);
    const rotatedZ = this.x * Math.sin(rotY) + this.z * Math.cos(rotY);
    const rotatedY = this.y * Math.cos(rotX) - rotatedZ * Math.sin(rotX);
    const finalZ = this.y * Math.sin(rotX) + rotatedZ * Math.cos(rotX);
    
    const scale = perspective / (perspective + finalZ);
    const screenX = rotatedX * scale + width / 2;
    const screenY = rotatedY * scale + height / 2;
    
    return { x: screenX, y: screenY, scale, z: finalZ };
  }

  draw(projected: { x: number; y: number; scale: number; z: number }, isDark: boolean) {
    const ctx = this.ctx;
    const actualSize = this.size * projected.scale * this.scale;
    
    // Enhanced outer glow with multiple layers
    const outerGradient = ctx.createRadialGradient(
      projected.x, projected.y, 0,
      projected.x, projected.y, actualSize * 2
    );
    
    const color = this.lesson.color;
    outerGradient.addColorStop(0, color + 'ff');
    outerGradient.addColorStop(0.3, color + (isDark ? 'cc' : 'aa'));
    outerGradient.addColorStop(0.6, color + (isDark ? '66' : '44'));
    outerGradient.addColorStop(1, color + '00');
    
    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Middle glow layer for depth
    const middleGradient = ctx.createRadialGradient(
      projected.x, projected.y, 0,
      projected.x, projected.y, actualSize * 1.3
    );
    middleGradient.addColorStop(0, color + 'ff');
    middleGradient.addColorStop(0.5, color + 'dd');
    middleGradient.addColorStop(1, color + '00');
    
    ctx.fillStyle = middleGradient;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize * 1.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Core sphere with enhanced 3D metallic effect
    const coreGradient = ctx.createRadialGradient(
      projected.x - actualSize * 0.35, projected.y - actualSize * 0.35, 0,
      projected.x, projected.y, actualSize
    );
    coreGradient.addColorStop(0, '#ffffff');
    coreGradient.addColorStop(0.2, color + 'ff');
    coreGradient.addColorStop(0.6, color);
    coreGradient.addColorStop(1, this.darkenColor(color, 0.4));
    
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner shadow for depth
    const shadowGradient = ctx.createRadialGradient(
      projected.x + actualSize * 0.3, projected.y + actualSize * 0.3, 0,
      projected.x, projected.y, actualSize
    );
    shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
    shadowGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.1)');
    shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = shadowGradient;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced rim highlight with double ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3 * projected.scale;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize * 0.95, 0, Math.PI * 2);
    ctx.stroke();
    
    // Outer ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5 * projected.scale;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, actualSize * 1.05, 0, Math.PI * 2);
    ctx.stroke();
    
    // Lesson number with better contrast
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8 * projected.scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.font = `bold ${Math.floor(18 * projected.scale * this.scale)}px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(this.lesson.id), projected.x, projected.y);
    ctx.shadowBlur = 0;
    
    // Animated ring when hovered
    if (this.hovered) {
      ctx.strokeStyle = color + 'dd';
      ctx.lineWidth = 4 * projected.scale;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, actualSize * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      
      // Pulsing outer ring
      const pulseSize = actualSize * (1.4 + Math.sin(Date.now() * 0.005) * 0.1);
      ctx.strokeStyle = color + '66';
      ctx.lineWidth = 2 * projected.scale;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, pulseSize, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  darkenColor(color: string, factor: number) {
    const hex = color.replace('#', '');
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }

  isHovered(mx: number, my: number, projected: { x: number; y: number; scale: number }) {
    const dx = mx - projected.x;
    const dy = my - projected.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.size * projected.scale * this.scale;
  }
}

const MindMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [isDarkMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Lesson data with colors
    const lessons = topics[0].sections.map((section, index) => ({
      id: section.id,
      title: section.title,
      color: [
        '#7877c6', '#9d8df1', '#b695f8', '#8b7ec8', '#a594e8',
        '#7877c6', '#9d8df1', '#b695f8', '#8b7ec8', '#a594e8'
      ][index]
    }));

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = 0;
    let mouseY = 0;
    const rotationXRef = { current: 0 };
    const rotationYRef = { current: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    const isDarkModeRef = { current: isDarkMode };

    // Create nodes
    const nodes = lessons.map((lesson, i) => 
      new Node3D(lesson, i, lessons.length, ctx, rotationXRef, rotationYRef, isDarkModeRef)
    );

    // Tooltip
    const tooltip = document.getElementById('mindmap-tooltip');
    let hoveredNode: Node3D | null = null;

    // Animation loop
    let time = 0;
    let animationId: number;

    function animate() {
      time++;
      
      if (!ctx) return;
      
      // Smooth rotation
      rotationXRef.current += (targetRotationX - rotationXRef.current) * 0.1;
      rotationYRef.current += (targetRotationY - rotationYRef.current) * 0.1;
      isDarkModeRef.current = isDarkMode;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update nodes
      nodes.forEach(node => node.update(time));
      
      // Project and sort by depth
      const projected = nodes.map(node => ({
        node,
        projected: node.project(width, height, rotationXRef.current, rotationYRef.current)
      })).sort((a, b) => a.projected.z - b.projected.z);
      
      // Draw enhanced connections with glow
      for (let i = 0; i < projected.length; i++) {
        const next = (i + 1) % projected.length;
        const p1 = projected[i].projected;
        const p2 = projected[next].projected;
        
        // Glow layer
        const glowGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        glowGradient.addColorStop(0, projected[i].node.lesson.color + '40');
        glowGradient.addColorStop(0.5, projected[i].node.lesson.color + '50');
        glowGradient.addColorStop(1, projected[next].node.lesson.color + '40');
        
        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        
        // Main gradient line
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, projected[i].node.lesson.color + 'aa');
        gradient.addColorStop(0.5, projected[i].node.lesson.color + 'cc');
        gradient.addColorStop(1, projected[next].node.lesson.color + 'aa');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      
      // Draw nodes
      projected.forEach(({ node, projected: proj }) => {
        node.draw(proj, isDarkMode);
      });
      
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Update rotation based on mouse
      targetRotationX = ((mouseY / height) - 0.5) * 0.5;
      targetRotationY = ((mouseX / width) - 0.5) * 0.5;
      
      // Check hover
      let currentHoveredNode: Node3D | null = null;
      nodes.forEach(node => {
        const proj = node.project(width, height, rotationXRef.current, rotationYRef.current);
        node.hovered = node.isHovered(mouseX, mouseY, proj);
        if (node.hovered) currentHoveredNode = node;
      });
      hoveredNode = currentHoveredNode;
      
      // Show tooltip
      if (currentHoveredNode && tooltip) {
        const node = currentHoveredNode as Node3D;
        tooltip.textContent = `Lesson ${node.lesson.id}: ${node.lesson.title}`;
        tooltip.style.left = (e.clientX + 20) + 'px';
        tooltip.style.top = (e.clientY - 40) + 'px';
        tooltip.style.opacity = '1';
        canvas.style.cursor = 'pointer';
      } else if (tooltip) {
        tooltip.style.opacity = '0';
        canvas.style.cursor = 'default';
      }
    };

    const handleMouseLeave = () => {
      nodes.forEach(node => node.hovered = false);
      if (tooltip) tooltip.style.opacity = '0';
      targetRotationX = 0;
      targetRotationY = 0;
    };

    const handleClick = () => {
      if (hoveredNode) {
        navigate(`/topic/${hoveredNode.lesson.id}`);
      }
    };

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate, isDarkMode]);

  return (
    <div className="page mindmap-page" style={{ 
      minHeight: '100vh', 
      paddingBottom: '60px',
      background: 'transparent',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        transform: 'translateZ(40px)',
        paddingTop: '2rem',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.15))',
          borderRadius: '50px',
          border: '2px solid rgba(0, 212, 255, 0.4)',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0, 212, 255, 0.3)',
        }}>
          <span style={{ fontSize: '2rem' }}>🌌</span>
          <h2 style={{
            color: '#00d4ff',
            fontSize: '2.5rem',
            margin: 0,
            textShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
            fontWeight: 900,
          }}>
            Interactive 3D Mind Map
          </h2>
        </div>
        <p style={{
          textAlign: 'center',
          color: '#e5e5e5',
          fontSize: '1.2rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Navigate through lessons in an immersive 3D space
        </p>
      </div>

      {/* Canvas Container with Modern Design */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        height: '75vh',
        minHeight: '650px',
        margin: '0 auto',
        perspective: '2500px',
        overflow: 'hidden',
        borderRadius: '30px',
        background: isDarkMode 
          ? 'linear-gradient(135deg, rgba(5, 10, 30, 0.95), rgba(15, 5, 35, 0.95))'
          : 'linear-gradient(135deg, rgba(200, 210, 230, 0.95), rgba(180, 190, 220, 0.95))',
        border: isDarkMode 
          ? '3px solid rgba(0, 212, 255, 0.4)'
          : '3px solid rgba(0, 100, 200, 0.3)',
        boxShadow: isDarkMode
          ? 'inset 0 0 100px rgba(0, 212, 255, 0.15), 0 25px 80px rgba(0, 0, 0, 0.6)'
          : 'inset 0 0 100px rgba(0, 100, 200, 0.1), 0 25px 80px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.5s ease',
      }}>
        {/* Day/Night Toggle - Remove since we have global toggle */}
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Tooltip with Modern Glassmorphism */}
        <div
          id="mindmap-tooltip"
          style={{
            position: 'fixed',
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.95), rgba(168, 85, 247, 0.95))'
              : 'linear-gradient(135deg, rgba(0, 150, 255, 0.95), rgba(120, 60, 200, 0.95))',
            color: '#fff',
            padding: '15px 25px',
            borderRadius: '15px',
            fontWeight: 700,
            fontSize: '15px',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'all 0.3s ease',
            zIndex: 999,
            boxShadow: '0 15px 50px rgba(0, 212, 255, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            transform: 'translateZ(100px)',
          }}
        />
      </div>

      {/* Info Panel with Ultra-Modern Cards */}
      <div style={{
        position: 'relative',
        marginTop: '3rem',
        padding: '3.5rem',
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(5, 10, 30, 0.9), rgba(15, 5, 35, 0.9))'
          : 'linear-gradient(135deg, rgba(240, 244, 248, 0.9), rgba(226, 232, 240, 0.9))',
        borderRadius: '30px',
        border: isDarkMode
          ? '3px solid rgba(0, 212, 255, 0.4)'
          : '3px solid rgba(0, 100, 200, 0.3)',
        transform: 'translateZ(30px)',
        transition: 'all 0.5s ease',
        overflow: 'hidden',
        maxWidth: '1400px',
        margin: '3rem auto 0',
        boxShadow: isDarkMode
          ? '0 25px 80px rgba(0, 0, 0, 0.6), inset 0 0 60px rgba(0, 212, 255, 0.1)'
          : '0 25px 80px rgba(0, 0, 0, 0.15), inset 0 0 60px rgba(0, 100, 200, 0.05)',
      }}>
        <h3 style={{
          background: 'linear-gradient(135deg, #00d4ff, #ff006e, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '2.5rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          textShadow: '0 0 30px rgba(0, 212, 255, 0.7)',
          fontWeight: 900,
          letterSpacing: '-1px',
        }}>
          🎮 Interactive Controls
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '2.5rem',
        }}>
          {[
            { icon: '🖱️', title: 'Rotate', desc: 'Move your mouse to rotate the 3D space', color: '#00d4ff' },
            { icon: '👆', title: 'Hover', desc: 'See lesson details on floating nodes', color: '#ff006e' },
            { icon: '🎯', title: 'Click', desc: 'Jump directly to any lesson', color: '#a855f7' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                padding: '2.5rem',
                background: isDarkMode
                  ? `linear-gradient(135deg, ${item.color}15, ${item.color}08)`
                  : `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                borderRadius: '24px',
                border: isDarkMode
                  ? `2px solid ${item.color}40`
                  : `2px solid ${item.color}30`,
                textAlign: 'center',
                transform: 'translateZ(20px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isDarkMode
                  ? `0 10px 30px ${item.color}20`
                  : `0 10px 30px ${item.color}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(40px) translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = isDarkMode
                  ? `0 20px 50px ${item.color}40`
                  : `0 20px 50px ${item.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(20px)';
                e.currentTarget.style.boxShadow = isDarkMode
                  ? `0 10px 30px ${item.color}20`
                  : `0 10px 30px ${item.color}15`;
              }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                filter: `drop-shadow(0 5px 15px ${item.color}80)`,
                animation: 'iconFloat 3s ease-in-out infinite',
                animationDelay: `${idx * 0.2}s`,
              }}>
                {item.icon}
              </div>
              <p style={{
                color: isDarkMode ? '#e5e5e5' : '#2d3748',
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}>
                <strong style={{
                  color: item.color,
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {item.title}
                </strong>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindMap;
