import { z } from "zod";

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  category: string;
  isFeatured: boolean;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export type Article = {
  id: number;
  title: string;
  publication: string;
  link: string;
  imageUrl: string;
};

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type Inquiry = z.infer<typeof inquirySchema>;
