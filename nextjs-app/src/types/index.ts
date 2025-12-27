export type Role = 'client' | 'therapist';

export interface Session {
  role: Role;
  userId: string;
  userName: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  therapistId: string;
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
}

export interface CheckIn {
  id: string;
  clientId: string;
  date: string;
  mood: number; // 1-5
  stress: number; // 1-5
  sleep: number; // 1-5
  notes: string;
}

export interface Homework {
  id: string;
  clientId: string;
  title: string;
  description: string;
  completed: boolean;
  assignedDate: string;
  dueDate?: string;
}

export interface JournalEntry {
  id: string;
  clientId: string;
  date: string;
  content: string;
}

export interface CheckInFormData {
  mood: number;
  stress: number;
  sleep: number;
  notes: string;
}
