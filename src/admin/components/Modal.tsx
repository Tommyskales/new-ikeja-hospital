import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  } as const;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-ink-950/30 max-h-[92vh] flex flex-col reveal`}
      >
        <div className="px-7 py-5 border-b border-ink-100 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-xl text-ink-900">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-ink-500 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-ink-50 hover:bg-ink-100 grid place-items-center text-ink-700 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-6">{children}</div>
        {footer && (
          <div className="px-7 py-4 border-t border-ink-100 flex items-center justify-end gap-3 bg-ink-50/50 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
