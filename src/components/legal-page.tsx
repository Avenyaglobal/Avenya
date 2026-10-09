import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";

type Block = { h: string; p: string };

export function LegalPage({
  kind,
}: {
  kind: "legal" | "privacy";
}) {
  const { t, href } = useI18n();
  const page = kind === "legal" ? t.legal : t.privacy;

  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-forest">
          Avenya
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{page.updated}</p>
        <div className="mt-12 space-y-10">
          {page.blocks.map((block: Block) => (
            <section key={block.h}>
              <h2 className="font-display text-2xl font-medium text-ink">{block.h}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{block.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-16">
          <a
            href={href("/")}
            className="text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            ← Avenya
          </a>
        </p>
      </article>
    </SiteShell>
  );
}
