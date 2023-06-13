import FileController from "./fs";
import Session, { ISession } from "../model/session";
import { IEvent } from "../model/event";
const PATH = "data";

export default class SessionController extends FileController {
  public async getSession(id: string, event: IEvent): Promise<ISession> {
    const path = `${PATH}/${event.organization}/${event.name}/sessions/${id}.json`;
    const data = await this.read(path);
    const session = await Session.fromJson(data);
    return session;
  }

  public async saveSession(
    session: Omit<ISession, "id">,
    event: IEvent
  ): Promise<void> {
    const ses = await Session.fromJson(session);
    const path = `${PATH}/${event.organization}/${event.name}/sessions/${ses.id}.json`;
    await this.write(path, ses.toJson());
  }
}

export class SessionsController extends FileController {
  public async getSessions(event: IEvent): Promise<ISession[]> {
    const path = `${PATH}/${event.organization}/${event.name}/sessions`;
    const files = await this.readDir(path);
    const sessions: ISession[] = [];
    for (const file of files) {
      const data = await this.read(`${path}/${file}`);
      const session = await Session.fromJson(data);
      sessions.push(session);
    }
    return sessions;
  }
}
