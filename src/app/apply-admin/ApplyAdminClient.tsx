"use client";

import { useState } from "react";
import { DEFAULT_YEARS_EXPERIENCE } from "@/lib/profileConfig";

type Row = { name: string; email: string; role: string };
type TemplateType = "global" | "india";

export default function ApplyAdminClient() {
  const [rows, setRows] = useState<Row[]>([
    { name: "", email: "", role: "Full Stack Developer" },
  ]);
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [templateType, setTemplateType] = useState<TemplateType>("global");
  const [yearsExperience, setYearsExperience] = useState(
    DEFAULT_YEARS_EXPERIENCE
  );

  const updateRow = (index: number, field: keyof Row, value: string) => {
    const copy = [...rows];
    copy[index][field] = value;
    setRows(copy);
  };

  const addRow = () =>
    setRows([
      ...rows,
      { name: "", email: "", role: "Full Stack Developer" },
    ]);

  const handleSend = async () => {
    const companies = rows
      .map((r) => ({
        ...r,
        name: r.name.trim(),
        email: r.email.trim(),
        role: r.role.trim(),
      }))
      .filter((r) => r.name && r.email);

    if (companies.length === 0) {
      setStatus("Please fill at least one company.");
      return;
    }

    try {
      setIsSending(true);
      setStatus("Sending...");

      const res = await fetch("/api/send-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companies,
          templateType,
          yearsExperience: yearsExperience.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        const msg =
          data?.message ||
          (data?.ok ? "Emails sent successfully 👍" : "Emails processed 👍");
        setStatus(msg);
      } else {
        const errorMsg =
          data?.error ||
          `Failed to send emails ❌ (status ${res.status})`;
        setStatus(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error while sending emails ❌");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="py-5">
      <h1>Send Applications</h1>
      <p className="text-muted">
        Private admin page – don&apos;t link this in the main navbar.
      </p>

      {/* Template selector */}
      <div className="mt-3 mb-2">
        <span className="fw-semibold me-3">Email template:</span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="templateGlobal"
            value="global"
            checked={templateType === "global"}
            onChange={() => setTemplateType("global")}
          />
          <label className="form-check-label" htmlFor="templateGlobal">
            Global (International)
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="templateIndia"
            value="india"
            checked={templateType === "india"}
            onChange={() => setTemplateType("india")}
          />
          <label className="form-check-label" htmlFor="templateIndia">
            India (Domestic)
          </label>
        </div>
      </div>

      {/* Years of experience */}
      <div className="mb-3">
        <label
          htmlFor="yearsExperience"
          className="form-label fw-semibold me-2"
        >
          Years of experience:
        </label>
        <input
          id="yearsExperience"
          className="form-control d-inline-block"
          style={{ maxWidth: 160 }}
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          placeholder="e.g. 5+ years"
        />
        <small className="text-muted d-block mt-1">
          This text will be used in the email and the generated cover letter
          PDF.
        </small>
      </div>

      {/* Rows */}
      <div className="mt-2">
        {rows.map((row, i) => (
          <div key={i} className="d-flex gap-2 mb-2 flex-wrap">
            <input
              className="form-control"
              style={{ maxWidth: 220 }}
              placeholder="Company name"
              value={row.name}
              onChange={(e) => updateRow(i, "name", e.target.value)}
            />
            <input
              className="form-control"
              style={{ maxWidth: 260 }}
              placeholder="HR / Recruiter email"
              value={row.email}
              onChange={(e) => updateRow(i, "email", e.target.value)}
            />
            <input
              className="form-control"
              style={{ maxWidth: 220 }}
              placeholder="Role title"
              value={row.role}
              onChange={(e) => updateRow(i, "role", e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        className="btn btn-outline-secondary me-2"
        onClick={addRow}
        disabled={isSending}
      >
        + Add Company
      </button>
      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send Applications"}
      </button>

      {status && <p className="mt-3">{status}</p>}
    </main>
  );
}
