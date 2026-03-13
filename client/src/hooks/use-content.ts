import { projects, services, articles } from "@/data/content";

export function useProjects() {
  return { data: projects, isLoading: false };
}

export function useProject(id: number) {
  return { data: projects.find((p) => p.id === id), isLoading: false };
}

export function useServices() {
  return { data: services, isLoading: false };
}

export function useArticles() {
  return { data: articles, isLoading: false };
}
