export type Project = {
  id: string
  name: string
  summary: string
  details: string[]
  stack: string[]
  code?: string
  demo?: string
  featured?: boolean
  status?: string
}
type Achievement = {
  meta: string
  title: string
  description: string
  links?: readonly AchievementLink[]
}
type AchievementLink = {
  label: string
  url: string
}

export const content = {
  navigation: [
    { id: "profile", label: "Profile" },
    { id: "missions", label: "Missions" },
    { id: "skills", label: "Skills" },
    { id: "intel", label: "Intel" },
    { id: "contact", label: "Contact" },
  ],
  profile: {
    role: "Computer Engineering Student · Interested in AI Safety, AI Research & Building Products",
    summary:
      "I'm drawn to AI safety and AI research, both conceptual and technical, and I'm keen to build useful products that put those ideas to work.",
    longSummary:
      "Computer Engineering student at Veermata Jijabai Technological Institute interested in AI, machine learning, large language models and full-stack development. I'm interested in AI safety and AI research, from the conceptual questions to the technical work, and I'm keen to build useful products. I compete in hackathons to learn by doing. I am seeking opportunities in AI research and software engineering.",
    status: "Open to research and engineering opportunities",
  },
  profileDetails: [
    { label: "Current post", value: "B.Tech, Computer Engineering" },
    { label: "Institution", value: "VJTI Mumbai · 2024–2028" },
    { label: "Base of operations", value: "Mumbai, India" },
    {
      label: "Primary focus",
      value: "AI Safety, AI/ML, AI Research, Software Engineering",
    },
  ],
  facts: [
    { value: "432", label: "controlled AI safety experiments" },
    { value: "6", label: "featured missions documented" },
    { value: "v1", label: "Kaggle ICR dataset released" },
  ],
  projects: [
    {
      id: "A-01",
      name: "AEGIS",
      summary: "An autonomous CI/CD self-healing dashboard.",
      details: [
        "Monitors GitHub pipelines and analyzes failed builds.",
        "Finds root causes and opens pull requests with fixes.",
      ],
      stack: ["React", "Flask", "PostgreSQL", "LLMs"],
      code: "https://github.com/manasa1864/AEGIS",
      featured: true,
      status: "IN DEVELOPMENT",
    },
    {
      id: "W-02",
      name: "WHY Engine",
      summary: "An AI coding coach built for the Global Fusion hackathon.",
      details: [
        "Runs code, explains errors and identifies thinking patterns.",
        "Turns those signals into personalized learning insights.",
      ],
      stack: ["React", "Node.js", "Judge0", "Supabase", "LLMs"],
      code: "https://github.com/manasa1864/why-engine",
      featured: true,
      status: "IN DEVELOPMENT",
    },
    {
      id: "L-03",
      name: "LectureLeaf",
      summary: "An AI lecture processor that turns video into a study library.",
      details: [
        "Extracts key frames and speech from lecture videos.",
        "Generates structured notes, PDFs and quizzes.",
      ],
      stack: [
        "React",
        "TypeScript",
        "FastAPI",
        "OpenCV",
        "Whisper",
        "Supabase",
      ],
      code: "https://github.com/manasa1864/lectureleaf",
      featured: true,
      status: "IN DEVELOPMENT",
    },
    {
      id: "M-04",
      name: "Maison",
      summary: "A connected restaurant system built for Vibeathon 2026.",
      details: [
        "Pairs a guest app with a staff dashboard.",
        "Synchronizes orders, reservations, inventory and alerts.",
      ],
      stack: ["React", "TypeScript", "Supabase"],
      code: "https://github.com/ishita-punjani/MAISON",
      featured: true,
    },
    {
      id: "S-05",
      name: "Secret Loyalties",
      summary:
        "AI safety research into hidden loyalties in multi-agent LLM pipelines.",
      details: [
        "Ran 432 controlled experiments across architectures.",
        "Produced a reproducible evaluation of behavior.",
      ],
      stack: ["Python", "LLM Evaluation", "AI Safety"],
      code: "https://github.com/manasa1864/secret-loyalties",
      featured: true,
    },
    {
      id: "I-06",
      name: "INSURANCE",
      summary:
        "A TypeScript project exploring clearer digital insurance workflows.",
      details: [
        "Structures the experience around accessible, typed interfaces.",
        "Documentation and product scope are in progress.",
      ],
      stack: ["Python", "FastAPI", "React.js", "TypeScript"],
      code: "https://github.com/manasa1864/INSURANCE",
      featured: true,
    },
  ] satisfies Project[],
  operations: [
    "Secret Loyalties Hackathon",
    "Vibeathon 2026",
    "Global Fusion · AI + EdTech",
  ],
  skills: {
    Languages: ["Python", "C++", "JavaScript", "TypeScript"],
    "AI & ML": [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "LLMs",
      "Generative AI",
    ],
    Frameworks: [
      "React",
      "Node.js",
      "FastAPI",
      "Flask",
      "OpenCV",
      "Whisper",
      "Judge0",
    ],
    "Web & Backend": ["HTML", "CSS", "Tailwind CSS", "REST APIs"],
    "Data & Cloud": ["PostgreSQL", "MongoDB", "MariaDB", "Supabase"],
    Tools: ["Git", "GitHub", "VS Code", "Linux / WSL"],
    Coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Compiler Construction",
      "Image Processing",
    ],
  },
  achievements: [
    {
      meta: "AParT Research · 2026",
      title: "Secret Loyalties Hackathon",
      description:
        "Authored an AI safety paper backed by 432 controlled experiments.",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/manasa1864/secret-loyalties",
        },
      ],
    },
    {
      meta: "Vibeathon · 2026",
      title: "Maison",
      description: "Built a live-synced restaurant app and staff dashboard.",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/ishita-punjani/MAISON",
        },
      ],
    },
    {
      meta: "Kaggle · Version 1",
      title: "Instruction Conflict Resolution",
      description:
        "Released an ICR DPO dataset for LLM alignment and preference optimization.",
    },
    {
      meta: "Forage · Completed",
      title: "Software Engineering Virtual Experiences",
      description:
        "Completed programs from JPMorgan Chase and Commonwealth Bank.",
    },
  ] satisfies Achievement[],
  education: [
    {
      years: "2024–Present",
      degree: "B.Tech, Computer Engineering",
      school: "VJTI, Mumbai",
    },
    {
      years: "2022–2024",
      degree: "HSC, Science",
      school: "PACE Junior Science College, Mumbai",
    },
    {
      years: "2012–2022",
      degree: "SSC",
      school: "Smt. Lilavatibai Podar High School, Mumbai",
    },
  ],
  contact: {
    email: "manasagopisetty4@gmail.com",
    github: "https://github.com/manasa1864",
    linkedin: "https://linkedin.com/in/manasa-gopisetty-8b8588371",
    openTo: [
      {
        title: "AI safety & research",
        description: "Conceptual and technical work on making AI systems safer.",
      },
      {
        title: "Learning to build products",
        description: "Teams and projects where I can help build useful AI-powered apps.",
      },
      {
        title: "Software engineering",
        description: "Full-stack and ML engineering opportunities.",
      },
      {
        title: "Open-source collaboration",
        description: "Thoughtful projects where I can learn and contribute.",
      },
    ],
  },
} as const
