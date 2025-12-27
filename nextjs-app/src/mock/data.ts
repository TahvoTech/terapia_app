import { Client, Therapist, Homework } from '@/types';

export const MOCK_THERAPISTS: Therapist[] = [
  {
    id: 't1',
    name: 'Dr. Maria Virtanen',
    email: 'maria.virtanen@example.com',
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Matti Meikäläinen',
    email: 'matti@example.com',
    therapistId: 't1',
  },
  {
    id: 'c2',
    name: 'Anna Korhonen',
    email: 'anna@example.com',
    therapistId: 't1',
  },
];

export const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 'h1',
    clientId: 'c1',
    title: 'Ajatuspäiväkirja',
    description: 'Kirjoita kolme negatiivista ajatusta ja haasta ne',
    completed: false,
    assignedDate: '2025-12-20',
    dueDate: '2025-12-27',
  },
  {
    id: 'h2',
    clientId: 'c1',
    title: 'Rentoutusharjoitus',
    description: 'Harjoittele syvähengitystä 10 minuuttia päivässä',
    completed: false,
    assignedDate: '2025-12-20',
    dueDate: '2025-12-27',
  },
  {
    id: 'h3',
    clientId: 'c1',
    title: 'Sosiaalinen aktiviteetti',
    description: 'Tapaa ystävä kahville tai kävelylenkille',
    completed: false,
    assignedDate: '2025-12-20',
    dueDate: '2025-12-27',
  },
  {
    id: 'h4',
    clientId: 'c2',
    title: 'Unipäiväkirja',
    description: 'Kirjaa nukkumaanmenoaika ja heräämisaika joka päivä',
    completed: false,
    assignedDate: '2025-12-20',
    dueDate: '2025-12-27',
  },
  {
    id: 'h5',
    clientId: 'c2',
    title: 'Liikuntaharjoitus',
    description: 'Kävele vähintään 30 minuuttia päivässä',
    completed: true,
    assignedDate: '2025-12-20',
    dueDate: '2025-12-27',
  },
];
