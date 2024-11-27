export default interface Service<T> {
  create(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
