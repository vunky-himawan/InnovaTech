export type ArticleModel = {
  articleId: string;
  title: string;
  pubDate: Date;
  description: string;
  authorId: string;
  cover: string;
  tags: Array<string>;
  category: string;
  totalLikes: number;
  totalComments: number;
};
