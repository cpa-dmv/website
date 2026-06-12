export type EventItem = {
  id: string;
  title: string;
  type: "CPE" | "Exam Prep" | "Webinar" | "Workshop";
  date: string;
  month: string;
  day: string;
  weekday: string;
  timeRange: string;
  credits: string;
  format: string;
  cost: string;
  registrationUrl: string;
  // legacy fields kept for compatibility
  time?: string;
  duration?: string;
  description?: string;
};

export const events: EventItem[] = [
  {
    id: "cpe-ethics-2025",
    title: "CPE: Ethics for CPAs in Public Practice",
    type: "CPE",
    date: "2025-09-18",
    month: "SEP",
    day: "18",
    weekday: "THU",
    timeRange: "10:00 AM – 4:00 PM ET",
    credits: "6 CPE Credits",
    format: "Live Webinar",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/cpe-session",
    time: "10:00 AM EST",
    duration: "6 hours",
    description: "Deep-dive into ethical obligations for CPAs — AICPA Code of Professional Conduct, state board requirements, and real-world case studies.",
  },
  {
    id: "examprep-far-2025",
    title: "CPA Exam Prep: FAR Section Intensive",
    type: "Exam Prep",
    date: "2025-10-04",
    month: "OCT",
    day: "04",
    weekday: "SAT",
    timeRange: "9:00 AM – 3:00 PM ET",
    credits: "6 CPE Credits",
    format: "Live Workshop",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/exam-prep-far",
    time: "9:00 AM EST",
    duration: "6 hours",
    description: "Focus on Financial Accounting & Reporting — governmental accounting, GASB standards, and complex consolidations with exam strategy.",
  },
  {
    id: "webinar-divorce-finance",
    title: "Webinar: Protecting Your Assets in Divorce",
    type: "Webinar",
    date: "2025-10-22",
    month: "OCT",
    day: "22",
    weekday: "WED",
    timeRange: "12:00 PM – 1:30 PM ET",
    credits: "1 CPE Credit",
    format: "Live Webinar",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/divorce-webinar",
    time: "12:00 PM EST",
    duration: "90 minutes",
    description: "A practical guide to understanding QDRO, hidden assets, and tax consequences in divorce — for individuals, attorneys, and mediators.",
  },
  {
    id: "workshop-qbo-2025",
    title: "QuickBooks Online: Essentials for Small Business",
    type: "Workshop",
    date: "2025-11-08",
    month: "NOV",
    day: "08",
    weekday: "SAT",
    timeRange: "9:30 AM – 12:30 PM ET",
    credits: "3 CPE Credits",
    format: "Live Workshop",
    cost: "Free",
    registrationUrl: "https://calendly.com/cpa-dmv/qbo-workshop",
    time: "9:30 AM EST",
    duration: "3 hours",
    description: "Hands-on QuickBooks Online setup, chart of accounts, reconciliation, and reporting for small business owners and bookkeepers.",
  },
];

export const eventTypeColors: Record<EventItem["type"], { bg: string; text: string; btn: string; dateBg: string }> = {
  CPE:         { bg: "bg-teal-50",   text: "text-teal-700",  btn: "#0D9488", dateBg: "#0D9488" },
  "Exam Prep": { bg: "bg-blue-50",   text: "text-blue-700",  btn: "#082B5C", dateBg: "#082B5C" },
  Webinar:     { bg: "bg-purple-50", text: "text-purple-700",btn: "#7C3AED", dateBg: "#7C3AED" },
  Workshop:    { bg: "bg-amber-50",  text: "text-amber-700", btn: "#B45309", dateBg: "#92400E" },
};
