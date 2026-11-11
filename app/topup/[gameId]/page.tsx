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
  const [packageError, setPackageError] = useState('');
  
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  
  const [isValidating, setIsValidating] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`/api/products?game=${gameId}`);
        const data = await res.json();
        if (data.success && data.offers && data.offers.length > 0) {
          setPackages(data.offers.map((offer: any) => ({
            id: offer.id?.toString() || offer.sku,
            name: offer.name || offer.title,
            price: `$${offer.price || offer.amount}`,
          })));
        } else {
          setPackageError(data.error || 'មិនមានកញ្ចប់តម្លៃសម្រាប់ហ្គេមនេះទេ');
        }
      } catch (error: any) { 
        setPackageError('មិនអាចទាញទិន្នន័យកញ្ចប់បានទេ'); 
      } finally { 
        setIsLoading(false); 
      }
    }
    fetchPackages();
  }, [gameId]);

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
        setValidationError(data.error || 'ID មិនត្រឹមត្រូវ ឬមានបញ្ហា');
      }
    } catch (e) {
      setValidationError('មានបញ្ហាក្នុងការភ្ជាប់ទៅ Server');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12">
      {/* Background Effects */}
      <div className="anime-bg">
        <div className="smoke smoke-1"></div>
        <div className="smoke smoke-2"></div>
        <div className="smoke smoke-3"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="snow" style={{ left: `${Math.random() * 100}%`, width: `${Math.random() * 5 + 2}px`, height: `${Math.random() * 5 + 2}px`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <Link href="/" className="text-cyan-400 text-sm hover:text-cyan-300 mb-6 inline-flex items-center font-medium transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          ត្រឡប់ទៅទំព័រដើម
        </Link>
        
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900/50 to-slate-800 p-8 border-b border-slate-700">
            <h1 className="text-3xl font-black text-white">Top Up {gameName}</h1>
            <p className="text-cyan-400 mt-2 text-sm font-medium">បំពេញព័ត៌មានខាងក្រោមដើម្បីបន្ត</p>
          </div>

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
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-500"
                  />
                  <button 
                    onClick={handleValidate}
                    disabled={isValidating || !playerId}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-5 rounded-xl font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isValidating ? 'កំពុងពិនិត្យ...' : 'ផ្ទៀងផ្ទាត់'}
                  </button>
                </div>
                
                {nickname && (
                  <p className="text-green-400 text-sm mt-2 font-bold bg-green-400/10 p-2 rounded-lg border border-green-400/20 inline-block">
                    ✅ ឈ្មោះក្នុងហ្គេម៖ {nickname}
                  </p>
                )}
                {validationError && (
                  <p className="text-red-400 text-sm mt-2 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
                    ❌ {validationError}
                  </p>
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
                    className="w-full px-5 py-4211 bg-slate-900/50 border border-slate,-600 rounded-xl focus:ring-2 focus:238ring-cyan-500 outline-none text-white placeholder-gray,-500"
                  />
                </div>
             0 )}
            </div>

            {/* ផ្នែកជ្រើសរើសកញ្ចប់ */}
            <div className="space-y-.5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-cyan-500 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                ជ្រើសរើសកញ្ចប់តម្លៃ
              </h2>
              
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">កំពុងទាញទិន្នន័យកញ្ចប់...</p>
                </div>
              ) : packageError ? (
                 <p className="text-red-400 bg-red-400/10 p-4 rounded-xl text-center">{packageError}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {packages.map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all duration-200 relative overflow-hidden btn-animate ${
                        selectedPack === pack.id 
                          ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,3)]' 
                          : 'border-slate-600 hover:border-cyan-500/50 bg-slate-800/50'
                      }`}
                    >
                      <div className={`font-bold text-sm sm:text-base ${selectedPack === pack.id ? 'text-cyan-300' : 'text-gray-200'}`}>{pack.name}</div>
                      <div className={`font-black mt-2 text-xl ${selectedPack === pack.id ? 'text-white' : 'text-gray-400'}`}>{pack.price}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ប៊ូតុងទូទាត់ប្រាក់ */}
            <div className="pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">តម្លៃសរុប</span>
                <span className="text-3xl font-black text-cyan-400 drop-shadow-md">
                  {selectedPack ? packages.find(p => p.id === selectedPack)?.price : '$0.00'}
                </span>
              </div>
              <button 
                disabled={!selectedPack || !nickname} // ត្រូវការឈ្មោះផ្ទៀងផ្ទាត់ជោគជ័យសិន
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg py-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,211,238,0.4)] btn-animate"
              >
                បន្តទៅការទូទាត់ប្រាក់
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}