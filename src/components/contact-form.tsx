import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Profile = "autonomo" | "particular" | "sociedad" | "residente" | "other";

type Errors = Partial<Record<"name" | "email" | "message" | "gdpr" | "send", string>>;

const PROFILE_ES: Record<Profile, string> = {
  autonomo: "Autónomo",
  particular: "Particular",
  sociedad: "Sociedad",
  residente: "No residente",
  other: "Otra",
};

const EMAIL = "avenyaglobal@gmail.com";
const WHATSAPP = "34695343196";

function whatsappText(input: {
  name: string;
  email: string;
  phone: string;
  profile: string;
  message: string;
}) {
  const lines = [
    "Consulta desde la web Avenya",
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
  ];
  if (input.phone) lines.push(`Teléfono: ${input.phone}`);
  lines.push(`Situación: ${input.profile}`, "", input.message);
  return lines.join("\n");
}

export function ContactForm() {
  const { t, href } = useI18n();
  const c = t.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [profileLabel, setProfileLabel] = useState(PROFILE_ES.autonomo);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [mailFailed, setMailFailed] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const active = document.activeElement;
    if (active instanceof HTMLElement && form.contains(active)) active.blur();
    const data = new FormData(form);
    const nextName = String(data.get("name") ?? "");
    const nextEmail = String(data.get("email") ?? "");
    const nextPhone = String(data.get("phone") ?? "");
    const nextProfile = (String(data.get("profile") || "autonomo") as Profile) || "autonomo";
    const nextMessage = String(data.get("message") ?? "");
    const nextGdpr = data.get("gdpr") === "on";
    const situation = PROFILE_ES[nextProfile] ?? PROFILE_ES.autonomo;
    setProfileLabel(situation);
    setDraft({
      name: nextName.trim(),
      email: nextEmail.trim(),
      phone: nextPhone.trim(),
      message: nextMessage.trim(),
    });

    const next: Errors = {};
    if (!nextName.trim()) next.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail.trim())) next.email = c.errors.email;
    if (nextMessage.trim().length < 8) next.message = c.errors.message;
    if (!nextGdpr) next.gdpr = c.errors.gdpr;
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector("[data-field-error]")?.scrollIntoView({ block: "center" });
      return;
    }
    setSending(true);
    setMailFailed(false);
    try {
      const res = await fetch(`https://shipmyform.com/to/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: new URLSearchParams({
          name: nextName.trim(),
          email: nextEmail.trim(),
          phone: nextPhone.trim(),
          profile: situation,
          message: nextMessage.trim(),
          _subject: `Consulta web — ${situation} — ${nextName.trim()}`,
          _gotcha: "",
        }),
      });
      const payload = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || payload?.ok === false) throw new Error("send");
      setDone(true);
    } catch {
      setMailFailed(true);
      setErrors({ send: c.errors.send });
    } finally {
      setSending(false);
    }
  }

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    whatsappText({
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      profile: profileLabel,
      message: draft.message,
    }),
  )}`;

  if (done) {
    return (
      <div className="rounded-xl bg-paper p-8 shadow-[var(--shadow-border)] sm:p-10">
        <p className="font-display text-3xl text-forest">{c.successTitle}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          {c.successBody}
        </p>
        <Button
          className="mt-8"
          variant="outline"
          type="button"
          onClick={() => {
            setDone(false);
            setDraft({ name: "", email: "", phone: "", message: "" });
            setErrors({});
            formRef.current?.reset();
          }}
        >
          {c.another}
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{c.name}</Label>
          <Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{c.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">{c.phone}</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="profile">{c.profile}</Label>
          <Select id="profile" name="profile" defaultValue="autonomo">
            <option value="autonomo">{c.profiles.autonomo}</option>
            <option value="particular">{c.profiles.particular}</option>
            <option value="sociedad">{c.profiles.sociedad}</option>
            <option value="residente">{c.profiles.residente}</option>
            <option value="other">{c.profiles.other}</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{c.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={c.messagePh}
          aria-invalid={Boolean(errors.message)}
        />
        <FieldError>{errors.message}</FieldError>
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          name="gdpr"
          className="mt-0.5 size-6 shrink-0 accent-forest"
        />
        <span>
          {c.gdpr}{" "}
          <a href={href("/privacidad")} className="text-forest underline-offset-4 hover:underline">
            {t.nav.privacy}
          </a>
          .
        </span>
      </label>
      {errors.gdpr || errors.send ? (
        <p data-field-error className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {errors.gdpr || errors.send}
        </p>
      ) : null}
      <div>
        <Button
          type="submit"
          size="lg"
          disabled={sending}
          className={cn("min-w-44")}
          onMouseDown={(event) => event.preventDefault()}
        >
          {sending ? c.sending : c.submit}
        </Button>
        {mailFailed ? (
          <Button asChild size="lg" variant="outline" className="mt-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {c.whatsapp}
            </a>
          </Button>
        ) : null}
      </div>
    </form>
  );
}
