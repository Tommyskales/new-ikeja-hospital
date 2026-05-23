import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export default function Card({
  children,
  className = "",
  padding = true,
}: CardProps) {
  return (
    <div
      className={`bg-white border border-ink-100 rounded-2xl shadow-sm shadow-ink-900/[0.03] ${
        padding ? "p-5 sm:p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
