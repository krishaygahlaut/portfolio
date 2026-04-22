
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://krishaygahlaut.vercel.app/sitemap.xml",
  };
}
