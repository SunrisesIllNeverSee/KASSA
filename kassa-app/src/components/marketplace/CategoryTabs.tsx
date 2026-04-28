"use client";

import { categories } from "@/lib/data";

interface CategoryTabsProps {
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
            active === cat.slug
              ? "bg-obsidian text-bone"
              : "bg-sandstone/50 text-driftwood hover:bg-sandstone hover:text-obsidian"
          }`}
        >
          {cat.label}
          <span className="ml-1 text-[10px] opacity-60">{cat.count}</span>
        </button>
      ))}
    </div>
  );
}
