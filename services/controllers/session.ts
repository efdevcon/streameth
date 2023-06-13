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

  public async saveSession(session: ISession, event: IEvent): Promise<void> {
    const ses = await Session.fromJson(session);
    const path = `${PATH}/${event.organization}/${event.name}/sessions/${ses.id}.json`;
    await this.write(path, ses.toJson());
  }
}
