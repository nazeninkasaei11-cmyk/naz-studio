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

  // Seed data
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Stafford Heights",
      description: "A tailored renovation focusing on lifestyle and functionality.",
      imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      category: "Residential",
      isFeatured: true
    });
    await storage.createProject({
      title: "Coastal Retreat",
      description: "High-end interior design for a luxury coastal property.",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      category: "Residential",
      isFeatured: true
    });
    await storage.createProject({
      title: "Modern Loft",
      description: "Seamless intersection of architecture and interiors.",
      imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      category: "Residential",
      isFeatured: false
    });
  }

  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "Interior Design",
      description: "Full service interior design from concept to completion.",
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
    });
    await storage.createService({
      title: "Architectural Design",
      description: "Bespoke architectural solutions for modern living.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    });
    await storage.createService({
      title: "Styling & Decoration",
      description: "Curated furniture and art selection to finish your home.",
      imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d"
    });
  }

  const existingArticles = await storage.getArticles();
  if (existingArticles.length === 0) {
    await storage.createArticle({
      title: "How Billy Blue Makes Design Education Practical",
      publication: "Vogue Living",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
    });
  }

  return httpServer;
}
