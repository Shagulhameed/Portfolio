// src/components/Blog.tsx
"use client";

const Blog = () => {
  return (
<section className="blog-launch-section d-flex align-items-center">
  <div className="container">
    <div className="blog-launch-shell">
          <div className="blog-launch-card row g-4 align-items-center mx-auto">
            {/* LEFT: copy */}
            <div className="col-md-7">
              <p className="blog-launch-eyebrow mb-2">Blog</p>

              <h1 className="blog-launch-title mb-3">
                Blog <span>launching soon</span>
              </h1>

              <p className="blog-launch-subtitle mb-3">
                I’m putting together short, practical write-ups about shipping
                production-ready UIs, debugging real issues, and improving
                developer experience on React / Angular / Node.js projects.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="blog-chip">Real production case-studies</span>
                <span className="blog-chip">
                  Dashboard & data-heavy UI tips
                </span>
                <span className="blog-chip">Perf & DX improvements</span>
              </div>

              <div className="blog-notify-wrapper">
                <div className="blog-notify-input">
                  <span className="placeholder-text">
                    Get a ping when posts go live
                  </span>
                </div>
                <button className="blog-notify-btn" type="button">
                  Notify me
                </button>
              </div>

              <p className="blog-small-note mt-2">
                No subscriptions yet – this is just a preview UI for now. 👀
              </p>
            </div>

            {/* RIGHT: mini roadmap */}
            <div className="col-md-5">
              <div className="blog-roadmap-card h-100">
                <p className="blog-roadmap-label">Planned series</p>

                <ul className="blog-roadmap-list">
                  <li>
                    <span className="dot" />
                    <div>
                      <div className="label">
                        01 · Frontend in production
                      </div>
                      <div className="desc">
                        Debug stories, performance wins, and what actually
                        broke.
                      </div>
                    </div>
                  </li>
                  <li>
                    <span className="dot" />
                    <div>
                      <div className="label">
                        02 · Dashboards & complex UIs
                      </div>
                      <div className="desc">
                        Patterns I use for tables, filters, charts and state.
                      </div>
                    </div>
                  </li>
                  <li>
                    <span className="dot" />
                    <div>
                      <div className="label">03 · Dev workflow & tooling</div>
                      <div className="desc">
                        DX tricks: linting, testing, Git workflow, CI hints.
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="blog-roadmap-tags">
                  <span>#React</span>
                  <span>#Angular</span>
                  <span>#NextJS</span>
                  <span>#NodeJS</span>
                </div>

                <div className="blog-roadmap-footer">
                  <span className="status-dot" />
                  <span>Drafting ideas… stay tuned here.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /blog-launch-shell */}
      </div>
      {/* Glowing strip line */}
<div className="blog-strip-line" />

    </section>
  );
};

export default Blog;
