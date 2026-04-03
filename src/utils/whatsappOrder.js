const WHATSAPP_NUMBER = "22893733150";

export const openWhatsAppWithLocation = async (baseMessage) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMessage)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

