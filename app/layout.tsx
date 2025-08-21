import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative font-sans">
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          {/* Thin white line ABOVE the footer, always at the very bottom
          <div className="w-full h-px bg-white opacity-70" /> */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
