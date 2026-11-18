export type Metric = { value: string; label: string }
export type Highlight = { title: string; text: string }
export type Link = { label: string; url: string }
export type Section = {
  eyebrow: string
  title: string
  intro?: string
  items: string[]
}
const base = import.meta.env.BASE_URL

export type Project = {
  id: string
  slug: string
  name: string
  summary: string
  details: string[]
  stack: string[]
  code?: string
  demo?: string
  featured?: boolean
  status?: string
  event?: string
  role?: string
  overview: string[]
  highlights: Highlight[]
  flow?: string[]
  results?: Metric[]
  sections?: Section[]
  quote?: { text: string; by: string }
  notes?: string[]
  documents?: Link[]
  links?: Link[]
}
type Achievement = {
  meta: string
  title: string
  description: string
  slug?: string
  links?: readonly Link[]
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
      "Computer Engineering student at Veermata Jijabai Technological Institute with a research interest in AI safety and multimodal foundation models. I like turning research questions into rigorous experiments and open-source tools, and I'm keen to build useful full-stack products. I compete in hackathons to learn by doing. I am seeking opportunities in AI research and software engineering.",
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
  projects: [
    {
      id: "A-01",
      slug: "aegis",
      name: "AEGIS",
      summary: "An autonomous CI/CD self-healing dashboard.",
      details: [
        "Diagnoses failed GitHub Actions and GitLab CI runs.",
        "Opens fix pull requests and verifies each fix on CI.",
      ],
      stack: ["React", "Flask", "PostgreSQL", "LLMs"],
      code: "https://github.com/manasa1864/AEGIS",
      featured: true,
      status: "IN DEVELOPMENT",
      overview: [
        "AEGIS watches your GitHub Actions and GitLab CI pipelines, diagnoses a failure the moment it happens, fixes the CI config and the code in the repository, and opens a pull request without anyone touching it.",
        "It does not jump straight to an AI model. It tries cheap, deterministic strategies first and only then asks an LLM, and it verifies every fix by polling CI on the new branch before calling it a success.",
      ],
      highlights: [
        {
          title: "Repair-only fixes",
          text: "A fix PR contains only the changes that repair the failure. A guard rejects any edit that makes CI green by switching a check off, and drops bundled best-practice edits.",
        },
        {
          title: "AI is a late step, not the first",
          text: "Known fixes, rules, flaky-job re-runs and the repo's own auto-fixers come first. Without any AI key, all of those strategies still run.",
        },
        {
          title: "Human in the loop",
          text: "When confidence in a fix is below 65%, AEGIS pauses and shows an approval modal to the operator instead of acting.",
        },
        {
          title: "Learns from history",
          text: "It records mean time to repair and saves a failure embedding so future failures can be matched against similar past ones.",
        },
      ],
      flow: [
        "Detect the failed workflow run and fetch the logs of every failed job plus the failing workflow files.",
        "Classify the error from the logs into one of 116 categories, ranked by confidence.",
        "Climb the healing ladder: known fix, deterministic rules, flaky re-run, the repo's own auto-fixers, then AI (Groq and Gemini), then revert to the last green build.",
        "Run the repair-only guard and safety validation, including a check that the fix still parses as valid YAML.",
        "Create a fix branch, commit, and open the pull request or merge request.",
        "Poll CI on the fix branch. If it is still red, run a deeper pass or escalate to revert-to-last-green.",
      ],
      results: [
        { value: "116", label: "error categories classified" },
        { value: "~1,000", label: "deterministic fix rules" },
        { value: "6", label: "healing strategies in the ladder" },
        { value: "146", label: "scenarios in the fix catalog" },
      ],
      sections: [
        {
          eyebrow: "Dashboard",
          title: "What you see while it heals",
          items: [
            "Three tabs: HEALING (your repositories and their CI health), HISTORY (every past heal with root cause, fix steps, alternatives and a generated postmortem) and INTELLIGENCE (success rate, mean time to recover, average AI confidence).",
            "A live pipeline stepper: DETECT, ANALYZE, DIAGNOSE, FIX, VALIDATE, COMMIT, PR, VERIFY, each marked active, done, failed or skipped with elapsed time.",
            "One row per changed file with its source (rule, AI, static or deep pass), its status, and an expandable unified diff.",
            "The real reason a run halted, instead of a generic error.",
            "Safe mode proposes fixes without committing anything, and auto-heal can start a heal when a repository's CI turns red while the dashboard is open.",
          ],
        },
        {
          eyebrow: "Safety model",
          title: "Guarding other people's repositories",
          items: [
            "Every fix is validated for path traversal, dangerous shell patterns, invalid JSON, tab-indented YAML and YAML that no longer parses.",
            "Fixes only ever land on a new aegis/fix-<timestamp> branch as a pull request or merge request. AEGIS never pushes to the default branch.",
            "A masking guard rejects edits that only silence a check, such as continue-on-error, || true, a lowered coverage threshold or --passWithNoTests.",
            "Repository content and CI logs are treated as untrusted input, and known prompt-injection phrasings are stripped before text reaches an AI model.",
            "Rules are applied one at a time, and a rule whose edit would break valid YAML is discarded on its own while the others still apply.",
          ],
        },
        {
          eyebrow: "Scope",
          title: "What it covers",
          items: [
            "GitHub Actions and GitLab CI, including self-hosted GitLab. Monorepos are handled by mapping paths relative to each job's working directory.",
            "Security gates: npm audit and pip-audit failures upgrade each vulnerable direct dependency to its first patched release.",
            "A fix catalog of 146 scenarios across the 116 categories, where every diff is real engine output.",
            "Not supported: Bitbucket Pipelines, CircleCI, Jenkins and GitHub Enterprise Server.",
          ],
        },
      ],
      notes: [
        "The AI providers can still produce fixes that are structurally safe but semantically wrong, so AEGIS pull requests should be reviewed like any other contributor's.",
      ],
      links: [
        { label: "GitHub repository", url: "https://github.com/manasa1864/AEGIS" },
      ],
    },
    {
      id: "W-02",
      slug: "why-engine",
      name: "WHY Engine",
      summary: "An AI coding coach built for the Global Fusion hackathon.",
      details: [
        "Runs code in 9 languages and explains the thinking mistake behind errors.",
        "Feeds a per-user cognitive profile dashboard.",
      ],
      stack: ["React", "Node.js", "Judge0", "Supabase", "Groq", "LLMs"],
      code: "https://github.com/manasa1864/why-engine",
      featured: true,
      status: "IN DEVELOPMENT",
      event: "Global Fusion · AI + EdTech hackathon",
      overview: [
        "Most debuggers tell you what broke. WHY Engine tries to tell you why you thought it was correct, by tracing an error back to the thinking pattern behind it.",
        "It combines a code editor, sandboxed execution, static analysis and an LLM, and turns every run into a personal cognitive profile that tracks blind spots and improvement over time.",
      ],
      highlights: [
        {
          title: "Nine languages, sandboxed",
          text: "Python, JavaScript, TypeScript, C++, C, Java, Go, Rust and Ruby run through Judge0, so code never executes on the app server.",
        },
        {
          title: "A 15-step analysis pipeline",
          text: "AST analysis, generated tests, and a comparison against the user's own plan written before coding, feeding an explanation of the thinking mistake.",
        },
        {
          title: "Resilient AI layer",
          text: "A four-model LLM fallback chain, so a failing provider does not stop the analysis.",
        },
        {
          title: "Cognitive profile dashboard",
          text: "Per-user charts for error patterns, strengths and a weekly timeline, with tailored suggestions.",
        },
      ],
      flow: [
        "Write code in the Monaco editor, together with a short plan for how you intend to solve it.",
        "Run it in the Judge0 sandbox and capture the output and errors.",
        "Run the analysis pipeline: static analysis, generated tests, plan comparison and LLM reasoning.",
        "Receive an explanation of the thinking mistake, not just the error message.",
        "Update the personal profile and dashboard stored in Supabase.",
      ],
      results: [
        { value: "9", label: "languages supported" },
        { value: "15", label: "analysis pipeline steps" },
        { value: "4", label: "LLM models in the fallback chain" },
      ],
      notes: ["Built with a team for the Global Fusion hackathon (AI + EdTech)."],
      sections: [
        {
          eyebrow: "Workspace",
          title: "Think first, then code",
          items: [
            "A pre-coding thinking panel asks for the problem statement, your approach, the edge cases you are aware of and the expected complexity. That snapshot is later compared with what you actually wrote.",
            "A Monaco editor with syntax highlighting for all nine languages, language auto-detection on paste, starter templates and configurable editor settings.",
            "An integrated terminal that takes stdin before a run, keeps command history, and shows stdout, stderr, status, time and memory from Judge0.",
          ],
        },
        {
          eyebrow: "Analysis report",
          title: "Ten sections for every analysis",
          items: [
            "Mistake summary, why it is wrong, a reconstruction of your thought process, and the root cause.",
            "Failing cases that expose the bug, and a line-by-line walkthrough.",
            "The correct logic, correct code, and an optimized version with time and space complexity.",
            "A mental model for this class of problems, plus a confidence score, three-level progressive hints and a comparison with your previous attempts.",
          ],
        },
        {
          eyebrow: "Dashboard and profile",
          title: "A map of how you think",
          items: [
            "Error distribution, accuracy over time and a weekly cognitive timeline for edge cases, logic, optimization and overall score.",
            "A skill web across six dimensions, a strength and weakness map, and a failure heatmap.",
            "Recurring thinking patterns and personalised drills generated from your own error history, not generic advice.",
          ],
        },
        {
          eyebrow: "Under the hood",
          title: "How it is built",
          items: [
            "React with React Router, Recharts for the dashboards, and Node.js with Express on the backend.",
            "Supabase for storage and JWT with bcrypt for authentication, protected by Helmet, CORS, rate limiting and input sanitisation.",
            "Acorn-based AST analysis for JavaScript and pattern analysis for Python, C++ and Java.",
            "A Groq model fallback chain: llama-3.3-70b-versatile, then llama3-70b-8192, llama-3.1-8b-instant and llama3-8b-8192.",
          ],
        },
      ],
      links: [
        { label: "GitHub repository", url: "https://github.com/manasa1864/why-engine" },
      ],
    },
    {
      id: "L-03",
      slug: "lectureleaf",
      name: "LectureLeaf",
      summary: "An AI lecture processor that turns video into a study library.",
      details: [
        "Turns a lecture video into a structured PDF with slides and notes.",
        "Generates quizzes, with an AI invigilator in strict mode.",
      ],
      stack: [
        "React",
        "TypeScript",
        "FastAPI",
        "OpenCV",
        "OCR",
        "Whisper",
        "Supabase",
      ],
      code: "https://github.com/manasa1864/lectureleaf",
      demo: "https://lectureleaf.vercel.app",
      featured: true,
      status: "IN DEVELOPMENT",
      overview: [
        "Paste a lecture link or upload a video and LectureLeaf watches it for you. It picks out the slides, diagrams and board work worth keeping, writes headings and key points from what the lecturer says, and builds a clean PDF.",
        "Everything you process is saved to a personal library where notes can be edited by hand, and any saved lecture can become a quiz built from the lecture and your own notes.",
      ],
      highlights: [
        {
          title: "Smart frame picking",
          text: "OpenCV and OCR keep the sharpest, most complete frame of each slide, merge repeats, and ignore a presenter on camera.",
        },
        {
          title: "Four PDF styles",
          text: "Minimal, Lecture Notes, Revision Sheet and Cornell-style, in A4, Letter or A5.",
        },
        {
          title: "Editable library",
          text: "Rename, edit headings, key points and personal notes, switch pages on or off, and rebuild the PDF with your edits.",
        },
        {
          title: "Quizzes with a strict mode",
          text: "MCQ, MSQ, fill in the blanks, short and long answers and numericals. In strict mode you write your own marking rules and an AI invigilator marks your answers against them.",
        },
      ],
      flow: [
        "Submit a YouTube link or upload a video file.",
        "Extract speech with Whisper and pick key frames with OpenCV and OCR.",
        "Write headings and key points for each page and build the PDF.",
        "Save to the library, where notes can be edited and the PDF rebuilt.",
        "Generate a timed quiz from the lecture and your own notes.",
      ],
      sections: [
        {
          eyebrow: "Pipeline",
          title: "From video to notes",
          items: [
            "yt-dlp downloads the picture and the audio separately.",
            "Frames are sampled and always-moving regions, like a presenter, are ignored. Frames are grouped into segments of the same content, and the best frame in each is chosen: sharp, settled and with the most text by OCR. Duplicates are merged by look and by text.",
            "Speech becomes a transcript with Groq Whisper, or offline faster-whisper.",
            "An AI model writes headings, key points and a summary, or plain extractive notes if no AI is available. ReportLab builds the PDF and images are stored privately in Supabase.",
          ],
        },
        {
          eyebrow: "Reliability",
          title: "Fallbacks at every step",
          items: [
            "Anything that needs a model tries Groq first, then OpenRouter, then offline fallbacks that are always available.",
            "Speech to text falls back from Groq Whisper to faster-whisper on the CPU, which also translates Hindi-English and other languages to English.",
            "Photos of notes are read by Gemini, then an OpenRouter vision model, then built-in OCR, and you can always correct the text before a quiz is written.",
          ],
        },
        {
          eyebrow: "Quizzes",
          title: "Marked in code where it can be",
          items: [
            "MCQ, MSQ (partial credit, wrong picks cancel right ones), fill in the blanks and numericals are marked exactly in code. Numerical answers are checked with real arithmetic, so 2^10 and 1,024 both work.",
            "A numerical answered with full working earns 60% of the marks for the method and 40% for the final answer.",
            "Short and long answers are marked by the AI against a rubric written when the question was created.",
            "Quizzes have a timer that auto-submits, a question navigator and progress that survives a refresh. Results show what to revise by lecture page, and you can practise just what you missed.",
          ],
        },
      ],
      notes: [
        "The demo runs on free hosting, so the first request after a quiet spell can take about a minute.",
        "YouTube often blocks downloads from cloud servers. If a link fails, use the video upload option instead; everything else works the same.",
        "Frame picking works best on slide, screen and whiteboard lectures; a talking-head video produces few useful frames. The project has no automated test suite yet.",
      ],
      links: [
        { label: "Live demo", url: "https://lectureleaf.vercel.app" },
        { label: "Demo video", url: "https://vimeo.com/1232775707" },
        {
          label: "GitHub repository",
          url: "https://github.com/manasa1864/lectureleaf",
        },
      ],
    },
    {
      id: "H-04",
      slug: "building-energy-review",
      name: "Building Energy Estimate Review",
      summary:
        "My Hash Engineering Fellowship project, and the work behind the Outstanding Fellow award.",
      details: [
        "Compared regression models and checked whether an input was covered by the data.",
        "Recognised as Outstanding Applied AI & Data Fellow, Cohort 1.",
      ],
      stack: [
        "Regression",
        "Cross-validation",
        "Error analysis",
        "Out-of-distribution checks",
      ],
      featured: true,
      event: "Hash Engineering Fellowship · Applied AI & Data, Cohort 1 (2026)",
      overview: [
        "An eight-week applied machine learning fellowship run by Hash Engineering. The project was a regression workflow for estimating building energy use, built so that its result could be reviewed and trusted, not just produced.",
        "I compared regression models, examined errors across building characteristics, and built an input-coverage check that separates inputs the data supports from cases outside the available evidence.",
      ],
      highlights: [
        {
          title: "Evaluation done carefully",
          text: "Preprocessing is kept inside cross-validation, and fitting is separated from calibrating the coverage check, so the reliability label does not reuse the evidence used to judge it.",
        },
        {
          title: "Slice analysis",
          text: "Errors were examined across building characteristics, with a clear distinction between supported and unsupported inputs.",
        },
        {
          title: "Peer review",
          text: "Reviewing another fellow's classifier, I found duplicate overlap across train and test partitions and challenged tests that did not exercise the behaviour they claimed to verify.",
        },
        {
          title: "A reviewable handoff",
          text: "I corrected reproduction commands, tied CI statements to specific evidence, and delivered a recorded demonstration and a published release.",
        },
      ],
      quote: {
        text: "She examined whether a result deserved to be trusted, not only whether a pipeline produced it.",
        by: "Evan William, Founder and Program Lead, Hash Engineering",
      },
      notes: [
        "The final package states its own limits: the dataset is simulated, and there is no automated interface test coverage.",
        "The recognition below was issued on 23 October 2026.",
      ],
      documents: [
        {
          label: "Certificate of Completion",
          url: `${base}documents/hash/certificate-of-completion.pdf`,
        },
        {
          label: "Certificate of Distinction: Outstanding Applied AI & Data Fellow",
          url: `${base}documents/hash/certificate-of-distinction.pdf`,
        },
        {
          label: "Letter of Recommendation",
          url: `${base}documents/hash/letter-of-recommendation.pdf`,
        },
        {
          label: "Outstanding Fellow Recommendation",
          url: `${base}documents/hash/outstanding-fellow-recommendation.pdf`,
        },
      ],
    },
    {
      id: "P-05",
      slug: "prism-ai",
      name: "Prism AI",
      summary:
        "A chatbot designed to prevent hallucinations by routing and checking.",
      details: [
        "Profiles each question for hallucination risk and routes it to a verification tier.",
        "Stops instead of guessing when it cannot verify.",
      ],
      stack: ["React", "TypeScript", "FastAPI", "Neo4j", "LLMs"],
      code: "https://github.com/manasa1864/META_CV",
      featured: true,
      event: "Meta Cerebral Valley Hackathon 2026",
      overview: [
        "Prism AI is an adaptive chatbot that tries to prevent hallucinations by design instead of cleaning them up afterwards. Each question gets a profile of the hallucinations it is at risk of, and is routed to the tier that can verify those risks.",
        "Nothing is said until it has been checked, and the system stops rather than guessing when it cannot verify.",
      ],
      highlights: [
        {
          title: "Risk profile per question",
          text: "Every query is assessed for the kinds of hallucination it is likely to trigger before any answer is written.",
        },
        {
          title: "Learned router",
          text: "Every outcome is logged, so the router learns which verification tier works for which kind of question.",
        },
        {
          title: "See the thinking",
          text: "The interface streams every check live, then shows the answer with its evidence.",
        },
        {
          title: "Review page",
          text: "Facts confirmed outside the graph, quarantined graph writes and proposed relation rules wait for a person to accept or reject them.",
        },
      ],
      flow: [
        "Build a hallucination-risk profile for the question.",
        "Route it to the verification tier that can check those risks.",
        "Verify against the graph and tools; calculations are machine-checked.",
        "Answer with evidence, or stop and say it cannot verify.",
        "Log the outcome so the router improves.",
      ],
      results: [
        { value: "0", label: "fabrications over ten benchmark runs" },
        { value: "20/20", label: "machine-checked calculations" },
      ],
      notes: [
        "Benchmarks were run on Meta muse-spark-1.3. The repository includes a final report with the full results, pros and cons, and a comparison with a plain model and typical RAG.",
      ],
      sections: [
        {
          eyebrow: "Tiers",
          title: "A tier built for each kind of risk",
          items: [
            "Factual tier: checks its knowledge graph first, then Wikidata, Wikipedia and the web.",
            "Reasoning ladder: from relaxed to strict, with every step checked. A one-step sum used 68% fewer tokens than fixed checking.",
            "Consistency tier: follow-up questions are rewritten and earlier answers are kept, so context is not lost.",
            "Explain tier: open-ended answers, with any calculations machine-checked.",
          ],
        },
        {
          eyebrow: "Safety",
          title: "Checked, not obeyed",
          items: [
            "Stored knowledge is cross-checked instead of trusted, so a wrong fact planted in its own knowledge base is corrected or declined.",
            "No injected instruction reached an answer in any version, including held-out attacks (25/25 as specified).",
            "A write gate, source trust, redaction and abuse limits protect the system, with 10/10 abuse controls passing.",
            "Repeated and similar questions are reused, which saved 51% of tokens.",
          ],
        },
        {
          eyebrow: "Trade-offs",
          title: "What the guarantee costs",
          items: [
            "The design delivers a guarantee, that nothing unverified is presented as fact, not higher accuracy.",
            "It was correct on 73 of 83 against 82 for a plain model (v8), mainly because it declines when it cannot verify.",
            "It uses about 14,000 to 29,000 tokens per answer against roughly 500 to 2,400 for the baselines, and is about eight times slower.",
            "Measured on small author-written sets, one run each, on a strong base model. It matters most where a confident wrong answer is costly.",
          ],
        },
      ],
      links: [
        { label: "GitHub repository", url: "https://github.com/manasa1864/META_CV" },
      ],
    },
    {
      id: "S-06",
      slug: "secret-loyalties",
      name: "Secret Loyalties",
      summary:
        "AI safety research into hidden loyalties in multi-agent LLM pipelines.",
      details: [
        "Tests whether a hidden loyalty spreads to a clean downstream model.",
        "432 controlled experiments with a matched control and a statistical test.",
      ],
      stack: ["Python", "LLM Evaluation", "AI Safety"],
      code: "https://github.com/manasa1864/secret-loyalties",
      featured: true,
      event: "AParT Research · Secret Loyalties Hackathon 2026",
      overview: [
        "A secret loyalty is installed in one model (Model A) through its system prompt alone: it subtly favours a fictional vendor and denies doing so. Its output is then handed to a completely clean second model (Model B) in an ordinary agent-to-agent pipeline.",
        "The question: does Model B's own, independent output inherit the bias even though it was never told about the vendor? If so, auditing a single model in a pipeline is not enough, because a hidden loyalty can launder itself through models that are themselves clean.",
      ],
      highlights: [
        {
          title: "Matched control",
          text: "Each trial runs with a loyalty to one fictional vendor and to an interchangeable second one, so a name-specific artifact shows up in the gap.",
        },
        {
          title: "Chance-level baseline",
          text: "Baseline conditions run the identical task with no loyalty instruction. The real effect is the loyal rate minus the baseline rate for the same vendor name.",
        },
        {
          title: "Cross-architecture pairings",
          text: "Loyalty is tested across different model families, such as Groq to Mistral, not two copies of one model.",
        },
        {
          title: "Neutral judge and a manipulation check",
          text: "An LLM judge from a third family scores each trial, and a check confirms Model A really did favour its principal more than the baseline.",
        },
      ],
      flow: [
        "Give Model A a hidden loyalty through its system prompt.",
        "Hand A's output to a clean Model B as an ordinary task.",
        "Score B's independent output with a judge from a third model family.",
        "Compare loyal, control and baseline conditions with a chi-square test.",
      ],
      results: [{ value: "432", label: "controlled experiments" }],
      sections: [
        {
          eyebrow: "Design",
          title: "Four conditions, three hand-offs",
          items: [
            "Treatment: Model A secretly favours the vendor Meridian. Control: it favours the equivalent vendor Aurora.",
            "Two baselines run the identical task with no loyalty instruction, one for each vendor name.",
            "Three hand-off types: summarize then recommend, draft then edit, and answer then synthesize.",
            "Pairings x 3 hand-offs x 8 topics x 4 conditions, with a default run of 288 trials and a resumable runner.",
          ],
        },
        {
          eyebrow: "Why it matters",
          title: "The audit boundary",
          items: [
            "Auditing usually assumes you inspect the compromised model. Real deployments chain models, so the audit boundary may need to be every model in the pipeline.",
            "Both models' full raw text is saved for every trial, so results can be spot-checked by hand.",
          ],
        },
      ],
      links: [
        {
          label: "Paper (PDF)",
          url: "https://github.com/manasa1864/secret-loyalties/blob/HEAD/secret_loyalties_apart.pdf",
        },
        {
          label: "GitHub repository",
          url: "https://github.com/manasa1864/secret-loyalties",
        },
      ],
    },
    {
      id: "C-07",
      slug: "ai-cartel-sting",
      name: "AI Cartel Sting",
      summary: "A multi-agent AI safety study of LLM supplier cartels.",
      details: [
        "Built an undercover mole, leniency offer and message monitor.",
        "Ran 80 games on two open-weight models.",
      ],
      stack: ["Python", "Multi-Agent Systems", "LLM Evaluation", "Statistics"],
      code: "https://github.com/manasa1864/apart_collusion",
      featured: true,
      event: "Apart Research · AI Collusion Research Sprint 2026",
      role: "Independent author",
      overview: [
        "Five LLM suppliers of an essential medicine can quietly restrict supply and cause a shortage. This project runs a sting on them: a scripted undercover mole offers a pact, a regulator offers leniency to the first to report, and a monitor reads a share of the messages.",
        "It measures whether AI cartels have loyalty (who keeps the pact, who snitches, who leaks secrets) and what breaks them: leniency, surveillance, or being told they are watched.",
      ],
      highlights: [
        {
          title: "A designed sting",
          text: "Undercover mole, leniency for the first reporter and a partial message monitor, all in a controlled environment.",
        },
        {
          title: "Real episodes",
          text: "80 episodes across four conditions, ten seeds and two open-weight models, 12 rounds each. All 1,394 agent messages were labelled by an LLM judge.",
        },
        {
          title: "Honest statistics",
          text: "Effects are reported with 95% confidence intervals, and the report marks several hypotheses as not significant or inconclusive.",
        },
      ],
      results: [
        { value: "20/20", label: "games where a cartel formed" },
        { value: "18/20", label: "games where leniency triggered a report" },
        { value: "HR 2.5", label: "pooled contagion, a Simpson’s paradox" },
        { value: "80", label: "real episodes run" },
      ],
      notes: [
        "This is a reduced design that fit a free-tier API budget: two models, four conditions and ten seeds each, so differences between conditions have wide intervals.",
        "The message labels come from an LLM judge that was not validated against human labels.",
      ],
      sections: [
        {
          eyebrow: "Findings",
          title: "What the data supports",
          items: [
            "Manipulation check supported: when told to collude, agents collude far more (estimate 2.29, 95% CI 1.90 to 2.71).",
            "Contagion supported: after one agent deviates, the hazard of another first deviating rises (2.48, CI 1.62 to 3.60). The pooled estimate was a Simpson's paradox.",
            "Not significant: more message reading did not change leniency reports, and telling agents they are monitored did not change compliance.",
            "Not supported: loyalty is not one trait, with the first component explaining only 51% of the variance.",
            "Only 2 of the 7 tested hypotheses are supported after Holm correction; the rest are null or exploratory.",
          ],
        },
        {
          eyebrow: "Reproducibility",
          title: "Built to be re-run",
          items: [
            "A resumable runner with budgets, rate limits and API key fallbacks, with a reduced design preset that fits a free-tier budget.",
            "Raw episodes and judge labels are committed, with unit tests, and a keyword-only analysis is included for comparison with the judge-based one.",
            "An optional script lets a person hand-label a sample of messages to validate the judge.",
          ],
        },
      ],
      links: [
        {
          label: "Report (PDF)",
          url: "https://github.com/manasa1864/apart_collusion/blob/HEAD/Omert%60a_Collusion_Apart.pdf",
        },
        {
          label: "GitHub repository",
          url: "https://github.com/manasa1864/apart_collusion",
        },
      ],
    },
    {
      id: "T-08",
      slug: "minimal-by-training",
      name: "Minimal by Training",
      summary:
        "Can fine-tuning alone stop a tool-calling agent from over-sharing personal data?",
      details: [
        "LoRA fine-tuned Tiny Aya Global (3.35B) on 600 minimal tool-call demos.",
        "Cut personal-data leaks from 24.5% to 3.0%.",
      ],
      stack: ["Python", "LoRA", "Fine-tuning", "LLM Evaluation", "AI Safety"],
      code: "https://github.com/manasa1864/data-minimizing-agent",
      featured: true,
      event: "Lexsi AI Safety & Alignment Hackathon 2026 · Track 3",
      overview: [
        "An agent handed a user profile often copies more of it into a tool call than the task needs: a delivery check that also gets a phone number, a bill payment that also gets an email address.",
        "This project asks whether the style of fine-tuning demonstrations decides if an agent over-shares, and whether fine-tuning alone can fix it. A leak is any personal field in a tool call that the tool does not need for the request.",
      ],
      highlights: [
        {
          title: "Four controlled arms",
          text: "The untouched base model, the base model with a privacy rule in the prompt, a model fine-tuned on over-sharing calls, and one fine-tuned on minimal calls.",
        },
        {
          title: "Tested in and out of distribution",
          text: "200 tasks with unseen phrasing of the trained tools, and 100 tasks on two tools never seen in training.",
        },
        {
          title: "A prompt-only rule backfired",
          text: "Adding a privacy rule to the prompt lowered clean success and raised leaks, which is why the fine-tune matters.",
        },
      ],
      results: [
        { value: "24.5% → 3.0%", label: "personal-data leaks" },
        { value: "67.0% → 90.5%", label: "clean success (in distribution)" },
        { value: "600", label: "minimal tool-call demonstrations" },
        { value: "3.35B", label: "parameters, fine-tuned with LoRA" },
      ],
      notes: [
        "On held-out tools clean success rose by 16 points, but the drop in leak rate was not statistically significant. The remaining leaks were mostly the model calling a familiar tool instead of the new one.",
        "One run per arm; intervals are paired bootstrap confidence intervals.",
      ],
      sections: [
        {
          eyebrow: "The four arms",
          title: "Clean success and leak rate, in distribution",
          items: [
            "A. Base model, untouched: 67.0% clean success, 24.5% leaks.",
            "B. Base model with a privacy rule in the prompt: 49.5% clean success, 42.5% leaks. The rule made things worse.",
            "C. Fine-tuned on calls that over-share: 0% clean success, 100% leaks. This arm is constructed on purpose, and its adapter is not published.",
            "D. Fine-tuned on minimal calls: 90.5% clean success, 3.0% leaks.",
          ],
        },
        {
          eyebrow: "Method",
          title: "How it was measured",
          items: [
            "A synthetic benchmark with personas, 11 tool schemas, task templates, a leak detector and simulated agents. All people and contact details are synthetic.",
            "Training with AgentTune (LoRA) and evaluation with AuditKIT, about 27 to 29 minutes per fine-tune on an L4 GPU.",
            "Counterfactual twin tasks: calls changed in only 6.0% of twin pairs for the minimal fine-tune, against 28.4% for the base model.",
            "Paired bootstrap intervals, plus 70 sanity checks and an end-to-end smoke test on a tiny random model.",
          ],
        },
        {
          eyebrow: "Caveats",
          title: "Things to know before relying on the numbers",
          items: [
            "After fine-tuning, the model ends its answer with a token its generation config does not stop on, so it wrote filler about four times slower. A merge script fixes the stop tokens.",
            "Leak detection is string matching against the synthetic persona, so it misses paraphrased leaks and flags some harmless calls.",
            "Evaluation conditions differed slightly between arms (merged models, batched decoding), and hand-labelling to validate the detector has not been done yet.",
          ],
        },
      ],
      links: [
        {
          label: "GitHub repository",
          url: "https://github.com/manasa1864/data-minimizing-agent",
        },
      ],
    },
    {
      id: "M-09",
      slug: "maison",
      name: "Maison",
      summary: "A connected restaurant system built for Vibeathon 2026.",
      details: [
        "Pairs a guest app with a staff dashboard.",
        "Orders, reservations and the queue sync live.",
      ],
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      code: "https://github.com/ishita-punjani/MAISON",
      demo: "https://maison-one-xi.vercel.app/",
      featured: true,
      event: "Vibeathon 2026",
      role: "Backend, in a team of three",
      overview: [
        "Maison is a fine-dining restaurant's guest app: the thing a diner opens on their phone before, during and after a visit. Its sister app, Maison Manager, is what the staff use, and both read and write the same Supabase database.",
        "That means an action in one app has a real, immediate effect on the other: an order accepted in the kitchen moves the guest's tracking timeline in real time.",
      ],
      highlights: [
        {
          title: "Live order tracking",
          text: "A seven-step timeline from order placed to served that updates as the kitchen works the order.",
        },
        {
          title: "Mood-based dining",
          text: "Guests pick how they feel and the app tunes recommendations, drink pairings and even the tone of its notifications.",
        },
        {
          title: "Reservations and a live queue",
          text: "Book a table, or join the walk-in queue and watch your position count down.",
        },
        {
          title: "AI recommendations",
          text: "A quiz-driven ordering assistant that can use Groq over the real menu, with a built-in fallback when no key is set.",
        },
      ],
      notes: [
        "Team Error 404 - sleep not found. My part was the backend; Ishita Punjani built the frontend and Tanvi Paithankar handled deployment and documentation.",
      ],
      sections: [
        {
          eyebrow: "Staff to guest",
          title: "What a manager does, and what the guest sees",
          items: [
            "Dragging an order across the kitchen board advances the guest's tracking timeline live.",
            "Accepting an order or marking it ready sends a notification in the tone of the guest's chosen mood.",
            "Approving, moving or cancelling a reservation, or seating a guest, each notify the guest.",
            "Removing someone from the queue moves everyone behind them up a position, live.",
            "Taking a dish off the menu removes it everywhere, and running out of an ingredient shows the linked dish as sold out until it is restocked.",
          ],
        },
        {
          eyebrow: "Guest to staff",
          title: "What a guest does, and what the kitchen sees",
          items: [
            "Placing an order creates a new card on the kitchen board with the table, items and total.",
            "Ordering a dish draws down the ingredient behind it in inventory.",
            "Booking a table or joining the queue shows up in Reservations and Queue.",
            "Paying a bill updates revenue, sales charts, analytics and the guest's customer history, and allergy or dietary notes appear on their card.",
          ],
        },
        {
          eyebrow: "Architecture",
          title: "One restaurant, two sides of the pass",
          items: [
            "Two separate apps and repositories share one Supabase project, so both subscribe to the same data through Supabase Realtime.",
            "What separates a guest's view from a manager's is identity and Row Level Security policies, not separate infrastructure.",
            "Both apps are built with React 19, TypeScript, Vite 8 and Tailwind CSS v4, and hosted on Vercel.",
          ],
        },
      ],
      links: [
        { label: "Live guest app", url: "https://maison-one-xi.vercel.app/" },
        { label: "Live staff dashboard", url: "https://maisonmanager.vercel.app/" },
        {
          label: "Guest app code",
          url: "https://github.com/ishita-punjani/MAISON",
        },
        {
          label: "Staff dashboard code",
          url: "https://github.com/manasa1864/MAISON-MANAGER",
        },
      ],
    },
    {
      id: "I-10",
      slug: "insurance",
      name: "INSURANCE",
      summary: "PolicyWise AI, an insurance recommendation platform.",
      details: [
        "Scores personalised risk across 15 insurance categories.",
        "Adds AI recommendations, a what-if simulator and plan comparison.",
      ],
      stack: ["Python", "FastAPI", "React.js", "TypeScript"],
      code: "https://github.com/manasa1864/INSURANCE",
      featured: true,
      overview: [
        "PolicyWise AI is an insurance advisory platform that calculates a personalised risk score and recommends policies across 15 insurance categories, using a multi-layer actuarial engine.",
        "Users answer a multi-step form, then explore their recommendations, tweak the inputs to see how their premium changes, and compare plans side by side.",
      ],
      highlights: [
        {
          title: "15 insurance categories",
          text: "Health, life, vehicle, travel, home, business, personal accident, critical illness, education, crop, gadget, pet, cyber, fire and marine, each with its own weighted risk factors.",
        },
        {
          title: "What-if simulator",
          text: "Adjust parameters and watch the premium change in real time.",
        },
        {
          title: "AI recommendations and chat",
          text: "An LLM suggests best-fit policies from the user's profile, and a chat assistant floats over every page.",
        },
        {
          title: "Reports and an admin dashboard",
          text: "Save, export and revisit plans, with analytics and user management for admins.",
        },
      ],
      sections: [
        {
          eyebrow: "Risk engine",
          title: "Six layers, run in the browser",
          items: [
            "Base scoring: each factor is scored 0 to 100 from actuarial tables.",
            "Interaction effects add compound penalties, such as smoker plus diabetes plus age over 50.",
            "Weighted aggregation with weights that sum to 1.0, then sigmoid normalisation so there are no hard cliffs.",
            "Coverage scaling by the desired sum insured, and a regional adjustment for metro, tier-2 or rural areas by PIN code.",
            "Scores map to six risk levels, from Very Low (85 to 100) to Very High (0 to 24).",
          ],
        },
        {
          eyebrow: "Data science",
          title: "Models and analysis",
          items: [
            "A Python FastAPI service uses PyTorch for neural-network risk scoring, Hugging Face transformers for sentiment on claim descriptions, and pandas and numpy for policy data.",
            "In the browser, mathjs, arquero, TensorFlow.js and Hugging Face transformers on ONNX stand in for numpy, pandas, PyTorch and transformers.",
            "Groq powers the AI recommendations and the chat widget, and Supabase provides the database and authentication.",
          ],
        },
      ],
      links: [
        {
          label: "GitHub repository",
          url: "https://github.com/manasa1864/INSURANCE",
        },
      ],
    },
  ] satisfies Project[],
  operations: [
    { label: "Apart Research AI Collusion Sprint 2026", slug: "ai-cartel-sting" },
    { label: "Secret Loyalties Hackathon 2026", slug: "secret-loyalties" },
    {
      label: "Lexsi AI Safety & Alignment Hackathon 2026",
      slug: "minimal-by-training",
    },
    { label: "Meta Cerebral Valley Hackathon 2026", slug: "prism-ai" },
    { label: "Vibeathon 2026", slug: "maison" },
    { label: "Global Fusion · AI + EdTech", slug: "why-engine" },
  ],
  skills: {
    Languages: ["Python", "C++", "JavaScript", "TypeScript"],
    "AI & Machine Learning": [
      "Regression & Cross-Validation",
      "Computer Vision",
      "OCR",
      "NLP",
      "LLM Evaluation",
      "Multi-Agent Systems",
      "LoRA Fine-tuning",
      "AI Safety Research",
    ],
    "Frameworks & Web": [
      "React",
      "Node.js",
      "FastAPI",
      "Flask",
      "OpenCV",
      "Whisper",
      "Judge0",
      "Tailwind CSS",
      "REST APIs",
    ],
    "Databases & Tools": [
      "PostgreSQL",
      "MongoDB",
      "MariaDB",
      "Supabase",
      "Neo4j",
      "Git/GitHub",
      "GitHub Actions",
      "Linux/WSL",
    ],
    Coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Compiler Construction",
      "Image Processing",
    ],
  },
  achievements: [
    {
      meta: "Hash Engineering Fellowship · 2026",
      title: "Applied AI & Data, Cohort 1",
      description:
        "Named Outstanding Applied AI & Data Fellow, with two certificates and two recommendation letters. Compared regression models, flagged out-of-distribution inputs, and peer-reviewed a classifier, catching train/test duplicate overlap.",
      slug: "building-energy-review",
      links: [
        {
          label: "Completion certificate",
          url: `${base}documents/hash/certificate-of-completion.pdf`,
        },
        {
          label: "Distinction certificate",
          url: `${base}documents/hash/certificate-of-distinction.pdf`,
        },
        {
          label: "Recommendation letter",
          url: `${base}documents/hash/letter-of-recommendation.pdf`,
        },
        {
          label: "Outstanding Fellow letter",
          url: `${base}documents/hash/outstanding-fellow-recommendation.pdf`,
        },
      ],
    },
    {
      meta: "Apart Research · 2026",
      title: "AI Collusion Research Sprint",
      description:
        "Independently authored a multi-agent AI safety study of LLM supplier cartels across 80 games. Cartels formed in 20 of 20.",
      slug: "ai-cartel-sting",
      links: [
        {
          label: "Report (PDF)",
          url: "https://github.com/manasa1864/apart_collusion/blob/HEAD/Omert%60a_Collusion_Apart.pdf",
        },
        { label: "GitHub", url: "https://github.com/manasa1864/apart_collusion" },
      ],
    },
    {
      meta: "AParT Research · 2026",
      title: "Secret Loyalties Hackathon",
      description:
        "Authored an AI safety paper on hidden loyalty propagation in multi-agent LLM pipelines, backed by 432 controlled experiments.",
      slug: "secret-loyalties",
      links: [
        {
          label: "Paper (PDF)",
          url: "https://github.com/manasa1864/secret-loyalties/blob/HEAD/secret_loyalties_apart.pdf",
        },
        { label: "GitHub", url: "https://github.com/manasa1864/secret-loyalties" },
      ],
    },
    {
      meta: "Lexsi AI Safety & Alignment Hackathon · 2026",
      title: "Track 3: Agentic Fine-tuning",
      description:
        "Fine-tuned Tiny Aya Global (3.35B, LoRA) on 600 minimal tool-call demos, cutting personal-data leaks from 24.5% to 3.0%.",
      slug: "minimal-by-training",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/manasa1864/data-minimizing-agent",
        },
      ],
    },
    {
      meta: "Meta Cerebral Valley Hackathon · 2026",
      title: "Prism AI",
      description:
        "Built a chatbot that routes each query to a verification tier: 0 fabrications and 20/20 machine-checked calculations over ten benchmark runs.",
      slug: "prism-ai",
      links: [{ label: "GitHub", url: "https://github.com/manasa1864/META_CV" }],
    },
    {
      meta: "Vibeathon · 2026",
      title: "Maison",
      description:
        "Built a live-synced restaurant guest app and staff dashboard with a team of three; my part was the backend.",
      slug: "maison",
      links: [
        { label: "GitHub", url: "https://github.com/ishita-punjani/MAISON" },
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
        description:
          "Teams and projects where I can help build useful AI-powered apps.",
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
