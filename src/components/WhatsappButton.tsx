import data from "public/data/data.json"
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = data.header.contact["whatsapp-number"];
  const waLink = data.header.contact.whatsapp;
  const message = "Halo Dok, saya ingin konsultasi."; // pesan default

  return (
    <a
      href={`${waLink}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg transition-transform transform hover:scale-110"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsappButton;
