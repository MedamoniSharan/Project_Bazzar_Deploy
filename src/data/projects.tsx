
import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPercentage?: number;
  techStack: string[];
  domain: string;
  images: string[];
  featured: boolean;
  soldCount: number;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A complete e-commerce solution with product management, cart functionality, payment integration, and order tracking. Built with React, Node.js, Express, and MongoDB for scalability and performance.",
    shortDescription: "Complete e-commerce solution with admin dashboard",
    price: 999,
    discountPercentage: 15,
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    domain: "E-Commerce",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "https://images.unsplash.com/photo-1607082349566-187342175e2f",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18",
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49",
      "https://images.unsplash.com/photo-1556741533-411cf82e4e4d"
    ],
    featured: true,
    soldCount: 85
  },
  {
    id: 2,
    title: "Learning Management System",
    description: "A comprehensive LMS with course creation, student enrollment, progress tracking, and assessment tools. Built with React, Node.js, Express, and MongoDB with real-time features using Socket.io.",
    shortDescription: "Complete education platform for online learning",
    price: 1299,
    discountPercentage: 10,
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    domain: "Education",
    images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f"
    ],
    featured: true,
    soldCount: 72
  },
  {
    id: 3,
    title: "Hospital Management System",
    description: "Complete healthcare solution with patient records, appointment scheduling, billing, and pharmacy management. Built with Angular, Spring Boot, and MySQL for robust performance and security.",
    shortDescription: "Digital solution for healthcare facilities",
    price: 1599,
    techStack: ["Angular", "Spring Boot", "MySQL"],
    domain: "Healthcare",
    images: [
      "https://images.unsplash.com/photo-1516549655669-58a004e0c3a5",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28",
      "https://images.unsplash.com/photo-1516570387885-a4a37b9e6ec0",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      "https://images.unsplash.com/photo-1579154392427-53a721f8d8d4"
    ],
    featured: true,
    soldCount: 65
  },
  {
    id: 4,
    title: "Real Estate Listing Platform",
    description: "Property listing and search platform with virtual tours, appointment scheduling, and agent management. Built with React, Django, and PostgreSQL for scalability and geo-spatial queries.",
    shortDescription: "Property listing portal with advanced features",
    price: 1199,
    discountPercentage: 5,
    techStack: ["React", "Django", "PostgreSQL"],
    domain: "Real Estate",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb"
    ],
    featured: true,
    soldCount: 58
  },
  {
    id: 5,
    title: "CRM System",
    description: "Comprehensive customer relationship management system with lead tracking, customer communication, reporting, and analytics. Built with Vue.js, Laravel, and MySQL for performance and scalability.",
    shortDescription: "Complete CRM solution for sales teams",
    price: 899,
    discountPercentage: 10,
    techStack: ["Vue.js", "Laravel", "MySQL"],
    domain: "Business",
    images: [
      "https://images.unsplash.com/photo-1552581234-26160f608093",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    ],
    featured: true,
    soldCount: 52
  },
  {
    id: 6,
    title: "Inventory Management System",
    description: "Inventory tracking system with barcode scanning, sales integration, supplier management, and reporting. Built with React, Node.js, Express, and MongoDB for real-time inventory updates.",
    shortDescription: "Complete inventory solution for retail businesses",
    price: 799,
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    domain: "Business",
    images: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f",
      "https://images.unsplash.com/photo-1639502003463-7c40c8ba2430",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      "https://images.unsplash.com/photo-1534520603377-0f3ae8248091",
      "https://images.unsplash.com/photo-1606185540834-d6abd7209259"
    ],
    featured: false,
    soldCount: 45
  },
  {
    id: 7,
    title: "Social Media Dashboard",
    description: "Social media management platform with post scheduling, analytics, and engagement tracking across multiple platforms. Built with React, Node.js, Express, and MongoDB with real-time updates.",
    shortDescription: "Complete social media management solution",
    price: 699,
    discountPercentage: 15,
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    domain: "Marketing",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      "https://images.unsplash.com/photo-1603898037225-1bea09c550c0",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0"
    ],
    featured: false,
    soldCount: 38
  },
  {
    id: 8,
    title: "HR Management System",
    description: "Human resources management system with employee records, attendance tracking, payroll, and performance reviews. Built with Angular, Spring Boot, and PostgreSQL for enterprise usage.",
    shortDescription: "Complete HR solution for workforce management",
    price: 1099,
    techStack: ["Angular", "Spring Boot", "PostgreSQL"],
    domain: "Business",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
      "https://images.unsplash.com/photo-1532635241-17e820acc59f",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a"
    ],
    featured: false,
    soldCount: 31
  },
  {
    id: 9,
    title: "Project Management Tool",
    description: "Agile project management platform with task tracking, team collaboration, resource allocation, and reporting. Built with React, Node.js, Express, and MongoDB for flexibility and real-time updates.",
    shortDescription: "Complete solution for agile project management",
    price: 849,
    discountPercentage: 5,
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    domain: "Business",
    images: [
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
      "https://images.unsplash.com/photo-1572021335469-31706a17aaef"
    ],
    featured: false,
    soldCount: 27
  },
  {
    id: 10,
    title: "Restaurant Management System",
    description: "Restaurant management system with table reservations, menu management, order processing, and billing. Built with Vue.js, Laravel, and MySQL for reliability and real-time updates.",
    shortDescription: "Complete solution for restaurant operations",
    price: 899,
    techStack: ["Vue.js", "Laravel", "MySQL"],
    domain: "Hospitality",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d"
    ],
    featured: false,
    soldCount: 24
  },
];

export const getTechStacks = (): string[] => {
  const techStacks = new Set<string>();
  
  projects.forEach(project => {
    project.techStack.forEach(tech => {
      techStacks.add(tech);
    });
  });
  
  return Array.from(techStacks);
};

export const getDomains = (): string[] => {
  const domains = new Set<string>();
  
  projects.forEach(project => {
    domains.add(project.domain);
  });
  
  return Array.from(domains);
};

export const getTopProjects = (count: number): Project[] => {
  return [...projects]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, count);
};
