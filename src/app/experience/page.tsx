"use client";

import React from "react";
import { motion } from "framer-motion";

type Job = {
  company: string;
  client?: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
};

const jobs: Job[] = [
  {
    company: "Dew Software Pvt. Ltd.",
    client: "SanDisk – USA",
    role: "Full Stack Developer",
    period: "Oct 2024 – Aug 2025",
    location: "Remote / India",
    bullets: [
      "Built org-chart KPI dashboard for the SanDisk PIE platform using React, Next.js and D3.js.",
      "Implemented role-based access and APIs with NestJS (JWT) and Oracle/Tableau integrations.",
      "Drove Node.js runtime upgrade (v14 → v20) and improved overall page-load times by 60–70%."
    ],
    tech: ["React", "Next.js", "NestJS", "Node 20", "D3.js", "Docker"]
  },
  {
    company: "Sixth Force Solution Pvt. Ltd.",
    client: "Nova Scotia – Canada",
    role: "Senior Software Engineer",
    period: "Jun 2021 – Apr 2024",
    location: "Chennai / India",
    bullets: [
      "Owned Prolaborate EA visualization modules: interactive graphs, heatmaps and dashboards.",
      "Designed configurable dashboard widgets using Angular + D3.js backed by Oracle stored procedures.",
      "Led UI best practices, code reviews and performance tuning for large enterprise users."
    ],
    tech: ["Angular 18", "D3.js", "Node.js", "Oracle", "AWS"]
  },
  {
    company: "Goandroy Technologies",
    client: "Paxia Inc – USA",
    role: "Software Engineer",
    period: "Aug 2019 – May 2021",
    location: "Chennai / India",
    bullets: [
      "Developed airline catering & operations dashboards with role-based access and reporting.",
      "Built REST APIs and integrations for multi-tenant clients.",
      "Improved legacy PHP/JS modules into reusable components with better performance."
    ],
    tech: ["PHP", "CodeIgniter", "MySQL", "REST APIs", "jQuery"]
  },
  {
    company: "ATK Techsoft",
    role: "Software Engineer",
    period: "Aug 2018 – May 2019",
    location: "Chennai / India",
    bullets: [
      "Delivered custom web applications for SME clients (HR, billing and inventory).",
      "Implemented responsive UIs with Bootstrap and jQuery plugins.",
      "Collaborated with clients to gather requirements and translate them into technical specs."
    ],
    tech: ["PHP", "WordPress", "Bootstrap", "jQuery"]
  }
];

export default function ExperiencePage() {
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
                  {/* <div className="timeline-start-marker" /> */}
                  {/* Timeline Header Label */}
<div className="timeline-start-label">
  🔓 Open to Work
</div>

          {/* animated vertical line */}
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="timeline-items">
            {jobs.map((job, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={job.company + idx}
                  className={`timeline-row ${isLeft ? "left" : "right"}`}
                >
                  {/* CARD */}
                  <motion.article
                    className="timeline-card card border-0 shadow-sm"
                    initial={{ opacity: 0, y: 40, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, delay: idx * 0.08 }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2 gap-3">
                        <div>
                          <h2 className="h5 mb-1">{job.company}</h2>
                          {job.client && (
                            <p className="small text-primary mb-0">
                              Client: {job.client}
                            </p>
                          )}
                        </div>
                        <span className="badge text-bg-light border fw-semibold small">
                          {job.role}
                        </span>
                      </div>

                      <p className="small text-primary mb-3">
                        {job.period} &nbsp;•&nbsp; {job.location}
                      </p>

                      <ul className="small mb-3">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="mb-1">
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="d-flex flex-wrap gap-2">
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
                  </motion.article>

                  {/* DOT on center line */}
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
