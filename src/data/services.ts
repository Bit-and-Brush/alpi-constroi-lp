export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Construção Civil",
    description:
      "Execução de projetos de construção desde a fundação até à conclusão, com rigor técnico e respeito pelos prazos.",
    icon: "building-2",
  },
  {
    title: "Remodelações",
    description:
      "Renovação e modernização de imóveis residenciais e comerciais, adaptando espaços às suas necessidades.",
    icon: "hammer",
  },
  {
    title: "Consultoria Técnica",
    description:
      "Orientação especializada em projetos de construção, orçamentação e gestão de obra.",
    icon: "clipboard-list",
  },
  {
    title: "Acabamentos",
    description:
      "Serviços de acabamento de qualidade, incluindo pavimentos, azulejos, pintura e revestimentos.",
    icon: "palette",
  },
];
