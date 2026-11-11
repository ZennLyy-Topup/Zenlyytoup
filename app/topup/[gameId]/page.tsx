'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Package = { id: string; name: string; price: string; };

export default function TopUpPage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;
  const gameNames: Record<string, string> = { 'free-fire': 'Free Fire', 'mobile-legends': 'Mobile Legends' };
  const gameName = gameNames[gameId] || 'Game';

  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  
  // State សម្រាប់ការផ្ទៀងផ្ទាត់
  const [isValidating, setIsValidating] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`/api/products?game=${gameId}`);
        const data = await res.json();
        if (data.success && data.offers) {
          setPackages(data.offers.map((offer: any) => ({
            id: offer.id.toString(),
            name: offer.name || offer.title,
            price: `$${offer.price}`,
          })));
        }
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    }
    fetchPackages();
  }, [gameId]);

  // មុខងារផ្ទៀងផ្ទាត់ ID
  const handleValidate = async () => {
    if (!playerId) return;
    setIsValidating(true);
    setValidationError('');
    setNickname(null);
    try {
      const res = await fetch('/api/validate-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, playerId, zoneId }),
      });
      const data = await res.json();
      if (data.success) {
        setNickname(data.nickname);
      } else {
        setValidationError(data.error || 'ID មិនត្រឹមត្រូវ');
      }
    } catch (e) {
      setValidationError('មានបញ្ហាក្នុងការភ្ជាប់');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12">
      {/* ... Background Effects ដូចដើម ... */}
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* ... ចំណងជើង ... */}
        
        <div className="p-8 space-y-10">
          {/* ផ្នែកបញ្ចូល ID */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="bg-cyan-500 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
              ព័ត៌មានគណនីហ្គេម
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Player ID <span className="text-red-400">*</span></label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={playerId}
                  onChange={(e) => { setPlayerId(e.target.value); setNickname(null); setValidationError(''); }}
                  placeholder="បំពេញ ID អ្នកលេង"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
                />
                <button 
                  onClick={handleValidate}
                  disabled={isValidating || !playerId}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-5 rounded-xl font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isValidating ? 'កំពុងពិនិត្យ...' : 'ផ្ទៀងផ្ទាត់'}
                </button>
              </div>
              
              {/* បង្ហាញលទ្ធផលផ្ទៀងផ្ទាត់ */}
              {nickname && (
                <p className="text-green-400 text-sm mt-2 font-bold">✅ ឈ្មោះក្នុងហ្គេម៖ {nickname}</p>
              )}
              {validationError && (
                <p className="text-red-400 text-sm mt-2">{validationError}</p>
              )}
            </div>

            {gameId === 'mobile-legends' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Zone ID <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={zoneId}
                  onChange={(e) => { setZoneId(e.target.value); setNickname(null); }}
                  placeholder="ឧទាហរណ៍៖ 1234"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
                />
              </div>
            )}
          </div>

          {/* ... ផ្នែកជ្រើសរើសកញ្ចប់ និងប៊ូតុងទូទាត់ ... */}
          {/* ចំណាំ៖ ប៊ូតុងទូទាត់គួរតែបិទ (disabled) ប្រសិនបើ nickname ទទេ */}
          <button 
            disabled={!selectedPack || !nickname} // ត្រូវការឈ្មោះផ្ទៀងផ្ទាត់ជោគជ័យសិន
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            បន្តទៅការទូទាត់ប្រាក់
          </button>
        </div>
      </div>
    </div>
  );
}