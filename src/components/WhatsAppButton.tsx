import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "919876543210"; // Replace with actual WhatsApp number
  const message = encodeURIComponent("Hi! I'd like to inquire about your event management services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 smooth-transition"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
