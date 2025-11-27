"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CoverLetterDownload from "@/components/CoverLetterDownload";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });

  // ---- Client + viewport detection ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsClient(true);

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });
      setIsMobile(width < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const width = viewport.width;
  const height = viewport.height;

  // ---- Parallax transforms ----
  const gridX = useTransform(mouseX, [0, width], [-20, 20]);
  const gridY = useTransform(mouseY, [0, height], [-20, 20]);
  const layer1X = useTransform(mouseX, [0, width], [-30, 30]);
  const layer1Y = useTransform(mouseY, [0, height], [-30, 30]);
  const layer2X = useTransform(mouseX, [0, width], [30, -30]);
  const layer2Y = useTransform(mouseY, [0, height], [30, -30]);

  // ---- Mouse tracking (only on client) ----
  useEffect(() => {
    if (!isClient) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isClient, mouseX, mouseY]);

  // ---- Colors for tech pills ----
  const getTechColor = (name: string, opacity = 1) => {
    const colors: Record<string, string> = {
      React: `rgba(97, 218, 251, ${opacity})`,
      Angular: `rgba(221, 27, 45, ${opacity})`,
      "Node.js": `rgba(139, 195, 74, ${opacity})`,
      "Next.js": `rgba(255, 255, 255, ${opacity})`,
      NestJS: `rgba(213, 0, 249, ${opacity})`,
      TypeScript: `rgba(0, 122, 204, ${opacity})`,
      JavaScript: `rgba(247, 223, 30, ${opacity})`,
      PHP: `rgba(119, 123, 180, ${opacity})`,
      MySQL: `rgba(0, 117, 143, ${opacity})`,
      MongoDB: `rgba(77, 209, 110, ${opacity})`,
      Docker: `rgba(0, 166, 229, ${opacity})`,
      Kubernetes: `rgba(0, 101, 255, ${opacity})`,
      AWS: `rgba(255, 153, 0, ${opacity})`,
      Git: `rgba(240, 80, 51, ${opacity})`,
      Jest: `rgba(187, 51, 255, ${opacity})`,
    };
    return colors[name] || `rgba(255, 255, 255, ${opacity})`;
  };

  // ---- Floating tech badges (client-only, random positions) ----
  const techs = useMemo(() => {
    if (!isClient || isMobile) return [];

    const names = [
      "React",
      "Angular",
      "Node.js",
      "Next.js",
      "NestJS",
      "TypeScript",
      "JavaScript",
      "PHP",
      "MySQL",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "AWS",
      "Git",
      "Jest",
    ];

    const vw = viewport.width;
    const vh = viewport.height;
    const cardSafeRadiusPx = Math.min(vw, vh) * 0.3;

    return names.map((name) => {
      let topPercent = 0;
      let leftPercent = 0;
      let distancePx = 0;

      // keep labels away from the center card
      do {
        topPercent = Math.random() * 100;
        leftPercent = Math.random() * 100;
        const xPx = (leftPercent / 100) * vw;
        const yPx = (topPercent / 100) * vh;
        const dx = xPx - vw / 2;
        const dy = yPx - vh / 2;
        distancePx = Math.sqrt(dx * dx + dy * dy);
      } while (distancePx < cardSafeRadiusPx);

      return {
        name,
        top: `${topPercent.toFixed(1)}%`,
        left: `${leftPercent.toFixed(1)}%`,
      };
    });
  }, [isClient, isMobile, viewport]);

const floatingWords = [
  "Docker • AWS Cloud",
  "Red Hat Linux • Windows",
  "XAMPP • Nginx",
  "React • Angular • Node.js",
  "Tableau • MongoDB",
  "Photoshop • Illustrator",
  "Figma • Adobe XD",
  "UX/UI • Branding Design"
];


  return (
    <section className="hero-section position-relative overflow-hidden">
      {/* Grid */}
      <motion.svg
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ translateX: gridX, translateY: gridY, zIndex: 0 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="5"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#6c63ff"
              strokeWidth="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </motion.svg>

      {/* Waves */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ translateX: layer1X, translateY: layer1Y, zIndex: 0 }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            fill="rgba(108, 99, 255, 0.2)"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,133.3C672,149,768,171,864,154.7C960,139,1056,85,1152,85.3C1248,85,1344,139,1392,165.3L1440,192L1440,0L0,0Z"
          />
        </svg>
      </motion.div>

      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ translateX: layer2X, translateY: layer2Y, zIndex: 0 }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            fill="rgba(108, 99, 255, 0.1)"
            d="M0,64L48,90.7C96,117,192,171,288,176C384,181,480,139,576,117.3C672,96,768,96,864,117.3C960,139,1056,181,1152,176C1248,171,1344,117,1392,90.7L1440,64L1440,0L0,0Z"
          />
        </svg>
      </motion.div>

      {/* Soft spotlight behind card */}
      <div className="hero-spotlight" />

      {/* Floating tech badges */}
      {techs.map((tech, index) => (
        <motion.div
          key={index}
          className="position-absolute text-nowrap hero-tech-pill"
          style={{
            top: tech.top,
            left: tech.left,
            color: getTechColor(tech.name),
            textShadow: `0 0 8px ${getTechColor(tech.name)}`,
            boxShadow: `0 0 12px ${getTechColor(tech.name)}`,
            zIndex: 1,
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {tech.name}
        </motion.div>
      ))}

      {/* Floating phrases */}
      {!isMobile &&
        floatingWords.map((word, i) => (
          <motion.div
            key={word}
            className="hero-floating-word position-absolute"
            style={{
              top: `${20 + i * 20}%`,
              left: i % 2 === 0 ? "15%" : "70%",
            }}
            animate={{ opacity: [0, 0.6, 0], y: [-10, 0, -10] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.div>
        ))}

      {/* Inner wrapper */}
      <motion.div
        className="hero-inner d-flex align-items-center justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Center card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-card position-relative p-4 rounded text-center shadow-lg"
        >
          {/* Top pills */}
<div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
  <span className="badge hero-pill hero-pill-primary">
    👨‍💻 Full Stack • Cloud • DB Management • UI/UX
  </span>

  <span className="badge hero-pill hero-pill-secondary">
    🌎 Open to global relocation (USA, SG, UAE, EU, etc.)
  </span>
</div>

          <Image
            src="/profile/pic-bg.png"
            alt="Shagul Hameed"
            width={220}
            height={220}
            className="rounded-circle mb-3 shadow hero-avatar"
          />

          <h1 className="fw-bold mb-2 display-3 hero-name">Shagul Hameed</h1>

          <h4 className="text-info mb-2 hero-role">
            Senior Full Stack Developer
          </h4>

          <p className="lead mb-0 hero-subtext">
  5+ years of experience delivering modern, scalable and high-performance enterprise web applications
</p>
{/* <p className="mb-0 mt-1 text-muted hero-subtext-db">
  Strong in <strong>database design &amp; performance tuning</strong> – MySQL, MongoDB, Oracle &amp; PostgreSQL.
</p> */}

          {/* Resume + Cover Letter buttons */}
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-3 d-flex justify-content-center align-items-center gap-4 flex-wrap"
>
  {/* Resume Button + Hint */}
  <div className="text-center">
    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      <button type="button" className="btn-resume">
        <span className="btn-resume-icon">📄</span>
        <span>Download Resume</span>
      </button>
    </Link>
    <div className="btn-resume-hint mt-1">PDF · 1–2 pages · Updated</div>
  </div>

  {/* Cover Letter Button + Hint */}
  {/* <div className="text-center">
    <CoverLetterDownload />
    <div className="btn-resume-hint mt-1">PDF · 1 page · Updated</div>
  </div> */}
</motion.div>


        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
