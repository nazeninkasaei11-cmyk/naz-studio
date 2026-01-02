import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.articles.list.path, async (req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Seed/update project data - always ensure correct data
  const canonicalProjects = [
    {
      title: "Stafford Heights",
      description: "A tailored renovation focusing on lifestyle and functionality.",
      imageUrl: "/images/stafford-heights-main.jpg",
      images: [
        "/images/stafford-heights-stairs.jpg",
        "/images/stafford-heights-stairs-2.jpg",
        "/images/stafford-heights-chandelier.jpg",
        "/images/stafford-heights-games-room.jpg"
      ],
      category: "Residential",
      isFeatured: true
    },
    {
      title: "El Campello",
      description: "High-end interior design for a luxury coastal property.",
      imageUrl: "/images/el-campello-dining.jpg",
      images: ["/images/el-campello-2.avif", "/images/el-campello-3.avif", "/images/el-campello-kitchen.jpg", "/images/el-campello-terrace.jpg"],
      category: "Residential",
      isFeatured: true
    },
    {
      title: "Mariendorf Berlin",
      description: "Seamless intersection of architecture and interiors.",
      imageUrl: "/images/mariendorf-berlin-main.jpg",
      images: ["/images/mariendorf-berlin-exterior.webp", "/images/mariendorf-berlin-entrance.webp", "/images/mariendorf-berlin-courtyard.webp", "/images/mariendorf-berlin-street.webp"],
      category: "Residential",
      isFeatured: false
    },
    {
      title: "The Connoisseur's Corner",
      description: "An exquisite residential space designed for refined living and sophisticated taste.",
      imageUrl: "/images/connoisseurs-corner-main.jpg",
      images: [],
      category: "Residential",
      isFeatured: false
    }
  ];

  // Clear old projects and reseed with canonical data
  await storage.deleteAllProjects();
  for (const project of canonicalProjects) {
    await storage.createProject(project);
  }

  // Clear old services and reseed with canonical data
  await storage.deleteAllServices();
  await storage.createService({
    title: "Interior Design",
    description: "Full service interior design from concept to completion.",
    imageUrl: "/images/interior-design.jpg"
  });
  await storage.createService({
    title: "Architectural Design",
    description: "Bespoke architectural solutions for modern living.",
    imageUrl: "/images/architectural-design.jpg"
  });
  await storage.createService({
    title: "Styling & Decoration",
    description: "Curated furniture and art selection to finish your home.",
    imageUrl: "/images/styling-decoration.jpg"
  });

  // Clear old articles and reseed with canonical data
  await storage.deleteAllArticles();
  await storage.createArticle({
    title: "The 11 Key Interior Design Trends Set to Define 2026",
    publication: "Vogue Living",
    link: "https://www.vogue.com/article/interior-design-trends-2026",
    imageUrl: "/images/article-press.jpg"
  });

  return httpServer;
}
