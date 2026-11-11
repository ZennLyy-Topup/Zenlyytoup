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
      description: 'Top up Diamonds សម្រាប់ MLBB រហ័សទាន់ចិត្ត',
      image: '/images/mlbb.png',
      
      glow: 'group-hover:shadow-blue-500/50'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <div className="anime-bg">
        {/* Effect ផ្សែងពណ៌ */}
        <div className="smoke smoke-1"></div>
        <div className="smoke smoke-2"></div>
        <div className="smoke smoke-3"></div>

        {/* Effect ព្រិលធ្លាក់ (បង្កើតព្រិលចៃដន្យ 20 ដុំ) */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snow"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/topup/${game.id}`}
              className={`group relative bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl hover:shadow-2xl ${game.glow} transition-all duration-300 overflow-hidden flex flex-col btn-animate`}
            >
              <div className="h-56 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                 
                 {/* វីដេអូផ្ទៃខាងក្រោយ */}
                 <video 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                 >
                   <source src={game.video} type="video/mp4" />
                 </video>

                 <div className="absolute inset-0 bg-black/30 z-0"></div>

                 <img 
                    src={game.image} 
                    alt={`${game.name} logo`}
                    className="max-h-[70%] max-w-[70%] object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                 />
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