import { Repository } from '../types.d.ts';

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  avatar?: string;
};

export type UserRepository = Repository<User>;
