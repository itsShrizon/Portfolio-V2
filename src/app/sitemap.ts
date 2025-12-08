import { MetadataRoute } from "next";

const baseUrl = "https://tanzir-hossain.vercel.app";

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
