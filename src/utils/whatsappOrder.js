const WHATSAPP_NUMBER = "22893733150";

const getLocationMessage = () =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve("Localisation: non disponible sur cet appareil.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve(`Localisation: https://maps.google.com/?q=${latitude},${longitude}`);
      },
      (error) => {
        const reasonByCode = {
          1: "permission refusée",
          2: "position indisponible",
          3: "délai dépassé"
        };
        const reason = reasonByCode[error.code] || "non partagée";
        resolve(`Localisation: ${reason}.`);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      }
    );
  });

export const openWhatsAppWithLocation = async (baseMessage) => {
  const locationMessage = await getLocationMessage();
  const message = `${baseMessage}\n\n${locationMessage}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

