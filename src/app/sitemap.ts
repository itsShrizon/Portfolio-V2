import { MetadataRoute } from "next";

// TODO: Update this to your custom domain
const baseUrl = "https://tanzir.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  return [...staticRoute];
}
