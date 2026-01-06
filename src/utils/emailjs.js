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
 * @param {Object} formData - Form data with name, email, phone, message, title
 * @returns {Promise} - EmailJS response
 */
export const sendEmail = async (formData) => {
  const { name, email, phone, message, title = "Pesan dari Website" } = formData;

  // Template parameters matching your EmailJS template
  const templateParams = {
    name: name,       // {{name}} in template
    from_name: name,  // {{from_name}} in template
    from_email: email,// {{from_email}} in template
    phone: phone || "-", // {{phone}} in template
    message: message, // {{message}} in template
    // Extra params that might be useful
    title: title,
    email: email,     // often used for Reply-To
    time: new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }),
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
