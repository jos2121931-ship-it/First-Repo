
import React from 'react';
import { StoreConfig, AIContent, DaysOfWeek } from '../types';
import { DAYS } from '../constants';
import { Clock } from './Clock';

interface SignageDisplayProps {
  config: StoreConfig;
  aiContent: AIContent;
}

export const SignageDisplay: React.FC<SignageDisplayProps> = ({ config, aiContent }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DaysOfWeek;
  const currentHours = config.hours[today];
  
  const checkIfOpen = () => {
    if (currentHours.isClosed) return false;
    const now = new Date();
    const [openH, openM] = currentHours.open.split(':').map(Number);
    const [closeH, closeM] = currentHours.close.split(':').map(Number);
    
    const openTime = new Date(now);
    openTime.setHours(openH, openM, 0);
    
    const closeTime = new Date(now);
    closeTime.setHours(closeH, closeM, 0);
    
    return now >= openTime && now <= closeTime;
  };

  const format12h = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${h12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const isOpen = checkIfOpen();

  // SCC-inspired colors
  const SCC_GREEN = '#00573d';
  const SCC_GOLD = '#ffc72c';

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-zinc-50 text-zinc-900">
      {/* Top Banner (Institutional Header) */}
      <div style={{ backgroundColor: SCC_GREEN }} className="h-4 w-full" />
      
      {/* Main Container */}
      <div className="flex-1 flex flex-col p-12 lg:p-16">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-16 border-b-2 border-zinc-200 pb-8">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-6xl font-extrabold tracking-tight text-zinc-900">
                {config.name}
              </h1>
              <p style={{ color: SCC_GREEN }} className="text-xl font-bold tracking-widest uppercase">
                {config.tagline}
              </p>
            </div>
          </div>
          <div className="bg-white px-8 py-4 rounded-xl border border-zinc-200 shadow-sm">
            <Clock />
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="flex-1 grid grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Greeting & Info */}
          <div className="col-span-7 flex flex-col justify-between">
            <div className="space-y-8">
               <div className="space-y-6">
                 <div className={`inline-block px-10 py-4 rounded-2xl text-5xl font-black uppercase tracking-widest shadow-lg ${isOpen ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                   {isOpen ? 'Open' : 'Closed'}
                 </div>
                 <h2 style={{ color: SCC_GREEN }} className="text-7xl font-black leading-[1.1] tracking-tighter">
                   {aiContent.greeting}
                 </h2>
               </div>

               <div className="border-l-8 pl-8 py-4" style={{ borderColor: SCC_GOLD }}>
                 <p className="text-3xl font-medium text-zinc-600 leading-snug">
                   {aiContent.announcement}
                 </p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-zinc-500 mb-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-60">Campus Location</h4>
                <p className="text-xl font-bold text-zinc-800">{config.address}</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-60">Department Contact</h4>
                <p className="text-xl font-bold text-zinc-800">{config.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Card */}
          <div className="col-span-5 flex flex-col">
            <div className="flex-1 bg-white border-2 border-zinc-100 rounded-3xl shadow-xl overflow-hidden flex flex-col">
              <div style={{ backgroundColor: SCC_GREEN }} className="p-8">
                <h3 style={{ color: SCC_GOLD }} className="text-2xl font-black uppercase tracking-tighter text-center">
                  Official Hours
                </h3>
              </div>
              <div className="flex-1 p-8 space-y-4 flex flex-col justify-center">
                {DAYS.map((day) => (
                  <div 
                    key={day} 
                    className={`flex justify-between items-center py-3 px-6 rounded-xl transition-all duration-300 ${day === today ? 'ring-2 ring-offset-2 scale-105' : 'opacity-80'}`}
                    style={day === today ? { backgroundColor: SCC_GREEN, color: 'white', boxShadow: `0 0 0 2px ${SCC_GOLD}` } : {}}
                  >
                    <span className="text-xl font-bold uppercase tracking-tight">
                      {day}
                    </span>
                    <span className="text-xl font-medium tabular-nums">
                      {config.hours[day].isClosed 
                        ? <span className="uppercase text-sm tracking-widest font-black opacity-50">Closed</span> 
                        : `${format12h(config.hours[day].open)} — ${format12h(config.hours[day].close)}`
                      }
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 text-center">
                 <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Times are Mountain Standard Time (MST)</p>
              </div>
            </div>
          </div>
        </main>

        {/* SCC Footer Bar */}
        <footer className="mt-12 flex justify-between items-center">
           <div className="flex space-x-4">
              <span style={{ backgroundColor: SCC_GOLD }} className="w-12 h-2 rounded-full"></span>
              <span style={{ backgroundColor: SCC_GREEN }} className="w-24 h-2 rounded-full"></span>
           </div>
           <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
             Community • Excellence • Innovation
           </p>
        </footer>
      </div>
    </div>
  );
};
