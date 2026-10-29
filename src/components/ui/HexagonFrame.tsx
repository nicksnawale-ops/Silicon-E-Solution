import React from 'react';

interface HexagonFrameProps {
  children: React.ReactNode;
  size?: number; // width in pixels
  className?: string;
  borderColor?: string;
  bgColor?: string;
  glow?: boolean;
}

export const HexagonFrame: React.FC<HexagonFrameProps> = ({
  children,
  size = 56,
  className = '',
  borderColor = 'rgba(10, 139, 211, 0.25)',
  bgColor = 'rgba(232, 246, 253, 0.65)',
  glow = false,
}) => {
  // Height for a regular pointy-topped hexagon with aspect ratio ~1.1547
  const height = Math.round(size * 1.12);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${glow ? 'hover:shadow-[0_0_20px_rgba(10,139,211,0.25)]' : ''} ${className}`}
      style={{ width: size, height }}
    >
      <svg
        viewBox="0 0 100 115"
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 2 L96 28 L96 87 L50 113 L4 87 L4 28 Z"
          fill={bgColor}
          stroke={borderColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center text-[#0A8BD3]">
        {children}
      </div>
    </div>
  );
};
