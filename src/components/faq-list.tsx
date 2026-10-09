import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FaqList() {
  const { t } = useI18n();
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
      {t.faq.items.map((item, i) => (
        <Accordion.Item key={item.q} value={`f-${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-forest">
              <span className="font-display text-xl font-medium leading-snug text-ink group-hover:text-forest sm:text-2xl">
                {item.q}
              </span>
              <ChevronDown className="mt-1 size-5 shrink-0 text-muted transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-soft sm:text-base">
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
