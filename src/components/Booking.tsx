import SectionHeading from "./SectionHeading";
import FlexSection from "./FlexSection";
import bookingImage from "../assets/booking.svg";
import Image from "next/image";
import { LuCalendar, LuPhone, LuMessageSquare } from "react-icons/lu";
import twclsx from "@/utils/twclsx";

const BookingItem = ({ 
  icon, 
  title, 
  description,
  number 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  number: number 
}) => (
  <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
      {number}
    </div>
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Booking = () => (
  <FlexSection 
    sectionClassName="py-16 bg-white relative" 
    wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
    id="booking"
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800">
          Daftar <span className="text-pink-500">Konsultasi</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4">
          Kami Siap Melayani Anda
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 hidden lg:block">
          <Image 
            className="w-full animate-float" 
            src={bookingImage} 
            alt="booking" 
            priority 
          />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BookingItem
              number={1}
              icon={
                <LuCalendar 
                  className="w-12 h-12 text-pink-500 group-hover:text-pink-600 transition-colors" 
                />
              }
              title="Jadwalkan"
              description="Pilih waktu konsultasi yang nyaman bagi Anda."
            />

            <BookingItem
              number={2}
              icon={
                <LuPhone 
                  className="w-12 h-12 text-pink-500 group-hover:text-pink-600 transition-colors" 
                />
              }
              title="Hubungi"
              description="Isi informasi kontak Anda dengan lengkap."
            />
          </div>

          <form className="w-full flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <input
                className="flex-1 px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                placeholder="Nama dan Nama Belakang..."
                type="text"
              />
              <input
                className="flex-1 px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                placeholder="Nomor Telepon..."
                type="number"
              />
            </div>
            <textarea
              className="min-h-[15rem] px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
              placeholder="Informasi tambahan..."
            />
            <button
              className={twclsx(
                "px-8 py-4 rounded-lg select-none text-white bg-pink-500 hover:bg-pink-600",
                "transition duration-150 ease-in-out transform hover:scale-105"
              )}
            >
              Kirim Permohonan
            </button>
          </form>
        </div>
      </div>
    </div>
  </FlexSection>
);

export default Booking;