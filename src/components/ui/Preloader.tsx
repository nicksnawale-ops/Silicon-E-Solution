import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if visited in this session
    const hasVisited = sessionStorage.getItem('silicon_preloader_seen');
    if (hasVisited) {
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('silicon_preloader_seen', 'true');
      if (onComplete) onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle ambient light gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,139,211,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Logo container with centered soft blue glow pulse behind it */}
            <div className="relative flex items-center justify-center mb-6">
              {/* Soft blue glow pulse directly behind logo, z-0 */}
              <motion.div
                initial={{ opacity: 0.3, scale: 0.85 }}
                animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.85, 1.15, 0.85] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(10,139,211,0.22)_0%,transparent_70%)] pointer-events-none blur-xl z-0"
              />

              {/* Animated transparent logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex items-center justify-center"
              >
                <img
                  src="/assets/silicon-logo.png"
                  alt="Silicon e Solution"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xs font-semibold text-[#4A5B6E] tracking-wider uppercase mt-1">
                A Complete IT Infrastructure Solution Provider
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-[#E8F6FD] rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
