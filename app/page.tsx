import Link from 'next/link'

export default function Home() {
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Top up Diamonds សម្រាប់ Free Fire រហ័សទាន់ចិត្ត',
      color: 'from-orange-400 to-red-500',
      icon: '🔥'
    },
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      description: 'Top up Diamonds សម្រាប់ MLBB ដោយគ្មានភ្ញាក់ផ្អើល',
      color: 'from-blue-400 to-indigo-600',
      icon: '⚔️'
    },
    {
      id: 'pubg-mobile',
      name: 'PUBG Mobile',
      description: 'Top up UC សម្រាប់ PUBG Mobile',
      color: 'from-yellow-400 to-orange-600',
      icon: '🎯'
    },
    {
      id: 'genshin-impact',
      name: 'Genshin Impact',
      description: 'Top up Genesis Crystals',
      color: 'from-teal-400 to-emerald-600',
      icon: '✨'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          សេវាកម្ម Top Up ហ្គេម <span className="text-blue-600">លឿន និងទុកចិត្ត</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          បញ្ចូល Diamonds និង UC ដោយស្វ័យប្រវត្តិក្នុងរយៈពេលតែប៉ុន្មាននាទីប៉ុណ្ណោះ។ ទូទាត់ប្រាក់តាម ABA និង ACLEDA។
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/topup/${game.id}`}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
               <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">{game.icon}</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {game.name}
              </h2>
              <p className="text-gray-500 text-sm flex-grow">
                {game.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-blue-600 font-bold text-sm">
                ចុចទីនេះដើម្បី Top Up
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}