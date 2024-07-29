export type ProjectModel = {
  projectId: string;
  title: string;
  description: string;
  cover: string;
  github: string;
  totalLikes: number;
  totalComments: number;
  totalContributor: number;
  tags: string[];
  category: string;
  authorId: string;
};
