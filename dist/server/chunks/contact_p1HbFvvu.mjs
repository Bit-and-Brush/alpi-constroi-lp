import { l as getEnv$1, k as createInvalidVariablesError, v as setOnSetGetEnv } from './server_DZMUv2Qb.mjs';
import { Resend } from 'resend';

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = Number.parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== void 0;
  if (isOptional && value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === void 0) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

const schema = {"RESEND_API_KEY":{"context":"server","access":"secret","optional":true,"type":"string"},"CONTACT_TO":{"context":"server","access":"secret","optional":true,"type":"string"},"CONTACT_FROM":{"context":"server","access":"secret","optional":true,"type":"string"}};

// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const getSecret = (key) => {
	return getEnv(key);
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

setOnSetGetEnv(() => {
	_internalGetSecret("RESEND_API_KEY");
_internalGetSecret("CONTACT_TO");
_internalGetSecret("CONTACT_FROM");

});
_internalGetSecret("RESEND_API_KEY");
_internalGetSecret("CONTACT_TO");
_internalGetSecret("CONTACT_FROM");

const prerender = false;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+244\s?)?[29]\d{2}\s?\d{3}\s?\d{3}$/;
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
const POST = async ({ request }) => {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (name.length < 2 || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || message.length < 10) {
    return json({ ok: false, error: "validation" }, 400);
  }
  const RESEND_API_KEY = getSecret("RESEND_API_KEY");
  const CONTACT_FROM = getSecret("CONTACT_FROM");
  const CONTACT_TO = getSecret("CONTACT_TO");
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    console.error(
      "Configuração de email em falta: definir RESEND_API_KEY, CONTACT_FROM e CONTACT_TO no ambiente."
    );
    return json({ ok: false, error: "config" }, 500);
  }
  const resend = new Resend(RESEND_API_KEY);
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
</div>`
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
