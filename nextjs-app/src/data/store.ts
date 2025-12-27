/**
 * Data Access Layer
 * 
 * This module provides an abstraction over data storage.
 * Currently implemented with localStorage for mockup purposes.
 * 
 * FUTURE MIGRATION TO SUPABASE:
 * - Replace localStorage calls with Supabase client queries
 * - Keep the same function signatures
 * - Add async/await to all functions
 * - Update return types to Promise<T>
 * - Consider implementing React Query/SWR for caching
 */

import {
  Session,
  Client,
  Therapist,
  CheckIn,
  Homework,
  JournalEntry,
  CheckInFormData,
} from '@/types';
import { MOCK_CLIENTS, MOCK_THERAPISTS, INITIAL_HOMEWORK } from '@/mock/data';

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  const sessionStr = localStorage.getItem('terapia_session');
  if (!sessionStr) return null;
  try {
    return JSON.parse(sessionStr) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('terapia_session', JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('terapia_session');
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export function listClients(): Client[] {
  return MOCK_CLIENTS;
}

export function getClientById(id: string): Client | null {
  return MOCK_CLIENTS.find((c) => c.id === id) || null;
}

export function getTherapistById(id: string): Therapist | null {
  return MOCK_THERAPISTS.find((t) => t.id === id) || null;
}

export function getClientsByTherapist(therapistId: string): Client[] {
  return MOCK_CLIENTS.filter((c) => c.therapistId === therapistId);
}

// ============================================================================
// CHECK-INS
// ============================================================================

const CHECKINS_KEY = 'terapia_checkins';

function getAllCheckIns(): CheckIn[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CHECKINS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as CheckIn[];
  } catch {
    return [];
  }
}

function saveCheckIns(checkins: CheckIn[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkins));
}

export function addCheckIn(clientId: string, formData: CheckInFormData): CheckIn {
  const checkins = getAllCheckIns();
  const newCheckIn: CheckIn = {
    id: `checkin_${Date.now()}`,
    clientId,
    date: new Date().toISOString(),
    ...formData,
  };
  checkins.push(newCheckIn);
  saveCheckIns(checkins);
  return newCheckIn;
}

export function listCheckIns(clientId: string): CheckIn[] {
  const all = getAllCheckIns();
  return all
    .filter((c) => c.clientId === clientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ============================================================================
// HOMEWORK
// ============================================================================

const HOMEWORK_KEY = 'terapia_homework';

function getAllHomework(): Homework[] {
  if (typeof window === 'undefined') return INITIAL_HOMEWORK;
  const data = localStorage.getItem(HOMEWORK_KEY);
  if (!data) {
    // Initialize with seed data
    saveHomework(INITIAL_HOMEWORK);
    return INITIAL_HOMEWORK;
  }
  try {
    return JSON.parse(data) as Homework[];
  } catch {
    return INITIAL_HOMEWORK;
  }
}

function saveHomework(homework: Homework[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HOMEWORK_KEY, JSON.stringify(homework));
}

export function listHomework(clientId: string): Homework[] {
  return getAllHomework().filter((h) => h.clientId === clientId);
}

export function toggleHomework(homeworkId: string): void {
  const homework = getAllHomework();
  const item = homework.find((h) => h.id === homeworkId);
  if (item) {
    item.completed = !item.completed;
    saveHomework(homework);
  }
}

export function getHomeworkById(id: string): Homework | null {
  return getAllHomework().find((h) => h.id === id) || null;
}

// ============================================================================
// JOURNAL ENTRIES
// ============================================================================

const JOURNAL_KEY = 'terapia_journal';

function getAllJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(JOURNAL_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as JournalEntry[];
  } catch {
    return [];
  }
}

function saveJournalEntries(entries: JournalEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

export function addJournalEntry(clientId: string, content: string): JournalEntry {
  const entries = getAllJournalEntries();
  const newEntry: JournalEntry = {
    id: `journal_${Date.now()}`,
    clientId,
    date: new Date().toISOString(),
    content,
  };
  entries.push(newEntry);
  saveJournalEntries(entries);
  return newEntry;
}

export function listJournalEntries(clientId: string): JournalEntry[] {
  const all = getAllJournalEntries();
  return all
    .filter((e) => e.clientId === clientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
