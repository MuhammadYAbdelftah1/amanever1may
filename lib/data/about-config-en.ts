// About page configuration - English version

export const ABOUT_CONFIG_EN = {
  hero: {
    eyebrow: "About Us",
    title: "Your Smart Partner in Healthcare Journey",
    paragraph: "We are Aman Ever and Comprehensive Care for Medical Services — a leading Saudi technology platform specialized in technical and marketing mediation. We manage an integrated digital ecosystem and smart applications designed specifically to keep pace with digital health transformation in accordance with the Kingdom's Vision 2030. We work passionately to be the technical bridge that connects you with a selection of medical, health, and cosmetic service providers in the Kingdom, and we provide comprehensive and innovative care solutions that redefine the concept of digital health services by combining innovation with the highest quality standards.",
    stats: [
      { value: "80%", label: "Discount up to" },
      { value: "2000+", label: "Trusted Medical & Health Partners" },
      { value: "Comprehensive Coverage", label: "Throughout the Kingdom to Serve You" },
      { value: "Jeddah", label: "Main Center" },
    ],
  },
  mission: {
    eyebrow: "Our Mission",
    title: "A Safe Bridge Between Community and Medical Care",
    quote: "We strive to be a safe bridge connecting the community with medical and cosmetic services, by facilitating easy and reliable access with the highest standards of quality and technology. We are committed to elevating the patient experience by integrating technology with direct care, and providing exclusive financial benefits that give our customers the power of savings and excellence at all times.",
    pillars: [
      {
        icon: "Target",
        title: "Vision 2030",
        description: "Aligned with the Kingdom's Vision targets in health and digital transformation.",
      },
      {
        icon: "Infinity",
        title: "Extended Vision",
        description: "We build a system that serves the current generation and future generations.",
      },
      {
        icon: "Sparkles",
        title: "Continuous Innovation",
        description: "We invest in modern technologies to develop an advanced health experience.",
      },
    ],
  },
  vision: {
    eyebrow: "Our Vision",
    title: "Towards a Leading Platform in Digital Healthcare",
    paragraph: "To be the leading platform in medical marketing and digital healthcare in the Kingdom of Saudi Arabia and the Arab region, and an active contributor to achieving the goals of Saudi Vision 2030 in health and technical transformation. At Aman Ever, we seek to bring about a qualitative shift in the health sector within the Kingdom, through the use of the latest technologies to transform the healthcare experience into a comprehensive and seamless digital system.",
    servicesHeading: "Key Platform Services",
    services: [
      {
        icon: "Video",
        title: "Instant Medical Bookings & Consultations (Audio & Video)",
        description: "Your doctor is with you wherever you are.. Book your appointment without waiting or get your medical consultation (audio, video, chat) around the clock from your location.",
      },
      {
        icon: "Home",
        title: "Home Care Services",
        description: "Comprehensive medical care delivered to your doorstep.. Certified staff for medical visits, physiotherapy, and special care for children and the elderly.",
      },
      {
        icon: "ShoppingBag",
        title: "Online Store",
        description: "A diverse store of services and products with special offers and discounted prices.",
      },
      {
        icon: "Wallet",
        title: "Smart Financial Solutions",
        description: "Fixed offers and discounts, with a cashback program and points wallet to enhance added value for the user within an approved regulatory framework.",
      },
      {
        icon: "Network",
        title: "Technical Connection",
        description: "Connecting medical service providers and supporting entities to ensure smooth service.",
      },
      {
        icon: "Building2",
        title: "Medical Facilities Support",
        description: "Helping medical facilities with digital access and improving the beneficiary experience.",
      },
    ],
  },
  values: {
    eyebrow: "Our Identity and Values",
    title: "The Values That Guide Every Decision We Make",
    intro: "We are pioneers in integrating technology with medical care to facilitate your access to the best services — driven by a set of values that form the core of our work.",
    items: [
      {
        number: "01",
        icon: "Heart",
        title: "People First",
        description: "We put human health first, and their comfort at the heart of everything we offer.",
      },
      {
        number: "02",
        icon: "Eye",
        title: "Clarity and Respect",
        description: "We deal with everyone with transparency and respect — because trust is the foundation of every successful relationship.",
      },
      {
        number: "03",
        icon: "Lightbulb",
        title: "Simplified Innovation",
        description: "We always strive to provide innovative medical services that make care closer and easier for everyone.",
      },
      {
        number: "04",
        icon: "ShieldCheck",
        title: "Safe Experience",
        description: "We are committed to providing a medical experience you can rely on with safety and peace of mind.",
      },
      {
        number: "05",
        icon: "Handshake",
        title: "Partnership in Service",
        description: "We believe that working together and building strong partnerships is the way to achieve the best possible service.",
      },
    ],
  },
  trust: {
    eyebrow: "Our Commitments",
    title: "A Documented and Compliant Saudi Company",
    sub: "We operate according to the highest regulatory compliance standards in the Kingdom of Saudi Arabia, within a system that respects your privacy and protects your data.",
    items: [
      {
        icon: "FileCheck",
        title: "Commercial Registration",
        content: "7038166471",
      },
      {
        icon: "ShieldCheck",
        title: "Data Protection",
        content: "We comply with the Saudi Personal Data Protection Law (PDPL) under the supervision of SDAIA.",
      },
      {
        icon: "BadgeCheck",
        title: "Ministry of Health License",
        content: "Licensed by the Ministry of Health to operate as a digital health services platform.",
      },
      {
        icon: "Flag",
        title: "Vision 2030",
        content: "Active partners in health and digital transformation within the Kingdom's Vision 2030.",
      },
    ],
  },
  cta: {
    eyebrow: "Next Step",
    title: "Be Part of the Future of Digital Healthcare",
    sub: "Whether you are a beneficiary looking for distinguished medical service, a service provider wishing to expand digitally, or a strategic partner — Aman Ever is with you every step of the way.",
    paths: [
      {
        icon: "User",
        forWhom: "For Beneficiaries",
        label: "Download the App",
        url: "/en/download",
      },
      {
        icon: "Stethoscope",
        forWhom: "For Doctors and Service Providers",
        label: "Join the Medical Network",
        url: "/en/doctor-platform",
      },
      {
        icon: "Briefcase",
        forWhom: "For Partners",
        label: "Contact Us",
        url: "mailto:info@amanever.com",
      },
    ],
  },
} as const;

export type AboutConfigEn = typeof ABOUT_CONFIG_EN;
