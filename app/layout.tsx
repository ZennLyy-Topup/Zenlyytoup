import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'ZennLyyStore | Game Top Up',
  description: 'ទិញ Diamonds Free Fire និង Mobile Legends ថោក លឿន និងទុកចិត្តបំផុត',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="km">
      <body className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-black text-blue-600 tracking-tighter">
                  ZennLyy<span className="text-gray-900">Store</span>
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/history" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  ប្រវត្តិការទិញ
                </Link>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  ចូលគណនី
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center text-gray-500 text-sm">
          <p>© 2024 ZennLyyStore. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
        </footer>
      </body>
    </html>
  )
}