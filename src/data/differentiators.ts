export interface Differentiator {
  description: string;
}

export const differentiators: Record<"pt" | "en", Differentiator[]> = {
  pt: [
    {
      description:
        "Escolher a Alpiconstrói significa optar por preços competitivos sem comprometer a qualidade do serviço. Tornamos os nossos serviços acessíveis aos proprietários, oferecendo renovações completas.",
    },
    {
      description:
        "A nossa gestão de projecto transparente e completa garante que está sempre informado e envolvido em cada etapa do processo.",
    },
    {
      description:
        "Priorizamos a segurança de colaboradores, parceiros e da comunidade, implementando rigorosas normas de segurança do trabalho.",
    },
    {
      description:
        "Adaptamos os nossos projectos às necessidades específicas de cada cliente, oferecendo soluções personalizadas e eficientes.",
    },
  ],
  en: [
    {
      description:
        "Choosing Alpiconstrói means opting for competitive prices without compromising service quality. We make our services accessible to property owners, offering complete renovations.",
    },
    {
      description:
        "Our transparent and comprehensive project management ensures you are always informed and involved at every stage of the process.",
    },
    {
      description:
        "We prioritize the safety of employees, partners and the community, implementing strict workplace safety standards.",
    },
    {
      description:
        "We tailor our projects to the specific needs of each client, offering personalized and efficient solutions.",
    },
  ],
};
