// src/app/contact/page.tsx
"use client";

import React, { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<FormValues>;

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // --- simple validators ---
  const validateField = (name: keyof FormValues, value: string): string | null => {
    const trimmed = value.trim();

    switch (name) {
      case "name":
        if (!trimmed) return "Name is required.";
        if (trimmed.length < 3) return "Name should be at least 3 characters.";
        return null;

      case "email":
        if (!trimmed) return "Email is required.";
        // very simple email pattern (good enough for UI validation)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
        return null;

      case "subject":
        if (!trimmed) return "Subject is required.";
        if (trimmed.length < 5) return "Subject should be at least 5 characters.";
        return null;

      case "message":
        if (!trimmed) return "Message is required.";
        if (trimmed.length < 10) return "Message should be at least 10 characters.";
        return null;

      default:
        return null;
    }
  };

  const validateAll = (vals: FormValues): FormErrors => {
    const newErrors: FormErrors = {};
    (Object.keys(vals) as (keyof FormValues)[]).forEach((key) => {
      const err = validateField(key, vals[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // live validation per field
    const err = validateField(name as keyof FormValues, value);
    setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validateAll(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // scroll to first error field
      const firstFieldName = Object.keys(validationErrors)[0];
      if (firstFieldName) {
        const el = document.getElementsByName(firstFieldName)[0];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row g-4">
        {/* Left: intro + contact info */}
        <section className="col-lg-5">
          <h1 className="mb-3">Let’s work together</h1>
          <p className="lead mb-4">
            I’m available for frontend / full-stack roles, freelance projects,
            and long-term collaborations. Tell me a bit about your project or
            role and I’ll get back to you as soon as possible.
          </p>

          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h2 className="h5 mb-3">Contact details</h2>
              <ul className="list-unstyled small mb-0">
                <li className="mb-2">
                  <span className="fw-semibold">Email:&nbsp;</span>
                  <a href="mailto:shagulhameed@sandisk.com">
                    shagulhameed@sandisk.com
                  </a>
                </li>
                <li className="mb-2">
                  <span className="fw-semibold">Location:&nbsp;</span>
                  Karaikal / Tamil Nadu, India
                </li>
                <li className="mb-2">
                  <span className="fw-semibold">Preferred roles:&nbsp;</span>
                  Frontend (Angular / React / Next.js), Full-stack (MERN / NestJS)
                </li>
              </ul>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h6 text-uppercase text-muted mb-2">
                Find me online
              </h2>
              <div className="d-flex flex-wrap gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="fab fa-github me-1" />
                  GitHub
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="fab fa-linkedin me-1" />
                  LinkedIn
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="fas fa-globe me-1" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Right: contact form */}
        <section className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h4 mb-3">Send a message</h2>
              <p className="small text-muted mb-4">
                Fill in the form and I’ll reply by email. You can also contact
                me directly at{" "}
                <a href="mailto:shagulhameed@sandisk.com">
                  shagulhameed@sandisk.com
                </a>
                .
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3 mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="name"
                      className="form-label small fw-semibold"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Your full name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="email"
                      className="form-label small fw-semibold"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="subject"
                    className="form-label small fw-semibold"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    className={`form-control ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    placeholder="Short title for your message"
                    value={values.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && (
                    <div className="invalid-feedback d-block">
                      {errors.subject}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="form-label small fw-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    rows={5}
                    placeholder="Tell me about your project, role, or idea…"
                    value={values.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <div className="invalid-feedback d-block">
                      {errors.message}
                    </div>
                  )}
                </div>

            <button
  type="submit"
  className="btn-outline-glow"
  disabled={loading}
>
  {loading ? "Sending..." : "Send message"}
</button>


                {status === "success" && (
                  <div className="alert alert-success mt-3 small mb-0">
                    Thanks! Your message has been sent.
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-danger mt-3 small mb-0">
                    Something went wrong while sending. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
