import type { ReactNode } from "react";
import AvatarBadge from "./AvatarBadge";

type TreeFileLink =
  | { type: "internal"; href: string }
  | { type: "external"; href: string; newTab?: boolean }
  | { type: "download"; href: string }
  | { type: "mailto"; href: string };

interface TreeFolderNode {
  kind: "folder";
  value: string;
  label: ReactNode;
  className?: string;
  children: TreeNode[];
}

export interface TreeFileNode {
  kind: "file";
  value: string;
  label: ReactNode;
  techIcon?: string;
  bulletIcon?: boolean;
  link?: TreeFileLink;
  trackEvent?: string;
  className?: string;
}

export type TreeNode = TreeFolderNode | TreeFileNode;

const FOLDER_CLASS = "lg:text-lg";
const FILE_CLASS = "lg:text-lg";
const DESCRIPTION_FILE_CLASS = "lg:text-lg text-sm opacity-80";
const YEAR_CLASS = "text-[#B8860B] dark:text-primary";

function descriptionFile(value: string, label: string): TreeFileNode {
  return {
    kind: "file",
    value,
    label,
    bulletIcon: true,
    className: DESCRIPTION_FILE_CLASS,
  };
}

function techFile(value: string, techIcon: string): TreeFileNode {
  return { kind: "file", value, label: value, techIcon, className: FILE_CLASS };
}

const EMAIL_HREF = `mailto:evanmavis3@gmail.com?subject=${encodeURIComponent(
  "make it interesting :)",
)}`;

