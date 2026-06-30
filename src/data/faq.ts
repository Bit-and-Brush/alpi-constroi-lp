export interface FAQ {
  question: string;
  answer: string;
}

export const faqItems: Record<"pt" | "en", FAQ[]> = {
  pt: [
    {
      question: "Que Tipos De Obras Realiza A Alpiconstrói?",
      answer:
        "A Alpiconstrói realiza obras residenciais (moradias urbanas e campestres, lazer, desporto), comerciais, industriais (fábricas, escritórios), obras públicas e infraestruturas, bem como trabalhos de requalificação e renovação de espaços existentes, incluindo carpintaria e serralharia.",
    },
    {
      question: "Como Determina A Alpiconstrói O Preço Dos Projectos?",
      answer:
        "Oferecemos preços competitivos sem comprometer a qualidade do serviço. O orçamento é elaborado após análise detalhada das especificações do projecto. Podemos ajustar os pacotes de serviço ao seu orçamento, garantindo sempre a melhor relação qualidade-preço.",
    },
    {
      question: "Os Técnicos Da Alpiconstrói São Licenciados E Segurados?",
      answer:
        "Sim. Todos os nossos técnicos são devidamente qualificados — Engenheiros, Arquitectos, Encarregados e profissionais especializados — e a empresa encontra-se regularmente inscrita e segurada, trabalhando com total conformidade com as normas legais em vigor.",
    },
    {
      question: "Com Que Rapidez A Alpiconstrói Responde A Pedidos Urgentes?",
      answer:
        "Entendemos que algumas situações requerem atenção imediata. A nossa equipa está disponível para responder rapidamente a pedidos urgentes. Contacte-nos directamente pelo telefone ou email e garantimos uma resposta no menor tempo possível.",
    },
  ],
  en: [
    {
      question: "What Types Of Work Does Alpiconstrói Carry Out?",
      answer:
        "Alpiconstrói carries out residential works (urban and rural homes, leisure, sports), commercial, industrial (factories, offices), public works and infrastructure, as well as refurbishment and renovation of existing spaces, including carpentry and metalwork.",
    },
    {
      question: "How Does Alpiconstrói Determine Project Prices?",
      answer:
        "We offer competitive prices without compromising service quality. The budget is prepared after a detailed analysis of the project specifications. We can adjust service packages to your budget, always ensuring the best value for money.",
    },
    {
      question: "Are Alpiconstrói's Technicians Licensed And Insured?",
      answer:
        "Yes. All our technicians are duly qualified — Engineers, Architects, Supervisors and specialist professionals — and the company is duly registered and insured, working in full compliance with current legal standards.",
    },
    {
      question: "How Quickly Does Alpiconstrói Respond To Urgent Requests?",
      answer:
        "We understand that some situations require immediate attention. Our team is available to respond quickly to urgent requests. Contact us directly by phone or email and we guarantee a response in the shortest possible time.",
    },
  ],
};
