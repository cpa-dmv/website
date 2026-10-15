
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://cpa-dmv.com";

const publicRoutes = [
  "",
  "/about",
  "/accounting",
  "/ap-ar",
  "/bookkeeping",
  "/business-registration",
  "/business-valuation",
  "/careers",
  "/cdfa-services",
  "/conference-room",
  "/contact",
  "/csr",
  "/events",
  "/forensics-accounting",
  "/hr-advisory",
  "/newsletter",
  "/payroll",
  "/quickbooks",
  "/research",
  "/research/articles",
  "/specialized-audit",
  "/staff-augmentation",
  "/taxation",
  "/teachings",
  "/whole-life",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: route
      ? `${SITE_URL}${route}/`
      : `${SITE_URL}/`,
  }));
}
