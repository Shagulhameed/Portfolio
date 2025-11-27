/* eslint-disable @next/next/no-img-element */
// src/app/admin/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LinkItem = { label: string; url: string };

type Project = {
  id: number;
  slug: string | null;
  title: string;
  client: string | null;
  type: string | null;
  technology: string | null;
  role: string | null;
  image: string | null;
  description: string | null;
  highlights: string[] | null;
  links: LinkItem[] | null;
  published: boolean;
};

const emptyForm = {
  slug: "",
  title: "",
  client: "",
  type: "",
  technology: "",
  role: "",
  image: "",
  description: "",
  highlights: "" as string,
  links: "" as string,
};

export default function ProjectsAdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [loadingList, setLoadingList] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // for save/delete errors
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Load projects
  const loadProjects = async () => {
    setLoadingList(true);
    setLoadError(null);

    try {
      const res = await fetch("/api/admin/projects");

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        // if route exists but returns error
        setLoadError(data.error || "Failed to load projects");
        setProjects([]);
        return;
      }

      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      console.error(err);
      setLoadError(err.message || "Failed to load projects");
      setProjects([]);
    } finally {
      setLoadingList(false);
    }
  };

  // 🔐 check admin before loading data
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin-status");
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.isAdmin) {
          router.push("/admin/admin-login");
          return;
        }
      } catch {
        router.push("/admin/admin-login");
        return;
      } finally {
        setAuthChecked(true);
      }

      // only load projects if admin
      loadProjects();
    };

    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);


  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setForm(emptyForm);
    setEditingSlug(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    setError(null);

    const highlightsArr = form.highlights
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);

    const linksArr: LinkItem[] = form.links
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url] = line.split("|").map((x) => x.trim());
        return { label, url };
      });

    const body = {
      slug: form.slug || undefined,
      title: form.title,
      client: form.client || null,
      type: form.type || null,
      technology: form.technology || null,
      role: form.role || null,
      image: form.image || null,
      description: form.description || null,
      highlights: highlightsArr,
      links: linksArr,
      published: true,
    };

    try {
      const url = editingSlug
        ? `/api/admin/projects/${encodeURIComponent(editingSlug)}`
        : "/api/admin/projects";

      const method = editingSlug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      setStatus(editingSlug ? "Project updated." : "Project created.");
      resetForm();
      loadProjects();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

    const startEdit = (p: Project) => {
    setEditingSlug(p.slug ?? null);
    setForm({
      slug: p.slug ?? "",
      title: p.title ?? "",
      client: p.client ?? "",
      type: p.type ?? "",
      technology: p.technology ?? "",
      role: p.role ?? "",
      image: p.image ?? "",
      description: p.description ?? "",
      highlights: (p.highlights ?? []).join("\n"),
      links:
        (p.links ?? [])
          .map((l) => `${l.label}|${l.url}`)
          .join("\n") || "",
    });

    setPreviewImage(p.image ?? null); // 👈 add this

    window.scrollTo({ top: 0, behavior: "smooth" });
  };


const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // quick local preview
  const localUrl = URL.createObjectURL(file);
  setPreviewImage(localUrl);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/admin/projects/image-upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.url) {
      throw new Error(data.error || "Image upload failed");
    }

    // store final URL (e.g. /projects/xxx.png) in form
    setForm((prev) => ({ ...prev, image: data.url }));
    setPreviewImage(data.url);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Image upload failed");
  }
};



  const handleDelete = async (slug: string | null) => {
    if (!slug) return;
    const ok = window.confirm("Delete this project permanently?");
    if (!ok) return;

    try {
      const res = await fetch(
        `/api/admin/projects/${encodeURIComponent(slug)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to delete project");

      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete project");
    }
  };
  if (!authChecked) {
    return (
      <div className="admin-page-wrapper">
        <p className="text-muted small p-4">Checking admin access…</p>
      </div>
    );
  }
  return (
    <div className="admin-page-wrapper">
      {/* Header / Breadcrumb */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="text-muted small mb-1">Admin / Projects</div>
          <h1 className="h4 mb-0">
            {editingSlug ? "Edit Project" : "Create Project"}
          </h1>
          <p className="text-muted small mb-0">
            Manage the projects that appear on your public portfolio.
          </p>
        </div>

        <div className="mt-3 mt-md-0">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => router.push("/projects")}
          >
            View Public Projects
          </button>
        </div>
      </div>

      {/* Alerts for save/update/delete */}
      {status && (
        <div className="alert alert-success py-2 small mb-3">{status}</div>
      )}
      {error && (
        <div className="alert alert-danger py-2 small mb-3">{error}</div>
      )}

      <div className="row g-4">
        {/* Form card */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0">
              <h2 className="h6 mb-1">Project details</h2>
              <p className="text-muted small mb-0">
                Use the form to {editingSlug ? "update" : "create"} a project.
              </p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                {/* slug, type, client */}
                <div className="col-md-4">
                  <label className="form-label form-label-sm">
                    Slug (optional)
                  </label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    placeholder="pie-access-management-system"
                  />
                  <div className="form-text small">
                    Used in URLs. If blank, generated from title.
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label form-label-sm">
                    Type (category)
                  </label>
                  <input
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    placeholder="Enterprise"
                  />
                  <div className="form-text small">
                    Example: Enterprise, E-commerce, Dashboard…
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label form-label-sm">Client</label>
                  <input
                    name="client"
                    value={form.client}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    placeholder="SanDisk"
                  />
                </div>

                {/* title + technology */}
                <div className="col-md-6">
                  <label className="form-label form-label-sm">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    required
                    placeholder="PIE Access Management System"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label form-label-sm">
                    Technology
                  </label>
                  <input
                    name="technology"
                    value={form.technology}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    placeholder="React • Node.js • NestJS • Oracle • D3.js • Tableau"
                  />
                  <div className="form-text small">
                    Shown as tags and used for filters.
                  </div>
                </div>

           {/* role + image */}
                <div className="col-md-6">
                  <label className="form-label form-label-sm">Role</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    placeholder="Full Stack Developer"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label form-label-sm">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="form-control form-control-sm"
                  />

                  {(previewImage || form.image) && (
                    <div className="mt-2">
                      <img
                        src={previewImage || form.image || ""}
                        alt="Preview"
                        width={120}
                        height="auto"
                        style={{ borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </div>
                  )}

                  <div className="form-text small">
                    Upload an image (PNG/JPG). Recommended size 1200×480.
                  </div>
                </div>

                {/* description */}
                <div className="col-12">
                  <label className="form-label form-label-sm">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    rows={3}
                    placeholder="Org charts and KPI visualization across the organization..."
                  />
                </div>

                {/* highlights + links */}
                <div className="col-md-6">
                  <label className="form-label form-label-sm">
                    Highlights{" "}
                    <span className="text-muted">(one per line)</span>
                  </label>
                  <textarea
                    name="highlights"
                    value={form.highlights}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    rows={5}
                    placeholder={`Designed D3-based org-chart with KPI overlays
Built NestJS APIs for access control and audit logs
Automated server tasks via shell scripts & cron on Red Hat Linux`}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label form-label-sm">
                    Links{" "}
                    <span className="text-muted">(label | url per line)</span>
                  </label>
                  <textarea
                    name="links"
                    value={form.links}
                    onChange={onChange}
                    className="form-control form-control-sm"
                    rows={5}
                    placeholder={`GitHub|https://github.com/...
Live Demo|https://...`}
                  />
                  <div className="form-text small">
                    Example: <code>GitHub|https://github.com/...</code>
                  </div>
                </div>

                {/* buttons */}
                <div className="col-12 d-flex justify-content-between pt-2">
                  {editingSlug && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={resetForm}
                    >
                      Cancel edit
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary ms-auto"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving…"
                      : editingSlug
                      ? "Update Project"
                      : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0">
              <h2 className="h6 mb-1">Existing projects</h2>
              <p className="text-muted small mb-0">
                Click <strong>Edit</strong> to load into the form, or{" "}
                <strong>Delete</strong> to remove.
              </p>
            </div>

            <div className="card-body">
              {loadingList ? (
                <div className="text-muted small">Loading projects…</div>
              ) : loadError ? (
                <div className="text-danger small">{loadError}</div>
              ) : projects.length === 0 ? (
                <div className="text-muted small">No projects yet.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th className="d-none d-sm-table-cell">Type</th>
                        <th className="d-none d-sm-table-cell">Client</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="fw-semibold small">
                              {p.title || "(no title)"}
                            </div>
                            <div className="text-muted small">
                              {p.technology}
                            </div>
                          </td>
                          <td className="small d-none d-sm-table-cell">
                            {p.type || "-"}
                          </td>
                          <td className="small d-none d-sm-table-cell">
                            {p.client || "-"}
                          </td>
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-link btn-sm p-0 me-2"
                              onClick={() => startEdit(p)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-sm text-danger p-0 me-2"
                              onClick={() => handleDelete(p.slug)}
                            >
                              Delete
                            </button>
                      {p.slug && (
  <a
    href={`/projects/${encodeURIComponent(p.slug)}`}
    className="btn btn-link btn-sm p-0"
    target="_blank"
    rel="noreferrer"
  >
    Learn more
  </a>
)}

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
