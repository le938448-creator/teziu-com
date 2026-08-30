import { Analytics } from '@vercel/analytics/next'
import { Fraunces, IBM_Plex_Mono, Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-plex-mono' })

export const metadata: Metadata = {
  title: 'HOYTEZIU · La Perla de la Sierra',
  description: 'Descubre qué hacer hoy en Teziutlán: negocios locales, promociones, eventos y planes cerca de ti.',
  generator: 'v0.app',
  metadataBase: new URL('https://hoyteziu.mx'),
  openGraph: { title: 'HOYTEZIU · La Perla de la Sierra', description: 'La guía local para vivir Teziutlán como alguien de aquí.', type: 'website', locale: 'es_MX' },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-niebla">
      <body className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
