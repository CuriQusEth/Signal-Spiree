import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Signal Spire',
  description: 'Atmospheric vertical climbing + tower-building endless game on Base Mainnet.',
  other: {
    'talentapp:project_verification': '9ab89e163bf7b0489661393a236455c13415ace1397ff61b14398d4cdd9f9ad454cf19c936b9a52dcbe30c91bb9d5ca6bac41dc45c225d27e767738f56a4c2b7'
  }
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
