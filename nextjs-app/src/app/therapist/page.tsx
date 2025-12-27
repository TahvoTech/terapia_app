'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getSession,
  clearSession,
  getClientsByTherapist,
  listCheckIns,
  listHomework,
  listJournalEntries,
} from '@/data/store';
import { Client, CheckIn, Homework, JournalEntry } from '@/types';
import { CrisisBanner } from '@/components/CrisisBanner';
import { Card, Button } from '@/components/UI';

export default function TherapistDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [therapistId, setTherapistId] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientCheckIns, setClientCheckIns] = useState<CheckIn[]>([]);
  const [clientHomework, setClientHomework] = useState<Homework[]>([]);
  const [clientJournal, setClientJournal] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'therapist') {
      router.push('/login');
      return;
    }

    setUserName(session.userName);
    setTherapistId(session.userId);
    const clientList = getClientsByTherapist(session.userId);
    setClients(clientList);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setClientCheckIns(listCheckIns(client.id));
    setClientHomework(listHomework(client.id));
    setClientJournal(listJournalEntries(client.id));
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setClientCheckIns([]);
    setClientHomework([]);
    setClientJournal([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Ladataan...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tervetuloa, {userName}
            </h1>
            <p className="text-sm text-gray-600">Terapeuttiportaali</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Kirjaudu ulos
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CrisisBanner />

        {!selectedClient ? (
          /* Client List */
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              👥 Asiakkaat
            </h2>
            <div className="space-y-3">
              {clients.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Ei asiakkaita</p>
              ) : (
                clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-transparent hover:border-primary-500"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                  </button>
                ))
              )}
            </div>
          </Card>
        ) : (
          /* Client Details */
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button onClick={handleBackToList} variant="secondary">
                ← Takaisin
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedClient.name}
                </h2>
                <p className="text-sm text-gray-600">{selectedClient.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Check-ins */}
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📊 Viikkotarkastukset
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {clientCheckIns.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      Ei tarkastuksia
                    </p>
                  ) : (
                    clientCheckIns.map((checkIn) => (
                      <div
                        key={checkIn.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-900">
                            {new Date(checkIn.date).toLocaleDateString('fi-FI')}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-gray-600">Mieliala</div>
                            <div className="text-lg font-bold text-primary-600">
                              {checkIn.mood}/5
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Stressi</div>
                            <div className="text-lg font-bold text-primary-600">
                              {checkIn.stress}/5
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Uni</div>
                            <div className="text-lg font-bold text-primary-600">
                              {checkIn.sleep}/5
                            </div>
                          </div>
                        </div>
                        {checkIn.notes && (
                          <div className="text-sm text-gray-700 bg-white p-3 rounded">
                            {checkIn.notes}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Homework */}
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ✅ Kotitehtävät
                </h3>
                <div className="space-y-3">
                  {clientHomework.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      Ei kotitehtäviä
                    </p>
                  ) : (
                    clientHomework.map((hw) => (
                      <div
                        key={hw.id}
                        className={`p-4 rounded-lg border-2 ${
                          hw.completed
                            ? 'bg-green-50 border-green-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              hw.completed
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          >
                            {hw.completed && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4
                              className={`font-medium ${
                                hw.completed
                                  ? 'text-green-900'
                                  : 'text-gray-900'
                              }`}
                            >
                              {hw.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {hw.description}
                            </p>
                            {hw.dueDate && (
                              <p className="text-xs text-gray-500 mt-1">
                                Määräaika:{' '}
                                {new Date(hw.dueDate).toLocaleDateString('fi-FI')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Journal */}
              <Card className="lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📝 Päiväkirja
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {clientJournal.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      Ei päiväkirjamerkintöjä
                    </p>
                  ) : (
                    clientJournal.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500"
                      >
                        <div className="text-sm text-gray-600 mb-2">
                          {new Date(entry.date).toLocaleDateString('fi-FI', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {entry.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
