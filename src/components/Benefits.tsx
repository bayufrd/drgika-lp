import FlexSection from "./FlexSection";
import Image from "next/image";
import { 
    FaCheckCircle, 
    FaLightbulb, 
    FaTools 
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Data from "public/data/data.json";

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

// Helper function to map icon names to actual icons
const getIconByName = (iconName: string, color: string) => {
    switch(iconName) {
        case 'FaCheckCircle':
            return <FaCheckCircle className={color} />;
        case 'FaLightbulb':
            return <FaLightbulb className={color} />;
        case 'FaTools':
            return <FaTools className={color} />;
        default:
            return <FaCheckCircle className={color} />;
    }
};

const Benefits = () => {
    const { benefits } = Data;

    return (
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
                            <span className="text-white">{benefits.mainTitle.text}</span>{' '}
                            <span className="text-yellow-400">{benefits.mainTitle.highlight}</span>{' '}
                            <span className="text-white">{benefits.mainTitle.afterHighlight}</span>
                        </>
                    }
                    subtitle={
                        <>
                            <span className="text-white">{benefits.subtitle.before}</span>
                            <span className="text-yellow-400">{benefits.subtitle.highlight}</span>
                            <span className="text-white">{benefits.subtitle.after}</span>
                        </>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {benefits.benefitItems.map((item) => (
                        <BenefitItem
                            key={item.number}
                            number={item.number}
                            icon={
                                <Image
                                    className="w-20 h-20 group-hover:scale-110 transition-transform"
                                    src={item.image}
                                    alt={item.imageAlt}
                                    width={80}
                                    height={80}
                                />
                            }
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

                {/* Tambahan informasi */}
                <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        {benefits.whyUs.title}
                    </h3>
                    <div className="flex justify-center space-x-8 text-gray-600">
                        {benefits.whyUs.items.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex items-center space-x-2 text-gray-700"
                            >
                                {getIconByName(item.icon, item.iconColor)}
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FlexSection>
    );
};

export default Benefits;