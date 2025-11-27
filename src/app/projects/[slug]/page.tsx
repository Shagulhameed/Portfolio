// src/app/projects/[slug]/page.tsx
/* eslint-disable @next/next/no-img-element */

import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ---------- Types & helpers ---------------------------------------------

type PageProps = {
  params: {
    slug: string;           // ✅ Next app router always passes a string here
  };
};

type LinkItem = { label: string; url: string };

function splitTech(tech?: string | null): string[] {
  if (!tech) return [];
  return tech
    .split(/[•,/]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function normaliseHighlights(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[])
    .filter((h): h is string => typeof h === "string")
    .map((h) => h.trim())
    .filter(Boolean);
}

function normaliseLinks(raw: unknown): LinkItem[] {
  if (!Array.isArray(raw)) return [];
  return (raw as any[])
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const label = String(item.label ?? "").trim();
      const url = String(item.url ?? "").trim();
      if (!label || !url) return null;
      return { label, url };
    })
    .filter((x): x is LinkItem => !!x);
}

// ---------- Metadata -----------------------------------------------------

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug;                // ✅ simple & typed

  const project = await prisma.project.findFirst({
    where: { slug, published: true },
    select: {
      title: true,
      client: true,
      description: true,
    },
  });

  if (!project) {
    return {
      title: "Project not found | Shagul Hameed",
      description: "Requested project could not be found.",
    };
  }

  const clientPart = project.client ? ` for ${project.client}` : "";

  return {
    title: `${project.title}${clientPart} | Projects`,
    description:
      project.description ??
      `Case study: ${project.title}${clientPart} built by Shagul Hameed.`,
  };
}

// ---------- Page ---------------------------------------------------------

export default async function ProjectDetailPage({ params }: PageProps) {
  // 1. read slug (guaranteed string from router)
  const slug = params.slug;

  // 2. fetch project (only published = true)
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
  });

  if (!project) {
    // 👉 only here we 404
    notFound();
  }

  const techStack = splitTech(project.technology);
  const highlights = normaliseHighlights(project.highlights);
  const links = normaliseLinks(project.links);

  const bannerSrc =
    project.image && (project.image.startsWith("http") || project.image.startsWith("/"))
      ? project.image
      : project.image
      ? `/projects/${project.image}`
      : "/projects/placeholder.png";

  return (
    <div
      className="py-5"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="container">
        {/* breadcrumb */}
        <nav className="small mb-3 text-muted">
          <Link href="/projects" className="text-decoration-none text-muted">
            Projects
          </Link>{" "}
          / <span className="text-body-secondary">{project.title}</span>
        </nav>

        {/* hero/banner */}
        <section
          className="rounded-4 border shadow-sm mb-4 overflow-hidden"
          style={{
            background: "var(--hero-bg)",
            borderColor: "var(--hero-border)",
          }}
        >
          <div className="position-relative">
            <Image
              src={bannerSrc}
              alt={project.title}
              width={1600}
              height={720}
              className="w-100 object-fit-cover"
              priority
            />

            <div
              className="position-absolute bottom-0 start-0 end-0 px-4 px-md-5 py-3"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            >
              <div className="d-flex flex-wrap align-items-center gap-2">
                <h1 className="h3 mb-0 text-white">{project.title}</h1>

                {project.type && (
                  <span className="badge rounded-pill bg-light text-dark ms-2">
                    {project.type}
                  </span>
                )}
              </div>

              {(project.role || project.client) && (
                <p className="small text-white-50 mb-0 mt-1">
                  {project.role && (
                    <span className="me-2 text-capitalize">
                      {project.role.toLowerCase()}
                    </span>
                  )}
                  {project.client && (
                    <span>
                      for <strong>{project.client}</strong>
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* content */}
        <section className="row g-4">
          {/* left column */}
          <div className="col-lg-8">
            {/* tech stack */}
            {techStack.length > 0 && (
              <div className="mb-4">
                <h2 className="h6 text-uppercase small fw-semibold mb-2">
                  Tech stack
                </h2>
                <div className="d-flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <span
                      key={t}
                      className="badge rounded-pill border small"
                      style={{
                        background: "var(--hero-pill-bg)",
                        borderColor: "var(--hero-pill-border)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* overview */}
            {project.description && (
              <div className="mb-4">
                <h2 className="h6 text-uppercase small fw-semibold mb-2">
                  Overview
                </h2>
                <p className="small mb-0 text-muted">{project.description}</p>
              </div>
            )}

            {/* highlights */}
            {highlights.length > 0 && (
              <div className="mb-4">
                <h2 className="h6 text-uppercase small fw-semibold mb-2">
                  Key contributions
                </h2>
                <ul className="small text-muted mb-0">
                  {highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* back link */}
            <div className="mt-4">
              <Link
                href="/projects"
                className="small text-decoration-none text-muted"
              >
                ← Back to all projects
              </Link>
            </div>
          </div>

          {/* right column */}
          <div className="col-lg-4">
            <div
              className="rounded-3 border shadow-sm p-3 p-md-4"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <h2 className="h6 text-uppercase small fw-semibold mb-3">
                Links
              </h2>

              {links.length === 0 && (
                <p className="small text-muted mb-0">
                  No public links have been added for this project yet.
                </p>
              )}

              {links.length > 0 && (
                <ul className="list-unstyled small mb-0">
                  {links.map((l) => (
                    <li key={l.url} className="mb-2">
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
