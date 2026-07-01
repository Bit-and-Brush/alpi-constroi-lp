<?php

/**
 * Template de configuração do endpoint de contato.
 *
 * No servidor (cPanel), copie este arquivo para `config.php` na MESMA pasta
 * (public_html/api/config.php) e preencha com os valores reais do Resend.
 * O `config.php` real NUNCA deve ser commitado (já está no .gitignore).
 *
 * Alternativa: definir as variáveis via ambiente (getenv) — o contact.php lê
 * o ambiente primeiro e usa este arquivo apenas como fallback.
 */

return [
    // Chave de API do Resend — https://resend.com/api-keys
    'RESEND_API_KEY' => 're_xxxxxxxxxxxxxxxxxxxxxxxx',

    // Caixa que recebe os contatos.
    'CONTACT_TO'     => 'geral@alpiconstroi.com',

    // Remetente — o domínio precisa estar verificado no Resend.
    // Para testar sem domínio verificado, use: 'onboarding@resend.dev'
    'CONTACT_FROM'   => 'Alpi Constroi <site@alpiconstroi.com>',
];
