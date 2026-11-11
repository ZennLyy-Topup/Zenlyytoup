'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// បង្កើត Type សម្រាប់ទិន្នន័យកញ្ចប់
type Package = {
  id: string;
  name: string;
  price: string;
};

export default function TopUpPage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;
  
  const gameNames: Record<string, string> = {
    'free-fire': 'Free Fire',
    'mobile-legends': 'Mobile Legends',
  };
  const gameName = gameNames[gameId] || 'Game';

  // ប្តូរពី State ក្លែងក្លាយ មកប្រើ State ទទេវិញ
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');

  // ទាញទិន្នន័យពី API ពេលទំព័រដំណើរការ
  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`/api/products?game=${gameId}`);
        const data = await res.json();
        
        if (data.success && data.offers) {
          // បម្លែងទម្រង់ទិន្នន័យពី FazerCards មកជាទម្រង់របស់យើង
          const formattedPackages = data.offers.map((offer: any) => ({
            id: offer.id.toString(),
            name: offer.name || offer.title, 
            price: `$${offer.price}`,
          }));
          setPackages(formattedPackages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackages();
  }, [gameId]);

  return (
    <div className="relative min-h-screen py-12">
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
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <span className="bg-cyan-500 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                 ព័ត៌មានគណនីហ្គេម
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Player ID <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="បំពេញ ID អ្នកលេងរបស់អ្នក"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              {gameId === 'mobile-legends' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Zone ID <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="ឧទាហរណ៍៖ 1234"
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder-gray-500"
                  />
                </div>
              )}
            </div>

            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-cyan-500 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                ជ្រើសរើសកញ្ចប់តម្លៃ
              </h2>
              
              {/* បង្ហាញពេលកំពុងទាញទិន្នន័យ */}
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">កំពុងទាញទិន្នន័យកញ្ចប់...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {packages.length > 0 ? packages.map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all duration-200 relative overflow-hidden btn-animate ${
                        selectedPack === pack.id 
                          ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                          : 'border-slate-600 hover:border-cyan-500/50 bg-slate-800/50'
                      }`}
                    >
                      <div className={`font-bold text-sm sm:text-base ${selectedPack === pack.id ? 'text-cyan-300' : 'text-gray-200'}`}>{pack.name}</div>
                      <div className={`font-black mt-2 text-xl ${selectedPack === pack.id ? 'text-white' : 'text-gray-400'}`}>{pack.price}</div>
                    </button>
                  )) : (
                    <p className="text-red-400 col-span-3 text-center">មិនមានកញ្ចប់តម្លៃសម្រាប់ហ្គេមនេះទេ (សូមពិនិត្យ API)</p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">តម្លៃសរុប</span>
                <span className="text-3xl font-black text-cyan-400 drop-shadow-md">
                  {selectedPack ? packages.find(p => p.id === selectedPack)?.price : '$0.00'}
                </span>
              </div>
              <button 
                disabled={!selectedPack || !playerId}
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