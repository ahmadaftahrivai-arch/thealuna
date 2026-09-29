import { MessageCircle } from "lucide-react";
import { buildWhatsAppHref, inquiryMessage } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const href = buildWhatsAppHref(inquiryMessage("The Aluna"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
    </a>
  );
}
