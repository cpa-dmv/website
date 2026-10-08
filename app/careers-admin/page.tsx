"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  Eye,
  Download,
  LogOut,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  FileText,
} from "lucide-react";

type ApplicationStatus =
  | "New"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected";

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
};

const STATUS_OPTIONS: ApplicationStatus[] = [
  "New",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Rejected",
];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-100",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-100",
  Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Interview: "bg-purple-50 text-purple-700 border-purple-100",
  Rejected: "bg-red-50 text-red-700 border-red-100",
};

export default function CareersAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All Positions");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    review: 0,
    shortlisted: 0,
    interview: 0,
    rejected: 0,
  });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("cpa_careers_admin");

    if (savedAuth === "authenticated") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadApplications();
    }
  }, [authenticated]);

  async function loadApplications() {
    setLoading(true);

    try {
      const response = await fetch("/api/careers-admin.php", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load applications.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Unable to load applications.");
      }

      const items: Application[] = (data.applications || []).map(
  (item: any) => ({
    ...item,
    name: item.name ?? item.fullName ?? "Unknown Applicant",
  })
);

setApplications(items);

      setStats({
        total: items.length,
        new: items.filter((item) => item.status === "New").length,
        review: items.filter(
          (item) => item.status === "Under Review"
        ).length,
        shortlisted: items.filter(
          (item) => item.status === "Shortlisted"
        ).length,
        interview: items.filter(
          (item) => item.status === "Interview"
        ).length,
        rejected: items.filter(
          (item) => item.status === "Rejected"
        ).length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch("/api/careers-admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          action: "login",
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Invalid login credentials.");
      }

      sessionStorage.setItem("cpa_careers_admin", "authenticated");
      setAuthenticated(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/careers-admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          action: "logout",
        }),
      });
    } catch {
      // Continue logout locally even if the server request fails.
    }

    sessionStorage.removeItem("cpa_careers_admin");
    setAuthenticated(false);
    setApplications([]);
    setSelectedApplication(null);
  }

  async function updateStatus(
    application: Application,
    status: ApplicationStatus
  ) {
    try {
      const response = await fetch("/api/careers-admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          action: "update_status",
          id: application.id,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to update application."
        );
      }

      await loadApplications();

      setSelectedApplication((current) =>
        current
          ? {
              ...current,
              status,
            }
          : current
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to update application."
      );
    }
  }

  async function deleteApplication(application: Application) {
    const confirmed = window.confirm(
      `Delete the application from ${application.name}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/careers-admin.php?id=${encodeURIComponent(
          application.id
        )}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to delete application."
        );
      }

      setSelectedApplication(null);
      await loadApplications();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete application."
      );
    }
  }

  const positions = useMemo(() => {
    return [
      "All Positions",
      ...Array.from(
        new Set(applications.map((application) => application.position))
      ),
    ];
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.name.toLowerCase().includes(query) ||
        application.email.toLowerCase().includes(query) ||
        application.position.toLowerCase().includes(query);

      const matchesPosition =
        positionFilter === "All Positions" ||
        application.position === positionFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        application.status === statusFilter;

      return matchesSearch && matchesPosition && matchesStatus;
    });
  }, [applications, search, positionFilter, statusFilter]);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f5f7fa] px-4 py-10 sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center justify-center">
          <div className="w-full overflow-hidden rounded-[28px] border border-[#dce3ea] bg-white shadow-[0_25px_70px_rgba(15,39,67,0.10)]">
            <div className="bg-[#082B5C] px-8 py-10 text-white">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck size={25} />
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f7a900]">
                CPA-DMV
              </p>

              <h1 className="mt-2 font-display text-3xl font-bold">
                Careers Admin
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Secure access to applicant management and recruitment
                records.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 p-8">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#526674]">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-[#d8e0e7] bg-white px-4 py-3 text-sm text-[#263f57] outline-none transition focus:border-[#082B5C] focus:ring-4 focus:ring-[#082B5C]/10"
                  placeholder="Admin username"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#526674]">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#d8e0e7] bg-white px-4 py-3 text-sm text-[#263f57] outline-none transition focus:border-[#082B5C] focus:ring-4 focus:ring-[#082B5C]/10"
                  placeholder="Admin password"
                />
              </div>

              {loginError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#082B5C] px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(8,43,92,0.20)] transition hover:bg-[#0d376f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-[11px] leading-5 text-[#8a949c]">
                Authorized personnel only. Applicant information is
                confidential.
              </p>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#263f57]">
      <header className="border-b border-[#dce3ea] bg-white">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#082B5C] text-white">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7a900]">
                  CPA-DMV
                </p>
                <h1 className="font-display text-xl font-bold">
                  Careers Administration
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadApplications}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-[#dce3ea] bg-white px-3 py-2.5 text-xs font-bold text-[#526674] transition hover:border-[#b8c5d0] hover:bg-[#f8fafc]"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8">
        <div className="mb-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f7a900]">
            Recruitment Overview
          </p>

          <h2 className="mt-1 font-display text-3xl font-bold text-[#082B5C]">
            Applications
          </h2>

          <p className="mt-2 text-sm text-[#71808b]">
            Review, manage, and track candidates who have applied to
            CPA-DMV positions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            label="Total"
            value={stats.total}
            icon={Users}
            accent="blue"
          />

          <StatCard
            label="New"
            value={stats.new}
            icon={Clock3}
            accent="amber"
          />

          <StatCard
            label="Under Review"
            value={stats.review}
            icon={FileText}
            accent="purple"
          />

          <StatCard
            label="Shortlisted"
            value={stats.shortlisted}
            icon={CheckCircle2}
            accent="green"
          />

          <StatCard
            label="Interview"
            value={stats.interview}
            icon={BriefcaseBusiness}
            accent="indigo"
          />

          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={XCircle}
            accent="red"
          />
        </div>

        <div className="mt-7 overflow-hidden rounded-[24px] border border-[#dce3ea] bg-white shadow-[0_12px_40px_rgba(15,39,67,0.05)]">
          <div className="border-b border-[#e6ebef] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#263f57]">
                  Applicant Records
                </h3>

                <p className="mt-1 text-xs text-[#82909a]">
                  {filteredApplications.length} applicant
                  {filteredApplications.length === 1 ? "" : "s"} shown
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa5ad]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search applicants..."
                    className="w-full rounded-xl border border-[#dce3ea] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#082B5C] sm:w-56"
                  />
                </div>

                <select
                  value={positionFilter}
                  onChange={(event) =>
                    setPositionFilter(event.target.value)
                  }
                  className="rounded-xl border border-[#dce3ea] bg-white px-3 py-2.5 text-xs font-medium outline-none focus:border-[#082B5C]"
                >
                  {positions.map((position) => (
                    <option key={position}>{position}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-[#dce3ea] bg-white px-3 py-2.5 text-xs font-medium outline-none focus:border-[#082B5C]"
                >
                  <option>All Statuses</option>

                  {STATUS_OPTIONS.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5f8] text-[#71808b]">
                <Users size={24} />
              </div>

              <h4 className="mt-4 font-display text-lg font-bold">
                No applications found
              </h4>

              <p className="mt-1 max-w-sm text-xs leading-5 text-[#8a969e]">
                Applications submitted through the CPA-DMV careers
                page will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#e6ebef] bg-[#fafbfc] text-left">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
                      Applicant
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
                      Position
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
                      Applied
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-[#edf0f3] last:border-0 hover:bg-[#fafcfd]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0f7] text-sm font-bold text-[#082B5C]">
                            {(application.name || "Unknown Applicant")
  .trim()
  .split(/\s+/)
  .map((part) => part[0] || "")
  .join("")
  .slice(0, 2)
  .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#263f57]">
                              {application.name}
                            </p>

                            <p className="truncate text-xs text-[#89959d]">
                              {application.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold text-[#526674]">
                          {application.position}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-[#71808b]">
                        {formatDate(application.appliedAt)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLES[application.status]}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setSelectedApplication(application)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#082B5C] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#0d376f]"
                        >
                          View
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071b30]/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[26px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
            <div className="flex items-start justify-between border-b border-[#e4e9ed] bg-[#082B5C] px-6 py-5 text-white">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f7a900]">
                  Applicant Profile
                </p>

                <h3 className="mt-1 font-display text-2xl font-bold">
                  {selectedApplication.name}
                </h3>

                <p className="mt-1 text-xs text-white/65">
                  {selectedApplication.position}
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(92vh-100px)] overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Full Name"
                  value={selectedApplication.name}
                />

                <DetailItem
                  label="Email"
                  value={selectedApplication.email}
                />

                <DetailItem
                  label="Phone"
                  value={selectedApplication.phone}
                />

                <DetailItem
                  label="Position"
                  value={selectedApplication.position}
                />

                <DetailItem
                  label="Application ID"
                  value={selectedApplication.id}
                />

                <DetailItem
                  label="Applied On"
                  value={formatDate(
                    selectedApplication.appliedAt
                  )}
                />
              </div>

              {selectedApplication.linkedin && (
                <div className="mt-4 rounded-xl border border-[#e1e7ec] bg-[#fafcfd] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b979f]">
                    LinkedIn
                  </p>

                  <a
                    href={selectedApplication.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-sm font-semibold text-[#175ea8] hover:underline"
                  >
                    {selectedApplication.linkedin}
                  </a>
                </div>
              )}

              <div className="mt-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#89959d]">
                  Application Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateStatus(selectedApplication, status)
                      }
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                        selectedApplication.status === status
                          ? STATUS_STYLES[status]
                          : "border-[#dce3ea] bg-white text-[#71808b] hover:bg-[#f7f9fb]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {selectedApplication.resume && (
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#dce3ea] bg-[#f8fafc] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eef6] text-[#082B5C]">
                      <FileText size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Resume / CV
                      </p>

                      <p className="text-[11px] text-[#89959d]">
                        Applicant uploaded document
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedApplication.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-[#082B5C] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#0d376f]"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              )}

              {selectedApplication.coverLetter && (
                <div className="mt-6">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#89959d]">
                    Cover Letter
                  </p>

                  <div className="rounded-2xl border border-[#e1e7ec] bg-[#fafcfd] p-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-[#526674]">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end border-t border-[#e7ebef] pt-5">
                <button
                  onClick={() =>
                    deleteApplication(selectedApplication)
                  }
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: "blue" | "amber" | "purple" | "green" | "indigo" | "red";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    green: "bg-emerald-50 text-emerald-700",
    indigo: "bg-indigo-50 text-indigo-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-[20px] border border-[#dce3ea] bg-white p-4 shadow-[0_8px_25px_rgba(15,39,67,0.035)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles[accent]}`}
        >
          <Icon size={17} />
        </div>

        <span className="font-display text-2xl font-bold text-[#263f57]">
          {value}
        </span>
      </div>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#89959d]">
        {label}
      </p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#e1e7ec] bg-[#fafcfd] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#89959d]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#263f57]">
        {value || "—"}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}