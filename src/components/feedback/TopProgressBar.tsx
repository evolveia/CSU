import React, { useEffect, useState } from 'react';

interface TopProgressBarProps {
  isLoading: boolean;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
      setProgress(25);
      timer1 = setTimeout(() => setProgress(75), 200);
      timer2 = setTimeout(() => setProgress(90), 450);
    } else {
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(hideTimer);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent overflow-hidden pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#D9B84A] via-[#C9A227] to-[#E9CE7A] shadow-[0_0_10px_#C9A227] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
