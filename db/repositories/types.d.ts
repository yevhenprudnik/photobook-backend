export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  avatar?: string;
};

interface Repository<T> {
  find(filter?: Partial<T>): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T>;
  create(definition: Partial<T>): Promise<number>;
  remove(filter: Partial<T>): Promise<{ affected: number }>;
}

export function repository<T>(table: string): Repository<T>;
