# Deploy — Alpi Constrói (cPanel + Phusion Passenger)

Guia dos passos **manuais** (fora do código) para colocar o site em produção e
garantir que o formulário de contacto envia email através do [Resend](https://resend.com).

O site é Astro em SSR com o adapter `@astrojs/node` em `mode: "middleware"`. A maior
parte das páginas é estática; só o endpoint `POST /api/contact` corre no servidor.
A app é arrancada pelo Passenger através do servidor Express em
[`server.mjs`](server.mjs).

---

## 1. Modelo de deploy

O **build é feito localmente** e o resultado (`dist/`) é versionado no Git:

```bash
pnpm install
pnpm build      # gera dist/ (cliente estático + servidor SSR)
git add dist/ && git commit && git push
```

No servidor (cPanel), o fluxo é: **pull → instalar dependências → restart**.

- `dist/` está versionado — não é preciso compilar no servidor.
- `node_modules/` **não** está versionado — tem de ser instalado no servidor
  (ver passo 4).
- [`server.mjs`](server.mjs) serve os estáticos de `dist/client` e encaminha o
  SSR e as rotas de API (`/api/contact`).

---

## 2. Configurar a app em *Setup Node.js App*

No cPanel, abrir **Setup Node.js App** e criar/editar a aplicação:

| Campo | Valor |
| --- | --- |
| **Node.js version** | ≥ 22.12.0 (ver `engines` no `package.json`) |
| **Application mode** | Production |
| **Application root** | a pasta onde fica o repositório |
| **Application URL** | o domínio/subdomínio do site |
| **Application startup file** | `server.mjs` |

> A porta é injetada pelo Passenger em runtime; [`server.mjs`](server.mjs) lê-a de
> `process.env.PORT` (localmente usa `4321`). **Não** definir `PORT` à mão.

---

## 3. Variáveis de ambiente (passo crítico)

Ainda em **Setup Node.js App → Environment variables**, definir **exatamente** estas
três variáveis (são os nomes usados pelo código em
[`src/pages/api/contact.ts`](src/pages/api/contact.ts)):

| Variável | Descrição |
| --- | --- |
| `RESEND_API_KEY` | Chave de API do Resend (https://resend.com/api-keys) |
| `CONTACT_TO` | Caixa que recebe os contactos do site (ex.: `geral@alpiconstroi.com`) |
| `CONTACT_FROM` | Endereço **de um domínio verificado** no Resend (ex.: `site@alpiconstroi.com`) |

Regras importantes:

- As variáveis são lidas **em runtime** via `process.env` (o `astro:env/server`
  resolve para `process.env` no build de produção). **Nunca** usar `import.meta.env`
  para segredos — o Vite substituiria o valor em *build time* e em produção sairia
  `undefined`.
- **Não** depender de um ficheiro `.env` em produção. O `.env` serve apenas para
  desenvolvimento local; o output do `@astrojs/node` não carrega dotenv em runtime.
- Nenhum segredo pode ter prefixo `PUBLIC_` (isso exporia-o ao bundle do cliente).
- O `.env` **não** está versionado (está no `.gitignore`). O `.env.example` mostra o
  formato esperado, sem valores reais.

Se alguma destas variáveis faltar, o endpoint responde de forma graciosa com
**500** e `{"ok":false,"error":"config"}`, registando um erro claro nos logs (sem
crashar o módulo).

---

## 4. Após cada deploy

1. Fazer o **pull** das alterações para a Application root.
2. Na UI do *Setup Node.js App*, clicar em **Run NPM Install** — instala as
   `dependencies` (incluindo o `resend`) em `node_modules`.
   > O repositório usa **pnpm** (`pnpm-lock.yaml`), mas a UI do cPanel corre
   > `npm install` a partir do `package.json`. Funciona à mesma — o importante é que
   > o `resend` está em `dependencies` (e não em `devDependencies`), por isso fica
   > disponível em produção.
3. Clicar em **Restart**.

---

## 5. Restart obrigatório após mudar o ambiente

O Passenger só relê as variáveis de ambiente **no restart**. Sempre que alterar
qualquer variável em *Environment variables*, é preciso clicar em **Restart** na UI
do *Setup Node.js App* — caso contrário a app continua a usar os valores antigos.

---

## 6. Verificar o domínio no Resend (DNS via *Zone Editor*)

Para enviar a partir do próprio domínio (`CONTACT_FROM`), é necessário verificá-lo no
Resend:

1. No dashboard do Resend → **Domains → Add Domain**, adicionar `alpiconstroi.com`.
2. No cPanel → **Zone Editor** do domínio, criar os registos que o Resend indicar:
   - **TXT (SPF)** — autoriza o Resend a enviar pelo domínio.
   - **DKIM** (CNAME/TXT) — assinatura das mensagens.
   - **MX** (opcional) — para o subdomínio de *return-path*/bounces.
3. Voltar ao dashboard do Resend e clicar em **Verify**.

> Enquanto o domínio **não** estiver verificado, só é possível enviar a partir de
> `onboarding@resend.dev`. Para testar nesse estado, definir
> `CONTACT_FROM=onboarding@resend.dev`.

---

## 7. Troubleshooting

| Sintoma | Causa provável | Resolução |
| --- | --- | --- |
| `Cannot find module 'resend'` | `resend` foi parar a `devDependencies` ou faltou o install | Confirmar que está em `dependencies` e correr **Run NPM Install** |
| Email não sai; variável `undefined` | Esqueceu o **Restart**, ou usou `import.meta.env` | Restart da app; usar sempre `process.env` / `getSecret` para segredos |
| Formulário devolve **500** `error:"config"` | `RESEND_API_KEY`/`CONTACT_FROM`/`CONTACT_TO` em falta no ambiente | Definir as três variáveis e **Restart** |
| Envio rejeitado pelo Resend (`from` inválido) | Domínio ainda não verificado | Verificar o domínio (passo 6) ou usar `onboarding@resend.dev` |
