"use client";

import React from "react";
import { motion } from "framer-motion";

type Job = {
  company: string;
  companyUrl?: string;
  client?: string;
  clientUrl?: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
};

const jobs: Job[] = [
  {
    company: "Dew Software Pvt. Ltd.",
    companyUrl: "https://dewsoftware.com",
    client: "SanDisk – USA",
    clientUrl: "https://www.westerndigital.com/company/brands/sandisk",
    role: "Full Stack Developer (Contract via Dew Software)",
    period: "Nov 2024 – Present",
    location: "Remote / India",
    bullets: [
      "Designed and developed a proposed org-chart KPI dashboard for the SanDisk PIE platform using React, Next.js and D3.js.",
      "Designed and built a secure role-based access control system with SSO authentication and group-level permissions, supporting page-based authorization for 10K+ active PIE users. Led the complete backend development using NestJS, with seamless Oracle and Tableau integration as the sole developer.",
      "Successfully executed Node.js runtime migration from v14 to v20, reducing page load times by 60–70%.",
      "Handled complete development-to-deployment workflows using Linux server setup with Docker (RedHat) and Git for version control.",
      "Executed production data migration using SQLite package with zero database downtime, ensuring uninterrupted application availability.",
      "During the Western Digital to SanDisk transition, independently managed critical PIE application updates and streamlined brand-related configurations."
    ],
    tech: [
      "React",
      "Next.js",
      "NestJS",
      "Node 20",
      "D3.js",
      "Docker",
      "Tableau",
      "Oracle SQL Developer",
      "Illustrator",
      "PowerPoint"
    ]
  },
  {
    company: "Sixth Force Solution Pvt. Ltd.",
    companyUrl: "https://www.sixthforce.com",
    client: "Nova Scotia – Canada",
    clientUrl: "https://novascotia.ca",
    role: "Senior Software Engineer",
    period: "Jun 2021 – Apr 2024",
    location: "Chennai / India",
    bullets: [
      "Led development of the Prolaborate Enterprise Architecture visualization platform, designing interactive graphs, heatmaps and dashboards using Angular and D3.js.",
      "Migrated the application from Angular 16 to 18, enhancing UI performance and modular architecture with Angular Material.",
      "Designed customizable dashboards with user-specific visibility rules and role-based access control, including chatbot integration.",
      "Optimized backend data processing using Oracle stored procedures and SQL queries, supporting real-time visualization with a .NET-based service layer.",
      "Managed a 5-member team to deliver web platforms, handling SEO optimization, UI/UX design, branding, and promotional banner creation.",
      "Developed EA Summit event websites and implemented live presentation functionality during international conferences.",
      "Successfully delivered 6+ websites using fresh concepts and rapid execution for enterprise teams in time-sensitive conditions."
    ],
    tech: [
      "Angular 16 → 18 Migration",
      "D3.js",
      "Node.js",
      "Oracle Database",
      ".NET Backend Services",
      "AWS",
      "IIS",
      "Windows Server",
      "XAMPP",
      "MySQL",
      "MS SQL Server",
      "Zoho Analytics",
      "Photoshop",
      "Illustrator",
      "Adobe XD",
      "Figma",
      "WordPress CMS",
      "Branding & Banner Design"
    ]
  },
  {
    company: "Goandroy Technologies",
    companyUrl: "https://goandroy.com/",
    client: "Multiple Indian Clients (scale model cart, Neon, Woodpecker)",
    clientUrl: "https://scalearts.in/",
    role: "Software Engineer",
    period: "Aug 2019 – Sep 2020",
    location: "Chennai / India",
    bullets: [
      "Developed airline catering and operations dashboards reporting workflows.",
      "Built REST APIs and PHP CodeIgniter-based backend services for multi-tenant applications, deployed on Windows on-premise physical server.",
      "Delivered 10+ enterprise websites single-handedly using PHP (CodeIgniter), WordPress CMS, and branding assets with rapid turnaround.",
      "Led frontend UI prototyping using Angular and Figma for a scale model e-commerce platform, incorporating direct design inputs from the CEO.",
      "Created branding materials including logos, UI banners and visual communication designs using Adobe Illustrator and Photoshop.",
      "Optimized legacy PHP/JavaScript modules into reusable and high-performance components to improve scalability and maintainability."
    ],
    tech: [
      "PHP",
      "CodeIgniter",
      "WordPress CMS",
      "MySQL",
      "REST APIs",
      "jQuery",
      "Angular (UI Prototype)",
      "Figma",
      "Illustrator",
      "Photoshop",
      "Windows Server (On-Prem)",
      "Branding & UI Design"
    ]
  },
  {
    company: "ATK Techsoft",
    role: "Software Engineer (Fresher)",
    period: "Sep 2018 – Apr 2019",
    location: "Chennai / India",
    bullets: [
      "Developed responsive web applications for SME clients across HR, billing and inventory domains using PHP, WordPress, HTML, CSS, JavaScript and jQuery.",
      "Built and deployed production-ready hotel booking application with cPanel hosting and dashboard management, including customer and admin modules.",
      "Delivered 10+ websites independently, handling end-to-end development from UI design to deployment.",
      "Developed mobile application prototypes using Flutter UI components for client demonstration.",
      "Designed logos, marketing banners and branding assets using Adobe Photoshop and Illustrator.",
      "Actively learned and self-implemented frontend technologies including HTML, CSS, jQuery, AJAX and WordPress CMS during the initial career phase."
    ],
    tech: [
      "PHP",
      "WordPress",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "AJAX",
      "Bootstrap",
      "Flutter (UI Prototyping)",
      "cPanel Hosting",
      "Photoshop",
      "Illustrator",
      "Branding Design"
    ]
  },
  {
    company: "Hard and Soft",
    companyUrl: "https://hnsonline.com/",
    role: "Software Developer Intern (Final Year Internship)",
    period: "Sep 2018 – Mar 2019",
    location: "Chennai / India",
    bullets: [
      "Developed custom web applications for SME clients, focusing on HR, billing and inventory modules using PHP and WAMP server.",
      "Built responsive UIs using HTML, CSS, Bootstrap and jQuery to improve user accessibility and client satisfaction.",
      "Collaborated with clients to translate business requirements into technical specifications and application workflows.",
      "Developed mini-projects as part of university internship integrating Microsoft Visual Studio and SQL Server environments."
    ],
    tech: [
      "PHP",
      "HTML",
      "CSS",
      "Bootstrap",
      "jQuery",
      "WAMP Server",
      "Microsoft Visual Studio 2008",
      "Microsoft SQL Server",
      "VB Script"
    ]
  },
  {
    company: "PMIST – M.Sc. in Software Engineering",
    companyUrl: "https://www.pmu.edu",
    role: "Full-Time Student (First Class)",
    period: "Jun 2013 – Apr 2018",
    location: "Thanjavur / India",
    bullets: [
      "Completed a 5-year integrated Master of Science in Software Engineering with First Class.",
      "Developed strong foundations in programming, data structures, UI design, and full-stack application development."
    ],
    tech: []
  }
];

