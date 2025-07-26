import FlexSection from "./FlexSection";
import Image from "next/image";
import servicesImage from "../assets/services.svg";
import { 
  LuShieldCheck, 
  LuSmile, 
  LuStethoscope 
} from "react-icons/lu";
import twclsx from "@/utils/twclsx";

const ServiceItem = ({ 
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

const Services = () => (
  <FlexSection
    sectionClassName="py-16 bg-white"
    wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
    id="services"
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800">
          Layanan <span className="text-pink-500">Kami</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4">
          Solusi Komprehensif untuk Kesehatan Gigi Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceItem
          number={1}
          icon={
            <LuShieldCheck 
              className="w-12 h-12 text-pink-500 group-hover:text-pink-500 transition-colors" 
            />
          }
          title="Pemeriksaan Preventif"
          description="Deteksi dini dan pencegahan masalah gigi dengan teknologi mutakhir."
        />

        <ServiceItem
          number={2}
          icon={
            <LuSmile 
              className="w-12 h-12 text-pink-500 group-hover:text-pink-500 transition-colors" 
            />
          }
          title="Kosmetik Gigi"
          description="Transformasi senyuman Anda dengan prosedur estetika terkini."
        />

        <ServiceItem
          number={3}
          icon={
            <LuStethoscope 
              className="w-12 h-12 text-pink-500 group-hover:text-pink-500 transition-colors" 
            />
          }
          title="Konsultasi Profesional"
          description="Konsultasi mendalam dengan dokter gigi berpengalaman."
        />
      </div>

      {/* Daftar Layanan Tambahan */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Layanan Lengkap <span className="text-pink-500">Kami</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          {[
            "Ortodonti",
            "Implan Gigi",
            "Kedokteran Anak",
            "Pertolongan Darurat",
            "Konsultasi Online",
            "Perawatan Laser",
            "Scaling",
            "Bedah Mulut"
          ].map((service, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-2 text-sm"
            >
              <LuShieldCheck className="text-pink-500" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </FlexSection>
);

export default Services;