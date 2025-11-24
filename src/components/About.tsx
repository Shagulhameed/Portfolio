// src/components/About.tsx
// ✅ Server component – no "use client" needed

export default function About() {
  return (
    <section id="about" className="about-section py-5 py-lg-6">
      <div className="container about-inner">

        {/* LEFT: Main text */}
        <div className="about-text">
          <p className="about-kicker mb-2">ABOUT</p>

          <h2 className="about-heading mb-3">
            Building things that feel{" "}
            <span className="about-accent">fast</span>,{" "}
            <span className="about-accent">polished</span> &{" "}
            <span className="about-accent">reliable</span>.
          </h2>

          <p className="about-lead mb-3">
            I’m Shagul Hameed, a Senior Full Stack Developer focused on crafting
            modern, scalable web applications. I enjoy taking a product from{" "}
            <strong>idea → design → production</strong>, working closely with
            designers, product owners, and engineers.
          </p>

          <p className="about-body mb-4">
            Over the last few years I’ve worked across frontend and backend –
            building dashboards, micro-frontends, APIs, reusable component
            libraries and integrations. I care a lot about{" "}
            <strong>DX (developer experience)</strong>, performance,
            accessibility and clean architecture.
          </p>

          {/* mini “pill” row */}
          <div className="about-pills mb-4">
            <span className="about-pill">⚙️ Full Stack (React / Angular / Node)</span>
            <span className="about-pill">📊 Dashboards & admin platforms</span>
            <span className="about-pill">☁️ Cloud-ready, Docker & Kubernetes</span>
          </div>
        </div>

        {/* RIGHT: quick stats */}
        <aside className="about-aside">
          <div className="about-card">
            <h3 className="about-card-title">Snapshot</h3>

            <ul className="about-list mb-3">
              <li>
                <span>Experience</span>
                <strong>5+ years</strong>
              </li>
              <li>
                <span>Primary stack</span>
                <strong>React, Angular, Node.js</strong>
              </li>
              <li>
                <span>Databases</span>
                <strong>MongoDB, MySQL</strong>
              </li>
              <li>
                <span>Cloud & tools</span>
                <strong>AWS, Docker, Kubernetes</strong>
              </li>
            </ul>

            <div className="about-divider" />

            <h4 className="about-card-subtitle mb-2">What I’m good at</h4>
            <ul className="about-tags">
              <li>Design-systems & UI libraries</li>
              <li>Complex forms & data-heavy screens</li>
              <li>Micro-frontends & modular architecture</li>
              <li>API design & integration</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
