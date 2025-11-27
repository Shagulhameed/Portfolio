// src/app/api/admin/projects/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/admin/projects/[slug]
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
    });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (err) {
    console.error("Error fetching project", err);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[slug]  -> update existing
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    const newSlug = slugify(slug || title);

    const project = await prisma.project.update({
      where: { slug: params.slug },
      data: {
        slug: newSlug,
        title,
        client,
        type,
        technology,
        role,
        image,
        description,
        highlights,
        links,
        published,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("Error updating project", err);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[slug]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.project.delete({
      where: { slug: params.slug },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting project", err);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
