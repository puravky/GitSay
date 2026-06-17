<div align="center">
  <img src="./public/logo.png" alt="GitSay Logo" width="220" />
  <h1>GitSay</h1>
  <p><strong>AI-powered git commit message generator following the Conventional Commits specification.</strong></p>
  
  <p>
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#how-it-works">How It Works</a> •
    <a href="#project-structure">Project Structure</a>
  </p>
</div>

---

**GitSay** is a fast, web-based developer tool designed to translate natural language descriptions or raw `git diff` outputs into high-quality, standardized, and precise commit messages. No more generic `"update files"` or `"fix bug"` commits. Keep your Git history clean, professional, and compliant with standard conventional commit patterns.

---

## ⚡ Key Features

- **Double Inputs Modes**:
  - **✏️ Describe**: Type a plain English description of what you changed.
  - **📄 Git Diff**: Paste the raw output of `git diff` to let the AI analyze actual code changes directly.
- **Conventional Commits Compliant**: Automatically detects context and formats commits into standard types (e.g., `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`, `perf`, `ci`) with optional scopes.
- **Multiple Style Alternatives**:
  - **Primary**: Standard conventional commit description.
  - **Short**: Ultra-concise 4-6 word imperative phrase.
  - **Detailed**: Structured commit featuring a summary line, blank line, and bullet points explaining *what* changed and *why*.
  - **Descriptive**: Framed with alternative verbs and technical perspective.
  - **Emoji (Gitmoji)**: Semantically tagged with emojis (e.g. ✨, 🐛, 📝) matching the conventional commit type.
- **One-Click Clipboard**: Instant copying of any generated message with micro-animations and feedback.
- **LocalStorage History**: Maintains a history of your generated commits right in the browser. Easily view, copy, or clear past entries.
- **Polished Responsive Design**: Custom dark-themed layout built with glowing canvas accents, modern typography, and smooth transitions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 19, App Router)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Inference Backend**: [Groq Cloud SDK](https://console.groq.com/)
- **AI Model**: `llama-3.3-70b-versatile` (LLaMA 3.3 70B via ultra-fast Groq LPU inference)
- **Styling**: Tailwind CSS & Custom CSS animations
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

You must have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository and navigate into the folder:
   ```bash
   cd gitSay
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Configuration

Create a `.env.local` file in the root directory and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> [!TIP]
> You can obtain a free API key by signing up at [Groq Console](https://console.groq.com/).

### Running the Application

Start the local development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start generating commits.

### Building for Production

Compile a production-optimized build:

```bash
bun run build
```

Run the production build:

```bash
bun run start
```

---

## 📝 How It Works

GitSay processes your inputs server-side using standard LLM system prompts structured to enforce Conventional Commits rules:

1. **Format**: `<type>(<scope>): <subject>` (in imperative mood, e.g., `add` instead of `added`, under 72 characters).
2. **Mode Processing**:
   - In **Describe** mode, it translates plain-English intents into formal descriptions.
   - In **Git Diff** mode, it reads through standard file patches (`+`/`-` lines) to infer actual logic changes.
3. **Alternative Framing**: When requested, it crafts alternate versions by altering the verb framing, adding bulleted detail bodies, or prefixing appropriate Gitmojis depending on the chosen type:
   - `feat` ➔ ✨
   - `fix` ➔ 🐛
   - `docs` ➔ 📝
   - `chore` ➔ 🔧
   - `refactor` ➔ ♻️
   - `style` ➔ 💄
   - `test` ➔ ✅
   - `perf` ➔ ⚡
   - `ci` ➔ 👷

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js      # Server-side Groq LLaMA inference API
│   ├── globals.css           # Global Tailwind directives & dark-theme layouts
│   ├── layout.jsx            # Document root and SEO metadata configuration
│   └── page.jsx              # Main landing page & commit interface layout
├── components/
│   └── ui/                   # Reusable Shadcn UI / Radix primitives
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── tabs.jsx
│       └── textarea.jsx
├── lib/
│   └── utils.js              # Class-merging utility for Tailwind styles
├── public/                   # Asset files (logo and favicon)
├── package.json              # Dependency registry & bun run commands
└── tailwind.config.mjs       # Tailwind CSS configuration details
```

---

## 🤝 Contributing & Support

Created with ❤️ by **Purav Kumar** ([puravkumaryadav@email.com](mailto:puravkumaryadav@email.com)) for developers everywhere. Feel free to open issues or pull requests to improve the tool!
