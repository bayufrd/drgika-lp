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
                        <span className="text-white">Cara</span> <span className="text-yellow-400">Kami</span> <span className="text-white">Memberikan 
                        Pelayanan Terbaik</span>
                    </>
                }
                subtitle={
                    <>
                        <span className="text-white">3 Langkah </span><span className="text-yellow-400">Menuju </span><span className="text-white">Kesehatan Gigi Optimal</span>
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
                    title="Teknologi Laser Canggih"
                    description="Menggunakan laser dioda mutakhir untuk perawatan yang cepat, presisi, dan bebas rasa sakit."
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
                    title="Pemindaian 3D Akurat"
                    description="Teknologi pemindaian 3D tercanggih untuk diagnosa tepat dan perencanaan perawatan optimal."
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
                    title="Ahli Implan Berpengalaman"
                    description="Lebih dari 30 tahun pengalaman dalam pemasangan implan gigi dengan tingkat keberhasilan tinggi."
                />
            </div>

            {/* Tambahan informasi */}
            <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Mengapa Memilih Kami?
                </h3>
                <div className="flex justify-center space-x-8 text-gray-600">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaCheckCircle className="text-green-500" />
                        <span>Terjamin Aman</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaLightbulb className="text-yellow-500" />
                        <span>Teknologi Mutakhir</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaTools className="text-blue-500" />
                        <span>Profesional Berpengalaman</span>
                    </div>
                </div>
            </div>
        </div>
    </FlexSection>
);

export default Benefits;