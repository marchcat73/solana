import type { Metadata } from 'next';
import './globals.css';
import '@app/assets/css/styles.css';

export const metadata: Metadata = {
  title: 'Solana Wallet',
  description: 'Solana Wallet app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
