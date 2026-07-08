export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot anti-spam: sempre vazio para humanos. */
  website?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<{
  success: boolean;
  error?: string;
  details?: Record<string, unknown>;
}> {
  try {
    const res = await fetch("/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return { success: true };
    }
    try {
      const details = await res.json();
      return {
        success: false,
        error: details.error ?? "Erro ao enviar mensagem",
        details,
      };
    } catch {
      return { success: false, error: "Erro ao enviar mensagem" };
    }
  } catch {
    return { success: false, error: "Erro ao enviar mensagem" };
  }
}
