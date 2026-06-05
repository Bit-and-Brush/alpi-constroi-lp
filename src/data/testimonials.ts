export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Record<"pt" | "en", Testimonial[]> = {
  pt: [
    {
      name: "Manuel Silva",
      role: "Proprietário",
      quote:
        "Contratei a Alpiconstrói para a renovação completa da minha moradia e fiquei impressionado com a qualidade do trabalho. A equipa foi profissional, cumpriu os prazos e a atenção ao detalhe foi excepcional. Recomendo vivamente!",
    },
    {
      name: "Ana Carvalho",
      role: "Empresária",
      quote:
        "Contratei a Alpiconstrói para a renovação completa da minha moradia e fiquei impressionado com a qualidade do trabalho. A equipa foi profissional, cumpriu os prazos e a atenção ao detalhe foi excepcional. Recomendo vivamente!",
    },
    {
      name: "João Pereira",
      role: "Director Comercial",
      quote:
        "Contratei a Alpiconstrói para a renovação completa da minha moradia e fiquei impressionado com a qualidade do trabalho. A equipa foi profissional, cumpriu os prazos e a atenção ao detalhe foi excepcional. Recomendo vivamente!",
    },
    {
      name: "Luísa Costa",
      role: "Arquitecta",
      quote:
        "Contratei a Alpiconstrói para a renovação completa da minha moradia e fiquei impressionado com a qualidade do trabalho. A equipa foi profissional, cumpriu os prazos e a atenção ao detalhe foi excepcional. Recomendo vivamente!",
    },
  ],
  en: [
    {
      name: "Manuel Silva",
      role: "Property Owner",
      quote:
        "I hired Alpiconstrói for the complete renovation of my home and was impressed by the quality of the work. The team was professional, met deadlines and the attention to detail was exceptional. Highly recommended!",
    },
    {
      name: "Ana Carvalho",
      role: "Business Owner",
      quote:
        "I hired Alpiconstrói for the complete renovation of my home and was impressed by the quality of the work. The team was professional, met deadlines and the attention to detail was exceptional. Highly recommended!",
    },
    {
      name: "João Pereira",
      role: "Commercial Director",
      quote:
        "I hired Alpiconstrói for the complete renovation of my home and was impressed by the quality of the work. The team was professional, met deadlines and the attention to detail was exceptional. Highly recommended!",
    },
    {
      name: "Luísa Costa",
      role: "Architect",
      quote:
        "I hired Alpiconstrói for the complete renovation of my home and was impressed by the quality of the work. The team was professional, met deadlines and the attention to detail was exceptional. Highly recommended!",
    },
  ],
};
