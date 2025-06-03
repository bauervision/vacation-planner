// types/user.ts

export interface Vacation {
  id: string;
  title: string; // e.g., "Hawaii Family Trip"
  location: string; // City, state/country, or address
  startDate: string; // ISO string (YYYY-MM-DD)
  endDate: string;
  cost: number; // Total trip cost
  travelers: string[]; // Names or IDs
  notes?: string;
  hostId?: string; // Reference to host contact
  image?: string;
}

export interface HostContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  location?: string;
  notes?: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  futureVacations: Vacation[];
  pastVacations: Vacation[];
  hostContacts: HostContact[];
  // Add more: preferences, notifications, etc.
}
