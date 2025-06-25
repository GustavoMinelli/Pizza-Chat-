import React from "react";

interface InfoCardProps {
  readonly title?: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export default function InfoCard({ title, description, icon, className = "", children }: InfoCardProps) {
  return (
    <div className={`flex flex-col justify-center max-w-lg rounded-[2.5rem] px-8 py-6 p-6 bg-white shadow-xl border border-gray-200 mb-0 backdrop-blur-md ${className}`}>
      {(icon || title) && (
        <span className={`text-lg font-semibold text-gray-700 mb-1 ${!icon ? "" : "flex"} items-center gap-2 ${!description && !children ? "text-5xl font-extrabold text-gray-800 drop-shadow-xl tracking-tight select-none px-4 py-2 animate-fade-in justify-center" : ""}`}>
          {icon}
          {title}
        </span>
      )}
      {description && <span className="text-base text-gray-500">{description}</span>}
      {children}
    </div>
  );
}
