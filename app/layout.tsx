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
      <body className="min-h-screen flex flex-col text-white">
        {/* Navigation Bar */}
        <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              
              {/* Logo ឆ្វេង */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter group-hover:scale-105 transition-transform">
                  ZennLyy<span className="text-white">Store</span>
                </span>
              </Link>

              {/* ម៉ឺនុយខាងស្តាំ */}
              <div className="flex items-center gap-6">
                <Link href="/history" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors hidden sm:block">
                  ប្រវត្តិការទិញ
                </Link>
                
                {/* ប៊ូតុងចូលគណនី (បានភ្ជាប់ទៅ /login) */}
                <Link 
                  href="/login" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] btn-animate inline-block"
                >
                  ចូលគណនី
                </Link>
              </div>

            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto py-8 text-center text-gray-400 text-sm relative z-10">
          <p>© 2026 ZennLyyStore. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
        </footer>
      </body>
    </html>
  )
}