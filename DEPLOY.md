# Deploy no cPanel — formulário de contato (Resend)

O site é um Astro **estático**. O envio do formulário usa um endpoint **PHP**
(`/api/contact.php`) que chama a API REST do Resend. Não há app Node/Passenger.

## 1. Pré-requisito: verificar o domínio no Resend (uma vez)

1. No painel do Resend, adicione o domínio `alpiconstroi.com`.
2. Crie no **Zone Editor** do cPanel os registros DNS (SPF/DKIM) que o Resend indicar.
3. Aguarde a verificação. Só depois é possível enviar de `site@alpiconstroi.com`.

> Para testar **antes** de verificar: use `CONTACT_FROM = 'onboarding@resend.dev'` e
> `CONTACT_TO` = o e-mail da sua conta Resend.

## 2. Build local

```bash
pnpm install
pnpm build
```

Gera `dist/`, incluindo `dist/api/contact.php`, `dist/api/config.example.php` e
`dist/api/.htaccess`.

## 3. Subir para o servidor

Envie o conteúdo de `dist/` para `public_html/` (File Manager, FTP ou git pull — conforme o
fluxo atual de versionar `dist/`).

## 4. Configurar os segredos no servidor (uma vez)

Dentro de `public_html/api/`, crie o arquivo **`config.php`** (copie de `config.example.php`)
com os valores reais:

```php
<?php
return [
  'RESEND_API_KEY' => 're_sua_chave_real',
  'CONTACT_TO'     => 'geral@alpiconstroi.com',
  'CONTACT_FROM'   => 'Alpi Constroi <site@alpiconstroi.com>',
];
```

- **Não commite** o `config.php` (já está no `.gitignore`).
- Ele fica só no servidor e sobrevive a novos deploys (não vem do `dist/`).
- Permissão recomendada: `644` (ou `600`).

> Alternativa sem arquivo: definir `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` como
> variáveis de ambiente (ex.: `SetEnv` no `.htaccess` do `public_html`). O `contact.php`
> lê o ambiente primeiro e usa o `config.php` apenas como fallback.

## 5. Testar

Abra o site, envie o formulário e confirme a chegada do e-mail em `CONTACT_TO`.

Teste direto do endpoint:

```bash
curl -i -X POST https://alpiconstroi.com/api/contact.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Teste","email":"voce@exemplo.com","phone":"923 456 789","message":"Mensagem de teste com mais de dez caracteres."}'
```

Resposta esperada: `HTTP 200` com `{"ok":true}`.

## Diagnóstico de erros

| Resposta | Causa provável |
|---|---|
| `{"ok":false,"error":"config"}` (500) | `config.php` ausente ou sem `RESEND_API_KEY` |
| `{"ok":false,"error":"validation"}` (400) | Campos inválidos no payload |
| `{"ok":false,"error":"send"}` (502) | Resend recusou (domínio não verificado, `from` inválido, chave errada). Ver o log de erros do PHP no cPanel. |
| `405` | Método diferente de POST |

> O endpoint nunca retorna a chave nem o erro cru do Resend ao cliente — detalhes vão para o
> log de erros do PHP (`error_log`).
