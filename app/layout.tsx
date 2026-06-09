import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Signal Spire',
  description: 'Atmospheric vertical climbing + tower-building endless game on Base Mainnet.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${jetbrains.variable}`}>
      <body className="bg-black text-white antialiased overflow-hidden select-none touch-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
