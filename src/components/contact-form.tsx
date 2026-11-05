import { useState, type FormEvent } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState<Profile>("autonomo");
  const [message, setMessage] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [honey, setHoney] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [mailFailed, setMailFailed] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = c.errors.email;
    if (message.trim().length < 8) next.message = c.errors.message;
    if (!gdpr) next.gdpr = c.errors.gdpr;
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    if (honey) {
      setDone(true);
      return;
    }
    setSending(true);
    setMailFailed(false);
    try {
      const res = await fetch(`https://shipmyform.com/to/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: new URLSearchParams({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          profile: PROFILE_ES[profile],
          message: message.trim(),
          _subject: `Consulta web — ${PROFILE_ES[profile]} — ${name.trim()}`,
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
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      profile: PROFILE_ES[profile],
      message: message.trim(),
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
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setGdpr(false);
            setErrors({});
          }}
        >
          {c.another}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <input
        type="text"
        name="_gotcha"
        value={honey}
        onChange={(event) => setHoney(event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{c.name}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{c.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">{c.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="profile">{c.profile}</Label>
          <Select
            id="profile"
            name="profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value as Profile)}
          >
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
          value={message}
          placeholder={c.messagePh}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
        />
        <FieldError>{errors.message}</FieldError>
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-forest"
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
        />
        <span>
          {c.gdpr}{" "}
          <a href={href("/privacidad")} className="text-forest underline-offset-4 hover:underline">
            {t.nav.privacy}
          </a>
          .
        </span>
      </label>
      <FieldError>{errors.gdpr}</FieldError>
      <div>
        <Button type="submit" size="lg" disabled={sending} className={cn("min-w-44")}>
          {sending ? c.sending : c.submit}
        </Button>
        {mailFailed ? (
          <Button asChild size="lg" variant="outline" className="mt-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {c.whatsapp}
            </a>
          </Button>
        ) : null}
        <FieldError>{errors.send}</FieldError>
      </div>
    </form>
  );
}
