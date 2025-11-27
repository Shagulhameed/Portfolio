// src/app/projects/page.tsx
import ProjectsPageClient, {
  Project as UiProject,
} from "@/components/ProjectsPageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const raw = await prisma.project.findMany({
    // add where: { published: true } later if you want
    orderBy: { createdAt: "desc" },
  });

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

    // 👇 add these two so it matches the Project type
    links: (Array.isArray(p.links) ? p.links : []) as any,
    published: p.published,
  }));

  return <ProjectsPageClient projects={projects} />;
}