export const PORTFOLIO_TREE_DATA: TreeNode[] = [
  {
    kind: "folder",
    value: "evan-mavis",
    label: (
      <>
        evan mavis/
        <AvatarBadge />
      </>
    ),
    className: "text-3xl lg:text-4xl",
    children: [
      {
        kind: "folder",
        value: "full-stack-web-developer",
        label: (
          <span className="text-left leading-normal pl-2 md:pl-0 inline-block">
            full stack web developer based out of nyc and a{" "}
            <span className="text-[#B8860B] dark:text-primary font-semibold">
              cu boulder alum
            </span>
            /
          </span>
        ),
        className: "text-xl lg:text-2xl [&>button]:gap-2 md:[&>button]:gap-1",
        children: [
          {
            kind: "folder",
            value: "career",
            label: "career/",
            className: FOLDER_CLASS,
            children: [
              {
                kind: "folder",
                value: "airgoods",
                label: (
                  <>
                    <span className={YEAR_CLASS}>2026-present</span> airgoods •
                    software engineer/
                  </>
                ),
                className: FOLDER_CLASS,
                children: [
                  descriptionFile(
                    "airgoods-desc",
                    "super excited to be here!!",
                  ),
                ],
              },
              {
                kind: "folder",
                value: "kpmg-senior",
                label: (
                  <>
                    <span className={YEAR_CLASS}>2025</span> kpmg us • senior
                    software engineer/
                  </>
                ),
                className: FOLDER_CLASS,
                children: [
                  descriptionFile(
                    "kpmg-senior-desc",
                    "started having agents write my code",
                  ),
                ],
              },
              {
                kind: "folder",
                value: "kpmg-fulltime",
                label: (
                  <>
                    <span className={YEAR_CLASS}>2023-2024</span> kpmg us •
                    software engineer/
                  </>
                ),
                className: FOLDER_CLASS,
                children: [
                  descriptionFile(
                    "kpmg-fulltime-desc",
                    "led a sub-team of 5 us devs automating transfer pricing reports",
                  ),
                ],
              },
              {
                kind: "folder",
                value: "kpmg-intern",
                label: (
                  <>
                    <span className={YEAR_CLASS}>2022</span> kpmg us • software
                    engineer intern/
                  </>
                ),
                className: FOLDER_CLASS,
                children: [
                  descriptionFile("kpmg-intern-desc", "introduced to web dev"),
                ],
              },
              {
                kind: "folder",
                value: "cu-boulder",
                label: (
                  <>
                    <span className={YEAR_CLASS}>2019-2023</span> university of
                    colorado boulder • 🦬/
                  </>
                ),
                className: FOLDER_CLASS,
                children: [
                  descriptionFile(
                    "education-studies-desc",
                    "studied cs, finance, business analytics, and info management",
                  ),
                  descriptionFile("education-gpa-desc", "gpa: 3.95 🤓"),
                  descriptionFile(
                    "education-skied-desc",
                    "skied most fridays!! 🎿",
                  ),
                  descriptionFile(
                    "ta-desc",
                    "helped students w/ data analysis and machine learning as an information management teachers assistant",
                  ),
                  descriptionFile(
                    "mentor-desc",
                    "mentored 8 incoming freshmen at our business school in the leeds mentoring program",
                  ),
                ],
              },
            ],
          },
          {
            kind: "folder",
            value: "tech-i-use",
            label: "tech i use/",
            className: FOLDER_CLASS,
            children: [
              {
                kind: "folder",
                value: "frontend",
                label: "frontend/",
                className: FOLDER_CLASS,
                children: [
                  techFile("next.js", "nextjs"),
                  techFile("vite", "vite"),
                  techFile("react", "react"),
                  techFile("typescript", "typescript"),
                  techFile("shadcn", "shadcn"),
                  techFile("tailwind", "tailwind"),
                ],
              },
              {
                kind: "folder",
                value: "backend",
                label: "backend/",
                className: FOLDER_CLASS,
                children: [
                  techFile("express", "express"),
                  techFile("drizzle", "drizzle"),
                  techFile("postgres", "postgres"),
                  techFile("neon", "neon"),
                  techFile("better-auth", "betterauth"),
                  techFile("inngest", "inngest"),
                  techFile("resend", "resend"),
                  techFile("stripe", "stripe"),
                  techFile("algolia", "algolia"),
                  techFile("sanity", "sanity"),
                ],
              },
              {
                kind: "folder",
                value: "infra",
                label: "infra/",
                className: FOLDER_CLASS,
                children: [
                  techFile("vercel", "vercel"),
                  techFile("render", "render"),
                  techFile("aws", "aws"),
                ],
              },
              {
                kind: "folder",
                value: "observability",
                label: "observability/",
                className: FOLDER_CLASS,
                children: [
                  techFile("posthog", "posthog"),
                  techFile("sentry", "sentry"),
                ],
              },
              {
                kind: "folder",
                value: "tooling",
                label: "tooling/",
                className: FOLDER_CLASS,
                children: [
                  techFile("cursor", "cursor"),
                  techFile("codex", "codex"),
                  techFile("factory", "factory"),
                  techFile("github", "github"),
                  {
                    kind: "file",
                    value: "my-agentic-workflow-skills",
                    label: "my agentic workflow skills",
                    techIcon: "git",
                    link: {
                      type: "external",
                      href: "https://github.com/evan-mavis/skills",
                      newTab: true,
                    },
                    trackEvent: "skills_repo_click",
                    className: FILE_CLASS,
                  },
                ],
              },
              {
                kind: "folder",
                value: "productivity",
                label: "productivity/",
                className: FOLDER_CLASS,
                children: [
                  techFile("linear", "linear"),
                  techFile("notion", "notion"),
                  techFile("slack", "slack"),
                  techFile("excalidraw", "excalidraw"),
                ],
              },
            ],
          },
          {
            kind: "folder",
            value: "interesting-stuff",
            label: "interesting stuff/",
            className: FOLDER_CLASS,
            children: [
              {
                kind: "file",
                value: "travel",
                label: "travel",
                techIcon: "travel",
                link: { type: "internal", href: "/travel" },
                trackEvent: "travel_page_click",
                className: FILE_CLASS,
              },
              {
                kind: "file",
                value: "food",
                label: "food trip to southeast asia + japan",
                techIcon: "food",
                link: { type: "internal", href: "/food" },
                trackEvent: "food_page_click",
                className: FILE_CLASS,
              },
              {
                kind: "file",
                value: "beli",
                label: "beli",
                techIcon: "food",
                link: {
                  type: "external",
                  href: "https://beliapp.co/app/evanmavis",
                  newTab: true,
                },
                className: FILE_CLASS,
              },
              {
                kind: "file",
                value: "meet-your-goals",
                label: "meet your goals",
                techIcon: "chain",
                link: {
                  type: "external",
                  href: "https://chain-log.app",
                  newTab: true,
                },
                trackEvent: "meet_your_goals_click",
                className: FILE_CLASS,
              },
            ],
          },
          {
            kind: "file",
            value: "github",
            label: "github",
            techIcon: "github",
            link: {
              type: "external",
              href: "https://github.com/evan-mavis/",
              newTab: true,
            },
            trackEvent: "github_click",
            className: FILE_CLASS,
          },
          {
            kind: "file",
            value: "linkedin",
            label: "linkedin",
            techIcon: "linkedin",
            link: {
              type: "external",
              href: "https://www.linkedin.com/in/evan-mavis/",
              newTab: true,
            },
            trackEvent: "linkedin_click",
            className: FILE_CLASS,
          },
          {
            kind: "file",
            value: "email",
            label: "email",
            techIcon: "email",
            link: { type: "mailto", href: EMAIL_HREF },
            trackEvent: "email_click",
            className: FILE_CLASS,
          },
          {
            kind: "file",
            value: "resume",
            label: "resume",
            techIcon: "resume",
            link: {
              type: "download",
              href: "/evan-mavis-resume.pdf",
            },
            trackEvent: "resume_click",
            className: FILE_CLASS,
          },
        ],
      },
    ],
  },
];

function collectFolderValues(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) =>
    node.kind === "folder"
      ? [node.value, ...collectFolderValues(node.children)]
      : [],
  );
}

export const ALL_FOLDER_VALUES = collectFolderValues(PORTFOLIO_TREE_DATA);

export const DEFAULT_EXPANDED_ITEMS = [
  "evan-mavis",
  "full-stack-web-developer",
];
