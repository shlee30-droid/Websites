import React, { useEffect, useRef, useState } from 'react';
import './GraphVisualizer.css';

interface GraphVisualizerProps {
  equations: Array<{
    label: string;
    equation: (x: number) => number;
    color: string;
  }>;
  solution?: { x: number; y: number };
  title?: string;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  equations,
  solution,
  title,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Graph settings
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    const xMin = -2;
    const xMax = 8;
    const yMin = -2;
    const yMax = 8;

    // Helper functions
    const xToCanvas = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * graphWidth;
    const yToCanvas = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * graphHeight;

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      const canvasX = xToCanvas(x);
      ctx.beginPath();
      ctx.moveTo(canvasX, padding);
      ctx.lineTo(canvasX, height - padding);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      const canvasY = yToCanvas(y);
      ctx.beginPath();
      ctx.moveTo(padding, canvasY);
      ctx.lineTo(width - padding, canvasY);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    
    // X-axis
    const yAxisCanvasY = yToCanvas(0);
    ctx.beginPath();
    ctx.moveTo(padding, yAxisCanvasY);
    ctx.lineTo(width - padding, yAxisCanvasY);
    ctx.stroke();

    // Y-axis
    const xAxisCanvasX = xToCanvas(0);
    ctx.beginPath();
    ctx.moveTo(xAxisCanvasX, padding);
    ctx.lineTo(xAxisCanvasX, height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x !== 0) {
        const canvasX = xToCanvas(x);
        ctx.fillText(x.toString(), canvasX, yAxisCanvasY + 5);
      }
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y !== 0) {
        const canvasY = yToCanvas(y);
        ctx.fillText(y.toString(), xAxisCanvasX - 5, canvasY);
      }
    }

    // Draw equations
    equations.forEach((eq) => {
      ctx.strokeStyle = eq.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      let started = false;

      for (let x = xMin; x <= xMax; x += 0.1) {
        try {
          const y = eq.equation(x);
          if (y >= yMin && y <= yMax) {
            const canvasX = xToCanvas(x);
            const canvasY = yToCanvas(y);
            if (!started) {
              ctx.moveTo(canvasX, canvasY);
              started = true;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          }
        } catch {
          // Skip invalid points
        }
      }
      ctx.stroke();

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = eq.color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Draw solution point
    if (solution) {
      const canvasX = xToCanvas(solution.x);
      const canvasY = yToCanvas(solution.y);

      // Outer glow
      const gradient = ctx.createRadialGradient(canvasX, canvasY, 0, canvasX, canvasY, 20);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Main point
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(canvasX - 2, canvasY - 2, 3, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`(${solution.x}, ${solution.y})`, canvasX + 12, canvasY - 8);
    }

    // Draw hovered point
    if (hoveredPoint) {
      const canvasX = xToCanvas(hoveredPoint.x);
      const canvasY = yToCanvas(hoveredPoint.y);

      ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [equations, solution, hoveredPoint]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = 40;
    const graphWidth = rect.width - 2 * padding;
    const graphHeight = rect.height - 2 * padding;
    const xMin = -2;
    const xMax = 8;
    const yMin = -2;
    const yMax = 8;

    const graphX = xMin + ((x - padding) / graphWidth) * (xMax - xMin);
    const graphY = yMax - ((y - padding) / graphHeight) * (yMax - yMin);

    if (graphX >= xMin && graphX <= xMax && graphY >= yMin && graphY <= yMax) {
      setHoveredPoint({ x: parseFloat(graphX.toFixed(1)), y: parseFloat(graphY.toFixed(1)) });
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="graph-visualizer">
      {title && <h3 className="graph-title">{title}</h3>}
      <div className="graph-container">
        <canvas
          ref={canvasRef}
          className="graph-canvas"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        />
        <div className="graph-legend">
          {equations.map((eq, idx) => (
            <div key={idx} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: eq.color }} />
              <span className="legend-label">{eq.label}</span>
            </div>
          ))}
          {solution && (
            <div className="legend-item solution-legend">
              <div className="legend-color solution-color" />
              <span className="legend-label">Solution: ({solution.x}, {solution.y})</span>
            </div>
          )}
        </div>
        {hoveredPoint && (
          <div className="hover-info">
            Point: ({hoveredPoint.x}, {hoveredPoint.y})
          </div>
        )}
      </div>
    </div>
  );
};
