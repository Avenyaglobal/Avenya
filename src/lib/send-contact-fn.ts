import { createServerFn } from "@tanstack/react-start";

export const sendContact = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      email: string;
      phone: string;
      profile: string;
      message: string;
    }) => {
      const name = input.name.trim();
      const email = input.email.trim();
      const message = input.message.trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 8) {
        throw new Error("invalid");
      }
      return {
        name,
        email,
        phone: input.phone.trim(),
        profile: input.profile.trim() || "Autónomo",
        message,
      };
    },
  )
  .handler(async ({ data }) => {
    const { deliverContact } = await import("./send-contact.server.ts");
    return deliverContact(data);
  });
