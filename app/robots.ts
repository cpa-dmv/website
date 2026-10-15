
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://cpa-dmv.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin-chat/",
        "/careers-admin/",
        "/conference-room-admin/",
        "/client-chat/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

