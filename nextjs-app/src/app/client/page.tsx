'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
  getSession,
  clearSession,
  addCheckIn,
  listCheckIns,
  listHomework,
  toggleHomework,
  addJournalEntry,
  listJournalEntries,
} from '@/data/store';
import { CheckIn, Homework, JournalEntry } from '@/types';
import { CrisisBanner } from '@/components/CrisisBanner';
import { Card, Button, Input, TextArea } from '@/components/UI';

const checkInSchema = z.object({
  mood: z.number().min(1).max(5),
  stress: z.number().min(1).max(5),
  sleep: z.number().min(1).max(5),
  notes: z.string(),
});

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [clientId, setClientId] = useState('');

  // Check-in state
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [notes, setNotes] = useState('');
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // Homework state
  const [homework, setHomework] = useState<Homework[]>([]);

  // Journal state
  const [journalContent, setJournalContent] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'client') {
      router.push('/login');
      return;
    }

    setUserName(session.userName);
    setClientId(session.userId);
    loadData(session.userId);
    setLoading(false);
  }, [router]);

  const loadData = (clientId: string) => {
    setCheckIns(listCheckIns(clientId));
    setHomework(listHomework(clientId));
    setJournalEntries(listJournalEntries(clientId));
  };

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = checkInSchema.parse({ mood, stress, sleep, notes });
      addCheckIn(clientId, data);
      setCheckIns(listCheckIns(clientId));
      // Reset form
      setMood(3);
      setStress(3);
      setSleep(3);
      setNotes('');
      alert('Viikkotarkastus tallennettu!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert('Virhe lomakkeessa: ' + error.errors.map((e) => e.message).join(', '));
      }
    }
  };

  const handleToggleHomework = (homeworkId: string) => {
    toggleHomework(homeworkId);
    setHomework(listHomework(clientId));
  };

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalContent.trim()) return;

    addJournalEntry(clientId, journalContent);
    setJournalEntries(listJournalEntries(clientId));
    setJournalContent('');
    alert('Päiväkirjamerkintä tallennettu!');
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
            <p className="text-sm text-gray-600">Asiakasportaali</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Kirjaudu ulos
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CrisisBanner />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Check-in */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📊 Viikkotarkastus
            </h2>
            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mieliala (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMood(val)}
                      className={`flex-1 py-2 rounded-lg border-2 transition-colors ${
                        mood === val
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stressi (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setStress(val)}
                      className={`flex-1 py-2 rounded-lg border-2 transition-colors ${
                        stress === val
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uni (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSleep(val)}
                      className={`flex-1 py-2 rounded-lg border-2 transition-colors ${
                        sleep === val
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <TextArea
                label="Muistiinpanot"
                value={notes}
                onChange={setNotes}
                placeholder="Miten viikko on mennyt? Mitä huomioitavaa?"
                rows={3}
              />

              <Button type="submit" className="w-full">
                Tallenna tarkastus
              </Button>
            </form>

            {/* Previous Check-ins */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Aiemmat tarkastukset
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {checkIns.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    Ei vielä tarkastuksia
                  </p>
                ) : (
                  checkIns.map((checkIn) => (
                    <div
                      key={checkIn.id}
                      className="p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900">
                          {new Date(checkIn.date).toLocaleDateString('fi-FI')}
                        </span>
                        <div className="text-xs text-gray-600">
                          M:{checkIn.mood} S:{checkIn.stress} U:{checkIn.sleep}
                        </div>
                      </div>
                      {checkIn.notes && (
                        <p className="text-gray-600">{checkIn.notes}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Homework */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ✅ Kotitehtävät
            </h2>
            <div className="space-y-3">
              {homework.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Ei kotitehtäviä
                </p>
              ) : (
                homework.map((hw) => (
                  <div
                    key={hw.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={hw.completed}
                      onChange={() => handleToggleHomework(hw.id)}
                      className="mt-1 h-5 w-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          hw.completed
                            ? 'text-gray-500 line-through'
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
                ))
              )}
            </div>
          </Card>

          {/* Journal */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📝 Päiväkirja
            </h2>
            <form onSubmit={handleJournalSubmit} className="mb-6">
              <TextArea
                label="Uusi merkintä"
                value={journalContent}
                onChange={setJournalContent}
                placeholder="Kirjoita päiväkirjamerkintä..."
                rows={4}
              />
              <Button type="submit" className="mt-3">
                Tallenna merkintä
              </Button>
            </form>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Aiemmat merkinnät
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {journalEntries.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    Ei vielä merkintöjä
                  </p>
                ) : (
                  journalEntries.map((entry) => (
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
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
