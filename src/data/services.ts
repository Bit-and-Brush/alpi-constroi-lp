import ServiceOneImage from "@/assets/img/services/service-1.webp";
import ServiceTwoImage from "@/assets/img/services/service-2.webp";
import ServiceThreeImage from "@/assets/img/services/service-3.webp";
import type { ImageMetadata } from "astro";

export interface Service {
  title: string;
  description: string;
  image?: ImageMetadata;
}

export const services: Service[] = [
  {
    title: "Construção Civil",
    description:
      "Moradias urbanas e campestres construídas com os mais altos padrões de qualidade e acabamento, do projecto à entrega final.",
    image: ServiceOneImage,
  },
  {
    title: "Ramo Petrolífero",
    description:
      "Execução de obras públicas com rigor técnico, cumprindo prazos e especificações contratuais com total conformidade.",
    image: ServiceTwoImage,
  },
  {
    title: "Construção Industrial",
    description:
      "Fábricas, armazéns e espaços industriais construídos com tecnologia moderna e total conformidade com normas de segurança.",
    image: ServiceThreeImage,
  },
];
