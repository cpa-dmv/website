"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";

type Slot = {
  time: string;
  label: string;
  available: boolean;
};

type BookingStatus =
  | "idle"
  | "loading"
  | "saving"
  | "success"
  | "error";

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

export default function BookingScheduler() {
  /*
   * Show the next 14 calendar days.
   *
   * IMPORTANT:
   * Every day is now available for selection.
   * Weekends are NOT treated differently.
   */
  const days = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const date = new Date();

        date.setHours(12, 0, 0, 0);
        date.setDate(date.getDate() + index);

        return date;
      }),
    []
  );

  const [selectedDate, setSelectedDate] = useState(
    dateKey(days[0])
  );

  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] =
    useState<BookingStatus>("loading");

  const [message, setMessage] = useState("");


  /*
   * Load availability whenever the selected date changes.
   */
  useEffect(() => {
    setStatus("loading");
    setSelectedTime("");
    setMessage("");

    fetch(
      `/api/bookings.php?date=${selectedDate}`,
      {
        cache: "no-store",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setSlots(
          Array.isArray(data.slots)
            ? data.slots
            : []
        );

        setStatus("idle");
      })
      .catch(() => {
        setSlots([]);
        setStatus("error");

        setMessage(
          "Availability could not be loaded. Please try again."
        );
      });
  }, [selectedDate]);


  /*
   * Book appointment.
   */
  const book = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!selectedTime) {
      setMessage(
        "Choose an available time first."
      );

      return;
    }

    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch(
        "/api/bookings.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            date: selectedDate,
            time: selectedTime,
          }),
        }
      );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        setStatus("error");

        setMessage(
          data.error ||
            "The appointment could not be booked."
        );

        return;
      }

      setStatus("success");

      setMessage(data.when || "");

      /*
       * Immediately mark the selected slot
       * as occupied in the UI.
       */
      setSlots((current) =>
        current.map((slot) =>
          slot.time === selectedTime
            ? {
                ...slot,
                available: false,
              }
            : slot
        )
      );
    } catch {
      setStatus("error");

      setMessage(
        "The appointment could not be booked. Please try again."
      );
    }
  };


  const input =
    "w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#1F2937] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/15";


  return (
    <section
      id="booking"
      className="border-t-2 border-[#D1D5DB] bg-[#EDEEF0] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[26px] bg-white shadow-xl">

          <div className="grid lg:grid-cols-[340px_1fr]">

            {/* =========================================================
                LEFT PANEL
            ========================================================= */}

            <aside className="bg-[#082B5C] p-8 text-white sm:p-10">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F59E0B]/20 text-[#F59E0B]">
                <CalendarDays size={24} />
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight">
                Book a free consultation
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/65">
                Choose an available appointment.
                Each conversation is focused and
                confidential.
              </p>

              <ul className="mt-8 space-y-4 text-sm text-white/75">

                <li className="flex items-center gap-3">
                  <Clock3
                    size={17}
                    className="text-[#F59E0B]"
                  />
                  15-minute consultation
                </li>

                <li className="flex items-center gap-3">
                  <CalendarDays
                    size={17}
                    className="text-[#F59E0B]"
                  />
                  Monday through Sunday
                </li>

                <li className="flex items-center gap-3">
                  <Lock
                    size={17}
                    className="text-[#F59E0B]"
                  />
                  Limited daily availability
                </li>

              </ul>

              <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-5 text-white/45">
                Appointments are available from
                11:00 AM–7:00 PM Eastern Time.
                A small number of times are reserved
                each day.
              </p>

            </aside>


            {/* =========================================================
                RIGHT PANEL
            ========================================================= */}

            <div className="min-w-0 p-6 sm:p-9">

              {/* =======================================================
                  STEP 1 — DATE
              ======================================================= */}

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
                  Step 1
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#082B5C]">
                  Choose a date
                </h3>

                <p className="mt-1 text-xs text-[#6B7280]">
                  Select any available date.
                  Appointments are open every day.
                </p>


                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">

                  {days.map((date) => {
                    const key = dateKey(date);

                    const isSelected =
                      selectedDate === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedTime("");
                          setMessage("");
                          setStatus("loading");
                          setSelectedDate(key);
                        }}
                        className={`rounded-xl border px-2 py-3 text-center transition ${
                          isSelected
                            ? "border-[#082B5C] bg-[#082B5C] text-white"
                            : "border-[#D8DEE5] bg-white text-[#374151] hover:border-[#F59E0B]"
                        }`}
                      >

                        <span className="block text-[10px] font-bold uppercase">
                          {date.toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                            }
                          )}
                        </span>

                        <span className="mt-1 block text-lg font-bold">
                          {date.getDate()}
                        </span>

                        <span className="mt-1 block text-[9px]">
                          Available
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>


              {/* =======================================================
                  STEP 2 — TIME
              ======================================================= */}

              <div className="mt-8">

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
                  Step 2
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#082B5C]">
                  Select a 15-minute time
                </h3>

                <p className="mt-1 text-xs text-[#6B7280]">
                  11:00 AM–7:00 PM Eastern Time ·
                  occupied times cannot be selected
                </p>


                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

                  {status === "loading" ? (

                    <p className="col-span-full py-6 text-sm text-[#6B7280]">
                      Loading availability…
                    </p>

                  ) : status === "error" ? (

                    <div className="col-span-full rounded-xl bg-red-50 p-4 text-sm text-red-600">
                      {message ||
                        "Availability could not be loaded. Please try again."}
                    </div>

                  ) : slots.length === 0 ? (

                    <p className="col-span-full py-6 text-sm text-[#6B7280]">
                      No time slots are available.
                    </p>

                  ) : (

                    slots.map((slot) => {

                      const isSelected =
                        selectedTime ===
                        slot.time;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() =>
                            setSelectedTime(
                              slot.time
                            )
                          }
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                            isSelected
                              ? "border-[#F59E0B] bg-[#FAF5EB] text-[#082B5C] ring-2 ring-[#F59E0B]/20"
                              : slot.available
                              ? "border-[#D8DEE5] bg-white text-[#082B5C] hover:border-[#F59E0B]"
                              : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                          }`}
                        >

                          {slot.label}

                          <span
                            className={`mt-0.5 block text-[9px] font-normal ${
                              slot.available
                                ? "no-underline"
                                : "no-underline"
                            }`}
                          >
                            {slot.available
                              ? "Available"
                              : "Occupied"}
                          </span>

                        </button>
                      );
                    })
                  )}

                </div>

              </div>


              {/* =======================================================
                  STEP 3 — DETAILS
              ======================================================= */}

              <form
                onSubmit={book}
                className="mt-8 border-t border-gray-100 pt-7"
              >

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
                  Step 3
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#082B5C]">
                  Your details
                </h3>

                <p className="mt-1 text-xs text-[#6B7280]">
                  Your reservation will be automatically confirmed.
                </p>


                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {/* NAME */}

                  <label className="relative">

                    <UserRound
                      size={16}
                      className="absolute left-4 top-3.5 text-[#9CA3AF]"
                    />

                    <input
                      className={`${input} pl-11`}
                      required
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      placeholder="Full name"
                    />

                  </label>


                  {/* EMAIL */}

                  <label className="relative">

                    <Mail
                      size={16}
                      className="absolute left-4 top-3.5 text-[#9CA3AF]"
                    />

                    <input
                      className={`${input} pl-11`}
                      type="email"
                      required
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="Email address"
                    />

                  </label>

                </div>


                {/* SUCCESS */}

                {status === "success" ? (

                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">

                    <CheckCircle2
                      className="mt-0.5 shrink-0"
                      size={18}
                    />

                    <span>

                      <strong className="block">
                        Your appointment is confirmed.
                      </strong>

                      {message}

                      {" "}A confirmation has
                      been sent to your email.
                      You will receive the meeting
                      link shortly.

                    </span>

                  </div>

                ) : (

                  <>

                    <button
                      type="submit"
                      disabled={
                        status === "saving" ||
                        !selectedTime
                      }
                      className="mt-5 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {status === "saving"
                        ? "Booking…"
                        : "Confirm appointment"}
                    </button>


                    {message && status === "error" && (
  <p className="mt-3 text-sm text-red-600">
    {message}
  </p>
)}

                  </>

                )}

              </form>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}