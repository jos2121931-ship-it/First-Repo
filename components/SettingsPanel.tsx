
import React from 'react';
import { StoreConfig, DaysOfWeek } from '../types';
import { DAYS } from '../constants';

interface SettingsPanelProps {
  config: StoreConfig;
  onChange: (config: StoreConfig) => void;
  onRefreshAI: () => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, onChange, onRefreshAI, onClose }) => {
  const handleHoursChange = (day: DaysOfWeek, field: 'open' | 'close' | 'isClosed', value: any) => {
    const newHours = { ...config.hours, [day]: { ...config.hours[day], [field]: value } };
    onChange({ ...config, hours: newHours });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-zinc-900 border-l border-zinc-800 p-6 overflow-y-auto z-50 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Signage Settings</h2>
        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Store Info</label>
          <input 
            type="text" 
            placeholder="Store Name"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white mb-2"
            value={config.name}
            onChange={(e) => onChange({ ...config, name: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Tagline"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white mb-2"
            value={config.tagline}
            onChange={(e) => onChange({ ...config, tagline: e.target.value })}
          />
          <textarea 
            placeholder="Store Vibe (e.g. cozy, minimal, energetic)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm"
            rows={2}
            value={config.vibe}
            onChange={(e) => onChange({ ...config, vibe: e.target.value })}
          />
          <button 
            onClick={onRefreshAI}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-colors text-sm"
          >
            Update AI Messages
          </button>
        </section>

        <section>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Hours of Operation</label>
          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={day} className="flex flex-col space-y-2 p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{day}</span>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="form-checkbox bg-zinc-800 border-zinc-700 rounded text-blue-600"
                      checked={config.hours[day].isClosed}
                      onChange={(e) => handleHoursChange(day, 'isClosed', e.target.checked)}
                    />
                    <span className="text-xs text-zinc-400">Closed</span>
                  </label>
                </div>
                {!config.hours[day].isClosed && (
                  <div className="flex items-center space-x-2">
                    <input 
                      type="time" 
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white flex-1"
                      value={config.hours[day].open}
                      onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                    />
                    <span className="text-zinc-500 text-xs">to</span>
                    <input 
                      type="time" 
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white flex-1"
                      value={config.hours[day].close}
                      onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
