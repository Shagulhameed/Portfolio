import { prisma } from "@/lib/prisma";
import { buildCoverLetterBody } from "@/lib/generateCoverLetterPdf";

type Props = {
  params: { token: string };
};

export const dynamic = "force-dynamic";

export default async function PublicCoverLetterPage({ params }: Props) {
  const { token } = params;

  const record = await prisma.coverToken.findUnique({
    where: { token },
  });

  if (!record) {
    return (
      <main className="container py-5">
        <h1>Link not valid</h1>
        <p className="text-muted">This cover letter link is invalid.</p>
      </main>
    );
  }

  if (record.expiresAt < new Date()) {
    return (
      <main className="container py-5">
        <h1>Link expired</h1>
        <p className="text-muted">
          This cover letter link has expired. Please request a new one.
        </p>
      </main>
    );
  }

  const body = buildCoverLetterBody(record.companyName);

  return (
    <main className="cover-public container py-5">
      <h1 className="mb-4">Cover Letter</h1>

      <div className="row g-4 align-items-start">
        {/* LEFT – download card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h2 className="h5 mb-3">Download PDF</h2>
            <p className="text-muted small mb-3">
              You can download a PDF copy of this cover letter for{" "}
              <strong>{record.companyName}</strong>.
            </p>
            <a
              href={`/api/cover-letter/${token}`}
              className="btn btn-primary w-100"
            >
              ⬇ Download Cover Letter
            </a>
          </div>
        </div>

        {/* RIGHT – template preview */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4 cover-preview">
            <h2 className="h6 text-muted mb-3">Preview</h2>
            <div className="cover-preview-body">
              {body
                .trim()
                .split("\n")
                .map((line, i) =>
                  line.trim() ? (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
