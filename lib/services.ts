export type Service = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  rate: string;
  rateModel: string;
  description: string;
  included: string[];
  whoServes: string[];
  process: { step: string; title: string; desc: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    id: "cdfa",
    name: "CDFA & Divorce Asset Division",
    slug: "cdfa-services",
    icon: "Scale",
    tagline: "Financial clarity when life changes.",
    rate: "$180/hr",
    rateModel: "Engagement-based",
    description:
      "CPA-level precision for assets, cash flow, tax impacts, retirement accounts, and settlements — backed by a Certified Divorce Financial Analyst credential.",
    included: [
      "Asset and liability inventory",
      "Tax consequence modeling for settlements",
      "Retirement account division (QDRO analysis)",
      "Cash flow and support projections",
      "Business valuation for marital estates",
      "Court-ready financial exhibits",
    ],
    whoServes: [
      "Divorcing individuals with complex assets",
      "Family law attorneys needing a financial expert",
      "Mediators seeking neutral financial analysis",
      "High-net-worth clients with business interests",
    ],
    process: [
      { step: "01", title: "Discovery Call", desc: "Confidential review of your financial picture and case goals." },
      { step: "02", title: "Analysis", desc: "Deep-dive into assets, liabilities, tax impacts, and settlement scenarios." },
      { step: "03", title: "Deliverable", desc: "Court-ready exhibits, projections, and expert testimony if needed." },
    ],
    related: ["specialized-audit", "forensics-accounting", "business-valuation"],
  },
  {
    id: "audit",
    name: "Audits & Attestations",
    slug: "specialized-audit",
    icon: "ClipboardCheck",
    tagline: "Rigorous audits built for regulated industries.",
    rate: "From $2,500",
    rateModel: "Fixed fee or $180/hr",
    description:
      "Specialized audit and attestation services for credit unions, non-profits, ALFs, and educational institutions — NCUA-compliant and AICPA-affiliated.",
    included: [
      "Supervisory committee audits (NCUA)",
      "Single audits under Uniform Guidance",
      "Agreed-upon procedures",
      "Review engagements",
      "ALF financial audits",
      "Educational institution audits",
    ],
    whoServes: [
      "Credit union supervisory committees",
      "Non-profit organizations",
      "Assisted living facilities",
      "Educational institutions",
    ],
    process: [
      { step: "01", title: "Scoping", desc: "Define engagement scope, timeline, and deliverables." },
      { step: "02", title: "Fieldwork", desc: "On-site or remote testing, documentation review, and interviews." },
      { step: "03", title: "Report", desc: "Formal audit report delivered with findings and recommendations." },
    ],
    related: ["forensics-accounting", "cdfa-services", "taxation"],
  },
  {
    id: "forensics",
    name: "Forensics Accounting + Court Witness",
    slug: "forensics-accounting",
    icon: "Search",
    tagline: "Financial investigation and expert testimony.",
    rate: "$180/hr",
    rateModel: "Engagement-based",
    description:
      "Forensic accounting investigation, litigation support, and expert court witness services for legal proceedings and financial disputes.",
    included: [
      "Financial fraud investigation",
      "Asset tracing and recovery",
      "Expert witness testimony",
      "Litigation support and damage calculations",
      "Financial statement analysis",
      "Fraud risk assessments",
    ],
    whoServes: [
      "Attorneys in civil or criminal litigation",
      "Businesses investigating internal fraud",
      "Courts requiring neutral financial experts",
      "Insurance carriers handling financial claims",
    ],
    process: [
      { step: "01", title: "Engagement", desc: "Define investigation scope, objectives, and legal parameters." },
      { step: "02", title: "Investigation", desc: "Document review, data analysis, and interviews." },
      { step: "03", title: "Testimony", desc: "Written report and expert court witness testimony if required." },
    ],
    related: ["cdfa-services", "specialized-audit", "business-valuation"],
  },
  {
    id: "taxation",
    name: "Taxation Services",
    slug: "taxation",
    icon: "FileText",
    tagline: "Precision tax preparation and advisory.",
    rate: "Fixed fee/return",
    rateModel: "$100/hr advisory",
    description:
      "Individual and business tax preparation, planning, and advisory services — federal, state, and local — with expertise across entity types.",
    included: [
      "Individual federal and state returns",
      "Business entity returns (S-Corp, C-Corp, Partnership, LLC)",
      "Tax planning and projections",
      "IRS correspondence support",
      "Estimated tax guidance",
      "Tax resource library (see below)",
    ],
    whoServes: [
      "Individuals with complex tax situations",
      "Small to mid-size businesses",
      "Self-employed professionals",
      "Real estate investors",
    ],
    process: [
      { step: "01", title: "Document Collection", desc: "We provide a tailored checklist based on your tax profile." },
      { step: "02", title: "Preparation & Review", desc: "Accurate preparation with a review call to confirm details." },
      { step: "03", title: "Filing", desc: "E-file with confirmation and copies delivered to you." },
    ],
    related: ["cdfa-services", "payroll", "bookkeeping"],
  },
  {
    id: "apar",
    name: "AP / AR",
    slug: "ap-ar",
    icon: "ArrowLeftRight",
    tagline: "Keep your cash flow under control.",
    rate: "$20/hr",
    rateModel: "Typical engagement: $200",
    description:
      "Accounts payable and accounts receivable management to keep your business cash flow healthy and vendor relationships strong.",
    included: [
      "Invoice processing and payment scheduling",
      "Vendor payment management",
      "Customer invoicing and collections",
      "Aging reports and reconciliations",
      "Cash flow tracking",
      "Month-end AP/AR close",
    ],
    whoServes: [
      "Small businesses with active vendor relationships",
      "Growing companies outpacing their AP/AR capacity",
      "Business owners who need cleaner cash flow visibility",
    ],
    process: [
      { step: "01", title: "Setup", desc: "Map your current AP/AR workflow and tools." },
      { step: "02", title: "Execution", desc: "Process invoices, payments, and collections on your cycle." },
      { step: "03", title: "Reporting", desc: "Monthly aging reports and cash flow summary." },
    ],
    related: ["payroll", "hr-advisory", "taxation"],
  },
  {
    id: "payroll",
    name: "Payroll Services",
    slug: "payroll",
    icon: "Users",
    tagline: "Accurate payroll, every cycle.",
    rate: "$100/cycle",
    rateModel: "Per payroll cycle",
    description:
      "End-to-end payroll processing so your team gets paid accurately and on time, with full compliance across federal and state requirements.",
    included: [
      "Payroll calculation and processing",
      "Direct deposit setup and management",
      "Federal and state payroll tax filings",
      "W-2 and 1099 preparation",
      "New hire reporting",
      "Year-end reconciliation",
    ],
    whoServes: [
      "Small businesses with 1–50 employees",
      "Growing companies needing reliable payroll",
      "Businesses frustrated with payroll software complexity",
    ],
    process: [
      { step: "01", title: "Onboarding", desc: "Collect employee data, direct deposit info, and tax elections." },
      { step: "02", title: "Processing", desc: "Run payroll on your schedule with full tax compliance." },
      { step: "03", title: "Remittance", desc: "File all payroll taxes and provide reports each cycle." },
    ],
    related: ["hr-advisory", "ap-ar", "taxation"],
  },
  {
    id: "hr",
    name: "HR Support & Advisory",
    slug: "hr-advisory",
    icon: "Briefcase",
    tagline: "HR guidance without the overhead.",
    rate: "$20/hr",
    rateModel: "Typical engagement: $100",
    description:
      "Practical HR advisory support for small businesses — employment policies, onboarding, compliance, and workforce planning guidance.",
    included: [
      "Employee handbook review and setup",
      "Onboarding and offboarding procedures",
      "Employment compliance guidance",
      "Benefits administration support",
      "Job description development",
      "HR policy advisory",
    ],
    whoServes: [
      "Small businesses building their first HR function",
      "Founders who wear too many hats",
      "Companies preparing for growth or hiring",
    ],
    process: [
      { step: "01", title: "Assessment", desc: "Review current HR practices, gaps, and compliance exposure." },
      { step: "02", title: "Deliverables", desc: "Handbooks, policies, and procedures tailored to your business." },
      { step: "03", title: "Support", desc: "Ongoing advisory as your HR needs evolve." },
    ],
    related: ["payroll", "ap-ar", "business-registration"],
  },
  {
    id: "valuation",
    name: "Business Valuation",
    slug: "business-valuation",
    icon: "TrendingUp",
    tagline: "Know what your business is worth.",
    rate: "Contact for pricing",
    rateModel: "Scope-dependent",
    description:
      "CPA-prepared business valuations for sales, acquisitions, divorce proceedings, estate planning, and partnership disputes.",
    included: [
      "Income, market, and asset-based approaches",
      "Certified valuation report",
      "Litigation-ready documentation",
      "Minority interest and control premium analysis",
      "Intangible asset assessment",
      "Expert opinion letters",
    ],
    whoServes: [
      "Business owners planning a sale or exit",
      "Parties in divorce or litigation involving a business",
      "Estate planning and gift tax purposes",
      "Partnership disputes and buy-sell agreements",
    ],
    process: [
      { step: "01", title: "Scoping", desc: "Define valuation purpose, standard of value, and premise." },
      { step: "02", title: "Analysis", desc: "Financial statement review, market research, and modeling." },
      { step: "03", title: "Report", desc: "Certified written report with supporting documentation." },
    ],
    related: ["cdfa-services", "forensics-accounting", "specialized-audit"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks Setup & Training",
    slug: "quickbooks",
    icon: "BookOpen",
    tagline: "Get QuickBooks working right from day one.",
    rate: "Contact for pricing",
    rateModel: "Scope-dependent",
    description:
      "QuickBooks ProAdvisor setup, cleanup, and training for small businesses — chart of accounts, payroll integration, reporting, and hands-on training.",
    included: [
      "New company file setup",
      "Chart of accounts customization",
      "Bank and credit card feed setup",
      "Payroll module configuration",
      "Historical data cleanup",
      "One-on-one training sessions",
    ],
    whoServes: [
      "New businesses setting up accounting systems",
      "Companies with messy books needing a clean start",
      "Business owners who want to manage their own books",
    ],
    process: [
      { step: "01", title: "Assessment", desc: "Review your current setup or define your new system needs." },
      { step: "02", title: "Setup", desc: "Configure QuickBooks to match your business structure." },
      { step: "03", title: "Training", desc: "Hands-on training so your team can run it confidently." },
    ],
    related: ["ap-ar", "payroll", "taxation"],
  },
  {
    id: "registration",
    name: "Business Registration",
    slug: "business-registration",
    icon: "Building2",
    tagline: "Start your business on the right foundation.",
    rate: "Contact for pricing",
    rateModel: "Scope-dependent",
    description:
      "Entity selection, formation, and registration services for new businesses in Virginia, Maryland, and DC — with tax strategy built in from day one.",
    included: [
      "Entity type analysis (LLC, S-Corp, C-Corp)",
      "State registration filing",
      "EIN application",
      "Operating agreement review",
      "Initial tax elections (S-Corp, 83(b))",
      "Registered agent setup",
    ],
    whoServes: [
      "Entrepreneurs starting a new business",
      "Sole proprietors converting to an LLC or corporation",
      "Out-of-state businesses expanding to Virginia",
    ],
    process: [
      { step: "01", title: "Strategy", desc: "Determine the right entity type for your goals and tax situation." },
      { step: "02", title: "Filing", desc: "Handle all state and federal registration paperwork." },
      { step: "03", title: "Foundation", desc: "Set up your EIN, bank account guidance, and initial tax elections." },
    ],
    related: ["quickbooks", "payroll", "taxation"],
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping",
    slug: "bookkeeping",
    icon: "BookOpen",
    tagline: "Accurate books, every month.",
    rate: "Contact for pricing",
    rateModel: "Monthly engagement",
    description:
      "Full-service monthly bookkeeping for small businesses and individuals — organized, reconciled, and ready for tax time. Powered by QuickBooks and delivered by a licensed CPA.",
    included: [
      "Monthly transaction categorization",
      "Bank and credit card reconciliation",
      "Profit & loss and balance sheet reports",
      "Accounts payable and receivable tracking",
      "Payroll journal entries",
      "Year-end close and tax-ready financials",
    ],
    whoServes: [
      "Small business owners who need clean monthly books",
      "Startups that want CPA-reviewed financials from day one",
      "Businesses preparing for loan applications or audits",
      "Clients transitioning from DIY or unqualified bookkeepers",
    ],
    process: [
      { step: "01", title: "Onboard", desc: "Connect your accounts and review your current financial state." },
      { step: "02", title: "Maintain", desc: "We categorize, reconcile, and close the books every month." },
      { step: "03", title: "Report", desc: "Receive clean monthly financials with a brief summary review." },
    ],
    related: ["ap-ar", "payroll", "taxation"],
  },
  {
    id: "accounting",
    name: "Financial Accounting & Reporting",
    slug: "accounting",
    icon: "TrendingUp",
    tagline: "Clear financials. Confident decisions.",
    rate: "Contact for pricing",
    rateModel: "Engagement-based",
    description:
      "GAAP-compliant financial accounting and reporting for businesses, non-profits, and credit unions — from monthly close to audited statements and board-ready reports.",
    included: [
      "GAAP-compliant financial statement preparation",
      "Monthly and quarterly close support",
      "General ledger maintenance and review",
      "Variance analysis and management reports",
      "Non-profit fund accounting",
      "Board and stakeholder reporting packages",
    ],
    whoServes: [
      "Non-profits requiring fund accounting and grant reporting",
      "Credit unions and financial institutions",
      "Businesses preparing for external audits",
      "Companies seeking board-level financial reporting",
    ],
    process: [
      { step: "01", title: "Assess", desc: "Review your current accounting setup and reporting requirements." },
      { step: "02", title: "Close", desc: "Perform monthly or quarterly close and prepare accurate financials." },
      { step: "03", title: "Deliver", desc: "Provide stakeholder-ready reports with commentary and analysis." },
    ],
    related: ["specialized-audit", "bookkeeping", "taxation"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
