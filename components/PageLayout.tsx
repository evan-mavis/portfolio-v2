import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface PageLayoutProps {
  title?: string | ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function PageLayout({
  title,
  children,
  className = "",
  titleClassName = "",
}: PageLayoutProps) {
  return (
    <main className={`min-h-screen relative ${className}`}>
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors p-4"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg">Back</span>
      </Link>

      <div className="w-full mt-16 relative z-10">
        {title && (
          <div className={`text-center mb-8 ${titleClassName}`}>
            {typeof title === "string" ? (
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            ) : (
              title
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
