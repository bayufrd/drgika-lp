import FlexSection from "./FlexSection";
import Image from "next/image";
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
	const { footer } = Data;

	return (
		<FlexSection
			sectionClassName="py-16 bg-gradient-to-br from-accent to-blue-600"
			wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
		>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
					{/* Kontak */}
					<div>
						<div className="flex items-center gap-3 mb-4">
							<Image
								src="/android-chrome-512x512.png"
								alt="Drg. Ika Kiromin Baroroh"
								width={44}
								height={44}
								className="rounded-xl bg-white/10"
							/>
							<div className="font-bold text-lg leading-tight">
								Drg. Ika Kiromin Baroroh
							</div>
						</div>
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
									aria-label={social.name}
									title={social.name}
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
				<div className="w-full mt-10 pt-6 border-t border-white/15">
					<div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-white">
						<p className="text-sm font-medium">
							© 2025 DOKTER GIGI IKA KIROMIN BAROROH. All rights reserved.
						</p>
						<a
							href="https://dastrevas.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-medium hover:underline hover:text-gray-200 transition-colors sm:text-right"
						>
							Powered by Dastrevas.com
						</a>
					</div>
				</div>
			</div>
		</FlexSection>
	);
};

export default Footer;
