/* ==========================================================================
   IFEOLUWA — Central configuration
   Everything editable lives here. Update these values, save, refresh.
   ========================================================================== */
window.SITE = {
  /* --- Identity ------------------------------------------------------- */
  name: "Dada Sunday Ifeoluwa",
  displayName: "Ifeoluwa",
  wordmark: "IFEOLUWA",
  role: "Strategist | Consultant | Educator",
  tagline: "Raising Global Leaders.",
  statement: "Building People. Strengthening Businesses. Creating Lasting Value.",
  domain: "https://sundayifeoluwa.vercel.app",

  /* --- Contact channels (REPLACE with live values) --------------------- */
  // Placeholder addresses — swap for the real mailbox before launch.
  email: "hello@ifeoluwa.com",
  phone: "",                       // e.g. "+2348000000000" (E.164, used for WhatsApp link)
  whatsapp: "",                    // e.g. "2348000000000" — empty hides the button
  address: "Nigeria · Available internationally",

  /* --- Social profiles (empty string = hidden) -------------------------- */
  social: {
    linkedin: "",                  // e.g. "https://linkedin.com/in/username"
    instagram: "",
    youtube: "",
    x: "",
    facebook: ""
  },

  /* --- Form delivery ---------------------------------------------------
     endpoint: leave "" to run in DEMO mode (no network request is made and
     the UI states clearly that nothing was sent).
     Set to a secure server endpoint (e.g. /api/contact) that validates on
     the server side and relays via a transactional email provider.
     Never place API keys in this file.                                        */
  contactEndpoint: "",
  newsletterEndpoint: "",

  /* --- Downloads (drop files into assets/documents/) --------------------- */
  profilePdf: "",                  // e.g. "assets/documents/ifeoluwa-profile.pdf"
  brochurePdf: ""
};
