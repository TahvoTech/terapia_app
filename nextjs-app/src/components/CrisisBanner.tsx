'use client';

import { useState } from 'react';

export function CrisisBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-red-800">
              <strong>Tärkeää:</strong> Tämä sovellus ei ole kriisi- tai
              päivystyspalvelu. Hätätilanteessa soita{' '}
              <strong className="font-bold">112</strong>.{' '}
              <button
                onClick={() => setIsModalOpen(true)}
                className="underline hover:text-red-900 font-medium"
              >
                Kriisiohjeet
              </button>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && <CrisisModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

interface CrisisModalProps {
  onClose: () => void;
}

function CrisisModal({ onClose }: CrisisModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Kriisiapua ja tukea
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-bold text-red-900 mb-2">
                Akuutti hätätilanne
              </h3>
              <p className="text-red-800">
                Jos sinulla tai läheisellä on välitön hengenvaarallinen
                tilanne, soita hätänumeroon <strong>112</strong>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">
                Kriisipuhelin (24/7 päivystys)
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong>Suomen Mielenterveysseura:</strong>{' '}
                  <a href="tel:09-2525-0111" className="text-primary-600 hover:underline">
                    09 2525 0111
                  </a>
                  <p className="text-sm text-gray-600">
                    Ma-pe 9-16, muina aikoina käytössä Kriisipuhelimen
                    numeropalvelu
                  </p>
                </li>
                <li>
                  <strong>Kriisipuhelin:</strong>{' '}
                  <a href="tel:09-2525-0111" className="text-primary-600 hover:underline">
                    09 2525 0111
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Nettituki</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Sekasin-chat nuorille:</strong>{' '}
                  <a
                    href="https://sekasin247.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    sekasin247.fi
                  </a>
                </li>
                <li>
                  <strong>Mieli ry:n verkkopalvelut:</strong>{' '}
                  <a
                    href="https://mieli.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    mieli.fi
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-bold text-blue-900 mb-2">
                Psykiatrinen päivystys
              </h3>
              <p className="text-blue-800 text-sm">
                Ota yhteyttä paikalliseen terveyskeskukseen tai
                sairaalan päivystykseen. Päivystyksessä arvioidaan
                tilanne ja ohjataan tarvittavaan hoitoon.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sulje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
