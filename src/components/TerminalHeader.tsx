
import { useState, useEffect } from 'react';

const TerminalHeader = () => {
  const [text, setText] = useState('');
  const fullText = 'MemeHustle > Cyberpunk AI Marketplace v2.077';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black border-b-2 border-green-400 p-4 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-green-400 text-sm">
          Status: <span className="text-pink-500">ONLINE</span> | 
          Users: <span className="text-blue-400">1337</span> | 
          Credits: <span className="text-yellow-400">∞</span>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-green-400">root@memehustle:~$ </span>
        <span className="typing-effect text-pink-500">{text}</span>
      </div>
    </div>
  );
};

export default TerminalHeader;
