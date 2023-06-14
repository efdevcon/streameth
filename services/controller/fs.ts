import fs from "fs";
import { promisify } from "util";
import * as path from "path";

const PATH = "services/data";
export default class FsController {
  public async read(path: string): Promise<string> {
    const readFile = promisify(fs.readFile);
    return readFile(path, { encoding: "utf8" });
  }

  public async write(filePath: string, data: string): Promise<void> {
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

  public organizationPath(): string {
    return `${PATH}`;
  }

  public stagePath(
    organizationId: string,
    eventId: string,
  ): string {
    return `${PATH}/${organizationId}/events/${eventId}/stages`;
  }

  public sessionPath(
    organizationId: string,
    eventId: string,
  ): string {
    return `${PATH}/${organizationId}/events/${eventId}/sessions`;
  }

  public speakerPath(
    organizationId: string,
    eventId: string,
    speakerId: string
  ): string {
    return `${PATH}/${organizationId}/events/${eventId}/speakers/${speakerId}`;
  }

  public eventPath(organizationId: string) {
    return `${PATH}/${organizationId}/events`;
  }
}
