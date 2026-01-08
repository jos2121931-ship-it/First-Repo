
import React, { useState, useEffect, useCallback } from 'react';
import { StoreConfig, AIContent } from './types';
import { DEFAULT_CONFIG } from './constants';
import { SignageDisplay } from './components/SignageDisplay';
import { SettingsPanel } from './components/SettingsPanel';
import { generateBrandingContent } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_CONFIG);
  const [showSettings, setShowSettings] = useState(false);
  const [aiContent, setAiContent] = useState<AIContent>({
    greeting: "Welcome to the SCC Student Tech Center and Help Desk",
    announcement: "Professional technology support for all SCC students and staff."
  });
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const fetchAIContent = useCallback(async () => {
    setIsLoadingAI(true);
    try {
      const result = await generateBrandingContent(config);
      setAiContent(result);
    } catch (error) {
      console.error("Failed to load AI content");
    } finally {
      setIsLoadingAI(false);
    }
  }, [config]);

  useEffect(() => {
    fetchAIContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcut to open settings (useful for hidden TV setup)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' && e.ctrlKey) {
        setShowSettings(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <SignageDisplay 
        config={config} 
        aiContent={aiContent} 
      />

      {/* Admin Button (Hidden/Subtle) */}
      {!showSettings && (
        <button 
          onClick={() => setShowSettings(true)}
          className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-zinc-800/20 hover:bg-zinc-800/80 flex items-center justify-center transition-all opacity-0 hover:opacity-100 z-40"
          title="Open Settings (Ctrl+S)"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      )}

      {showSettings && (
        <SettingsPanel 
          config={config} 
          onChange={setConfig} 
          onRefreshAI={fetchAIContent}
          onClose={() => setShowSettings(false)}
        />
      )}

      {isLoadingAI && (
        <div className="fixed top-4 left-4 flex items-center space-x-2 text-zinc-500 text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Synchronizing with AI...</span>
        </div>
      )}
    </div>
  );
};

export default App;
