
export interface IProject {
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

// This is a mock MongoDB implementation since we can't run a real server
export class ProjectModel {
  private static projects: IProject[] = [];

  static async findAll(): Promise<IProject[]> {
    return this.projects;
  }

  static async findById(id: number): Promise<IProject | null> {
    return this.projects.find(project => project.id === id) || null;
  }

  static async create(project: IProject): Promise<IProject> {
    this.projects.push(project);
    return project;
  }

  static async update(id: number, project: Partial<IProject>): Promise<IProject | null> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.projects[index] = { ...this.projects[index], ...project };
    return this.projects[index];
  }

  static async delete(id: number): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.projects.splice(index, 1);
    return true;
  }
}
