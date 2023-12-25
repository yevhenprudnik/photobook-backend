import { Repository } from '../types.d.ts';

export type Photobook = {
  id: number;
  name: string;
  userId: number;
};

export type PhotobookRepository = Repository<Photobook>;
