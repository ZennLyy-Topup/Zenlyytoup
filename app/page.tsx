import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  // លុប PUBG និង Genshin ចេញ និងដាក់តំណភ្ជាប់រូបភាព (Logo)
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Top up Diamonds សម្រាប់ Free Fire រហ័សទាន់ចិត្ត',
      color: 'bg-orange-100', // ពណ៌ផ្ទៃខាងក្រោយសម្រាប់ Logo
      // ដាក់តំណភ្ជាប់រូបភាព Logo Free Fire នៅទីនេះ
      image: '/images/freefire.png'
    },
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      description: 'Top up Diamonds សម្រាប់ MLBB រហ័សទាន់ចិត្ត',
      color: 'bg-blue-50', // ពណ៌ផ្ទៃខាងក្រោយសម្រាប់ Logo
      // ដាក់តំណភ្ជាប់រូបភាព Logo Mobile Legends នៅទីនេះ
      image: '/images/mlbb.png'
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
          បញ្ចូល Diamonds ដោយស្វ័យប្រវត្តិក្នុងរយៈពេលតែប៉ុន្មាននាទីប៉ុណ្ណោះ។ ទូទាត់ប្រាក់តាម ABA និង ACLEDA។
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/topup/${game.id}`}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* ផ្នែកបង្ហាញរូបភាព Logo */}
            <div className={`h-48 ${game.color} flex items-center justify-center p-6 relative overflow-hidden`}>
               <img 
                  src={game.image} 
                  alt={`${game.name} logo`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
               />
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