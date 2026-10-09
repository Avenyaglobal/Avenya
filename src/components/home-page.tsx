import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { FiscalCalendar } from "@/components/fiscal-calendar";
import { Button } from "@/components/ui/button";
import type { CalendarPayload } from "@/lib/aeat-calendar";
import { useI18n } from "@/lib/i18n";

export function HomePage({ calendar }: { calendar: CalendarPayload }) {
  return (
    <>
      <Hero />
      <Strip />
      <Services />
      <CalendarBlock calendar={calendar} />
      <Approach />
      <Alicante />
      <Cases />
      <FaqBlock />
      <ContactBlock />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-20">
        <div>
          <p className="reveal text-xs font-medium uppercase tracking-eyebrow text-forest">
            {h.eyebrow}
          </p>
          <h1 className="reveal reveal-delay-1 mt-5 font-display text-5xl font-medium leading-tight tracking-display text-ink sm:text-6xl lg:text-7xl">
            {h.title}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {h.lead}
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#contacto">
                {h.primary}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#servicios">{h.secondary}</a>
            </Button>
          </div>
        </div>
        <figure className="reveal reveal-delay-1">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/photos/puerta-milenio.jpg?v=2"
              alt={t.contact.streetCaption}
              width={1600}
              height={1200}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            {t.contact.streetCaption}
          </figcaption>
        </figure>
      </div>
      <ul className="mx-auto grid max-w-6xl gap-6 border-t border-line px-5 py-8 sm:grid-cols-3 sm:px-8">
        {[h.location, h.hours, h.languages].map((line) => (
          <li key={line} className="font-display text-2xl leading-snug text-ink">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Strip() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <ul className="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 xl:grid-cols-5">
        {t.strip.items.map((item) => (
          <li key={item.k} className="bg-cream-deep px-5 py-6 sm:px-6">
            <p className="font-display text-2xl text-forest">{item.k}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.v}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Services() {
  const { t } = useI18n();
  const s = t.services;
  return (
    <section id="servicios" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <HeaderBlock eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <ol className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
        {s.items.map((item) => (
          <li key={item.n} className="border-t border-line pt-6">
            <p className="font-display text-sm tracking-wide text-forest">{item.n}</p>
            <h3 className="mt-2 font-display text-3xl font-medium text-ink">{item.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CalendarBlock({ calendar }: { calendar: CalendarPayload }) {
  const { t } = useI18n();
  const c = t.calendar;
  return (
    <section
      id="calendario"
      className="scroll-mt-24 border-y border-line bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <HeaderBlock eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <div className="mt-12">
          <FiscalCalendar calendar={calendar} />
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const { t } = useI18n();
  const a = t.approach;
  return (
    <section id="enfoque" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <HeaderBlock eyebrow={a.eyebrow} title={a.title} />
      <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {a.steps.map((step) => (
          <li key={step.n}>
            <p className="font-display text-4xl text-forest">{step.n}</p>
            <h3 className="mt-4 font-display text-2xl font-medium text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Alicante() {
  const { t } = useI18n();
  const a = t.alicante;
  return (
    <section id="alicante" className="scroll-mt-24 bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-eyebrow text-cream/70">
            {a.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-display sm:text-5xl">
            {a.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80">{a.body}</p>
          <ul className="mt-8 space-y-3 text-sm">
            {a.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-cream/80" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <figure>
          <div className="overflow-hidden rounded-lg">
            <img
              src="/photos/alicante-bay.jpg"
              alt={a.caption}
              width={1792}
              height={1008}
              className="aspect-video w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-cream/55">{a.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Cases() {
  const { t } = useI18n();
  const c = t.cases;
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <HeaderBlock eyebrow={c.eyebrow} title={c.title} />
          <figure className="mt-10 hidden overflow-hidden rounded-lg lg:block">
            <img
              src="/photos/studio-desk.jpg"
              alt={t.alicante.deskCaption}
              width={1600}
              height={1200}
              className="aspect-4/3 w-full object-cover"
            />
          </figure>
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {c.items.map((item, i) => (
            <li key={item.title} className="py-6">
              <p className="text-xs tabular-nums text-forest">0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqBlock() {
  const { t } = useI18n();
  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <HeaderBlock eyebrow={t.faq.eyebrow} title={t.faq.title} />
      <div className="mt-12">
        <FaqList />
      </div>
    </section>
  );
}

function ContactBlock() {
  const { t } = useI18n();
  const c = t.contact;
  const address = c.aside.slice(0, 3);
  const hours = c.aside.slice(3, 5);
  const note = c.aside[5];
  const actions = c.channels.filter((channel) => !channel.href.includes("avenyaglobal.com"));

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-forest">{c.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-display text-ink sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="order-1 rounded-xl bg-paper p-6 shadow-[0_18px_50px_-28px_rgba(26,74,54,0.55)] ring-1 ring-forest/20 sm:p-8 lg:order-2 lg:p-10">
            <ContactForm />
          </div>

          <aside className="order-2 lg:order-1">
            <p className="text-xs uppercase tracking-eyebrow text-muted">{c.asideTitle}</p>
            <address className="mt-4 space-y-1 text-base not-italic leading-relaxed text-ink">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-5 text-sm font-medium text-ink">{hours.join(" · ")}</p>
            {note ? <p className="mt-1 text-sm text-ink-soft">{note}</p> : null}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {actions.map((channel) => {
                const external = channel.href.startsWith("http");
                return (
                  <a
                    key={channel.href}
                    href={channel.href}
                    className="inline-flex h-11 items-center justify-center rounded-sm bg-cream-deep px-4 text-sm font-medium text-forest transition-colors hover:bg-moss"
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {channel.label}
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function HeaderBlock({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-medium uppercase tracking-eyebrow text-forest">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-display text-ink sm:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{lead}</p>
      ) : null}
    </div>
  );
}
