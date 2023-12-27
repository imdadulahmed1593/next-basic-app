import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lets cricket',
  description: 'A fun app to pass your leisure hours',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-cyan-900 text-white flex align-items-center justify-center p-4">
          <h1 className="text-3xl font-bold">
            <Link className="text-3xl font-bold " href="/">
              Let's Play Cricket!
            </Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
