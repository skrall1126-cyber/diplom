"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className="relative">
      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0118]">
          <div className="relative">
            {/* Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-violet-500/30 border-t-violet-500"></div>
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center">
                <span className="text-sm font-bold text-white">IC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content with fade effect */}
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Progress bar */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-violet-600 to-purple-800 animate-progress"></div>
      )}


    </div>
  );
}
