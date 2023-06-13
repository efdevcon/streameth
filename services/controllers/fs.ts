import fs from "fs";
import { promisify } from "util";
import * as util from "util";
import * as path from "path";

export default class FsController {
  public async read(path: string): Promise<string> {
    const readFile = promisify(fs.readFile);
    return readFile(path, { encoding: "utf8" });
  }

  public async write(filePath: string, data: string): Promise<void> {
    console.log(filePath);

    const writeFile = promisify(fs.writeFile);
    const directory = path.dirname(filePath);
    const mkdir = promisify(fs.mkdir);
    await mkdir(directory, { recursive: true });
    return writeFile(filePath, data, { encoding: "utf8" });
  }

  public async exists(path: string): Promise<boolean> {
    const access = promisify(fs.access);
    try {
      await access(path, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  public async readDir(path: string): Promise<string[]> {
    const readdir = promisify(fs.readdir);
    return readdir(path);
  }

}
