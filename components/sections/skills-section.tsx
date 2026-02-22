"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SKILLS } from "@/lib/constants";

export function SkillsSection() {
  const entries = Object.entries(SKILLS);

  return (
    <section id="skills" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.22em] text-[var(--accent-secondary)] uppercase">
            Stack & Tools
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Skills
          </h2>
        </div>
        <Tabs defaultValue={entries[0]?.[0]} className="glass-card p-5">
          <TabsList className="w-full flex-wrap bg-transparent p-0">
            {entries.map(([category]) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category.replace(/([A-Z])/g, " $1")}
              </TabsTrigger>
            ))}
          </TabsList>
          {entries.map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div key={item} className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
