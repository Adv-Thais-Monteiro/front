/** Dados de contato da Dra. Thais Monteiro — altere aqui para refletir em todo o site. */

export const WHATSAPP_NUMBER = "5534992396938"; // +55 (34) 99239-6938
export const WHATSAPP_DISPLAY = "(34) 99239-6938";
export const EMAIL = "advthaisfmonteiro@gmail.com";

const DEFAULT_MESSAGE = "Olá, Dra. Thais! Gostaria de agendar uma consulta.";

export const whatsappLink = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const emailLink = `mailto:${EMAIL}?subject=${encodeURIComponent("Contato pelo site")}`;
