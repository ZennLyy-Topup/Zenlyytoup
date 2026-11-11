import Link from 'next/link'

export default function Home() {
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Top up Diamonds សម្រាប់ Free Fire រហ័សទាន់ចិត្ត',
      // ខ្ញុំដាក់រូបភាពគំរូឱ្យ អ្នកអាចប្តូរតាមចិត្ត
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
      {/* Background Effects */}
      <div className="anime-bg">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
            សេវាកម្ម Top Up ហ្គេម <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              លឿន និងទុកចិត្ត
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            បញ្ចូល Diamonds ដោយស្វ័យប្រវត្តិក្នុងរយៈពេលតែប៉ុន្មាននាទីប៉ុណ្ណោះ។ ទូទាត់ប្រាក់តាម ABA និង ACLEDA។
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/topup/${game.id}`}
              className={`group relative bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl hover:shadow-2xl ${game.glow} transition-all duration-300 overflow-hidden flex flex-col btn-animate`}
            >
              <div className="h-56 bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                 <img 
                    src={game.image} 
                    alt={`${game.name} logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl z-10"
                 />
                 {/* ពន្លឺភ្លឺពីក្រោយរូបភាព */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col relative bg-gradient-to-t from-slate-800 to-slate-800/50">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {game.name}
                </h2>
                <p className="text-gray-400 text-sm flex-grow">
                  {game.description}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center text-cyan-400 font-bold text-sm">
                  ចុចទីនេះដើម្បី Top Up
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}