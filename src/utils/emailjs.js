import emailjs from "@emailjs/browser";

/**
 * EmailJS Configuration
 * Store these in .env file:
 * VITE_EMAILJS_SERVICE_ID=your_service_id
 * VITE_EMAILJS_TEMPLATE_ID=your_template_id
 * VITE_EMAILJS_PUBLIC_KEY=your_public_key
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send email using EmailJS
 * @param {Object} formData - Form data with name, email, phone, message, product_id
 * @returns {Promise} - EmailJS response
 */
export const sendEmail = async (formData) => {
  const { name, email, phone, message, product_id = null } = formData;

  // Template parameters matching the EmailJS template
  const templateParams = {
    name: name,
    email: email,
    phone: phone || "-",
    message: message,
    product_id: product_id,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error("EmailJS Error:", error);
    return { success: false, error };
  }
};

/**
 * Initialize EmailJS (optional, for form ref submission)
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};

export default { sendEmail, initEmailJS };
