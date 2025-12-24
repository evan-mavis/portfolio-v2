import { Folder, Tree, File } from "./ui/file-tree";

interface PortfolioTreeProps {
  isExpanded: boolean;
}

export default function PortfolioTree({ isExpanded }: PortfolioTreeProps) {
  // All folder values that should be expanded when isExpanded is true
  const allFolderValues = [
    "evan-mavis",
    "full-stack-web-developer",
    "current-work-stack",
    "preferred-stack",
    "other-tech",
    "tooling",
    "productivity",
    "favorite-languages",
    "projects",
    "interesting-stuff",
  ];

  return (
    <Tree
      className="w-auto h-auto"
      initialExpandedItems={isExpanded ? allFolderValues : []}
      key={isExpanded ? "expanded" : "collapsed"}
    >
      <Folder element="evan-mavis" value="evan-mavis">
        <Folder
          element="full-stack web developer based out of NYC and a CU Boulder alum"
          value="full-stack-web-developer"
        >
          <Folder element="current-work-stack" value="current-work-stack">
            <File value="angular">angular</File>
            <File value="asp.net">asp.net</File>
            <File value="postgres">postgres</File>
            <File value="azure">azure</File>
          </Folder>

          <Folder element="preferred-stack" value="preferred-stack">
            <File value="next.js">next.js</File>
            <File value="typescript">typescript</File>
            <File value="shadcn">shadcn</File>
            <File value="tailwind">tailwind</File>
            <File value="drizzle">drizzle</File>
            <File value="postgres">postgres</File>
            <File value="neon">neon</File>
            <File value="vercel">vercel</File>
            <File value="betterauth">betterauth</File>
            <File value="github">github</File>
          </Folder>

          <Folder element="other-tech" value="other-tech">
            <Folder element="tooling" value="tooling">
              <File value="github">github</File>
              <File value="git">git</File>
              <File value="cursor">cursor</File>
            </Folder>
            <Folder element="productivity" value="productivity">
              <File value="obsidian">obsidian</File>
              <File value="excalidraw">excalidraw</File>
            </Folder>
            <Folder element="favorite-languages" value="favorite-languages">
              <File value="python">python</File>
              <File value="typescript">typescript</File>
            </Folder>
          </Folder>

          <Folder element="projects" value="projects">
            <File value="wishswipe">wishswipe</File>
            <File value="chain-log">chain log</File>
          </Folder>

          <Folder element="interesting-stuff" value="interesting-stuff">
            <File value="travel">travel</File>
            <File value="food">food</File>
          </Folder>

          <File value="resume">resume</File>
          <File value="linkedin">linkedin</File>
          <File value="github">github</File>
          <File value="email">email</File>
        </Folder>
      </Folder>
    </Tree>
  );
}
