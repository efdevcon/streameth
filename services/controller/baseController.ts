import FsController from "./dataStore/fs";
// import DbController from './dataStore/db'

interface IBaseController<T> {
  create: (query: string, data: T) => Promise<void>;
  get: (query: string) => Promise<T>;
  getAll: (query: string) => Promise<T[]>;
  // update: (id: string, data: T) => Promise<T>;
  // delete: (id: string) => Promise<T>;
}

type StoreType = "fs" | "db";

export default class BaseController<T> implements IBaseController<T> {
  store: FsController;

  constructor(store: StoreType) {
    switch (store) {
      case "fs":
        this.store = new FsController();
        break;
      // case 'db':
      //   this.store = new DbController();
      //   break;
      default:
        throw new Error(`Unsupported store type: ${store}`);
    }
  }

  async create(query: string, data: T): Promise<void> {
    return this.store.write(query, JSON.stringify(data));
  }

  async get(query: string): Promise<T> {
    return this.store.read(query).then((data) => JSON.parse(data));
  }

  async getAll(query: string): Promise<T[]> {
    console.log(query);
    const files = await this.store.readAll(query);

    const dataPromises = files.map((file) =>
      this.store.read(`${query}/${file}`)
    );
    const data = await Promise.all(dataPromises);
    return data.map((d) => JSON.parse(d));
  }

  // update(id: string, data: T): Promise<T> {
  //   return this.store.update(id, data);
  // }

  // delete(id: string): Promise<T> {
  //   return this.store.delete(id);
  // }
}
