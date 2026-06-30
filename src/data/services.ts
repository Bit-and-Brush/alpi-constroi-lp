import type { ImageMetadata } from "astro";
import ServiceOneImage from "@/assets/img/services/service-1.webp";
import ServiceTwoImage from "@/assets/img/services/service-2.webp";
import ServiceThreeImage from "@/assets/img/services/service-3.webp";

export interface Service {
  title: string;
  description: string;
  image?: ImageMetadata;
}

export const services: Record<"pt" | "en", Service[]> = {
  pt: [
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
  ],
  en: [
    {
      title: "Civil Construction",
      description:
        "Urban and rural homes built with the highest quality and finishing standards, from design to final delivery.",
      image: ServiceOneImage,
    },
    {
      title: "Petroleum Sector",
      description:
        "Execution of public works with technical rigour, meeting deadlines and contractual specifications with full compliance.",
      image: ServiceTwoImage,
    },
    {
      title: "Industrial Construction",
      description:
        "Factories, warehouses and industrial spaces built with modern technology and full compliance with safety standards.",
      image: ServiceThreeImage,
    },
  ],
};
