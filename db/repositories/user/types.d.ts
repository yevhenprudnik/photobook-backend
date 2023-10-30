import { Repository } from '../types';

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  avatar?: string;
};

export type UserRepository = Repository<User>;
