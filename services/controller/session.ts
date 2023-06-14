import FileController from "./fs";
import Session, { ISession } from "../model/session";
import Event from "../model/event";
const PATH = "data";

export default class SessionController extends FileController {
  public async getSession(id: string, event: Event): Promise<Session> {
    const path = `${this.sessionPath(
      event.organizationId,
      event.id
    )}/${id}.json`;
    const data = await this.read(path);
    const session = await Session.fromJson(data);
    return session;
  }

  public async createSession(
    session: Omit<ISession, "id">,
    event: Event
  ): Promise<Session> {
    const ses = new Session({
      ...session,
    });
    const path = `${this.sessionPath(event.organizationId, event.id)}/${
      ses.id
    }.json`;
    await this.write(path, ses.toJson());
    return ses;
  }

  public async getSessionForStage(
    stageId: string,
    event: Event
  ): Promise<Session> {
    const path = `${this.sessionPath(event.organizationId, event.id)}`;
    const files = await this.readDir(path);
    const sessions: Session[] = [];
    for (const file of files) {
      const data = await this.read(`${path}/${file}`);
      const session = await Session.fromJson(data);
      if (session.stageId === stageId) {
        sessions.push(session);
      }
    }
    return sessions[0];
  }
}
