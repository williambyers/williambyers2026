// app/components/OutorbitLogo.tsx

export default function OutorbitLogo({ size = 120 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <style>{`
        .oo-wrap {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .oo-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed #FF4A1C;
          opacity: 0.6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .oo-ring-1 { width: 50%; height: 50%; }
        .oo-ring-2 { width: 75%; height: 75%; }

        .oo-core {
          position: absolute;
          width: 25%;
          height: 25%;
          background: #FF4A1C;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* ORBIT CONTAINER */
        .oo-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center;
        }

        .orbit-1 {
          width: 50%;
          height: 50%;
          animation: spin 6s linear infinite;
        }

        .orbit-2 {
          width: 75%;
          height: 75%;
          animation: spin-reverse 10s linear infinite;
        }

        /* DOTS */
        .oo-dot {
          position: absolute;
          background: #FF4A1C;
          border-radius: 50%;
        }

        .dot-1 {
          width: 10%;
          height: 10%;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .dot-2 {
          width: 7%;
          height: 7%;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .dot-3 {
          width: 9%;
          height: 9%;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      <div className="oo-wrap">
        {/* Rings */}
        <div className="oo-ring oo-ring-1" />
        <div className="oo-ring oo-ring-2" />

        {/* Core */}
        <div className="oo-core" />

        {/* Inner orbit */}
        <div className="oo-orbit orbit-1">
          <div className="oo-dot dot-1" />
        </div>

        {/* Outer orbit */}
        <div className="oo-orbit orbit-2">
          <div className="oo-dot dot-2" />
          <div className="oo-dot dot-3" />
        </div>
      </div>
    </div>
  );
}
