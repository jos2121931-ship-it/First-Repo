
export interface StoreHours {
  open: string; // HH:mm format
  close: string; // HH:mm format
  isClosed: boolean;
}

export type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface StoreConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  vibe: string;
  hours: Record<DaysOfWeek, StoreHours>;
  themeColor: string;
}

export interface AIContent {
  greeting: string;
  announcement: string;
}
