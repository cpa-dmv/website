"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Users,
  UserRound,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Slot = {
  time: string;
  label: string;
  available: boolean;
};

type BookingStatus = "idle" | "loading" | "saving" | "success" | "error";

/*
 * Local development:
 *   Next.js runs on localhost:3000
 *   PHP API runs on localhost:8000
 *
 * Production:
 *   Both frontend and PHP API are served from the same domain,
 *   so we use the normal /api path.
 */
const API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000/api"
    : "/api";

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const formatMonth = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

const getCalendarDays = (month: Date) => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDay = first.getDay();

  const days: Date[] = [];

  // Previous month's trailing days
  for (let i = 0; i < startDay; i++) {
    const date = new Date(first);
    date.setDate(date.getDate() - (startDay - i));
    days.push(date);
  }

  // Current month's days
  for (
    let i = 1;
    i <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    i++
  ) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  // Next month's leading days
  while (days.length < 42) {
    const date = new Date(
      month.getFullYear(),
      month.getMonth(),
      month.getDate()
    );

    date.setDate(date.getDate() + (days.length - startDay + 1));
    days.push(date);
  }

  return days;
};

export default function ConferenceRoomBooking() {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  }, []);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(dateKey(today));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState("");
  const [purpose, setPurpose] = useState("");

  const [status, setStatus] = useState<BookingStatus>("loading");
  const [message, setMessage] = useState("");

  const calendarDays = useMemo(
    () => getCalendarDays(calendarMonth),
    [calendarMonth]
  );

  const loadAvailability = async (date: string) => {
    setStatus("loading");
    setSelectedTime("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/conference-room.php?date=${encodeURIComponent(date)}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load availability.");
      }

      setSlots(data.slots || []);
      setStatus("idle");
    } catch (error) {
      console.error("Availability error:", error);

      setSlots([]);
      setStatus("error");
      setMessage("Availability could not be loaded. Please try again.");
    }
  };

  useEffect(() => {
    loadAvailability(selectedDate);
  }, [selectedDate]);

  const chooseDate = (date: Date) => {
    if (date < today) return;

    const key = dateKey(date);

    setSelectedDate(key);

    if (
      date.getMonth() !== calendarMonth.getMonth() ||
      date.getFullYear() !== calendarMonth.getFullYear()
    ) {
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const submitBooking = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedTime) {
      setMessage("Please choose an available time.");
      return;
    }

    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/conference-room.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          organization,
          email,
          phone,
          attendees,
          purpose,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");

        setMessage(
          data.error ||
            "This time could not be booked. Please choose another slot."
        );

        await loadAvailability(selectedDate);
        return;
      }

      setStatus("success");
      setMessage(data.when || "");

      setSlots((current) =>
        current.map((slot) =>
          slot.time === selectedTime
            ? { ...slot, available: false }
            : slot
        )
      );
    } catch (error) {
      console.error("Booking error:", error);

      setStatus("error");
      setMessage(
        "The booking service is temporarily unavailable. Please try again."
      );
    }
  };

  const resetBooking = () => {
    setStatus("idle");
    setSelectedTime("");
    setMessage("");
    setName("");
    setOrganization("");
    setEmail("");
    setPhone("");
    setAttendees("");
    setPurpose("");
  };

  const inputClass =
    "w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#263F57] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#C87568] focus:ring-2 focus:ring-[#C87568]/10";

  return (
    <main className="min-h-screen bg-[#F7F5F1]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#263F57]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#C87568]/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#E6A095]">
              CPA-DMV Conference Room
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reserve the room.
              <span className="block text-[#E6A095]">
                Bring your meeting to life.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Book our private conference room for meetings, presentations,
              interviews, consultations, and professional gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* Location strip */}
      <section className="border-b border-[#263F57]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C87568]/10 text-[#C87568]">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#263F57]">
                10521 Judicial Dr #100
              </p>

              <p className="text-sm text-[#6D777C]">
                Fairfax, VA 22030
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[#6D777C]">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#C87568]" />
              Monday–Sunday
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#C87568]" />
              8:00 AM–5:00 PM ET
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#C87568]" />
              1-hour reservations
            </span>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(38,63,87,0.10)]">
            <div className="grid lg:grid-cols-[420px_1fr]">
              {/* Calendar */}
              <aside className="border-b border-[#263F57]/10 bg-[#FAFAF8] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C87568]">
                  Step 1
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#263F57]">
                  Choose a date
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6D777C]">
                  Select any available day. Conference room reservations are
                  open seven days a week.
                </p>

                <div className="mt-7 rounded-2xl border border-[#E5E7EB] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#263F57]">
                      {formatMonth(calendarMonth)}
                    </h3>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#263F57] transition hover:bg-[#F7F5F1]"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1
                            )
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#263F57] transition hover:bg-[#F7F5F1]"
                        aria-label="Next month"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-7 text-center">
                    {[
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ].map((day) => (
                      <div
                        key={day}
                        className="pb-2 text-[10px] font-bold uppercase text-[#9CA3AF]"
                      >
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((date) => {
                      const key = dateKey(date);

                      const currentMonth =
                        date.getMonth() === calendarMonth.getMonth() &&
                        date.getFullYear() === calendarMonth.getFullYear();

                      const past = date < today;

                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={past}
                          onClick={() => chooseDate(date)}
                          className={`m-0.5 flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition ${
                            selectedDate === key
                              ? "bg-[#263F57] text-white shadow-md"
                              : past
                              ? "cursor-not-allowed text-[#D1D5DB]"
                              : currentMonth
                              ? "text-[#374151] hover:bg-[#F7F5F1] hover:text-[#263F57]"
                              : "text-[#D1D5DB] hover:bg-[#F7F5F1]"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 text-xs text-[#6D777C]">
                  <span className="h-3 w-3 rounded-full bg-[#263F57]" />
                  Selected date
                </div>
              </aside>

              {/* Details */}
              <div className="min-w-0 p-6 sm:p-8 lg:p-10">
                {status === "success" ? (
                  <div className="flex min-h-[560px] items-center justify-center">
                    <div className="max-w-xl text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={42} />
                      </div>

                      <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#C87568]">
                        Reservation confirmed
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-[#263F57]">
                        Your conference room is booked.
                      </h2>

                      <p className="mt-4 text-sm leading-6 text-[#6D777C]">
                        Your reservation has been automatically confirmed and
                        a confirmation email has been sent to{" "}
                        <strong>{email}</strong>.
                      </p>

                      <div className="mt-7 rounded-2xl bg-[#F7F5F1] p-6 text-left">
                        <p className="text-sm font-bold text-[#263F57]">
                          {message}
                        </p>

                        <div className="mt-4 space-y-2 text-sm text-[#6D777C]">
                          <p>
                            <strong className="text-[#263F57]">
                              Location:
                            </strong>{" "}
                            10521 Judicial Dr #100, Fairfax, VA 22030
                          </p>

                          <p>
                            <strong className="text-[#263F57]">
                              Duration:
                            </strong>{" "}
                            1 hour
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={resetBooking}
                        className="mt-7 rounded-full bg-[#263F57] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#1d3246]"
                      >
                        Book another time
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Step 2 */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C87568]">
                        Step 2
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#263F57]">
                        Choose a time
                      </h2>

                      <p className="mt-2 text-sm text-[#6D777C]">
                        {new Date(
                          `${selectedDate}T12:00:00`
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        · Eastern Time
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                        {status === "loading" ? (
                          <p className="col-span-full py-8 text-sm text-[#6D777C]">
                            Loading availability…
                          </p>
                        ) : slots.length === 0 ? (
                          <p className="col-span-full py-8 text-sm text-[#6D777C]">
                            No time slots are available for this date.
                          </p>
                        ) : (
                          slots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                                selectedTime === slot.time
                                  ? "border-[#C87568] bg-[#FDF5F3] text-[#263F57] ring-2 ring-[#C87568]/15"
                                  : slot.available
                                  ? "border-[#D8DEE5] text-[#263F57] hover:border-[#C87568] hover:bg-[#FDF5F3]"
                                  : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                              }`}
                            >
                              {slot.label}

                              <span className="mt-1 block text-[10px] font-normal no-underline">
                                {slot.available ? "Available" : "Booked"}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Step 3 */}
                    <form
                      onSubmit={submitBooking}
                      className="mt-9 border-t border-[#E5E7EB] pt-8"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C87568]">
                        Step 3
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#263F57]">
                        Your details
                      </h2>

                      <p className="mt-2 text-sm text-[#6D777C]">
                        Your reservation will be automatically confirmed.
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {/* Name */}
                        <label className="relative">
                          <UserRound
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            required
                            className={`${inputClass} pl-11`}
                            value={name}
                            onChange={(event) =>
                              setName(event.target.value)
                            }
                            placeholder="Full name"
                          />
                        </label>

                        {/* Organization */}
                        <label className="relative">
                          <Building2
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            className={`${inputClass} pl-11`}
                            value={organization}
                            onChange={(event) =>
                              setOrganization(event.target.value)
                            }
                            placeholder="Organization"
                          />
                        </label>

                        {/* Email */}
                        <label className="relative">
                          <Mail
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            required
                            type="email"
                            className={`${inputClass} pl-11`}
                            value={email}
                            onChange={(event) =>
                              setEmail(event.target.value)
                            }
                            placeholder="Email address"
                          />
                        </label>

                        {/* Phone */}
                        <label className="relative">
                          <Phone
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            className={`${inputClass} pl-11`}
                            value={phone}
                            onChange={(event) =>
                              setPhone(event.target.value)
                            }
                            placeholder="Phone number"
                          />
                        </label>

                        {/* Attendees */}
                        <label className="relative">
                          <Users
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            className={`${inputClass} pl-11`}
                            value={attendees}
                            onChange={(event) =>
                              setAttendees(event.target.value)
                            }
                            placeholder="Number of attendees"
                          />
                        </label>

                        {/* Purpose */}
                        <label className="relative sm:col-span-2">
                          <FileText
                            size={16}
                            className="absolute left-4 top-3.5 text-[#9CA3AF]"
                          />

                          <input
                            className={`${inputClass} pl-11`}
                            value={purpose}
                            onChange={(event) =>
                              setPurpose(event.target.value)
                            }
                            placeholder="Purpose of meeting"
                          />
                        </label>
                      </div>

                      {/* Error message */}
                      {status === "error" && message && (
                        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                          {message}
                        </p>
                      )}

                      {/* Bottom actions */}
                      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs leading-5 text-[#6D777C]">
                          <p className="font-semibold text-[#263F57]">
                            1-hour reservation
                          </p>

                          <p>
                            8:00 AM–5:00 PM · Monday–Sunday · Eastern Time
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={status === "saving" || !selectedTime}
                          className="rounded-full bg-[#C87568] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#b76558] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {status === "saving"
                            ? "Confirming…"
                            : "Confirm reservation"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}