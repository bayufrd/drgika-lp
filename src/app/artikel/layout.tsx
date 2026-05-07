import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArtikelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-[120px] sm:pt-[120px]">
        <div className="w-full border-b bg-white/90 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex items-center gap-4 text-sm font-medium">
            <a href="/" className="hover:text-accent">Beranda</a>
            <span className="text-gray-300">/</span>
            <a href="/artikel" className="hover:text-accent">Artikel</a>
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
