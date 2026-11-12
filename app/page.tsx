import Link from 'next/link'

export default function Home() {
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Top up Diamonds សម្រាប់ Free Fire រហ័សទាន់ចិត្ត',
      image: '/images/freefire.png',
      glow: 'group-hover:shadow-orange-500/50'
    },
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      description: 'Top up Diamonds សម្រាប់ MLBB ដោយគ្មានភ្ញាក់ផ្អើល',
      image: '/images/mlbb.png',
      glow: 'group-hover:shadow-blue-500/50'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* ផ្ទៃខាងក្រោយ 4D និងពេជ្រធ្លាក់ */}
      <div className="bg-4d">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
        
        {/* បង្កើតពេជ្រធ្លាក់ចៃដន្យចំនួន ៣០ ដុំ */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="diamond"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(45deg) scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* អក្សរចំណងជើង 4D */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white text-4d">
            សេវាកម្ម Top Up ហ្គេម <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 text-glow-cyan drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              លឿន និងទុកចិត្ត
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            បញ្ចូល Diamonds ដោយស្វ័យប្រវត្តិក្នុងរយៈពេលតែប៉ុន្មាននាទីប៉ុណ្ណោះ។ ទូទាត់ប្រាក់តាម ABA និង ACLEDA។
          </p>
        </div>

        {/* កាតហ្គេម */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/topup/${game.id}`}
              className={`group relative bg-slate-800/80 backdrop-blur-md rounded-3xl border-2 border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-2xl ${game.glow} transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2`}
            >
              <div className="h-64 bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                 <img 
                    src={game.image} 
                    alt={`${game.name} logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] z-10"
                 />
                 {/* ពន្លឺភ្លឺពីក្រោយរូបភាព */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col relative bg-gradient-to-t from-slate-800 to-slate-800/50">
                <h2 className="text-3xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                  {game.name}
                </h2>
                <p className="text-gray-400 text-sm flex-grow font-medium">
                  {game.description}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center text-cyan-400 font-bold text-lg">
                  ចុចទីនេះដើម្បី Top Up
                  <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* ប៊ូតុង 4D នៅខាងក្រោម (ឧទាហរណ៍) */}
        <div className="mt-16 text-center">
           <Link href="/topup/free-fire" className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xl px-12 py-4 rounded-xl btn-4d uppercase tracking-widest">
              ចាប់ផ្តើមទិញឥឡូវនេះ
           </Link>
        </div>
      </div>
    </div>
  )
}