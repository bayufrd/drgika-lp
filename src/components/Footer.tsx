import Wrapper from "./Wrapper";
import FlexSection from "./FlexSection";
import {
	FaWhatsapp,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaTiktok,
	FaFacebook
} from "react-icons/fa";
import Data from "public/data/data.json";

// Helper function to map icon names to actual icons
const getIconByName = (iconName: string, className?: string) => {
	switch (iconName) {
		case 'FaWhatsapp':
			return <FaWhatsapp className={className} />;
		case 'FaInstagram':
			return <FaInstagram className={className} />;
		case 'FaMapMarkerAlt':
			return <FaMapMarkerAlt className={className} />;
		case 'FaTiktok':
			return <FaTiktok className={className} />;
		case 'FaFacebook':
			return <FaFacebook className={className} />;
		default:
			return null;
	}
};

const Footer = () => {
	const { footer, header } = Data;

	return (
		<FlexSection
			sectionClassName="py-16 bg-gradient-to-br from-accent to-blue-600"
			wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
		>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
					{/* Kontak */}
					<div>
						<h4 className="text-xl font-bold mb-4">Kontak Kami</h4>
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<FaPhone className="text-white" />
								<span>{footer.contact.phone}</span>
							</div>
							<div className="flex items-center space-x-3">
								<FaEnvelope className="text-white" />
								<span>{footer.contact.email}</span>
							</div>
							<div className="flex items-center space-x-3">
								<FaMapMarkerAlt className="text-white" />
								<span>{footer.address}</span>
							</div>
						</div>
					</div>

					{/* Social Media */}
					<div>
						<h4 className="text-xl font-bold mb-4">Temukan Kami</h4>
						<div className="flex space-x-4">
							{[
								...footer.socialMedia,
								// Add additional social media if not in the original JSON
								
							].map((social) => (
								<a
									key={social.name}
									href={social.link}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gray-200 transition-colors"
								>
									{getIconByName(social.icon, "w-6 h-6")}
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-xl font-bold mb-4">Quick Links</h4>
						<div className="space-y-2">
							{footer.quickLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className="block hover:text-gray-200 transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="w-full text-center mt-8">
					<p className="text-lg font-medium text-white">
						{footer.copyrightYear} © <a
							href={footer.companyName.link}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline hover:text-gray-200 transition-colors"
						>
							{footer.companyName.text}
						</a>
					</p>
				</div>
			</div>
		</FlexSection>
	);
};

export default Footer;