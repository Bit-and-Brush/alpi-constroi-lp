import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+244\s?)?[29]\d{2}\s?\d{3}\s?\d{3}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  // Re-validar no servidor com as mesmas regras do client (Contact.astro).
  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    !PHONE_RE.test(phone) ||
    message.length < 10
  ) {
    return json({ ok: false, error: "validation" }, 400);
  }

  // Ler os segredos em runtime. getSecret devolve undefined (em vez de lançar)
  // quando a variável não está definida no ambiente — ex.: esquecida no
  // "Setup Node.js App" do cPanel. Assim respondemos de forma graciosa em vez
  // de rebentar o módulo.
  const RESEND_API_KEY = getSecret("RESEND_API_KEY");
  const CONTACT_FROM = getSecret("CONTACT_FROM");
  const CONTACT_TO = getSecret("CONTACT_TO");

  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    console.error(
      "Configuração de email em falta: definir RESEND_API_KEY, CONTACT_FROM e CONTACT_TO no ambiente.",
    );
    return json({ ok: false, error: "config" }, 500);
  }

  const resend = new Resend(RESEND_API_KEY);

  // Endereço fixo do domínio verificado (CONTACT_FROM), mas o nome exibido
  // vem do form. Sanitiza o nome para não quebrar o header do email.
  const safeName = name.replace(/[\r\n"\\<>]/g, "").trim();
  const from = `"${safeName} (via site)" <${CONTACT_FROM}>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Novo contato do site — ${name}`,
      text: `Novo contato pelo formulário do site:

Nome: ${name}
Email: ${email}
Telefone: ${phone}

Mensagem:
${message}`,
      html: `<div style="background:#ece8e1;padding:40px 16px;font-family:'Inter',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr><td style="padding:0 0 18px 0;">
      <span style="font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#9a7b5a;">Alpi constrói</span>
    </td></tr>
    <tr><td style="background:#fff;border:1px solid #e2dcd1;border-radius:18px;">
      <div style="padding:34px 36px 26px;border-bottom:1px solid #efeae1;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#2a241d;">Novo contato pelo site</h1>
        <p style="margin:4px 0 0;font-size:13px;color:#8a8378;">Recebido pelo formulário</p>
      </div>
      <table role="presentation" width="100%" style="padding:10px 36px;">
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Nome</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">${escapeHtml(name)}</div>
        </td></tr>
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Email</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">${escapeHtml(email)}</div>
        </td></tr>
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Telefone</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">${escapeHtml(phone)}</div>
        </td></tr>
      </table>
      <div style="padding:18px 36px 34px;">
        <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:10px;">Mensagem</div>
        <div style="background:#f7f4ee;border:1px solid #ece6db;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.6;color:#3a342b;">${escapeHtml(message).replace(/\n/g, "<br>")}</div>
        <a href="mailto:${escapeHtml(email)}" style="display:inline-block;margin-top:22px;background:#2a241d;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 22px;border-radius:10px;">Responder ao contato →</a>
      </div>
    </td></tr>
  </table>
</div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return json({ ok: false, error: "send_failed" }, 500);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("Contact endpoint error:", err);
    return json({ ok: false, error: "send_failed" }, 500);
  }
};
