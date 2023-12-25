import { Repository } from '../types.d.ts';

export type Template = {
  id: number;
  name: string;
  html: string;
  requiredReplacements: string[];
};

export type TemplateRepository = Repository<Template>;
