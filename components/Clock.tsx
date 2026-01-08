
import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end">
      <div className="text-5xl font-light tracking-tight tabular-nums">
        {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
      </div>
      <div className="text-lg font-medium opacity-60 uppercase tracking-widest">
        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};
