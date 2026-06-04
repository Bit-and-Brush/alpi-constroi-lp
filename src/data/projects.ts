export interface Project {
  title: string;
  category: string;
  image: string;
  year: number;
}

export const projects: Project[] = [
  {
    title: "Morada Moderna — Vila",
    category: "Construção Residencial",
    image: "/images/projects/project-1.jpg",
    year: 2024,
  },
  {
    title: "Remodelação Loja Centro",
    category: "Remodelação Comercial",
    image: "/images/projects/project-2.jpg",
    year: 2024,
  },
  {
    title: "Edifício Multifamiliar — 6 Pisos",
    category: "Construção Residencial",
    image: "/images/projects/project-3.jpg",
    year: 2023,
  },
  {
    title: "Restauro Casa Histórica",
    category: "Remodelação Residencial",
    image: "/images/projects/project-4.jpg",
    year: 2023,
  },
  {
    title: "Espaço Comercial Premium",
    category: "Construção Comercial",
    image: "/images/projects/project-5.jpg",
    year: 2023,
  },
  {
    title: "Apartamento Remodelado",
    category: "Remodelação Residencial",
    image: "/images/projects/project-6.jpg",
    year: 2022,
  },
];
