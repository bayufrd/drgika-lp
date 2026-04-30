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

const ratingSummary = {
  average: 4.8,
  total: 316,
  distribution: { 5: 88, 4: 8, 3: 2, 2: 1, 1: 1 } as Record<1 | 2 | 3 | 4 | 5, number>,
  highlights: [
    '"Klinik bagus,pelayanannya oke,dokter juga baik.hasil cukup memuaskan"',
    '"Pasang gigi bisa pakai bpjs.. terima kasih"',
    '"Untuk pasien anak kurang lembut, anakku trauma jdinya ke dr."',
  ],
};

const Testimonials = () => (
  <FlexSection sectionClassName="py-16 bg-white" id="testimoni">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Testimoni <span className="text-pink-500">Pasien</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4">Ulasan bintang 5 dari pasien.</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
          <div className="text-lg font-bold text-gray-800">Ringkasan ulasan</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="sm:col-span-1">
              <div className="text-4xl font-extrabold text-gray-800 leading-none">
                {ratingSummary.average.toFixed(1)}
              </div>
              <div className="mt-2">
                <Stars value={5} />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {ratingSummary.total.toLocaleString("id-ID")} ulasan
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-4 text-sm font-medium text-gray-700">{s}</div>
                    <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-pink-400"
                        style={{ width: `${ratingSummary.distribution[s as 1 | 2 | 3 | 4 | 5]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {ratingSummary.highlights.map((q) => (
              <div key={q} className="rounded-xl border border-pink-100 bg-pink-50/40 p-4 text-sm text-gray-700">
                {q}
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Catatan: ringkasan di atas merupakan kutipan dari ulasan Google Maps.
          </div>
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-2xl grid grid-cols-1 gap-6 items-start">
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
