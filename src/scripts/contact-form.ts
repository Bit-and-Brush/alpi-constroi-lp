export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot anti-spam: sempre vazio para humanos. */
  website?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    return { success: true };
  } catch {
    return { success: false };
  }
}
