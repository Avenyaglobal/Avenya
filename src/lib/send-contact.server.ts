const INBOX = "avenyaglobal@gmail.com";

export async function deliverContact(input: {
  name: string;
  email: string;
  phone: string;
  profile: string;
  message: string;
}) {
  const response = await fetch(`https://shipmyform.com/to/${INBOX}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Origin: "https://www.avenyaglobal.com",
      Referer: "https://www.avenyaglobal.com/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    },
    body: new URLSearchParams({
      name: input.name,
      email: input.email,
      phone: input.phone,
      profile: input.profile,
      message: input.message,
      _subject: `Consulta web — ${input.profile} — ${input.name}`,
      _replyto: input.email,
      _gotcha: "",
    }),
  });
  const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!response.ok || payload?.ok === false) {
    throw new Error("send");
  }
  return { ok: true as const };
}
