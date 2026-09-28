"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  Building2,
  Mail,
  Phone,
  FileText,
  Trash2,
  RefreshCw,
  Search,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Booking = {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  attendees?: string | number;
  purpose?: string;
  date: string;
  time: string;
  createdAt?: string;
};

type ApiResponse = {
  success: boolean;
  stats: {
    total: number;
    today: number;
    upcoming: number;
    past: number;
  };
  bookings: Booking[];
};

const API_URL =
  typeof window !== "undefined" &&
  window.location.hostname === "localhost"
    ? "http://localhost:8000/conference-room-admin/api.php"
    : "/conference-room-admin/api.php";

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function isPast(date: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const bookingDate = new Date(`${date}T00:00:00`);

  return bookingDate < today;
}

export default function ConferenceRoomAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
    past: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "today" | "upcoming" | "past"
  >("all");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  async function loadBookings(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load bookings.");
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error("Unable to load bookings.");
      }

      setBookings(data.bookings || []);
      setStats(
        data.stats || {
          total: 0,
          today: 0,
          upcoming: 0,
          past: 0,
        }
      );
    } catch (err) {
      console.error(err);
      setError(
        "Bookings could not be loaded. Please refresh and try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function deleteBooking(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to delete booking.");
      }

      setSelectedBooking(null);

      await loadBookings(true);
    } catch (err) {
      console.error(err);

      window.alert(
        err instanceof Error
          ? err.message
          : "Unable to delete booking."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        normalizedSearch === "" ||
        [
          booking.name,
          booking.organization,
          booking.email,
          booking.phone,
          booking.purpose,
          booking.date,
          booking.time,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearch)
          );

      if (!matchesSearch) return false;

      if (filter === "today") {
        const today = new Date().toISOString().slice(0, 10);

        return booking.date === today;
      }

      if (filter === "upcoming") {
        return !isPast(booking.date);
      }

      if (filter === "past") {
        return isPast(booking.date);
      }

      return true;
    });
  }, [bookings, search, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#263E57]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E4E8ED] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#263E57] text-white">
                <CalendarDays size={20} />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-[#263E57]">
                  Conference Room Admin
                </h1>

                <p className="text-xs text-[#7A8795]">
                  CPA-DMV booking management
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => loadBookings(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-[#DCE2E8] bg-white px-4 py-2.5 text-sm font-semibold text-[#263E57] transition hover:border-[#263E57] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D97963]">
            Booking management
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#263E57] sm:text-4xl">
                Conference Room Bookings
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#697785]">
                View, search, and manage reservations for the CPA-DMV
                conference room.
              </p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-[#E4E8ED]">
              <span className="text-[#7A8795]">
                Total bookings
              </span>

              <span className="ml-2 font-bold text-[#263E57]">
                {stats.total}
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={() => loadBookings(true)}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<CalendarDays size={20} />}
            label="Total bookings"
            value={stats.total}
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="Today's bookings"
            value={stats.today}
          />

          <StatCard
            icon={<CalendarDays size={20} />}
            label="Upcoming"
            value={stats.upcoming}
          />

          <StatCard
            icon={<FileText size={20} />}
            label="Past bookings"
            value={stats.past}
          />
        </div>

        {/* Main card */}
        <section className="overflow-hidden rounded-2xl border border-[#E3E8ED] bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-[#E8ECF0] p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA5B1]"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search bookings..."
                  className="h-11 w-full rounded-xl border border-[#DCE2E8] bg-[#FAFBFC] pl-10 pr-4 text-sm text-[#263E57] outline-none transition placeholder:text-[#A3ADB8] focus:border-[#263E57] focus:bg-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  All
                </FilterButton>

                <FilterButton
                  active={filter === "today"}
                  onClick={() => setFilter("today")}
                >
                  Today
                </FilterButton>

                <FilterButton
                  active={filter === "upcoming"}
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </FilterButton>

                <FilterButton
                  active={filter === "past"}
                  onClick={() => setFilter("past")}
                >
                  Past
                </FilterButton>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#E8ECF0] bg-[#FAFBFC] text-left">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Date & time
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Guest
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Organization
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Attendees
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Purpose
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.12em] text-[#7A8795]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRows />
                ) : visibleBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-20 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F4F7] text-[#7A8795]">
                          <CalendarDays size={24} />
                        </div>

                        <h3 className="font-semibold text-[#263E57]">
                          No bookings found
                        </h3>

                        <p className="mt-1 text-sm text-[#7A8795]">
                          Try changing your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visibleBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-[#EEF1F4] transition hover:bg-[#FAFBFC]"
                    >
                      <td className="px-5 py-5">
                        <div className="font-semibold text-[#263E57]">
                          {formatDate(booking.date)}
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 text-sm text-[#7A8795]">
                          <Clock3 size={14} />
                          {formatTime(booking.time)}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="font-semibold text-[#263E57]">
                          {booking.name}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#596878]">
                          <Building2 size={15} />

                          <span>
                            {booking.organization || "—"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-[#596878]">
                            <Mail size={14} />
                            <span>{booking.email}</span>
                          </div>

                          {booking.phone && (
                            <div className="flex items-center gap-2 text-[#596878]">
                              <Phone size={14} />
                              <span>{booking.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#596878]">
                          <Users size={15} />

                          <span>
                            {booking.attendees || "—"}
                          </span>
                        </div>
                      </td>

                      <td className="max-w-[230px] px-5 py-5">
                        <p className="truncate text-sm text-[#596878]">
                          {booking.purpose || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <button
                          onClick={() =>
                            setSelectedBooking(booking)
                          }
                          className="rounded-lg border border-[#DCE2E8] px-3 py-2 text-xs font-semibold text-[#263E57] transition hover:border-[#263E57] hover:bg-[#F7F9FB]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredBookings.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#E8ECF0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#7A8795]">
                Showing{" "}
                <span className="font-semibold text-[#263E57]">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#263E57]">
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredBookings.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#263E57]">
                  {filteredBookings.length}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPage((value) =>
                      Math.max(1, value - 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE2E8] text-[#596878] transition hover:bg-[#F5F7FA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="min-w-[70px] text-center text-sm font-semibold text-[#263E57]">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((value) =>
                      Math.min(totalPages, value + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE2E8] text-[#596878] transition hover:bg-[#F5F7FA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Detail modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172536]/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E8ECF0] px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#D97963]">
                  Booking details
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#263E57]">
                  {selectedBooking.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#7A8795] transition hover:bg-[#F3F5F7] hover:text-[#263E57]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <DetailItem
                icon={<CalendarDays size={17} />}
                label="Date"
                value={formatDate(selectedBooking.date)}
              />

              <DetailItem
                icon={<Clock3 size={17} />}
                label="Time"
                value={formatTime(selectedBooking.time)}
              />

              <DetailItem
                icon={<Users size={17} />}
                label="Guest"
                value={selectedBooking.name}
              />

              <DetailItem
                icon={<Building2 size={17} />}
                label="Organization"
                value={selectedBooking.organization || "—"}
              />

              <DetailItem
                icon={<Mail size={17} />}
                label="Email"
                value={selectedBooking.email}
              />

              <DetailItem
                icon={<Phone size={17} />}
                label="Phone"
                value={selectedBooking.phone || "—"}
              />

              <DetailItem
                icon={<Users size={17} />}
                label="Number of attendees"
                value={String(
                  selectedBooking.attendees || "—"
                )}
              />

              <DetailItem
                icon={<FileText size={17} />}
                label="Booking ID"
                value={selectedBooking.id}
              />

              <div className="sm:col-span-2">
                <DetailItem
                  icon={<FileText size={17} />}
                  label="Purpose of meeting"
                  value={selectedBooking.purpose || "—"}
                />
              </div>

              {selectedBooking.createdAt && (
                <div className="sm:col-span-2">
                  <DetailItem
                    icon={<Clock3 size={17} />}
                    label="Booked on"
                    value={new Date(
                      selectedBooking.createdAt
                    ).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#E8ECF0] bg-[#FAFBFC] px-6 py-5 sm:flex-row sm:justify-between">
              <button
                onClick={() =>
                  deleteBooking(selectedBooking.id)
                }
                disabled={
                  deletingId === selectedBooking.id
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={16} />

                {deletingId === selectedBooking.id
                  ? "Deleting..."
                  : "Delete booking"}
              </button>

              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-xl bg-[#263E57] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E3248]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E3E8ED] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#7A8795]">{label}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-[#263E57]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3F7] text-[#263E57]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#263E57] text-white"
          : "border border-[#DCE2E8] bg-white text-[#697785] hover:bg-[#F6F8FA]"
      }`}
    >
      {children}
    </button>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E4E9EE] bg-[#FAFBFC] p-4">
      <div className="mb-2 flex items-center gap-2 text-[#7A8795]">
        {icon}

        <span className="text-xs font-bold uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>

      <p className="break-words text-sm font-semibold leading-6 text-[#263E57]">
        {value}
      </p>
    </div>
  );
}

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-[#EEF1F4]"
        >
          {Array.from({ length: 7 }).map((__, cell) => (
            <td key={cell} className="px-5 py-5">
              <div className="h-4 animate-pulse rounded bg-[#EEF1F4]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}