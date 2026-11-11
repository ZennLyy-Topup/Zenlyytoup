'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length !== 6) {
      setError('លេខសម្ងាត់ត្រូវតែមាន ៦ ខ្ទង់');
      return;
    }

    setIsLoading(true);

    // កន្លែងនេះជាកន្លែងដែលយើងនឹងភ្ជាប់ទៅ Database នៅពេលក្រោយ
    setTimeout(() => {
      setIsLoading(false);
      alert('ចូលគណនីបានជោគជ័យ!');
      // router.push('/'); // បញ្ជូនទៅទំព័រដើមវិញ
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative z-10">
      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white">សូមស្វាគមន៍ត្រឡប់មកវិញ</h2>
            <p className="text-gray-400 mt-2 text-sm">ចូលគណនីដើម្បីបន្តទិញ Diamonds</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="បំពេញឈ្មោះអ្នកប្រើ"
                className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="បំពេញលេខសម្ងាត់ ៦ ខ្ទង់"
                maxLength={6}
                className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder-gray-500 tracking-widest"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] btn-animate mt-4 disabled:opacity-50"
            >
              {isLoading ? 'កំពុងចូល...' : 'ចូលគណនី'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            មិនទាន់មានគណនីមែនទេ?{' '}
            <Link href="/register" className="text-cyan-400 font-bold hover:underline">
              ចុះឈ្មោះឥឡូវនេះ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}