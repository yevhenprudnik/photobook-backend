interface Repository<T> {
  find(filter?: Partial<T>): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T>;
  create(definition: Partial<T>): Promise<number>;
  update(id: number, definition: Partial<T>): Promise<T>;
  remove(filter: Partial<T>): Promise<{ affected: number }>;
}

export function repository<T>(table: string): Repository<T>;
