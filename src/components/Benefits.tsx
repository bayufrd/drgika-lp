import FlexSection from "./FlexSection";
import laserImage from "../assets/laser.svg";
import scannerImage from "../assets/scanner.svg";
import implantImage from "../assets/implant.svg";
import Image from "next/image";
import { FaCheckCircle, FaLightbulb, FaTools } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const BenefitItem = ({ 
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
    <div className="relative flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
            {number}
        </div>
        <div className="flex-shrink-0">
            {icon}
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 text-sm">
                {description}
            </p>
        </div>
    </div>
);

const Benefits = () => (
    <FlexSection
        sectionClassName="py-16 bg-gradient-to-br from-accent to-blue-600"
        wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
        id="benefits"
    >
        <div className="container mx-auto px-4">
            <SectionHeading
                direction="right"
                title={
                    <>
                        <span className="text-white">Rahasia</span> <span className="text-yellow-400">Kece</span> <span className="text-white">Dibalik Senyummu</span>
                    </>
                }
                subtitle={
                    <>
                        <span className="text-white">3 Steps </span><span className="text-yellow-400">Level Up </span><span className="text-white">Gigi Gahar!</span>
                    </>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <BenefitItem
                    number={1}
                    icon={
                        <Image 
                            className="w-20 h-20 group-hover:scale-110 transition-transform" 
                            src={laserImage} 
                            alt="Laser Modern" 
                        />
                    }
                    title="Laser Gokil Tanpa Rasa Sakit"
                    description="Teknologi laser kece yang bikin proses perawatan secepat nge-scroll Instagram. Dijamin anti sakit, anti ribet!"
                />
                
                <BenefitItem
                    number={2}
                    icon={
                        <Image 
                            className="w-20 h-20 group-hover:scale-110 transition-transform" 
                            src={scannerImage} 
                            alt="Pemindai 3D" 
                        />
                    }
                    title="Scanning Super Akurat"
                    description="Teknologi 3D yang lebih presisi dari filter Instagram. Deteksi masalah gigi secepat loading meme!"
                />
                
                <BenefitItem
                    number={3}
                    icon={
                        <Image 
                            className="w-20 h-20 group-hover:scale-110 transition-transform" 
                            src={implantImage} 
                            alt="Implan Profesional" 
                        />
                    }
                    title="Implan Pro Sejuta Umat"
                    description="Ahli implan dengan pengalaman lebih bernostalgia dari TikTok. Tingkat keberhasilan? Auto bikin PD!"
                />
            </div>

            {/* Tambahan informasi */}
            <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Kenapa Harus Kita?
                </h3>
                <div className="flex justify-center space-x-8 text-gray-600">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaCheckCircle className="text-green-500" />
                        <span>Super Aman</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaLightbulb className="text-yellow-500" />
                        <span>Teknologi Kekinian</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaTools className="text-blue-500" />
                        <span>Pro Abis</span>
                    </div>
                </div>
            </div>
        </div>
    </FlexSection>
);

export default Benefits;