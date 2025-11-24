// src/lib/projects.ts


export type Project = {
  id: string;
  title: string;
  client?: string;
  type?: string;
  technology?: string;
  description: string;
  role?: string;
  links?: string[]; // live site / demo / api
  highlights?: string[]; // bullet points
  image?: string; // public/projects/<id>.png
};

export const projects: Project[] = [
  {
    id: "pie-access",
    title: "PIE Access Management System",
    client: "SanDisk",
    type: "Enterprise",
    technology: "React • Node.js • NestJS • Oracle • D3.js • Tableau",
    role: "Full Stack Developer",
    image: "/projects/pie-access.png",
    description:
      "Org charts and KPI visualization across the organization with role-based Tableau integration and secure APIs.",
    highlights: [
      "Designed D3-based org-chart with KPI overlays",
      "Built NestJS APIs for access control and audit logs",
      "Automated server tasks via shell scripts & cron on Red Hat Linux",
    ],
    links: [],
  },
  {
    id: "prolaborate",
    title: "Prolaborate EA Visualization Platform",
    client: "Nova Scotia Government",
    type: "Enterprise",
    technology: "Angular 18 • D3.js • Node.js • Oracle • AWS",
    role: "Angular Developer",
    image: "/projects/prolaborate.png",
    description:
      "Enterprise Architecture visualizations with role-level customizations and real-time Oracle-backed dashboards.",
    highlights: [
      "Dynamic EA visualizations using D3.js and Angular Material",
      "Performance-tuned Oracle DB retrieval",
      "AWS deployments with SSL & secure APIs",
    ],
    links: [],
  },
  {
    id: "marquee",
    title: "Marquee Content Management System",
    type: "Admin Dashboard",
    technology: "React • NestJS • MySQL • Bootstrap",
    role: "Full Stack Developer",
    image: "/projects/marquee.png",
    description:
      "Admin UI for managing marquee texts/animations across screens with JWT authentication and reusable components.",
    highlights: ["CRUD admin UI", "JWT-based auth", "Reusable forms & table components"],
    links: [],
  },
  {
    id: "react-orgchart",
    title: "React Org Chart with KPI Support",
    type: "Visualization",
    technology: "React 18 • D3.js • Redux • Bootstrap",
    role: "React Developer",
    image: "/projects/react-orgchart.png",
    description:
      "Custom drag-and-drop org chart with save/load/delete and conditional KPI rendering based on access.",
    highlights: ["Drag & drop", "KPI overlays", "Persistence & role-based visibility"],
    links: [],
  },

  // Your earlier PHP / WordPress / other projects
  {
    id: "sanchika",
    title: "Sanchika (E-commerce)",
    client: "Kerala client",
    type: "E-commerce",
    technology: "Angular 11 • Spring APIs • MySQL",
    image: "/projects/sanchika.png",
    description:
      "Grocery e-commerce website. I implemented the frontend UI with Angular and collaborated on API integration and delivery.",
    links: ["https://www.wondersmind.com/design/sanchika/index.html"],
  },
  {
    id: "scalemodelcart",
    title: "Scalemodelcart (E-commerce)",
    technology: "SlimPHP • MySQL • API",
    image: "/projects/scalemodelcart.png",
    description:
      "API-first e-commerce solution using SlimPHP. Responsible for API development and integration.",
    links: ["http://scalemodelcart.com/"],
  },
  {
    id: "homecareplus",
    title: "Home Care Plus (HRMS)",
    technology: "CodeIgniter • PHP • MySQL • Firebase",
    image: "/projects/homecareplus.png",
    description:
      "HRMS & billing system with realtime dashboards (Firebase) and Excel report exports.",
    links: [],
  },
  {
    id: "neon",
    title: "Neon (ERP)",
    technology: "CodeIgniter • PHP • MySQL",
    image: "/projects/neon.png",
    description:
      "Student & training ERP with reporting features and real-time components.",
    links: [],
  },
  {
    id: "closet",
    title: "Closet (Designer E-commerce)",
    technology: "HTML5 • CSS • Bootstrap • jQuery",
    image: "/projects/closet.png",
    description:
      "Designer e-commerce app where admin schedules measurement pickups after order placement.",
    links: [],
  },
  {
    id: "shopify",
    title: "Shopify & WordPress E-Commerce",
    technology: "WordPress • Payment gateway • SMS gateway",
    image: "/projects/shopify.png",
    description:
      "WordPress/Shopify e-commerce with payment and SMS integration, multi-vendor marketplace features.",
    links: [],
  },
  {
    id: "misc-sites",
    title: "Other dynamic websites (WordPress/Custom)",
    technology: "WordPress / PHP",
    image: "/projects/misc-sites.png",
    description:
      "Various WordPress and small business sites: QuickMove, StaffingERP, SoFitnessStudio, Mechomatic, Goandroy, WPInteriors, MerakiCorp, AKT projects and NGO donation sites.",
    links: [
      "https://thepaintedsky.com/index.php",
      "https://quickmove.in/",
      "https://staffingerp.in/",
      "http://sofitnessstudio.com/",
      "http://sriramurology.com/",
      "http://mechomatic.com/",
      "https://goandroy.com/",
      "http://www.wpinteriors.in/",
      "http://merakicorp.in/",
      "https://www.atktechsoft.com/sriannamalaiyarresidency/",
      "http://billionyoung.com/",
    ],
  },
];
