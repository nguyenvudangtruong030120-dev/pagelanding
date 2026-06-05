import React from "react";

interface LotusLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LotusLogo({ className = "", iconOnly = false, size = "md" }: LotusLogoProps) {
  // exact spacing matching the uploaded graphic
  const containerClasses = `inline-flex items-center gap-4 ${className}`;
  
  // Custom styled lotus flower bud outline using sleek vector paths
  const lotusIcon = (
    <svg
      viewBox="0 0 160 200"
      className="w-auto select-none"
      style={{
        height: size === "sm" ? "36px" : size === "md" ? "48px" : "64px"
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer elegant Lotus Bud lines, designed to mimic hand-drawn organic linework */}
      <g stroke="#f0887e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        {/* Main central bud petal */}
        <path d="M 80,180 C 80,180 30,120 50,70 C 60,45 75,20 80,15 C 85,20 100,45 110,70 C 130,120 80,180 80,180 Z" />
        
        {/* Left inner matching curves */}
        <path d="M 80,180 C 60,160 40,125 45,95 C 48,75 62,55 72,40 C 65,55 60,75 65,95 C 70,115 80,135 80,180" />
        <path d="M 80,180 C 45,150 30,110 35,80 C 37,65 42,50 50,35 C 42,55 42,75 48,95" />
        
        {/* Right inner matching curves */}
        <path d="M 80,180 C 100,160 120,125 115,95 C 112,75 98,55 88,40 C 95,55 100,75 95,95 C 90,115 80,135 80,180" opacity="0.9" />
        <path d="M 80,180 C 115,150 130,110 125,80 C 123,65 118,50 110,35 C 118,55 118,75 112,95" opacity="0.9"/>
        
        {/* Extra outer flared layers / leaves at the base to perfectly match the uploaded image */}
        <path d="M 80,180 C 65,175 45,155 35,135 C 28,120 28,110 33,105 C 38,100 45,108 55,125 C 65,145 80,180 80,180 Z" strokeWidth="2" />
        <path d="M 80,180 C 95,175 115,155 125,135 C 132,120 132,110 127,105 C 122,100 115,108 105,125 C 95,145 80,180 80,180 Z" strokeWidth="2" />
        
        <path d="M 80,180 C 60,190 40,180 25,165 C 16,155 15,145 22,143 C 28,140 38,145 48,155 C 58,165 80,180 80,180 Z" strokeWidth="1.8" />
        <path d="M 80,180 C 100,192 120,180 135,165 C 144,155 145,145 138,143 C 132,140 122,145 112,155 C 102,165 80,180 80,180 Z" strokeWidth="1.8" />
      </g>
    </svg>
  );

  if (iconOnly) {
    return lotusIcon;
  }

  return (
    <div className={containerClasses}>
      {lotusIcon}
      
      {/* Elegant Serif wordmark exactly matching the Lotus Consulting typographic styling in the PDF screenshot */}
      <span 
        className="font-serif font-medium tracking-tight text-white select-none whitespace-nowrap"
        style={{
          fontFamily: "'Playfair Display', 'Didot', 'Georgia', serif",
          fontSize: size === "sm" ? "1.1rem" : size === "md" ? "1.6rem" : "2.2rem",
          letterSpacing: "-0.02em"
        }}
      >
        Lotus Consulting
      </span>
    </div>
  );
}
