"use client";

import Image from "next/image";
import FlexSection from "./FlexSection";

type Testimonial = {
  name: string;
  time: string;
  text: string;
  stars: number;
  image?: { src: string; alt: string };
};

const testimonials: Testimonial[] = [
  {
    name: "Sasa Tania",
    time: "4 bulan lalu",
    stars: 5,
    text: "pelayanan bagus sangat memuaskan dari kecil kalau ada masalah gigi datangnya kesini langsung",
  },
  {
    name: "Bowo Saputra",
    time: "4 bulan lalu",
    stars: 5,
    text: "Alhamdulillah sudah cabut gigi semoga sembuh gak sakit gigi lagi, terimakasih Bu dokter",
    image: { src: "/testimonials/bowo-1.png", alt: "Foto ulasan Bowo Saputra" },
  },
  {
    name: "Aldiana TheTeki",
    time: "7 bulan lalu",
    stars: 5,
    text: "Dokternya ramah, cepet juga ngasih rujukan kondisi saya harus ke bedah mulut untuk melakukan tindakan kecil. Terimakasih dok",
  },
  {
    name: "Rina Harjanti",
    time: "setahun lalu",
    stars: 5,
    text: "Pelayanan bagus,bu dokter n perawat ramah",
    image: { src: "/testimonials/rina-1.png", alt: "Foto ulasan Rina Harjanti" },
  },
  {
    name: "Dinda Ariyanti10",
    time: "4 bulan lalu",
    stars: 5,
    text: "klinik bagus, pelayanannya baik, dokternya juga ramah",
  },
  {
    name: "Rini Septiana Nur Hidayah",
    time: "7 bulan lalu",
    stars: 5,
    text: "Praktik dokter sangat memuaskan ramah pada pasien. Jam praktek bisa pagi hari dan sore hari",
  },
  {
    name: "Bintara Ulin Nuha",
    time: "11 bulan lalu",
    stars: 5,
    text: "Bagus dan ramah pelayanan drg ika..dokternya baik bangeetttt dan sabarr..suka becanda 👍👍👍 Pas waktu kontrol gigi pun selalu diingetin ..pokoknya ramah banget Thank's dok atas pelayanan yg memuaskan 🙏🙏👍👍👍 …",
  },
];

const Stars = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1" aria-label={`Rating ${value} dari 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < value ? "text-yellow-400" : "text-gray-200"}>
        ★
      </span>
    ))}
  </div>
);

const Testimonials = () => (
  <FlexSection sectionClassName="py-16 bg-white" id="testimoni">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Testimoni <span className="text-pink-500">Pasien</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4">Ulasan bintang 5 dari pasien.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold text-gray-800 truncate">{t.name}</div>
                <div className="text-xs text-gray-500">{t.time}</div>
              </div>
              <Stars value={t.stars} />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.text}</p>

            {t.image ? (
              <div className="mt-4">
                <div className="relative w-full overflow-hidden rounded-xl border border-pink-100 bg-gray-50 aspect-[4/3]">
                  <Image
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  </FlexSection>
);

export default Testimonials;
