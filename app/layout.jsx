import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata = {
  title: "GitSay — AI-Powered Git Commit Message Generator",
  description:
    "Describe your change or paste a git diff and get a perfect conventional commit message instantly. Powered by Groq's ultra-fast LLaMA inference.",
  keywords: [
    "git commit message generator",
    "conventional commits",
    "AI git",
    "groq",
    "developer tools",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GitSay — AI-Powered Git Commit Message Generator",
    description: "Stop writing bad commit messages. Let GitSay do it for you.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className="font-sans antialiased min-h-screen"
        style={{ backgroundColor: "#09090b" }}
      >
        {children}
      </body>
    </html>
  );
}
