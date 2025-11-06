import "./globals.css";
import headerData from "@/../public/data/data.json"; // cek path lagi
import footerData from "@/../public/data/data.json"; // sama file, cuma ambil bagian footer
import PromoModal from "@/components/PromoModal";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // ambil array link socmed
  const socialLinks = footerData.footer.socialMedia.map((item) => item.link);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": headerData.header.name.full,
    "url": "https://www.doktergigisolo.id",
    "logo": "https://www.doktergigisolo.id/android-chrome-192x192.png",
    "image": "https://www.doktergigisolo.id/clinic.jpg",
    "description":
      "Praktik dokter gigi profesional Drg. Ika Kiromin di Solo, Surakarta, dan Sukoharjo. Layanan kesehatan gigi terpercaya untuk seluruh keluarga.",
    "telephone": headerData.header.contact.phone,
    "priceRange": "Rp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": headerData.header.location.address,
      "addressLocality": "Surakarta",
      "addressRegion": "Jawa Tengah",
      "postalCode": "57xxx",
      "addressCountry": "ID",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        "opens": "08:00",
        "closes": "20:00",
      },
    ],
    "sameAs": socialLinks,
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-inter text-primary">
        {children}
        {/* Promo modal: pass main social links for quick consult */}
        <PromoModal
          links={
            footerData.footer.socialMedia
              .filter((s: any) =>
                ["whatsapp", "instagram", "tiktok", "facebook"].some((k) =>
                  s.name.toLowerCase().includes(k)
                )
              )
              .map((s: any) => ({ name: s.name, link: s.link, icon: s.icon }))
          }
        />
      </body>
    </html>
  );
};

export default RootLayout;
