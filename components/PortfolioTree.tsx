"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { Folder, Tree, File } from "./ui/file-tree";
import { getTechIcon } from "@/lib/tech-icons";
import { Avatar, AvatarImage } from "./ui/avatar";
import AvatarModal from "./AvatarModal";

interface PortfolioTreeProps {
  isExpanded: boolean;
}

export default function PortfolioTree({ isExpanded }: PortfolioTreeProps) {
  const allFolderValues = [
    "evan-mavis",
    "full-stack-web-developer",
    "my-tech-stack",
    "other-tech",
    "tooling",
    "productivity",
    "favorite-languages",
    "projects",
    "interesting-stuff",
  ];

  // first two folders that should be expanded on initial load
  const initialExpandedFolders = ["evan-mavis", "full-stack-web-developer"];
  const containerRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // mark animations as complete after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const prevIsExpandedRef = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    if (
      prevIsExpandedRef.current !== undefined &&
      prevIsExpandedRef.current !== isExpanded
    ) {
      startTransition(() => {
        setHasUserInteracted(true);
      });
    }
    prevIsExpandedRef.current = isExpanded;
  }, [isExpanded]);

  // use ResizeObserver to track width and maintain the maximum width
  // this ensures the container maintains its width when first two folders are expanded
  // even when they're manually collapsed
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setMinWidth((prev) => {
          return prev === undefined ? width : Math.max(prev, width);
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={hasAnimated ? false : { opacity: 0, y: 20 }}
      animate={hasAnimated ? {} : { opacity: 1, y: 0 }}
      transition={hasAnimated ? {} : { duration: 1.0, ease: "easeOut" }}
      className="inline-flex items-start gap-4"
      style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}
    >
      <Tree
        className="w-auto h-auto text-foreground dark:text-[#ffd48a]"
        initialExpandedItems={
          isExpanded
            ? allFolderValues
            : hasUserInteracted
            ? []
            : initialExpandedFolders
        }
        key={
          isExpanded ? "expanded" : hasUserInteracted ? "collapsed" : "initial"
        }
      >
        {hasAnimated ? (
          <>
            <Folder
              element={
                <>
                  evan mavis/
                  <div
                    className="bg-primary border border-primary size-12 rounded-full overflow-hidden cursor-pointer inline-block ml-2 align-middle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAvatarModalOpen(true);
                    }}
                  >
                    <Avatar className="size-full">
                      <AvatarImage
                        src="/avatar.jpeg"
                        loading="eager"
                        className="object-cover! object-center!"
                      />
                    </Avatar>
                  </div>
                </>
              }
              value="evan-mavis"
              className="text-3xl"
            >
              <Folder
                element={
                  <span className="text-left leading-normal">
                    full stack web developer based out of NYC and a{" "}
                    <span className="text-[#B8860B] dark:text-[#FFD700] font-semibold">
                      CU Boulder alum
                    </span>
                    /
                  </span>
                }
                value="full-stack-web-developer"
                className="text-lg sm:text-lg [&>button]:gap-2 md:[&>button]:gap-1 [&>button>span]:pl-2 md:[&>button>span]:pl-0"
              >
                <Folder element="my tech stack/" value="my-tech-stack">
                  <File value="next.js" fileIcon={getTechIcon("nextjs")}>
                    next.js
                  </File>
                  <File value="react" fileIcon={getTechIcon("react")}>
                    react
                  </File>
                  <File value="typescript" fileIcon={getTechIcon("typescript")}>
                    typescript
                  </File>
                  <File value="shadcn" fileIcon={getTechIcon("shadcn")}>
                    shadcn
                  </File>
                  <File value="tailwind" fileIcon={getTechIcon("tailwind")}>
                    tailwind
                  </File>
                  <File value="express" fileIcon={getTechIcon("express")}>
                    express
                  </File>
                  <File value="drizzle" fileIcon={getTechIcon("drizzle")}>
                    drizzle
                  </File>
                  <File value="postgres" fileIcon={getTechIcon("postgres")}>
                    postgres
                  </File>
                  <File value="neon" fileIcon={getTechIcon("neon")}>
                    neon
                  </File>
                  <File value="vercel" fileIcon={getTechIcon("vercel")}>
                    vercel
                  </File>
                  <File value="betterauth" fileIcon={getTechIcon("betterauth")}>
                    betterauth
                  </File>
                  <File value="github" fileIcon={getTechIcon("github")}>
                    github
                  </File>
                </Folder>

                <Folder element="other tech/" value="other-tech">
                  <Folder element="tooling/" value="tooling">
                    <File value="github" fileIcon={getTechIcon("github")}>
                      github
                    </File>
                    <File value="git" fileIcon={getTechIcon("git")}>
                      git
                    </File>
                    <File value="cursor" fileIcon={getTechIcon("cursor")}>
                      cursor
                    </File>
                  </Folder>
                  <Folder element="productivity/" value="productivity">
                    <File value="obsidian" fileIcon={getTechIcon("obsidian")}>
                      obsidian
                    </File>
                    <File
                      value="excalidraw"
                      fileIcon={getTechIcon("excalidraw")}
                    >
                      excalidraw
                    </File>
                  </Folder>
                  <Folder
                    element="favorite languages/"
                    value="favorite-languages"
                  >
                    <File value="python" fileIcon={getTechIcon("python")}>
                      python
                    </File>
                    <File
                      value="typescript"
                      fileIcon={getTechIcon("typescript")}
                    >
                      typescript
                    </File>
                  </Folder>
                </Folder>

                <Folder element="projects/" value="projects">
                  <File value="wishswipe" fileIcon={getTechIcon("wishswipe")}>
                    <a
                      href="https://wishswipe.app/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      wishswipe
                    </a>
                  </File>
                  <File value="chain-log" fileIcon={getTechIcon("chainlog")}>
                    <a
                      href="https://chain-log.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      chain log
                    </a>
                  </File>
                </Folder>

                <Folder element="interesting stuff/" value="interesting-stuff">
                  <File value="travel" fileIcon={getTechIcon("travel")}>
                    <Link
                      href="/travel"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      travel
                    </Link>
                  </File>
                  <File value="food" fileIcon={getTechIcon("food")}>
                    <Link
                      href="/food"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      food
                    </Link>
                  </File>
                </Folder>

                <File value="resume" fileIcon={getTechIcon("resume")}>
                  <a
                    href="/evan-mavis-resume.pdf"
                    download="evan-mavis-resume.pdf"
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    resume
                  </a>
                </File>
                <File value="linkedin" fileIcon={getTechIcon("linkedin")}>
                  <a
                    href="https://www.linkedin.com/in/evan-mavis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    linkedin
                  </a>
                </File>
                <File value="github" fileIcon={getTechIcon("github")}>
                  <a
                    href="https://github.com/evan-mavis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    github
                  </a>
                </File>
                <File value="email" fileIcon={getTechIcon("email")}>
                  <a
                    href={`mailto:evanmavis3@gmail.com?subject=${encodeURIComponent(
                      "Make it interesting :)"
                    )}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    email
                  </a>
                </File>
              </Folder>
            </Folder>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
          >
            <Folder
              element={
                <>
                  evan mavis/
                  <div
                    className="bg-primary border border-primary size-12 rounded-full overflow-hidden cursor-pointer inline-block ml-2 align-middle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAvatarModalOpen(true);
                    }}
                  >
                    <Avatar className="size-full">
                      <AvatarImage
                        src="/avatar.jpeg"
                        loading="eager"
                        className="object-cover! object-center!"
                      />
                    </Avatar>
                  </div>
                </>
              }
              value="evan-mavis"
              className="text-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
              >
                <Folder
                  element={
                    <span className="text-left leading-normal">
                      full stack web developer based out of NYC and a{" "}
                      <span className="text-[#B8860B] dark:text-[#FFD700] font-semibold">
                        CU Boulder alum
                      </span>
                      /
                    </span>
                  }
                  value="full-stack-web-developer"
                  className="text-xl md:text-lg [&>button]:gap-2 md:[&>button]:gap-1 [&>button>span]:pl-2 md:[&>button>span]:pl-0"
                >
                  <Folder element="my tech stack/" value="my-tech-stack">
                    <File value="next.js" fileIcon={getTechIcon("next.js")}>
                      next.js
                    </File>
                    <File value="react" fileIcon={getTechIcon("react")}>
                      react
                    </File>
                    <File
                      value="typescript"
                      fileIcon={getTechIcon("typescript")}
                    >
                      typescript
                    </File>
                    <File value="shadcn" fileIcon={getTechIcon("shadcn")}>
                      shadcn
                    </File>
                    <File value="tailwind" fileIcon={getTechIcon("tailwind")}>
                      tailwind
                    </File>
                    <File value="express" fileIcon={getTechIcon("express")}>
                      express
                    </File>
                    <File value="drizzle" fileIcon={getTechIcon("drizzle")}>
                      drizzle
                    </File>
                    <File value="postgres" fileIcon={getTechIcon("postgres")}>
                      postgres
                    </File>
                    <File value="neon" fileIcon={getTechIcon("neon")}>
                      neon
                    </File>
                    <File value="vercel" fileIcon={getTechIcon("vercel")}>
                      vercel
                    </File>
                    <File
                      value="betterauth"
                      fileIcon={getTechIcon("betterauth")}
                    >
                      betterauth
                    </File>
                    <File value="github" fileIcon={getTechIcon("github")}>
                      github
                    </File>
                  </Folder>

                  <Folder element="other tech/" value="other-tech">
                    <Folder element="tooling/" value="tooling">
                      <File value="github" fileIcon={getTechIcon("github")}>
                        github
                      </File>
                      <File value="git" fileIcon={getTechIcon("git")}>
                        git
                      </File>
                      <File value="cursor" fileIcon={getTechIcon("cursor")}>
                        cursor
                      </File>
                    </Folder>
                    <Folder element="productivity/" value="productivity">
                      <File value="obsidian" fileIcon={getTechIcon("obsidian")}>
                        obsidian
                      </File>
                      <File
                        value="excalidraw"
                        fileIcon={getTechIcon("excalidraw")}
                      >
                        excalidraw
                      </File>
                    </Folder>
                    <Folder
                      element="favorite languages/"
                      value="favorite-languages"
                    >
                      <File value="python" fileIcon={getTechIcon("python")}>
                        python
                      </File>
                      <File
                        value="typescript"
                        fileIcon={getTechIcon("typescript")}
                      >
                        typescript
                      </File>
                    </Folder>
                  </Folder>

                  <Folder element="projects/" value="projects">
                    <File value="wishswipe" fileIcon={getTechIcon("wishswipe")}>
                      <a
                        href="https://wishswipe.app/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        wishswipe
                      </a>
                    </File>
                    <File value="chain-log" fileIcon={getTechIcon("chain-log")}>
                      <a
                        href="https://chain-log.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        chain log
                      </a>
                    </File>
                  </Folder>

                  <Folder
                    element="interesting stuff/"
                    value="interesting-stuff"
                  >
                    <File value="travel" fileIcon={getTechIcon("travel")}>
                      travel
                    </File>
                    <File value="food" fileIcon={getTechIcon("food")}>
                      food
                    </File>
                  </Folder>

                  <File value="resume" fileIcon={getTechIcon("resume")}>
                    <a
                      href="/evan-mavis-resume.pdf"
                      download="evan-mavis-resume.pdf"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      resume
                    </a>
                  </File>
                  <File value="linkedin" fileIcon={getTechIcon("linkedin")}>
                    <a
                      href="https://www.linkedin.com/in/evan-mavis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      linkedin
                    </a>
                  </File>
                  <File value="github" fileIcon={getTechIcon("github")}>
                    <a
                      href="https://github.com/evan-mavis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      github
                    </a>
                  </File>
                  <File value="email" fileIcon={getTechIcon("email")}>
                    <a
                      href={`mailto:evanmavis3@gmail.com?subject=${encodeURIComponent(
                        "Make it interesting :)"
                      )}`}
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      email
                    </a>
                  </File>
                </Folder>
              </motion.div>
            </Folder>
          </motion.div>
        )}
      </Tree>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        avatarSrc="/avatar.jpeg"
      />
    </motion.div>
  );
}
