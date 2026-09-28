import type { Metadata } from "next";
import ConferenceRoomBooking from "@/components/conference-room/ConferenceRoomBooking";

export const metadata: Metadata = {
  title: "Conference Room Booking | CPA-DMV",
  description:
    "Reserve the CPA-DMV conference room at 10521 Judicial Dr #100, Fairfax, VA 22030.",
};

export default function ConferenceRoomPage() {
  return <ConferenceRoomBooking />;
}