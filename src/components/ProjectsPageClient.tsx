// src/components/ProjectsPageClient.tsx
"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ---- Types -------------------------------------------------------------

export type Project = {
  id: number;
  slug: string | null;
  title: string;
  client: string | null;
  type: string | null;
  technology: string | null;
  role: string | null;
  image: string | null;
  description: string | null;
  // stored as JSON in DB
  highlights: unknown;
  links: unknown;
  published: boolean;
};

// split "Enterprise, Dashboard" -> ["Enterprise", "Dashboard"]
function getCategoriesFromType(type?: string | null): string[] {
  if (!type) return [];
  return type
    .split(/[,/]/) // comma or slash
    .map((t) => t.replace(/•/g, "").trim())
    .filter(Boolean);
}

// Tech splitter: "React • Node.js, Docker / NestJS"
// => ["React", "Node.js", "Docker", "NestJS"]
export function splitTech(tech?: string | null): string[] {
  if (!tech) return [];
  return tech
    .split(/[•,/]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

// DB JSON → string[] highlights
function normaliseHighlights(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[])
    .filter((h): h is string => typeof h === "string")
    .map((h) => h.trim())
    .filter(Boolean);
}

type LinkItem = { label: string; url: string };

// ---- Safe image --------------------------------------------------------

function SafeImage({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const placeholder = "/projects/placeholder.png";

  if (!src) {
    return (
      <img
        src={placeholder}
        alt={alt}
        className={className}
        width={1200}
        height={480}
      />
    );
  }

  // For uploaded static files inside /public/projects or full URLs
  const finalSrc =
    src.startsWith("http") || src.startsWith("/") ? src : `/projects/${src}`;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={1200}
      height={480}
      className={className}
    />
  );
}

// ---- Small UI helpers --------------------------------------------------

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="project-tag badge rounded-pill border bg-light text-dark me-1 mb-1 small">
      {children}
    </span>
  );
}

// ---- Card --------------------------------------------------------------

type ProjectCardProps = {
  p: Project;
};

function ProjectCard({ p }: ProjectCardProps) {
  const initials = p.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const techTags = splitTech(p.technology).slice(0, 3);
  const highlightTags = normaliseHighlights(p.highlights).slice(0, 2);
  const tags = [...techTags, ...highlightTags];

  const categories = getCategoriesFromType(p.type);
  const primaryTypeLabel = categories.join(" / ") || "Other";

  const detailHref = p.slug ? `/projects/${p.slug}` : `/projects/id/${p.id}`;

  return (
    <article className="card h-100 border-0 shadow-sm project-card">
      <div className="project-banner">
        {p.image ? (
          <SafeImage src={p.image} alt={p.title} className="project-banner-img" />
        ) : (
          <div className="project-banner-fallback d-flex align-items-center justify-content-center">
            <span className="fs-2 fw-semibold text-muted">{initials}</span>
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title mb-1">{p.title}</h3>

        {p.client || p.role ? (
          <p className="text-muted small mb-2">
            {p.role && <span className="me-2 fw-medium">{p.role}</span>}
            {p.client && (
              <span className="text-muted">
                for <span className="fw-semibold">{p.client}</span>
              </span>
            )}
          </p>
        ) : null}

        {p.description && (
          <p className="card-text small text-muted mb-3">
            {p.description.length > 160
              ? p.description.slice(0, 160) + "…"
              : p.description}
          </p>
        )}

        {/* tags */}
        {tags.length > 0 && (
          <div className="mt-auto d-flex flex-wrap gap-1 mb-3">
            {tags.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </div>
        )}

        {/* footer: type + learn more */}
        <div className="d-flex justify-content-between align-items-center mt-auto pt-1">
          <span className="badge bg-subtle text-muted small">
            {primaryTypeLabel}
          </span>

          <Link
            href={detailHref}
            className="btn btn-sm btn-outline-primary ms-auto"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
}

// ---- Page client (grid + filters) --------------------------------------

type Props = {
  projects: Project[];
};

export default function ProjectsPageClient({ projects }: Props) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);

  // categories for filter
  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const cats = getCategoriesFromType(p.type);
      if (cats.length === 0) {
        set.add("Other");
      } else {
        cats.forEach((c) => set.add(c));
      }
    });
    return Array.from(set).sort();
  }, [projects]);

  // technologies for filter
  const techOptions = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => splitTech(p.technology).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleTech = (t: string) =>
    setSelectedTech((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return projects.filter((p) => {
      const categories = getCategoriesFromType(p.type);
      const techTokens = splitTech(p.technology);

      const matchesType =
        selectedTypes.length === 0 ||
        (categories.length === 0 && selectedTypes.includes("Other")) ||
        categories.some((c) => selectedTypes.includes(c));

      const matchesTech =
        selectedTech.length === 0 ||
        techTokens.some((t) => selectedTech.includes(t));

      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.technology && p.technology.toLowerCase().includes(q)) ||
        (p.client && p.client.toLowerCase().includes(q));

      return matchesType && matchesTech && matchesSearch;
    });
  }, [projects, search, selectedTypes, selectedTech]);

  const visibleTypes = showAllTypes ? typeOptions : typeOptions.slice(0, 5);
  const visibleTech = showAllTech ? techOptions : techOptions.slice(0, 5);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* FILTER PANEL */}
        <aside className="col-lg-3">
          <div className="position-sticky" style={{ top: "6rem" }}>
            <div className="border rounded-3 shadow-sm filter-panel">
              <div className="border-bottom px-4 py-3">
                <span className="text-uppercase small fw-semibold text-muted">
                  Filter by
                </span>
              </div>

              <div className="px-4 py-3">
                {/* Category */}
                <div className="mb-4">
                  <div className="small fw-semibold mb-2">
                    Choose a Category
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {visibleTypes.map((t) => (
                      <label
                        key={t}
                        className="d-flex align-items-center small"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={selectedTypes.includes(t)}
                          onChange={() => toggleType(t)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}

                    {typeOptions.length > 5 && (
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 mt-1"
                        onClick={() => setShowAllTypes((v) => !v)}
                      >
                        {showAllTypes ? "Less" : "More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Technology */}
                <div>
                  <div className="small fw-semibold mb-2">
                    Choose a Technology
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {visibleTech.map((t) => (
                      <label
                        key={t}
                        className="d-flex align-items-center small"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={selectedTech.includes(t)}
                          onChange={() => toggleTech(t)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}

                    {techOptions.length > 5 && (
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 mt-1"
                        onClick={() => setShowAllTech((v) => !v)}
                      >
                        {showAllTech ? "Less" : "More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PROJECTS GRID */}
        <section className="col-lg-9">
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-3">
            <div className="mb-3 mb-sm-0">
              <h1 className="h2 mb-1">All projects</h1>
              <p className="small text-muted mb-0">
                Curated portfolio of web apps, e-commerce sites, enterprise
                visualizations &amp; APIs.
              </p>
            </div>

            <div>
              <input
                id="projects-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter results"
                className="form-control form-control-sm"
                aria-label="Filter projects"
              />
            </div>
          </div>

          <div className="small text-muted mb-3">
            Showing {filtered.length} project{filtered.length !== 1 && "s"}
          </div>

          <div className="row g-4">
            {filtered.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
