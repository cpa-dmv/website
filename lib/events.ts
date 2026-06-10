export type EventItem = {
  id: string;
  title: string;
  type: "CPE" | "Exam Prep" | "Webinar" | "Workshop";
  date: string;
  month: string;
  day: string;
  time: string;
  duration: string;
  description: string;
  cost: string;
  registrationUrl: string;
};

export const events: EventItem[] = [
  {
    id: "cpe-2025-q3",
    title: "CPE: Ethics for CPAs in Public Practice",
    type: "CPE",
    date: "2025-09-18",
    month: "SEP",
    day: "18",
    time: "10:00 AM EST",
    duration: "6 hours",
    description:
      "Deep-dive into ethical obligations for CPAs — AICPA Code of Professional Conduct, state board requirements, and real-world case studies.",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/cpe-session",
  },
  {
    id: "examprep-far-2025",
    title: "CPA Exam Prep: FAR Section Intensive",
    type: "Exam Prep",
    date: "2025-10-04",
    month: "OCT",
    day: "04",
    time: "9:00 AM EST",
    duration: "6 hours",
    description:
      "Focus on Financial Accounting & Reporting — governmental accounting, GASB standards, and complex consolidations with exam strategy.",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/exam-prep-far",
  },
  {
    id: "webinar-divorce-finance",
    title: "Webinar: Protecting Your Assets in Divorce",
    type: "Webinar",
    date: "2025-10-22",
    month: "OCT",
    day: "22",
    time: "12:00 PM EST",
    duration: "90 minutes",
    description:
      "A practical guide to understanding QDRO, hidden assets, and tax consequences in divorce — for individuals, attorneys, and mediators.",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/divorce-webinar",
  },
];

export const eventTypeColors: Record<EventItem["type"], string> = {
  CPE: "bg-teal-100 text-teal-800",
  "Exam Prep": "bg-blue-100 text-blue-800",
  Webinar: "bg-purple-100 text-purple-800",
  Workshop: "bg-amber-100 text-amber-800",
};
