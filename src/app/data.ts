import { StaticImageData } from "next/image";

import {
  DubAIImage,
  ShapeDrawerImage,
  BusETicketImage,
  WeatherAppImage,
  CancerDetectionImage,
  SignboardDetectionImage,
  PickAndPlaceImage,
} from "@/assets";

export interface IProjectData {
  ID: string;
  TITLE: string;
  DESCRIPTION: string;
  LONG_DESCRIPTION: string;
  FEATURES: string[];
  TECHNOLOGIES: string[];
  CATEGORY: string;
  IMAGE: StaticImageData;
  GITHUB?: string;
  DEMO?: string;
  FEATURED: boolean;
}

interface ICourse {
  NAME: string;
  LINK: string;
}

export interface IBlogData {
  TYPE: "certification" | "specialization" | "skill-track" | "award";
  DATE: string;
  LINK?: string;
  DESCRIPTION: string;
  COURSES?: ICourse[];
  FEATURED?: boolean;
}

// Age Calculation
const currentYear = new Date().getFullYear();
const birthYear = 2000;
const dynamicAge = currentYear - birthYear;

export const DATA = {
  HEADER: {
    NAME: "Tanzir Hossain",
    AGE: dynamicAge,
    PRONOUN: "he/him",
    HEADLINE:
      "AI Engineer specializing in machine learning, NLP, and intelligent automation.",
    RESUME: "/Resume.pdf",
    EMAIL: "mailto:mailme.tanzir@gmail.com",
    EMAIL_JVAI: "mailto:tanzir@joinventureai.com",
    GITHUB: "https://github.com/itsShrizon",
    LINKEDIN: "https://www.linkedin.com/in/tanzir-hossain-shrizon/",
    PHONE: "(+880) 1404744781",
    PHONE_ALT: "+8801521575270",
    ADDRESS: "Road 16, Sector 11, Uttara",
  },

  ABOUT_ME: {
    INTRO:
      "I’m an AI Engineer specializing in machine learning, NLP, and automation, with experience building predictive models, optimizing data pipelines, and deploying scalable AI systems. I work with GCP, CI/CD pipelines, Docker, Cloud Run, and Vertex AI to deliver production-ready ML deployments. I also integrate intelligent workflows using vector databases, LangGraph, and n8n to streamline automation and data-driven operations. Whether it's custom workflow automation or fine-tuning open-source models, I deliver efficient, high-performance AI solutions.",
    EXPERTISE:
      "My expertise lies in LLM fine-tuning, RAG pipelines, ML/DL model development, and AI workflow automation with n8n, bridging research with real-world deployment.",
  },

  EXPERIENCE: {
    "Join Venture AI": {
      WEBSITE: "https://joinventureai.com/",
      ROLES: [
        {
          POSITION: "Jr. AI Developer",
          LOCATION: "Dhaka, Bangladesh",
          DURATION: "Jul, 2025 - Present",
          DESCRIPTION: [
            "Developed ML and neural network models with TensorFlow and PyTorch; exported via ONNX for cross-platform use.",
            "Fine-tuned language models using LoRA for financial data analysis and trend prediction.",
            "Fine-tuned language models using Unsloth for understanding and trend prediction.",
            "Automated AI workflows and inference pipelines using n8n.",
            "Created FastAPI endpoints integrated with n8n in a hybrid setup for AI automation tasks.",
          ],
          TECH_STACK: ["Python", "TensorFlow", "PyTorch", "ONNX", "LoRA", "Unsloth", "n8n", "FastAPI", "Git & Github"],
        },
      ],
    },
    "Time Research and Innovation LTD": {
      WEBSITE: "https://timerni.com/",
      ROLES: [
        {
          POSITION: "AI & ML Research Intern",
          LOCATION: "Dhaka, Bangladesh",
          DURATION: "Jan, 2025 - Jun, 2025",
          DESCRIPTION: [
            "Contributed to the research and development of novel machine learning models, leading to a 10% improvement in predictive accuracy for internal datasets.",
            "Fine-tuned LLMs (Mistral-7B, LLAMA 3.1) using LoRA/QLoRA, PEFT, and Hugging Face.",
            "Developed RAG pipelines for NLP-based QA.",
            "Built preprocessing pipelines (SentenceTransformers) for Bangla-English bilingual text.",
            "Automated PDF parsing and OCR-based data extraction.",
            "Authored and maintained comprehensive documentation for experimental setups, data pipelines, and model architectures to ensure reproducibility and knowledge sharing within the team.",
            "Collaborated with senior researchers to analyze and interpret complex datasets, presenting key findings and insights during weekly team meetings.",
          ],
          TECH_STACK: ["Python", "Mistral-7B", "LLAMA 3.1", "LoRA", "QLoRA", "PEFT", "Hugging Face", "RAG", "NLP", "SentenceTransformers", "OCR"],
        },
      ],
    },
  },

  PROJECTS: [
    
    {
      ID: "bangla-rag",
      TITLE: "BanglaRAG - Retrieval-Augmented Generation",
      DESCRIPTION: "RAG pipeline combining FAISS vector search with Bangla document embeddings for accurate information retrieval.",
      LONG_DESCRIPTION: "Developed a RAG pipeline combining FAISS vector search with Bangla document embeddings. Implemented grounded answer generation for Bangla queries using retrieval-augmented LLMs, enhancing information retrieval accuracy for low-resource Bangla language processing.",
      FEATURES: [
        "FAISS-based vector search implementation",
        "Bangla document embedding generation",
        "Grounded answer generation for Bangla queries",
        "Enhanced accuracy for low-resource language",
        "Retrieval-augmented LLM integration"
      ],
      TECHNOLOGIES: ["Python", "FAISS", "RAG", "LLMs", "SentenceTransformers", "Bangla NLP"],
      CATEGORY: "AI/ML/DL",
      IMAGE: DubAIImage,
      GITHUB: "",
      DEMO: "",
      FEATURED: true
    },
    {
      ID: "medical-qa-llm",
      TITLE: "Medical Question-Answering with Generative LLMs",
      DESCRIPTION: "Generative language models for medical QA with hallucination mitigation and safety evaluation protocols.",
      LONG_DESCRIPTION: "Explored generative language models for medical question-answering systems. Implemented hallucination mitigation techniques and safety evaluation protocols. Developed responsible AI practices for healthcare domain applications.",
      FEATURES: [
        "Generative LLM implementation for medical QA",
        "Hallucination mitigation techniques",
        "Safety evaluation protocols",
        "Responsible AI practices for healthcare",
        "Medical domain-specific fine-tuning"
      ],
      TECHNOLOGIES: ["Python", "LLMs", "Medical NLP", "RAG", "Safety AI"],
      CATEGORY: "AI/ML/DL",
      IMAGE: CancerDetectionImage,
      GITHUB: "",
      DEMO: "",
      FEATURED: false
    },
    {
      ID: "transformer-qa",
      TITLE: "Transformer-Based Question-Answer System",
      DESCRIPTION: "Implementation of transformer-based neural networks for question-answering with fine-tuned pre-trained models.",
      LONG_DESCRIPTION: "Implemented transformer-based neural networks for question-answering tasks. Fine-tuned pre-trained models and evaluated performance on QA benchmarks. Conducted comparative analysis of different transformer architectures.",
      FEATURES: [
        "Transformer-based neural network implementation",
        "Pre-trained model fine-tuning",
        "QA benchmark evaluation",
        "Comparative architecture analysis",
        "Performance optimization"
      ],
      TECHNOLOGIES: ["Python", "Transformers", "BERT", "PyTorch", "Hugging Face"],
      CATEGORY: "AI/ML/DL",
      IMAGE: ShapeDrawerImage,
      GITHUB: "",
      DEMO: "",
      FEATURED: false
    },
    {
      ID: "agent-whisper",
      TITLE: "Agent Whisper App",
      DESCRIPTION: "Real estate agent platform with agentic matchmaking using n8n, Softr, and Airtable for intelligent listing management.",
      LONG_DESCRIPTION: "Built a real estate agent platform using Softr (frontend) and Airtable (backend) to manage listings and user data. Created agentic matchmaking in n8n to pair listings with buyer personas via rule-based filters. Integrated Softr and Airtable for real-time updates and user interactions. Implemented video generation from static images using n8n and FFmpeg, hosted on Google Cloud Platform (GCP).",
      FEATURES: [
        "Softr frontend with Airtable backend integration",
        "Agentic matchmaking using n8n automation",
        "Rule-based filtering for buyer-listing matching",
        "Video generation from static images with FFmpeg",
        "Real-time updates and user interactions",
        "Hosted on Google Cloud Platform"
      ],
      TECHNOLOGIES: ["n8n", "Softr", "Airtable", "FFmpeg", "GCP", "Automation"],
      CATEGORY: "AI/ML/DL",
      IMAGE: BusETicketImage,
      GITHUB: "",
      DEMO: "https://agent-whisper.softr.app/",
      FEATURED: true
    },
    {
      ID: "apply-job-agent",
      TITLE: "Apply Job Agent",
      DESCRIPTION: "ML-driven candidate screening platform using resume parsing, text embeddings, and vector databases for intelligent job matching.",
      LONG_DESCRIPTION: "Built an ML-driven backend for candidate screening using resume parsing and text embeddings for personalized job matching. Utilized PostgreSQL and SQLAlchemy for structured data handling and optimized match accuracy. Automated reporting workflows to enhance analytical efficiency and decision-making. Integrated vector databases to enable semantic search for improved candidate-job relevance. Designed an evaluation pipeline to measure model performance and continuously refine matching logic.",
      FEATURES: [
        "Resume parsing and text embedding generation",
        "PostgreSQL with SQLAlchemy for data management",
        "Vector database integration for semantic search",
        "Automated reporting workflows",
        "Evaluation pipeline for continuous improvement",
        "Personalized job matching algorithm"
      ],
      TECHNOLOGIES: ["Python", "PostgreSQL", "SQLAlchemy", "Vector Databases", "Text Embeddings", "ML"],
      CATEGORY: "AI/ML/DL",
      IMAGE: WeatherAppImage,
      GITHUB: "",
      DEMO: "https://aiapply.co/",
      FEATURED: true
    },
    {
      ID: "game-recommendation",
      TITLE: "Game Recommendation Engine",
      DESCRIPTION: "BERT-based game recommendation system using semantic embeddings and LDA topic modeling for personalized suggestions.",
      LONG_DESCRIPTION: "Leveraged BERT embeddings to convert game descriptions into rich semantic vectors. Applied Latent Dirichlet Allocation (LDA) on user reviews to uncover thematic topics. Combined embedding and topic vectors, then computed cosine similarity for recommendation scoring.",
      FEATURES: [
        "BERT embeddings for game descriptions",
        "LDA topic modeling on user reviews",
        "Semantic vector generation",
        "Cosine similarity-based scoring",
        "Personalized game recommendations"
      ],
      TECHNOLOGIES: ["Python", "BERT", "LDA", "Scikit-learn", "NLP", "Recommendation Systems"],
      CATEGORY: "AI/ML/DL",
      IMAGE: SignboardDetectionImage,
      GITHUB: "",
      DEMO: "https://github.com/itsShrizon/Game-Recommendation-Engine",
      FEATURED: false
    },
    {
      ID: "arxiv-assistant",
      TITLE: "Arxiv Research Assistant",
      DESCRIPTION: "LLM-powered paper search and analysis tool with vector similarity for intelligent academic research.",
      LONG_DESCRIPTION: "Developed APIs for paper retrieval, query relevance scoring, and LLM-driven insights. Applied vector similarity for intelligent search ranking and topic tracking. Implemented document processing automation for academic paper analysis.",
      FEATURES: [
        "Paper retrieval and search APIs",
        "Query relevance scoring",
        "LLM-driven research insights",
        "Vector similarity-based ranking",
        "Document processing automation",
        "Topic tracking and analysis"
      ],
      TECHNOLOGIES: ["Python", "LLMs", "Vector Databases", "APIs", "Document Processing"],
      CATEGORY: "AI/ML/DL",
      IMAGE: PickAndPlaceImage,
      GITHUB: "",
      DEMO: "https://github.com/itsShrizon/Arxiv-Research-Assistant",
      FEATURED: false
    }
  ],

  EDUCATION: {
    "BRAC University": {
      DEGREE: "Bachelor of Science in Computer Science",
      LOCATION: "Dhaka, Bangladesh",
      DURATION: "2020 - 2024",
      GRADE: "3.40 CGPA",
      ACHIEVEMENTS: [
        "Dean's List (2020)",
        "Academic Merit Scholarship (2021)",
      ],
      EXTRA_CURRICULARS: [
        "Senior Executive at BRAC University Computer Club",
        "Peer Reviewer: PLOS ONE Journal (Natural Language Processing papers)",
      ],
      SUPERVISOR: {
        NAME: "Dr. Farig Yousuf Sadeque",
        DESIGNATION: "Associate Professor, Department of Computer Science and Engineering",
        EMAIL: "farig.sadeque@bracu.ac.bd",
      },
    },
    "M.E.H Arif College": {
      DEGREE: "Higher Secondary Certificate (HSC) - Science Stream",
      LOCATION: "Gazipur, Bangladesh",
      DURATION: "2016 - 2018",
      GRADE: "4.58 GPA",
      ACHIEVEMENTS: [],
    },
    "Mouchak Scout High School": {
      DEGREE: "Secondary School Certificate (SSC)",
      LOCATION: "Gazipur, Bangladesh",
      DURATION: "2014 - 2016",
      GRADE: "5.00 GPA",
      ACHIEVEMENTS: [],
    },
  },

  RESEARCH: {
    "BanglaNewsClassifier: A machine learning approach for news classification in Bangla Newspapers": {
      STATUS: "Published in Q1 Journal",
      COLLABORATORS: ["Ar-Rafi Islam", "Md Humaion Kabir Mehedi", "Annajiat Alim Rasel", "M. Abdullah-AL-Wadud", "Jia Uddin"],
      DESCRIPTION:
        "Developed a high-accuracy Bangla news classification approach using hybrid models, achieving 94% accuracy with a BiLSTM-SVM stacking classifier on 118,404 articles, advancing low-resource language processing. Published in PLOS ONE, 2025.",
      LINK: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0314155",
      PUBLICATION: "PLOS ONE, 2025",
      DOI: "10.1371/journal.pone.0314155",
    },
    "Advancing legal accessibility in Bangladesh through AI-powered assistance and natural language interfaces": {
      STATUS: "Published - Undergraduate Thesis",
      COLLABORATORS: ["Md. Shakil Anawar", "Ar-Rafi Islam", "Md. Adnan Karim"],
      DESCRIPTION:
        "Created a legal question-answering system combining transformer-based retrieval, rule-based filtering, and human-in-the-loop feedback. It enabled structured access to Bangladeshi legal content via LLM-based answers and legal citation mapping.",
      LINK: "http://dspace.bracu.ac.bd/xmlui/handle/10361/22702",
      PUBLICATION: "BRAC University, 2024",
    },
  },

  "AWARDS & CERTIFICATIONS": {
    "Machine Learning with Tree-Based Models in Python": {
      TYPE: "certification" as const,
      DATE: "2024",
      LINK: "https://www.datacamp.com/statement-of-accomplishment/course/9bcfa0a28074c918b6d1dfd656faf7666c5b95d0?raw=1",
      DESCRIPTION:
        "Mastered decision trees and ensemble methods for classification and regression using scikit-learn. Learned bagging, random forests, AdaBoost, and Gradient Boosting. Gained expertise in hyperparameter tuning and addressing the bias-variance tradeoff in tree-based models.",
      FEATURED: true,
    },
    "Data Visualization in Tableau": {
      TYPE: "certification" as const,
      DATE: "2024",
      LINK: "https://www.datacamp.com/statement-of-accomplishment/course/c18e7c9410754f98660236ce59645395d38ec14b?raw=1",
      DESCRIPTION:
        "Developed advanced data visualization skills using Tableau, covering interactive dashboards, spatial visualizations, and custom charts including Waffle charts, DNA charts, and Sankey charts. Learned best practices for communicating insights effectively through visual storytelling.",
      FEATURED: false,
    },
    "Cluster Analysis in Python": {
      TYPE: "certification" as const,
      DATE: "2024",
      LINK: "https://www.datacamp.com/statement-of-accomplishment/course/e26c81f404aa0f83e5721945d35d33ab62c1346c?raw=1",
      DESCRIPTION:
        "Gained proficiency in unsupervised learning through clustering algorithms using SciPy. Covered hierarchical clustering, k-means clustering, data preprocessing, and visualization techniques. Applied clustering to real-world problems including image color analysis and news article grouping.",
      FEATURED: true,
    },
    "Cleaning Data in Python": {
      TYPE: "certification" as const,
      DATE: "2024",
      LINK: "https://www.datacamp.com/statement-of-accomplishment/course/13dfc1f456f3c0359da38a15ca8100555ee5cf16?raw=1",
      DESCRIPTION:
        "Mastered data cleaning techniques in Python, including handling improper data types, range constraints, missing data, duplicates, and text inconsistencies. Learned record linkage for merging datasets and ensuring data quality for accurate analysis.",
      FEATURED: false,
    },
    "Dean's List - BRAC University": {
      TYPE: "award" as const,
      DATE: "2020",
      DESCRIPTION:
        "Recognized on the Dean's List at BRAC University for outstanding academic performance in 2020.",
      FEATURED: true,
    },
    "Academic Merit Scholarship - BRAC University": {
      TYPE: "award" as const,
      DATE: "2021",
      DESCRIPTION:
        "Recipient of Academic Merit Scholarship at BRAC University for exceptional academic achievement in 2021.",
      FEATURED: true,
    },
  },

  SKILLS: {
    Languages: ["Bengali (Native)", "English (Fluent)", "Hindi (Conversational)"],
    "Programming Languages": ["Python", "JavaScript", "C++", "SQL"],
    "Machine Learning Frameworks": ["TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "LangGraph", "FastAPI"],
    "AI/ML Models": ["LLM Fine-tuning (LoRA, QLoRA, PEFT, Unsloth)", "Neural Networks", "RAG Pipelines", "Transformers"],
    Databases: ["MySQL", "PostgreSQL", "Qdrant", "FAISS", "Airtable"],
    "Web Technologies": ["FastAPI", "Django"],
    "Deployment & Scaling": ["Docker", "GCP (Google Cloud Platform)", "AWS"],
    "Tools & Libraries": ["Pandas", "Scikit-learn", "SQLAlchemy", "FAISS", "Git", "Linux", "Jupyter", "Hugging Face"],
    "Natural Language Processing": ["OCR", "Document Classification", "Text Parsing", "SentenceTransformers", "Bilingual Text Processing"],
    "Additional Technologies": ["n8n", "Softr", "ONNX", "FFmpeg"],
  },
};
