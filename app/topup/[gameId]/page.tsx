'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TopUpPage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;
  
  // ប្តូរឈ្មោះហ្គេមតាម ID
  const gameNames: Record<string, string> = {
    'free-fire': 'Free Fire',
    'mobile-legends': 'Mobile Legends',
    'pubg-mobile': 'PUBG Mobile',
    'genshin-impact': 'Genshin Impact'
  };
  const gameName = gameNames[gameId] || 'Game';

  // ទិន្នន័យកញ្ចប់តម្លៃគំរូ
  const packages = [
    { id: '1', name: '100 Diamonds', price: '$1.00' },
    { id: '2', name: '310 Diamonds', price: '$3.00' },
    { id: '3', name: '520 Diamonds', price: '$5.00' },
    { id: '4', name: '1060 Diamonds', price: '$10.00' },
    { id: '5', name: '2180 Diamonds', price: '$20.00' },
    { id: '6', name: '5600 Diamonds', price: '$50.00' },
  ];

  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 text-sm hover:underline mb-6 inline-block font-medium">
        &larr; ត្រឡប់ទៅទំព័រដើម
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Top Up {gameName}</h1>
          <p className="text-blue-100 mt-1 text-sm">បំពេញព័ត៌មានខាងក្រោមដើម្បីបន្ត</p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* ផ្នែកបញ្ចូល ID */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">១. ព័ត៌មានគណនីហ្គេម</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Player ID <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="បំពេញ ID អ្នកលេងរបស់អ្នក"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* បង្ហាញប្រអប់ Zone ID តែនៅពេលជ្រើសរើស Mobile Legends ទេ */}
            {(gameId === 'mobile-legends' || gameId === 'genshin-impact') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {gameId === 'mobile-legends' ? 'Zone ID' : 'Server'} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  placeholder={gameId === 'mobile-legends' ? "ឧទាហរណ៍៖ 1234" : "ឧទាហរណ៍៖ Asia"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            )}
          </div>

          {/* ផ្នែកជ្រើសរើសកញ្ចប់ */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">២. ជ្រើសរើសកញ្ចប់តម្លៃ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {packages.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                    selectedPack === pack.id 
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-gray-900 text-sm sm:text-base">{pack.name}</div>
                  <div className="text-blue-600 font-black mt-1 text-lg">{pack.price}</div>
                  {selectedPack === pack.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ប៊ូតុងទូទាត់ប្រាក់ */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">តម្លៃសរុប</span>
              <span className="text-2xl font-black text-gray-900">
                {selectedPack ? packages.find(p => p.id === selectedPack)?.price : '$0.00'}
              </span>
            </div>
            <button 
              disabled={!selectedPack || !playerId}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md shadow-blue-200"
            >
              បន្តទៅការទូទាត់ប្រាក់
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">សូមពិនិត្យ ID ឱ្យបានត្រឹមត្រូវមុនពេលទូទាត់</p>
          </div>
        </div>
      </div>
    </div>
  );
}