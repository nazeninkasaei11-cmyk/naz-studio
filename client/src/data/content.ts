import type { Project, Service, Article } from "@shared/schema";

export const projects: Project[] = [
  {
    id: 1,
    title: "Stafford Heights",
    description: "A tailored renovation focusing on lifestyle and functionality.",
    imageUrl: "/images/stafford-heights-main.jpg",
    images: [
      "/images/stafford-heights-stairs.jpg",
      "/images/stafford-heights-stairs-2.jpg",
      "/images/stafford-heights-chandelier.jpg",
      "/images/stafford-heights-games-room.jpg",
    ],
    category: "Residential",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Mariendorf Berlin",
    description: "Seamless intersection of architecture and interiors.",
    imageUrl: "/images/mariendorf-berlin-main.jpg",
    images: [
      "/images/mariendorf-berlin-exterior.webp",
      "/images/mariendorf-berlin-entrance.webp",
      "/images/mariendorf-berlin-courtyard.webp",
      "/images/mariendorf-berlin-street.webp",
    ],
    category: "Residential",
    isFeatured: false,
  },
  {
    id: 3,
    title: "The Connoisseur's Corner",
    description: "An exquisite residential space designed for refined living and sophisticated taste.",
    imageUrl: "/images/connoisseurs-corner-main.jpg",
    images: [
      "/images/connoisseurs-corner-bar.jpg",
      "/images/connoisseurs-corner-lounge.jpg",
      "/images/connoisseurs-corner-full-bar.jpg",
      "/images/connoisseurs-corner-side-view.jpg",
    ],
    category: "Residential",
    isFeatured: false,
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Interior Design",
    description: "Full service interior design from concept to completion.",
    imageUrl: "/images/interior-design.jpg",
  },
  {
    id: 2,
    title: "Architectural Design",
    description: "Bespoke architectural solutions for modern living.",
    imageUrl: "/images/architectural-design.jpg",
  },
  {
    id: 3,
    title: "Styling & Decoration",
    description: "Curated furniture and art selection to finish your home.",
    imageUrl: "/images/styling-decoration.jpg",
  },
];

export const articles: Article[] = [
  {
    id: 1,
    title: "The 11 Key Interior Design Trends Set to Define 2026",
    publication: "Vogue Living",
    link: "https://www.vogue.com/article/interior-design-trends-2026",
    imageUrl: "/images/article-press.jpg",
  },
];
