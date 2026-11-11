// app/page.tsx
import Link from 'next/link';

export default function Home() {
  // ទិន្នន័យហ្គេមគំរូ (ក្រោយមកយើងនឹងទាញពី Database)
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Top up Diamonds សម្រាប់ Free Fire រហ័សទាន់ចិត្ត',
      image: 'https://play-lh.googleusercontent.com/1v2m7g4b0q4g5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i', // រូបភាពគំរូ
      color: 'bg-orange-500',
    },
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      description: 'Top up Diamonds សម្រាប់ MLBB ដោយភ្ញាក់ផ្អើល',
      image: 'https://play-lh.googleusercontent.com/1v2m7g4b0q4g5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i', // រូបភាពគំរូ
      color: 'bg-blue-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            ZennLyyStore
          </h1>
          <p className="text-lg text-gray-600">
            សេវាកម្ម TopUp ហ្គេមដែលរហ័ស និងទុកចិត្តបំផុត
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/topup/${game.id}`}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`h-32 ${game.color} flex items-center justify-center`}>
                {/* ដាក់រូបភាពហ្គេមនៅទីនេះ (បើមាន) */}
                <span className="text-white text-3xl font-bold">{game.name}</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {game.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {game.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                  ចុចទីនេះដើម្បី💎 Top Up
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}