import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ConferenceRoomBooking from "@/components/conference-room/ConferenceRoomBooking";

export const metadata: Metadata = pageMetadata({
  path: "/conference-room/",
  title: "Conference Room Rental in Fairfax, VA",
  description:
    "Reserve the CPA-DMV conference room at 10521 Judicial Dr #100, Fairfax, VA 22030. Check availability and book online.",
});

export default function ConferenceRoomPage() {
  return <ConferenceRoomBooking />;
}