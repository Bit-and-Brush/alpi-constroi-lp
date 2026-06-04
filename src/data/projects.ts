import ProjectOneImage from "@/assets/img/projects/project-1.webp";
import ProjectTwoImage from "@/assets/img/projects/project-2.webp";
import ProjectThreeImage from "@/assets/img/projects/project-3.webp";
import type { ImageMetadata } from "astro";

export interface Project {
  title: string;
  problem: string;
  solution: string;
  image: ImageMetadata;
}

export const projects: Project[] = [
  {
    title: "Moradia Urbana Contemporânea",
    problem:
      "Muitas moradias urbanas em fase de construção enfrentam o desafio de equilibrar estética moderna com funcionalidade, especialmente em climas quentes como Luanda. Fachadas expostas ao sol intenso, ausência de sombreamento adequado e acabamentos que degradam rapidamente tornam as habitações desconfortáveis e de difícil manutenção.",
    solution:
      "Esta moradia adota uma abordagem inteligente: varanda com guarda-corpo envidraçado para proteger do vento sem bloquear a luz, revestimento em pedra natural na fachada central para durabilidade e isolamento térmico, portas de correr em alumínio e vidro que facilitam a ventilação cruzada, e uma paleta em tons terrosos que minimiza a absorção de calor. A piscina lateral complementa o conforto climático do espaço exterior.",
    image: ProjectOneImage,
  },
  {
    title: "Espaço De Lazer Com Piscina",
    problem:
      "Em zonas urbanas de clima quente, a falta de espaços de lazer ao ar livre bem concebidos limita a qualidade de vida dos moradores. Áreas exteriores sem sombreamento adequado, sem zonas de convívio organizadas e sem tratamento correto da água da piscina tornam-se inutilizáveis durante grande parte do dia, perdendo o seu valor funcional e estético.",
    solution:
      "Este espaço de lazer responde ao desafio com uma piscina de grande dimensão com deck em pedra clara que reflete menos calor, pérgolas e coberturas metálicas sobre a área de refeições ao ar livre para proteger do sol direto, e mobiliário em madeira maciça resistente às condições climáticas. A disposição dos espaços cria uma transição fluida entre a zona de banho, convívio e refeição, tornando o exterior verdadeiramente habitável e funcional durante todo o dia.",
    image: ProjectTwoImage,
  },
  {
    title: "Fábrica de Rações",
    problem:
      "A produção de rações em Angola enfrenta o desafio da falta de infraestruturas industriais adequadas — muitas unidades operam em instalações improvisadas, sem controlo de temperatura, ventilação deficiente e sem separação entre zonas de produção e administração. Isso compromete a qualidade do produto final, a segurança alimentar animal e a eficiência operacional.",
    solution:
      "Esta unidade industrial em estrutura metálica pré-fabricada resolve esses problemas com uma construção rápida e robusta, revestimento em chapa termoisolante cinza que reduz o calor interno, fachada envidraçada de grande dimensão para iluminação natural do piso administrativo, ventilação integrada nas paredes laterais, e rampa de acesso para cargas e descargas. A separação funcional entre área de produção e escritórios garante organização, higiene e fluxo de trabalho eficiente.",
    image: ProjectThreeImage,
  },
];
