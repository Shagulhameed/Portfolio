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
<p className="about-body mb-4">
  I’m <strong>Shagul Hameed</strong>, a <strong>Senior Full Stack Developer & Tech Lead</strong> at
  <strong> Sixth Force Solutions</strong> with <strong>5+ years of experience</strong> delivering
  modern, scalable enterprise applications using <strong>React, Angular, Node.js, Next.js & NestJS</strong> on
  <strong> AWS</strong> and <strong>GCP</strong>.
  <br /><br />
  I hold a <strong>Master of Science in Software Engineering</strong> (First Class, Apr 2018) from
  <strong> Periyar Maniammai Institute of Science & Technology</strong>, which laid the foundation for
  my full-stack engineering journey.
  <br /><br />
  I lead end-to-end development of dashboards, micro-frontends, APIs and data-driven platforms—mentoring engineers and
  collaborating with designers, product owners and stakeholders to deliver high-impact features. I’m passionate about
  building <strong>high-performance, secure and maintainable</strong> applications with a focus on <strong>clean
  architecture</strong>, <strong>CI/CD automation</strong>, <strong>developer experience (DX)</strong> and well-crafted
  <strong> UI/UX</strong>.
</p>

<p className="about-body mb-4">
  I’m a <strong>results-driven engineer</strong> and strategic problem-solver experienced in working with cross-functional
  teams across <strong>India, the US and Canada</strong>. My work emphasises <strong>performance, security, business
  value and user experience</strong>. I also have expertise in <strong>cloud architecture, DevOps adoption and process
  automation</strong>, enabling me to bridge the gap between <strong>technical execution</strong> and <strong>product
  strategy</strong>. I continuously explore modern technologies, architecture patterns and best practices with a mindset
  to innovate, elevate engineering standards and build impactful digital products.
</p>


        </div>

        {/* RIGHT: quick stats */}
<aside className="about-aside">
  <div className="about-card">
    <h3 className="about-card-title">Snapshot</h3>

<ul className="snapshot-list mb-3">
  <li className="snapshot-row">
    <p className="snapshot-label">Primary stack</p>
    <p className="snapshot-value">
      React · Angular · Node.js · Next.js · NestJS
    </p>
  </li>

  <li className="snapshot-row">
    <p className="snapshot-label">Databases</p>
    <p className="snapshot-value">
      Oracle · PostgreSQL · MongoDB · MySQL
    </p>
  </li>

  <li className="snapshot-row">
    <p className="snapshot-label">Cloud & DevOps</p>
    <p className="snapshot-value">
      AWS · GCP · Docker · Kubernetes · Red Hat
    </p>
  </li>

  <li className="snapshot-row">
    <p className="snapshot-label">Versioning & Pipeline</p>
    <p className="snapshot-value">
      GitHub · GitLab · CI/CD
    </p>
  </li>

  <li className="snapshot-row">
    <p className="snapshot-label">Secure API & Auth</p>
    <p className="snapshot-value">
      JWT · OAuth2 · RBAC
    </p>
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
          <div className="about-pills mb-4 container">
  <span className="about-pill">⚙️ Full Stack – React, Angular, Node.js, Next.js, NestJS</span>
  <span className="about-pill">🗃️ Databases – MongoDB, MySQL, Oracle, PostgreSQL</span>
  <span className="about-pill">🌐 Microservices & REST APIs</span>
  <span className="about-pill">📊 D3.js & Data Visualization</span>
  <span className="about-pill">☁️ Cloud – AWS & GCP</span>
  <span className="about-pill">🐳 Docker & Kubernetes</span>
  <span className="about-pill">🔐 Secure deployments (SSL, RBAC)</span>
  <span className="about-pill">🎨 UI/UX & Branding – Figma, Illustrator, Photoshop</span>
  <span className="about-pill">⚡ Performance Optimization</span>
  <span className="about-pill">🔄 CI/CD & Automation (Shell/Linux)</span>
</div>

    </section>
  );
}
