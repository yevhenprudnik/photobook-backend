import { Page } from '../page/types';
import { Repository } from '../types';

export type Photobook = {
  id: number;
  name: string;
  userId: number;
};

export type PhotobookRepository = Repository<Photobook>;
