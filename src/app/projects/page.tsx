// src/components/ProjectsPageClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { projects as allProjects, Project } from "@/lib/projects";

function getLanguagesFromTech(tech?: string): string[] {
  if (!tech) return [];
  return tech
    .split(/[•,/]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ---------- SafeImage ---------- */
function SafeImage({
  src,
  alt,
  className,
  fill = false,
  sizes,
  style,
}: {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}) {
  const placeholder = "/projects/placeholder.png";
  const [useSrc, setUseSrc] = useState<string>(src ?? placeholder);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setUseSrc(src || placeholder);
    setFailed(false);
  }, [src]);

  const handleLoadingComplete = (result?: {
    naturalWidth?: number;
    naturalHeight?: number;
  }) => {
    if (result && typeof result.naturalWidth === "number") {
      if (result.naturalWidth === 0 || result.naturalHeight === 0) {
        setFailed(true);
        setUseSrc(placeholder);
      }
    }
  };

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setUseSrc(placeholder);
    }
  };

  if (!fill && failed && useSrc === placeholder) {
    return (
      <img
        src={useSrc}
        alt={alt}
        className={className}
        style={style}
        width={1200}
        height={480}
        onError={handleError}
      />
    );
  }

  return fill ? (
    <Image
      src={useSrc}
      alt={alt}
      fill
      sizes={sizes}
      style={style}
      className={className}
      onError={handleError}
      onLoadingComplete={handleLoadingComplete as any}
    />
  ) : (
    <Image
      src={useSrc}
      alt={alt}
      width={1200}
      height={480}
      sizes={sizes}
      style={style}
      className={className}
      onError={handleError}
      onLoadingComplete={handleLoadingComplete as any}
    />
  );
}

/* ---------- small UI helpers ---------- */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="project-tag badge rounded-pill border bg-light text-dark me-1 mb-1 small">
      {children}
    </span>
  );
}

/* ---------- Card: grid item ---------- */
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

  const hasImage = !!p.image;

  return (
    <article className="card h-100 border-0 shadow-sm project-card">
      <div className="project-banner">
        {hasImage ? (
          <SafeImage
            src={p.image}
            alt={p.title}
            className="project-banner-img"
          />
        ) : (
          <span className="fs-2 fw-semibold text-muted">{initials}</span>
        )}
      </div>

      <div className="card-body">
        <h3 className="h5 card-title mb-2">{p.title}</h3>
        <p className="card-text small text-muted">{p.description}</p>

        <div className="mt-3 d-flex flex-wrap">
          {(p.technology ? [p.technology] : [])
            .concat(p.highlights?.slice(0, 2) ?? [])
            .map((h, i) => (
              <Tag key={i}>{h}</Tag>
            ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- Client page (grid + filters) ---------- */
export default function ProjectsPageClient() {
  const [search, setSearch] = useState<string>("");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllLangs, setShowAllLangs] = useState(false);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => set.add(p.type ?? "Other"));
    return Array.from(set);
  }, []);

  const langOptions = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) =>
      getLanguagesFromTech(p.technology).forEach((lang) => set.add(lang))
    );
    return Array.from(set).sort();
  }, []);

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const toggleLang = (l: string) => {
    setSelectedLangs((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    );
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allProjects.filter((p) => {
      const type = p.type ?? "Other";
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(type);

      const langs = getLanguagesFromTech(p.technology);
      const matchesLang =
        selectedLangs.length === 0 ||
        langs.some((l) => selectedLangs.includes(l));

      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.technology && p.technology.toLowerCase().includes(q)) ||
        (p.client && p.client.toLowerCase().includes(q));

      return matchesType && matchesLang && matchesSearch;
    });
  }, [search, selectedTypes, selectedLangs]);

  const visibleTypes = showAllTypes ? typeOptions : typeOptions.slice(0, 5);
  const visibleLangs = showAllLangs ? langOptions : langOptions.slice(0, 5);

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

                {/* Language / Technology */}
                <div>
                  <div className="small fw-semibold mb-2">
                    Choose a Language
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {visibleLangs.map((l) => (
                      <label
                        key={l}
                        className="d-flex align-items-center small"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={selectedLangs.includes(l)}
                          onChange={() => toggleLang(l)}
                        />
                        <span>{l}</span>
                      </label>
                    ))}

                    {langOptions.length > 5 && (
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 mt-1"
                        onClick={() => setShowAllLangs((v) => !v)}
                      >
                        {showAllLangs ? "Less" : "More"}
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
            Showing {filtered.length} projects
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
