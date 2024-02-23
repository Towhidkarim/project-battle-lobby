import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';
// import LoadingBar from '@/components/LoadingBar';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BattleLobby',
  description: 'Play and win',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // console.log(session?.user);

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={cn(poppins.className, 'dark text-foreground')}>
          {/* <LoadingBar /> */}
          <NextTopLoader color='#2563EB' height={2} />
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
