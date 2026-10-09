import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Profile = "autonomo" | "particular" | "sociedad" | "residente" | "other";

type Errors = Partial<Record<"name" | "email" | "message" | "gdpr", string>>;

export function ContactForm() {
  const { t } = useI18n();
  const c = t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState<Profile>("autonomo");
  const [message, setMessage] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = c.errors.email;
    if (message.trim().length < 8) next.message = c.errors.message;
    if (!gdpr) next.gdpr = c.errors.gdpr;
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 500);
  }

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
          <Link to="/privacidad" className="text-forest underline-offset-4 hover:underline">
            {t.nav.privacy}
          </Link>
          .
        </span>
      </label>
      <FieldError>{errors.gdpr}</FieldError>
      <div>
        <Button type="submit" size="lg" disabled={sending} className={cn("min-w-44")}>
          {sending ? c.sending : c.submit}
        </Button>
      </div>
    </form>
  );
}