// small hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // < md
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function ExperiencePage() {
  const isMobile = useIsMobile();

  return (
    <main className="experience-page">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-5">
          <span className="badge rounded-pill bg-primary-subtle text-primary mb-3 px-3 py-2 small fw-semibold">
            Experience / Timeline
          </span>
          <h1 className="display-6 fw-semibold mb-2">My professional journey</h1>
          <p className="text-muted">
            A snapshot of the roles, clients and impact I&apos;ve had across
            enterprise products and platforms.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-start-label">🔓 Open to Work</div>

          {/* vertical line: no animation on mobile */}
          {isMobile ? (
            <div className="timeline-line" />
          ) : (
            <motion.div
              className="timeline-line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}

          <div className="timeline-items">
            {jobs.map((job, idx) => {
              const isLeft = idx % 2 === 0;

              const cardInner = (
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2 gap-3">
                    <div>
                      <h2 className="h5 mb-1">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </h2>

                      {job.client && (
                        <p className="small text-primary mb-0">
                          Client:&nbsp;
                          {job.clientUrl ? (
                            <a
                              href={job.clientUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-decoration-none"
                            >
                              {job.client}
                            </a>
                          ) : (
                            job.client
                          )}
                        </p>
                      )}
                    </div>

                    {/* role badge – responsive, wraps on mobile */}
                    <span
                      className="badge text-bg-light border fw-semibold small text-wrap text-break"
                      style={{ maxWidth: "160px", whiteSpace: "normal" }}
                    >
                      {job.role}
                    </span>
                  </div>

                  <p className="small text-primary mb-3">
                    {job.period} &nbsp;•&nbsp; {job.location}
                  </p>

                  <ul className="small mb-3">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="mb-2" style={{ lineHeight: "1.4" }}>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack – hidden on mobile, visible from md and up */}
                  <div className="d-none d-md-flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="badge rounded-pill bg-body-secondary text-muted small"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );

              return (
                <div
                  key={job.company + idx}
                  className={`timeline-row ${isLeft ? "left" : "right"}`}
                >
                  {/* CARD – animated only on non-mobile */}
                  {isMobile ? (
                    <article className="timeline-card card border-0 shadow-sm">
                      {cardInner}
                    </article>
                  ) : (
                    <motion.article
                      className="timeline-card card border-0 shadow-sm"
                      initial={{ opacity: 0, y: 40, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.55, delay: idx * 0.08 }}
                    >
                      {cardInner}
                    </motion.article>
                  )}

                  <div className="timeline-dot" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
