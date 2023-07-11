import fs from "fs";
import { promisify } from "util";
import * as path from "path";

export default class FsController {
  private readFileAsync: (
    path: string,
    options: { encoding: BufferEncoding }
  ) => Promise<string>;
  private writeFileAsync: (
    filePath: string,
    data: string,
    options: { encoding: BufferEncoding }
  ) => Promise<void>;
  private mkdirAsync: (
    path: string,
    options: { recursive: boolean }
  ) => Promise<string>;
  private accessAsync: (path: string, mode: number) => Promise<void>;
  private readdirAsync: (path: string) => Promise<string[]>;

  constructor() {
    this.readFileAsync = promisify(fs.readFile);
    this.writeFileAsync = promisify(fs.writeFile);
    this.mkdirAsync = promisify(fs.mkdir);
    this.accessAsync = promisify(fs.access);
    this.readdirAsync = promisify(fs.readdir);
  }

  public async read(path: string): Promise<string> {
    return this.readFileAsync(path, { encoding: "utf8" });
  }

  public async readAll(path: string): Promise<string[]> {
    return this.readdirAsync(path);
  }

  public async write(filePath: string, data: string): Promise<void> {
    const directory = path.dirname(filePath);
    await this.mkdirAsync(directory, { recursive: true });
    return this.writeFileAsync(filePath, data, { encoding: "utf8" });
  }

  public async pathExists(path: string): Promise<boolean> {
    try {
      await this.accessAsync(path, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
}
