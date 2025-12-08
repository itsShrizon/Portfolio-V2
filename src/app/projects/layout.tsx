import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of AI/ML, software development, and robotics projects. From RAG systems and agentic AI to computer vision applications and robotic solutions.",
  openGraph: {
    title: "Projects | Tanzir Hossain",
    description:
      "Explore my portfolio of AI/ML, software development, and robotics projects. From RAG systems and agentic AI to computer vision applications and robotic solutions.",
    url: "https://tanzir-hossain.vercel.app/projects",
    type: "website",
  },
  keywords: [
    "AI Projects",
    "Machine Learning Portfolio",
    "RAG Systems",
    "Agentic AI",
    "Computer Vision",
    "Robotics Projects",
    "Software Development",
    "LangChain",
    "LangGraph",
    "Deep Learning",
    "JAVA",
    "Spring Boot",
    "Spring Framework",
    "Spring Data JPA",
    "Microservices",
  ],
  alternates: {
    canonical: "https://tanzir-hossain.vercel.app/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
