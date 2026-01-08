
import { StoreConfig, DaysOfWeek } from './types';

export const DAYS: DaysOfWeek[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const DEFAULT_CONFIG: StoreConfig = {
  name: 'Student Tech Center and Help Desk',
  tagline: 'Technology Support for Artichokes',
  address: 'Information Technology Building - IT 100',
  phone: '480-423-6274, option 3',
  vibe: 'academic, tech support, helpful, professional',
  themeColor: '#00573d', // Artichoke Green
  hours: {
    Monday: { open: '08:00', close: '17:00', isClosed: false },
    Tuesday: { open: '08:00', close: '17:00', isClosed: false },
    Wednesday: { open: '08:00', close: '17:00', isClosed: false },
    Thursday: { open: '08:00', close: '17:00', isClosed: false },
    Friday: { open: '08:00', close: '16:00', isClosed: false },
    Saturday: { open: '00:00', close: '00:00', isClosed: true },
    Sunday: { open: '00:00', close: '00:00', isClosed: true },
  }
};
