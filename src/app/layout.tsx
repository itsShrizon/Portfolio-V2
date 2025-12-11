import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ChatBot } from "@/components/ui/chatbot";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanzir.dev"),
  title: {
    default: "Tanzir Hossain | AI Engineer",
    template: "%s | Tanzir Hossain",
  },
  description:
    "AI Engineer specializing in machine learning, natural language processing, and automation. Building smart, efficient solutions with LLMs, RAG pipelines, and AI workflows.",
  keywords: [
    "Tanzir",
    "Hossain",
    "Tanzir Hossain",
    "AI Engineer",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Natural Language Processing",
    "Machine Learning",
    "Deep Learning",
    "Python",
    "LangChain",
    "LangGraph",
    "PyTorch",
    "TensorFlow",
    "RAG Systems",
    "LLM Fine-tuning",
    "LoRA",
    "QLoRA",
    "n8n Automation",
    "FastAPI",
    "Hugging Face",
    "Vector Databases",
    "Portfolio",
    "Next.js",
    "React",
    "Automation",
  ],
  authors: [{ name: "Tanzir Hossain", url: "https://tanzir.dev" }],
  creator: "Tanzir Hossain",
  publisher: "Tanzir Hossain",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tanzir Hossain | AI Engineer",
    description:
      "AI Engineer specializing in machine learning, natural language processing, and automation. Building smart, efficient solutions with LLMs, RAG pipelines, and AI workflows.",
    url: "https://tanzir.dev/",
    siteName: "Tanzir Hossain",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tanzir Hossain | AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzir Hossain | AI Engineer",
    description:
      "AI Engineer specializing in machine learning, natural language processing, and automation. Building smart, efficient solutions with LLMs, RAG pipelines, and AI workflows.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true, 
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanzir Hossain",
    url: "https://tanzir.dev",
    image: "https://tanzir.dev/opengraph-image.png",
    jobTitle: "AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Join Venture AI",
    },
    sameAs: [
      "https://github.com/itsShrizon",
      "https://www.linkedin.com/in/tanzir-hossain-shrizon/",
      "https://tanzir.dev/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "LLM Fine-tuning",
      "LoRA",
      "QLoRA",
      "PEFT",
      "Unsloth",
      "LangChain",
      "LangGraph",
      "Python",
      "FastAPI",
      "RAG Systems",
      "n8n Automation",
      "TensorFlow",
      "PyTorch",
      "Hugging Face",
      "Vector Databases",
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} overflow-x-hidden`} suppressHydrationWarning >
      <head>
        <meta name="theme-color" content="#0b1021" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f9fafb" media="(prefers-color-scheme: light)" />
        <meta name="application-name" content="Tanzir Hossain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Tanzir Hossain | AI Engineer',
              url: 'https://tanzir.dev',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.google.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${outfit.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden bg-background `}
        suppressHydrationWarning
      >
        <LoadingScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatBot />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
