// src/app/api/admin/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/admin/projects  -> list all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects  -> create project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const {
      slug,
      title,
      client,
      type,
      technology,
      role,
      image,
      description,
      highlights,
      links,
      published = true,
    } = body;

    const finalSlug = slugify(slug || title);

    const project = await prisma.project.create({
      data: {
        slug: finalSlug,
        title,
        client,
        type,
        technology,
        role,
        image,
        description,
        highlights, // JSON column
        links,      // JSON column
        published,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    console.error("Error creating project", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      // unique constraint (slug)
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
