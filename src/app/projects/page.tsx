// src/app/projects/page.tsx
import ProjectsPageClient, {
  Project as UiProject,
} from "@/components/ProjectsPageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // 👉 First, load EVERYTHING – no filters so we can see data
  const raw = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  // (optional) this log shows in your terminal:
  console.log("Projects from DB:", raw.length);

  // 👉 Map DB result into the UI `Project` type from ProjectsPageClient
  const projects: UiProject[] = raw.map((p) => ({
    id: p.id,
    slug: p.slug ?? null,
    title: p.title,
    type: p.type,
    client: p.client,
    role: p.role,
    description: p.description,
    image: p.image,
    technology: p.technology,
    highlights: (Array.isArray(p.highlights) ? p.highlights : []) as string[],
  }));

  return <ProjectsPageClient projects={projects} />;
}
