"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  FileText,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

type ResearchArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  series: string;
  category: string;
  pages: string;
  author: string;
  publishedDate: string;
  featured: boolean;
  pdf: string;
};

const emptyArticle = (): ResearchArticle => ({
  slug: "",
  title: "",
  shortTitle: "",
  description: "",
  series: "",
  category: "Research Article",
  pages: "",
  author: "",
  publishedDate: "",
  featured: true,
  pdf: "",
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ResearchAdminPage() {
  const [article, setArticle] = useState<ResearchArticle>(emptyArticle());
  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    try {
      const response = await fetch("/admin/api/research.php", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setArticles(data);
      } else {
        setArticles([]);
      }
    } catch {
      /*
       * Local Next.js development does not execute PHP.
       * Fall back to the static research JSON.
       */
      try {
        const response = await fetch("/data/research.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      } catch {
        setStatus("Could not load research publications.");
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  const update = (
    field: keyof ResearchArticle,
    value: string | boolean
  ) => {
    setArticle((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const reset = () => {
    setArticle(emptyArticle());
    setSelectedPdf(null);
    setEditing(false);
    setStatus("");
  };

  const editArticle = (item: ResearchArticle) => {
    setArticle({
      ...item,
    });

    setSelectedPdf(null);
    setEditing(true);
    setStatus("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const save = async () => {
    if (!article.title.trim()) {
      setStatus("Add a research title.");
      return;
    }

    if (!article.description.trim()) {
      setStatus("Add a research description.");
      return;
    }

    if (!editing && !selectedPdf) {
      setStatus("Please upload a PDF for the research paper.");
      return;
    }

    setStatus("Saving…");

    try {
      const slug = article.slug || slugify(article.title);

      const metadata: ResearchArticle = {
        ...article,
        slug,
      };

      /*
       * Save metadata.
       */
      const response = await fetch("/admin/api/research.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "The research publication could not be saved."
        );
      }

      /*
       * Upload PDF when a new file was selected.
       */
      if (selectedPdf) {
        setStatus("Uploading research PDF…");

        const formData = new FormData();

        formData.append("pdf", selectedPdf);
        formData.append("slug", slug);

        const uploadResponse = await fetch(
          "/admin/api/research.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json().catch(() => null);

        if (!uploadResponse.ok) {
          throw new Error(
            uploadData?.error || "The research PDF could not be uploaded."
          );
        }
      }

      setStatus(
        editing
          ? "Research publication updated successfully."
          : "Research publication published successfully."
      );

      setArticle({
        ...metadata,
        pdf:
          selectedPdf && data?.article?.pdf
            ? data.article.pdf
            : article.pdf,
      });

      setSelectedPdf(null);
      setEditing(false);

      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The research publication could not be saved."
      );
    }
  };

  const remove = async (slug: string) => {
    if (
      !window.confirm(
        "Delete this research publication permanently?"
      )
    ) {
      return;
    }

    setStatus("Deleting…");

    try {
      const response = await fetch(
        `/admin/api/research.php?slug=${encodeURIComponent(slug)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "The research publication could not be deleted."
        );
      }

      if (article.slug === slug) {
        reset();
      }

      setStatus("Research publication deleted.");
      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The research publication could not be deleted."
      );
    }
  };

  const input =
    "mt-1.5 w-full rounded-xl border border-[#263f57]/15 px-4 py-3 text-sm outline-none focus:border-[#c87568] focus:ring-2 focus:ring-[#c87568]/15";

  return (
    <main className="min-h-screen bg-[#f7f5f1] pb-20 pt-[100px]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#263f57]">
            Research manager
          </h1>

          <p className="mt-2 text-sm text-[#6d777c]">
            Create and publish research articles directly.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Editor */}
          <section className="rounded-[24px] bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText
                  size={20}
                  className="text-[#c87568]"
                />

                <h2 className="text-xl font-bold text-[#263f57]">
                  {editing
                    ? "Edit research publication"
                    : "Create research publication"}
                </h2>
              </div>

              {editing && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-[#263f57]/15 px-4 py-2 text-xs font-bold text-[#263f57]"
                >
                  <Plus size={14} />
                  New research
                </button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <label className="text-sm font-semibold text-[#263f57] sm:col-span-2">
                Title
                <input
                  className={input}
                  value={article.title}
                  onChange={(e) =>
                    update("title", e.target.value)
                  }
                  placeholder="Research paper title"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Short title
                <input
                  className={input}
                  value={article.shortTitle}
                  onChange={(e) =>
                    update("shortTitle", e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Series
                <input
                  className={input}
                  value={article.series}
                  onChange={(e) =>
                    update("series", e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Category
                <input
                  className={input}
                  value={article.category}
                  onChange={(e) =>
                    update("category", e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Pages
                <input
                  className={input}
                  value={article.pages}
                  onChange={(e) =>
                    update("pages", e.target.value)
                  }
                  placeholder="9-page publication"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Author
                <input
                  className={input}
                  value={article.author}
                  onChange={(e) =>
                    update("author", e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Published date
                <input
                  className={input}
                  value={article.publishedDate}
                  onChange={(e) =>
                    update("publishedDate", e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57] sm:col-span-2">
                Description
                <textarea
                  rows={4}
                  className={input}
                  value={article.description}
                  onChange={(e) =>
                    update("description", e.target.value)
                  }
                  placeholder="Short description of the research publication."
                />
              </label>

            </div>

            {/* PDF */}
            <div className="mt-7 border-t border-[#263f57]/10 pt-7">

              <div className="rounded-2xl border border-[#263f57]/10 bg-[#faf9f7] p-5">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c87568]/10 text-[#c87568]">
                    <FileText size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#263f57]">
                      Research PDF
                    </h3>

                    <p className="text-xs text-[#6d777c]">
                      Upload the PDF for this publication.
                    </p>
                  </div>
                </div>

                {article.pdf && (
                  <a
                    href={article.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#263f57] hover:text-[#c87568]"
                  >
                    <FileText size={16} />
                    {article.pdf.split("/").pop()}
                    <ExternalLink size={14} />
                  </a>
                )}

                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#263f57] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d3145]">
                  <Upload size={16} />
                  {selectedPdf ? "Change PDF" : "Choose PDF"}

                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0] || null;

                      if (!file) {
                        setSelectedPdf(null);
                        return;
                      }

                      if (
                        file.type !== "application/pdf" &&
                        !file.name
                          .toLowerCase()
                          .endsWith(".pdf")
                      ) {
                        setStatus(
                          "Please select a PDF file."
                        );
                        e.target.value = "";
                        setSelectedPdf(null);
                        return;
                      }

                      if (
                        file.size >
                        25 * 1024 * 1024
                      ) {
                        setStatus(
                          "PDF is too large. Maximum size is 25 MB."
                        );
                        e.target.value = "";
                        setSelectedPdf(null);
                        return;
                      }

                      setSelectedPdf(file);
                      setStatus("");
                    }}
                  />
                </label>

                {selectedPdf && (
                  <div className="mt-3 rounded-xl bg-white px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#6d777c]">
                      Selected PDF
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#263f57]">
                      {selectedPdf.name}
                    </p>

                    <p className="mt-1 text-xs text-[#6d777c]">
                      {(
                        selectedPdf.size /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                )}

                <p className="mt-3 text-xs text-[#6d777c]">
                  PDF only • Maximum 25 MB
                </p>

              </div>
            </div>

            <label className="mt-6 flex items-center gap-3 text-sm font-semibold text-[#263f57]">
              <input
                type="checkbox"
                checked={article.featured}
                onChange={(e) =>
                  update(
                    "featured",
                    e.target.checked
                  )
                }
                className="h-4 w-4"
              />
              Featured publication
            </label>

            <button
              onClick={save}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c87568] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b8655b]"
            >
              <Save size={16} />

              {editing
                ? "Save changes"
                : "Save and publish"}
            </button>

            {status && (
              <p className="mt-4 text-sm font-semibold text-[#526b65]">
                {status}
              </p>
            )}

          </section>

          {/* Published research */}
          <aside className="rounded-[24px] bg-[#263f57] p-6 text-white sm:p-7">

            <div className="mb-6 flex items-center gap-2">
              <FileText
                size={19}
                className="text-[#efb2a8]"
              />

              <h2 className="text-xl font-bold">
                Published research
              </h2>
            </div>

            <div className="space-y-3">

              {articles.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-2xl bg-white/8 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#efb2a8]">
                    {item.series || item.category || "Research"}
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-white/55">
                    {item.publishedDate}
                    {item.pages
                      ? ` • ${item.pages}`
                      : ""}
                  </p>

                  <div className="mt-4 flex items-center gap-2">

                    <button
                      onClick={() =>
                        editArticle(item)
                      }
                      className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/20 hover:text-white"
                    >
                      Edit
                    </button>

                    {item.pdf && (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/20 hover:text-white"
                      >
                        View PDF
                        <ExternalLink size={12} />
                      </a>
                    )}

                    <button
                      onClick={() =>
                        remove(item.slug)
                      }
                      className="ml-auto rounded-lg bg-white/10 p-2 text-white/65 hover:bg-red-500 hover:text-white"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>
                </div>
              ))}

              {!articles.length && (
                <p className="text-sm text-white/55">
                  No research publications published.
                </p>
              )}

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}