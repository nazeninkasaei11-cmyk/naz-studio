import { db } from "./db";
import {
  projects, services, articles, inquiries, subscribers,
  type Project, type InsertProject,
  type Service, type InsertService,
  type Article, type InsertArticle,
  type Inquiry, type InsertInquiry,
  type Subscriber, type InsertSubscriber
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getServices(): Promise<Service[]>;
  getArticles(): Promise<Article[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Seeding methods
  createProject(project: InsertProject): Promise<Project>;
  createService(service: InsertService): Promise<Service>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateProjectImages(title: string, images: string[]): Promise<void>;
  upsertProject(project: InsertProject): Promise<void>;
  deleteAllProjects(): Promise<void>;
  deleteAllServices(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [newSubscriber] = await db.insert(subscribers).values(subscriber).returning();
    return newSubscriber;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateProjectImages(title: string, images: string[]): Promise<void> {
    await db.update(projects).set({ images }).where(eq(projects.title, title));
  }

  async upsertProject(project: InsertProject): Promise<void> {
    const existing = await db.select().from(projects).where(eq(projects.title, project.title));
    if (existing.length > 0) {
      await db.update(projects).set(project).where(eq(projects.title, project.title));
    } else {
      await db.insert(projects).values(project);
    }
  }

  async deleteAllProjects(): Promise<void> {
    await db.delete(projects);
  }

  async deleteAllServices(): Promise<void> {
    await db.delete(services);
  }
}

export const storage = new DatabaseStorage();
