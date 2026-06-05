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

export const projects: Record<"pt" | "en", Project[]> = {
  pt: [
    {
      title: "Moradia Urbana Contemporânea",
      problem:
        "Muitas moradias urbanas em fase de construção enfrentam o desafio de equilibrar estética moderna com funcionalidade, especialmente em climas quentes como Luanda. Fachadas expostas ao sol intenso, ausência de sombra adequada e acabamentos que degradam rapidamente tornam as habitações desconfortáveis e de difícil manutenção.",
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
  ],
  en: [
    {
      title: "Contemporary Urban Residence",
      problem:
        "Many urban homes under construction face the challenge of balancing modern aesthetics with functionality, especially in hot climates like Luanda. Facades exposed to intense sun, lack of adequate shading and finishes that quickly deteriorate make homes uncomfortable and difficult to maintain.",
      solution:
        "This residence takes an intelligent approach: a balcony with glazed balustrade to protect from wind without blocking light, natural stone cladding on the central facade for durability and thermal insulation, sliding aluminum and glass doors that facilitate cross-ventilation, and an earthy color palette that minimizes heat absorption. The side pool complements the climatic comfort of the outdoor space.",
      image: ProjectOneImage,
    },
    {
      title: "Leisure Space With Pool",
      problem:
        "In hot-climate urban areas, the lack of well-designed outdoor leisure spaces limits residents' quality of life. Outdoor areas without adequate shading, without organized social zones and without proper pool water treatment become unusable for much of the day, losing their functional and aesthetic value.",
      solution:
        "This leisure space responds to the challenge with a large pool with a light-coloured stone deck that reflects less heat, pergolas and metal covers over the outdoor dining area to protect from direct sun, and solid wood furniture resistant to climatic conditions. The layout of the spaces creates a fluid transition between the swimming, socializing and dining areas, making the exterior truly liveable and functional throughout the day.",
      image: ProjectTwoImage,
    },
    {
      title: "Animal Feed Factory",
      problem:
        "Animal feed production in Angola faces the challenge of inadequate industrial infrastructure — many units operate in improvised facilities, without temperature control, poor ventilation and no separation between production and administration areas. This compromises the quality of the final product, animal food safety and operational efficiency.",
      solution:
        "This industrial unit in pre-fabricated steel structure addresses these problems with fast and robust construction, grey thermally-insulating sheet cladding that reduces internal heat, a large glazed facade for natural lighting of the administrative floor, integrated ventilation in the side walls, and a loading ramp for goods in and out. The functional separation between production area and offices ensures organization, hygiene and efficient workflow.",
      image: ProjectThreeImage,
    },
  ],
};
