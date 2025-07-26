import Wrapper from "./Wrapper";
import FlexSection from "./FlexSection";


const Footer = () => (
	<FlexSection
		sectionClassName="py-16 bg-gradient-to-br from-accent to-blue-600"
		wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
	><footer className="w-full text-center">
				<p className="text-lg font-medium text-white">
					2025 © Dastrevas.Coding
				</p>
		</footer>
	</FlexSection>
);

export default Footer;
