"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  fetchResearch,
  type ResearchPublication,
} from "@/lib/research";

type DraftSection = {
  heading: string;
  paragraphs: string;
};

type DraftReference = {
  title: string;
  source: string;
  year: string;
};

const blankSection = (): DraftSection => ({
  heading: "",
  paragraphs: "",
});

const blankReference = (): DraftReference => ({
  title: "",
  source: "",
  year: "",
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ResearchAdminPage() {
  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [series, setSeries] = useState("");
  const [category, setCategory] = useState("Research Article");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [researchNote, setResearchNote] = useState("");
  const [featured, setFeatured] = useState(true);

  const [sections, setSections] = useState<DraftSection[]>([
    blankSection(),
  ]);

  const [references, setReferences] = useState<DraftReference[]>([]);

  const [research, setResearch] = useState<ResearchPublication[]>([]);
  const [status, setStatus] = useState("");

  const load = () => {
    fetchResearch()
      .then(setResearch)
      .catch(() =>
        setStatus("Could not connect to the research service.")
      );
  };

  useEffect(() => {
    load();
  }, []);

  const updateSection = (
    index: number,
    field: keyof DraftSection,
    value: string
  ) => {
    setSections((current) =>
      current.map((section, position) =>
        position === index
          ? { ...section, [field]: value }
          : section
      )
    );
  };

  const updateReference = (
    index: number,
    field: keyof DraftReference,
    value: string
  ) => {
    setReferences((current) =>
      current.map((reference, position) =>
        position === index
          ? { ...reference, [field]: value }
          : reference
      )
    );
  };

  const reset = () => {
    setTitle("");
    setShortTitle("");
    setSeries("");
    setCategory("Research Article");
    setAuthor("");
    setPublishedDate("");
    setDescription("");
    setResearchNote("");
    setFeatured(true);
    setSections([blankSection()]);
    setReferences([]);
  };

  const save = async () => {
    if (!title.trim()) {
      setStatus("Add a research title.");
      return;
    }

    if (!description.trim()) {
      setStatus("Add a research description.");
      return;
    }

    if (!sections.some((section) => section.paragraphs.trim())) {
      setStatus("Add at least one research section.");
      return;
    }

    setStatus("Saving…");

    const slug = slugify(title);

    const item = {
      slug,
      title: title.trim(),
      shortTitle: shortTitle.trim() || title.trim(),
      description: description.trim(),
      series: series.trim() || "Research",
      category: category.trim() || "Research Article",
      author: author.trim(),
      publishedDate: publishedDate.trim(),
      featured,

      sections: sections
        .filter((section) => section.paragraphs.trim())
        .map((section, index) => ({
          type:
            index === 0 && !section.heading
              ? "lead"
              : "section",
          heading: section.heading.trim() || undefined,
          paragraphs: section.paragraphs
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        })),

      researchNote:
        researchNote.trim() || undefined,

      references: references
        .filter(
          (reference) =>
            reference.title.trim() ||
            reference.source.trim() ||
            reference.year.trim()
        )
        .map((reference) => ({
          title: reference.title.trim(),
          source: reference.source.trim(),
          year: reference.year.trim(),
        })),
    };

    try {
      const response = await fetch(
        "/admin/api/research.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "The research publication could not be saved."
        );
      }

      setStatus("Research publication published successfully.");

      reset();
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
          data?.error ||
            "The research publication could not be deleted."
        );
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

        {/* Header */}
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

          {/* CREATE */}
          <section className="rounded-[24px] bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6 flex items-center gap-3">
              <FileText
                size={20}
                className="text-[#c87568]"
              />

              <h2 className="text-xl font-bold text-[#263f57]">
                Create research publication
              </h2>
            </div>

            {/* Metadata */}
            <div className="grid gap-5 sm:grid-cols-2">

              <label className="text-sm font-semibold text-[#263f57] sm:col-span-2">
                Title

                <input
                  className={input}
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Research paper title"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Short title

                <input
                  className={input}
                  value={shortTitle}
                  onChange={(e) =>
                    setShortTitle(e.target.value)
                  }
                  placeholder="Short title"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Series

                <input
                  className={input}
                  value={series}
                  onChange={(e) =>
                    setSeries(e.target.value)
                  }
                  placeholder="WholeLife"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Category

                <input
                  className={input}
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57]">
                Author

                <input
                  className={input}
                  value={author}
                  onChange={(e) =>
                    setAuthor(e.target.value)
                  }
                  placeholder="WholeLife Research"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57] sm:col-span-2">
                Published date

                <input
                  className={input}
                  value={publishedDate}
                  onChange={(e) =>
                    setPublishedDate(e.target.value)
                  }
                  placeholder="2026"
                />
              </label>

              <label className="text-sm font-semibold text-[#263f57] sm:col-span-2">
                Description

                <textarea
                  rows={4}
                  className={input}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Short description of the research publication."
                />
              </label>

            </div>

            <div className="my-7 border-t border-[#263f57]/10" />

            {/* Sections */}
            <div className="space-y-5">

              {sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#263f57]/10 bg-[#faf9f7] p-5"
                >

                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-bold text-[#263f57]">
                      Section {index + 1}
                    </h2>

                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setSections((current) =>
                            current.filter(
                              (_, position) =>
                                position !== index
                            )
                          )
                        }
                        className="text-[#b85f58]"
                        aria-label={`Remove section ${index + 1}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>

                  <label className="text-sm font-semibold text-[#263f57]">
                    Section heading{" "}
                    <span className="font-normal text-[#7a8388]">
                      (optional)
                    </span>

                    <input
                      className={input}
                      value={section.heading}
                      onChange={(e) =>
                        updateSection(
                          index,
                          "heading",
                          e.target.value
                        )
                      }
                      placeholder="The New Definition of Success"
                    />
                  </label>

                  <label className="mt-4 block text-sm font-semibold text-[#263f57]">
                    Paragraphs

                    <textarea
                      rows={7}
                      className={input}
                      value={section.paragraphs}
                      onChange={(e) =>
                        updateSection(
                          index,
                          "paragraphs",
                          e.target.value
                        )
                      }
                      placeholder="Write the research content here. Separate multiple paragraphs with a blank line."
                    />
                  </label>

                </div>
              ))}

            </div>

            <button
              type="button"
              onClick={() =>
                setSections((current) => [
                  ...current,
                  blankSection(),
                ])
              }
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#263f57]/15 px-5 py-2.5 text-sm font-bold text-[#263f57]"
            >
              <Plus size={16} />
              Add another section
            </button>

            {/* Research note */}
            <label className="mt-6 block text-sm font-semibold text-[#263f57]">
              Research note{" "}
              <span className="font-normal text-[#7a8388]">
                (optional)
              </span>

              <textarea
                rows={4}
                className={input}
                value={researchNote}
                onChange={(e) =>
                  setResearchNote(e.target.value)
                }
                placeholder="Optional closing research note or perspective."
              />
            </label>

            {/* References */}
            <div className="mt-7 border-t border-[#263f57]/10 pt-7">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#263f57]">
                    References
                  </h2>

                  <p className="mt-1 text-xs text-[#7a8388]">
                    Add sources used in the research article.
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {references.map((reference, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#263f57]/10 bg-[#faf9f7] p-5"
                  >

                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-[#263f57]">
                        Reference {index + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setReferences((current) =>
                            current.filter(
                              (_, position) =>
                                position !== index
                            )
                          )
                        }
                        className="text-[#b85f58]"
                        aria-label={`Remove reference ${index + 1}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <label className="text-sm font-semibold text-[#263f57]">
                      Reference title

                      <input
                        className={input}
                        value={reference.title}
                        onChange={(e) =>
                          updateReference(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Economic Well-Being of U.S. Households in 2025"
                      />
                    </label>

                    <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_120px]">

                      <label className="text-sm font-semibold text-[#263f57]">
                        Source

                        <input
                          className={input}
                          value={reference.source}
                          onChange={(e) =>
                            updateReference(
                              index,
                              "source",
                              e.target.value
                            )
                          }
                          placeholder="Federal Reserve"
                        />
                      </label>

                      <label className="text-sm font-semibold text-[#263f57]">
                        Year

                        <input
                          className={input}
                          value={reference.year}
                          onChange={(e) =>
                            updateReference(
                              index,
                              "year",
                              e.target.value
                            )
                          }
                          placeholder="2026"
                        />
                      </label>

                    </div>

                  </div>
                ))}

              </div>

              <button
                type="button"
                onClick={() =>
                  setReferences((current) => [
                    ...current,
                    blankReference(),
                  ])
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#263f57]/15 px-5 py-2.5 text-sm font-bold text-[#263f57]"
              >
                <Plus size={16} />
                Add reference
              </button>

            </div>

            {/* Featured */}
            <label className="mt-7 flex items-center gap-3 text-sm font-semibold text-[#263f57]">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(e.target.checked)
                }
                className="h-4 w-4"
              />

              Featured publication
            </label>

            {/* Save */}
            <button
              type="button"
              onClick={save}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c87568] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b8655b]"
            >
              <Save size={16} />
              Save and publish
            </button>

            {status && (
              <p className="mt-4 text-sm font-semibold text-[#526b65]">
                {status}
              </p>
            )}

          </section>

          {/* PUBLISHED */}
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

              {research.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-2xl bg-white/8 p-4"
                >

                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#efb2a8]">
                    {item.series ||
                      item.category ||
                      "Research"}
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-white/55">
                    {item.publishedDate}
                  </p>

                  <div className="mt-4 flex items-center">

                    <button
                      type="button"
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

              {!research.length && (
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