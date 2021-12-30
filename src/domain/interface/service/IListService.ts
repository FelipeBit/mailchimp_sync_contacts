export default interface IListService {
  get(): Promise<any>;
  getById(id: string): Promise<any>;
  create(name: string): Promise<any>;
}
