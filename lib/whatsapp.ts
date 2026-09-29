// Placeholder number — swap for the real business WhatsApp line before launch.
export const WHATSAPP_NUMBER = "6281234567890";

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(name: string) {
  return `Hi, I'd like to book a stay at ${name}.`;
}

export function inquiryMessage(name: string) {
  return `Hi, I'd like to ask about a stay at ${name}.`;
}
