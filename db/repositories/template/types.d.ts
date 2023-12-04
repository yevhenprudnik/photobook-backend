import { Repository } from '../types';

export type Template = {
  id: number;
  name: string;
  html: string;
  requiredFields: string[];
};

export type TemplateRepository = Repository<Template>;
