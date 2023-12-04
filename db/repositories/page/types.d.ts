import { Repository } from '../types';

export type Page = {
  id: number;
  position: number;
  photobookId: number;
  templateId: number;
  type: string;
  replacements: Record<string, string>;
};

export type PageRepository = Repository<Page>;
