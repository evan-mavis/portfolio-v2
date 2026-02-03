"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { Folder, Tree, File } from "./ui/file-tree";
import { getTechIcon } from "@/lib/tech-icons";
import { Avatar, AvatarImage } from "./ui/avatar";
import AvatarModal from "./AvatarModal";
import { CircleSmall } from "lucide-react";
import { track } from "@vercel/analytics";

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
    "career",
    "airgoods",
    "kpmg-senior",
    "kpmg-fulltime",
    "kpmg-intern",
    "education",
    "ta",
    "mentor",
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

  const renderTreeContent = (onAvatarClick: () => void) => (
    <>
      <Folder
        element={
          <>
            evan mavis/
            <div
              className="bg-primary border border-primary size-12 rounded-full overflow-hidden cursor-pointer inline-block ml-2 align-middle"
              onClick={(e) => {
                e.stopPropagation();
                onAvatarClick();
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
        className="text-3xl lg:text-4xl"
      >
        <Folder
          element={
            <span className="text-left leading-normal pl-2 md:pl-0 inline-block">
              full stack web developer based out of NYC and a{" "}
              <span className="text-[#B8860B] dark:text-primary font-semibold">
                CU Boulder alum
              </span>
              /
            </span>
          }
          value="full-stack-web-developer"
          className="text-xl lg:text-2xl [&>button]:gap-2 md:[&>button]:gap-1"
        >
          <Folder element="career/" value="career" className="lg:text-lg">
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">
                    2026-Present
                  </span>{" "}
                  airgoods • software engineer
                </>
              }
              value="airgoods"
              className="lg:text-lg"
            >
              <File
                value="airgoods-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                super excited to be here!!
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">
                    2025
                  </span>{" "}
                  kpmg us • senior software engineer
                </>
              }
              value="kpmg-senior"
              className="lg:text-lg"
            >
              <File
                value="kpmg-senior-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                started having agents write my code
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">
                    2023-2024
                  </span>{" "}
                  kpmg us • software engineer
                </>
              }
              value="kpmg-fulltime"
              className="lg:text-lg"
            >
              <File
                value="kpmg-fulltime-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                led a sub-team of 5 US devs automating transfer pricing reports
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">2022</span>{" "}
                  kpmg us • software engineer intern
                </>
              }
              value="kpmg-intern"
              className="lg:text-lg"
            >
              <File
                value="kpmg-intern-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                introduced to web dev
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">2023</span>{" "}
                  cu boulder • graduated/
                </>
              }
              value="education"
              className="lg:text-lg"
            >
              <File
                value="education-studies-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                studied CS, finance, business analytics, and info management
              </File>
              <File
                value="education-gpa-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                GPA: 3.95
              </File>

              <File
                value="education-skied-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                skied most fridays!! 🎿
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">
                    2021-2023
                  </span>{" "}
                  cu boulder • information management teachers assistant/
                </>
              }
              value="ta"
              className="lg:text-lg"
            >
              <File
                value="ta-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                helped students get w/ data analysis and machine
                learning
              </File>
            </Folder>
            <Folder
              element={
                <>
                  <span className="text-[#B8860B] dark:text-primary">
                    2019-2023
                  </span>{" "}
                  cu boulder • leeds mentoring program/
                </>
              }
              value="mentor"
              className="lg:text-lg"
            >
              <File
                value="mentor-desc"
                className="lg:text-lg text-sm opacity-80"
                fileIcon={
                  <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />
                }
              >
                mentored 8 incoming freshmen at our business school
              </File>
            </Folder>
          </Folder>

          <Folder
            element="my tech stack/"
            value="my-tech-stack"
            className="lg:text-lg"
          >
            <File
              value="next.js"
              fileIcon={getTechIcon("nextjs")}
              className="lg:text-lg"
            >
              next.js
            </File>
            <File
              value="react"
              fileIcon={getTechIcon("react")}
              className="lg:text-lg"
            >
              react
            </File>
            <File
              value="typescript"
              fileIcon={getTechIcon("typescript")}
              className="lg:text-lg"
            >
              typescript
            </File>
            <File
              value="shadcn"
              fileIcon={getTechIcon("shadcn")}
              className="lg:text-lg"
            >
              shadcn
            </File>
            <File
              value="tailwind"
              fileIcon={getTechIcon("tailwind")}
              className="lg:text-lg"
            >
              tailwind
            </File>
            <File
              value="express"
              fileIcon={getTechIcon("express")}
              className="lg:text-lg"
            >
              express
            </File>
            <File
              value="drizzle"
              fileIcon={getTechIcon("drizzle")}
              className="lg:text-lg"
            >
              drizzle
            </File>
            <File
              value="postgres"
              fileIcon={getTechIcon("postgres")}
              className="lg:text-lg"
            >
              postgres
            </File>
            <File
              value="neon"
              fileIcon={getTechIcon("neon")}
              className="lg:text-lg"
            >
              neon
            </File>
            <File
              value="vercel"
              fileIcon={getTechIcon("vercel")}
              className="lg:text-lg"
            >
              vercel
            </File>
            <File
              value="betterauth"
              fileIcon={getTechIcon("betterauth")}
              className="lg:text-lg"
            >
              betterauth
            </File>
            <Folder
              element="other tech/"
              value="other-tech"
              className="lg:text-lg"
            >
              <Folder element="tooling/" value="tooling" className="lg:text-lg">
                <File
                  value="github"
                  fileIcon={getTechIcon("github")}
                  className="lg:text-lg"
                >
                  github
                </File>
                <File
                  value="git"
                  fileIcon={getTechIcon("git")}
                  className="lg:text-lg"
                >
                  git
                </File>
                <File
                  value="cursor"
                  fileIcon={getTechIcon("cursor")}
                  className="lg:text-lg"
                >
                  cursor
                </File>
              </Folder>
              <Folder
                element="productivity/"
                value="productivity"
                className="lg:text-lg"
              >
                <File
                  value="obsidian"
                  fileIcon={getTechIcon("obsidian")}
                  className="lg:text-lg"
                >
                  obsidian
                </File>
                <File
                  value="excalidraw"
                  fileIcon={getTechIcon("excalidraw")}
                  className="lg:text-lg"
                >
                  excalidraw
                </File>
              </Folder>
              <Folder
                element="favorite languages/"
                value="favorite-languages"
                className="lg:text-lg"
              >
                <File
                  value="python"
                  fileIcon={getTechIcon("python")}
                  className="lg:text-lg"
                >
                  python
                </File>
                <File
                  value="typescript"
                  fileIcon={getTechIcon("typescript")}
                  className="lg:text-lg"
                >
                  typescript
                </File>
              </Folder>
            </Folder>
          </Folder>

          <Folder
            element="interesting stuff/"
            value="interesting-stuff"
            className="lg:text-lg"
          >
            <File
              value="travel"
              fileIcon={getTechIcon("travel")}
              className="lg:text-lg"
            >
              <Link
                href="/travel"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  track("travel_page_click");
                }}
              >
                travel
              </Link>
            </File>
            <File
              value="food"
              fileIcon={getTechIcon("food")}
              className="lg:text-lg"
            >
              <Link
                href="/food"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  track("food_page_click");
                }}
              >
                food trip to southeast asia + japan
              </Link>
            </File>
            <File
              value="food"
              fileIcon={getTechIcon("food")}
              className="lg:text-lg"
            >
              <Link
                href="https://beliapp.co/app/evanmavis"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                beli
              </Link>
            </File>
          </Folder>

          <Folder
            element={
              <span className="text-green-500 dark:text-green-400">
                projects/
              </span>
            }
            value="projects"
            className="lg:text-lg"
          >
            <File
              value="wishswipe"
              fileIcon={getTechIcon("wishswipe")}
              className="lg:text-lg"
            >
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
            <File
              value="chain-log"
              fileIcon={getTechIcon("chainlog")}
              className="lg:text-lg"
            >
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

          <File
            value="resume"
            fileIcon={getTechIcon("resume")}
            className="lg:text-lg"
          >
            <a
              href="/evan-mavis-resume.pdf"
              download="evan-mavis-resume.pdf"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                track("resume_click");
              }}
            >
              resume
            </a>
          </File>
          <File
            value="linkedin"
            fileIcon={getTechIcon("linkedin")}
            className="lg:text-lg"
          >
            <a
              href="https://www.linkedin.com/in/evan-mavis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                track("linkedin_click");
              }}
            >
              linkedin
            </a>
          </File>
          <File
            value="github"
            fileIcon={getTechIcon("github")}
            className="lg:text-lg"
          >
            <a
              href="https://github.com/evan-mavis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                track("github_click");
              }}
            >
              github
            </a>
          </File>
          <File
            value="email"
            fileIcon={getTechIcon("email")}
            className="lg:text-lg"
          >
            <a
              href={`mailto:evanmavis3@gmail.com?subject=${encodeURIComponent(
                "Make it interesting :)"
              )}`}
              className="text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                track("email_click");
              }}
            >
              email
            </a>
          </File>
        </Folder>
      </Folder>
    </>
  );

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
        className="w-auto h-auto text-foreground dark:text-[#ffd48a] text-base lg:text-lg"
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
          renderTreeContent(() => setIsAvatarModalOpen(true))
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            >
              {renderTreeContent(() => setIsAvatarModalOpen(true))}
            </motion.div>
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
