// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'ZennLyyStore - Game Top Up',
  description: 'Top up Free Fire និង Mobile Legends ដែលរហ័ស និងទុកចិត្តបំផុត',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="km">
      <body>{children}</body>
    </html>
  )
}