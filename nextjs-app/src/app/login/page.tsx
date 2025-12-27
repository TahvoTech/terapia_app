'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setSession } from '@/data/store';
import { MOCK_CLIENTS, MOCK_THERAPISTS } from '@/mock/data';
import { Role } from '@/types';
import { Button, Card } from '@/components/UI';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleLogin = () => {
    if (!role || !selectedUserId) return;

    const user =
      role === 'client'
        ? MOCK_CLIENTS.find((c) => c.id === selectedUserId)
        : MOCK_THERAPISTS.find((t) => t.id === selectedUserId);

    if (!user) return;

    setSession({
      role,
      userId: user.id,
      userName: user.name,
    });

    router.push(role === 'client' ? '/client' : '/therapist');
  };

  const availableUsers =
    role === 'client' ? MOCK_CLIENTS : role === 'therapist' ? MOCK_THERAPISTS : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧠 Terapia App
          </h1>
          <p className="text-gray-600">Kirjaudu sisään jatkaaksesi</p>
        </div>

        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Valitse rooli
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setRole('client');
                  setSelectedUserId('');
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  role === 'client'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="font-medium">Asiakas</div>
              </button>
              <button
                onClick={() => {
                  setRole('therapist');
                  setSelectedUserId('');
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  role === 'therapist'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">👨‍⚕️</div>
                <div className="font-medium">Terapeutti</div>
              </button>
            </div>
          </div>

          {/* User Selection */}
          {role && availableUsers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valitse demo-käyttäjä
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">-- Valitse --</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={!role || !selectedUserId}
            className="w-full"
          >
            Kirjaudu sisään
          </Button>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo:</strong> Tämä on prototyyppi ilman tietokantaa.
              Kaikki tiedot tallennetaan paikallisesti selaimeesi.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
