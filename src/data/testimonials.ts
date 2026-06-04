export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Excelente trabalho! A Alpi Constroi executou a remodelação da nossa casa com perfeição. Recomendo vivamente!",
    name: "João Silva",
    company: "Cliente Particular",
    rating: 5,
  },
  {
    quote:
      "Profissionais muito dedicados e atentos aos detalhes. O projeto foi entregue no prazo e com qualidade notável.",
    name: "Maria Santos",
    company: "Proprietária de Imóvel",
    rating: 5,
  },
  {
    quote:
      "Trabalhar com a Alpi Constroi foi uma excelente experiência. Equipa competente e muito responsável.",
    name: "Pedro Costa",
    company: "Empresário Imobiliário",
    rating: 5,
  },
  {
    quote:
      "Confiamos na Alpi Constroi para a construção do nosso edifício comercial. Superaram as nossas expectativas.",
    name: "Ana Oliveira",
    company: "Diretora de Desenvolvimento",
    rating: 5,
  },
];
