import BaseController from "./baseController";
import Session, { ISession } from "../model/session";

export default class SessionController {
  private controller: BaseController<ISession>;

  constructor() {
    this.controller = new BaseController<ISession>("fs");
  }

  public async getSession(
    sessionId: ISession["id"],
    eventId: ISession["id"]
  ): Promise<Session> {
    const sessionQuery = await Session.getSessionPath(eventId, sessionId);
    const data = await this.controller.get(sessionQuery);
    return new Session({ ...data });
  }

  public async createSession(session: Omit<ISession, "id">): Promise<Session> {
    const ses = new Session({ ...session });
    const sessionQuery = await Session.getSessionPath(ses.eventId, ses.id);
    await this.controller.create(sessionQuery, ses);
    return ses;
  }

  public async getAllSessionsForEvent(
    eventId: ISession["eventId"]
  ): Promise<Session[]> {
    const sessions: Session[] = [];
    const sessionQuery = await Session.getSessionPath(eventId);
    const data = await this.controller.getAll(sessionQuery);
    for (const ses of data) {
      sessions.push(new Session({ ...ses }));
    }
    return sessions;
  }

  public async getSessionsForStage(
    stageId: ISession["stageId"],
    eventId: ISession["eventId"]
  ): Promise<Session[]> {
    const sessions = await this.getAllSessionsForEvent(eventId);
    return sessions.filter((ses) => ses.stageId === stageId);
  }

  public async getCurrentSessionForStage(
    stageId: ISession["stageId"],
    eventId: ISession["eventId"]
  ): Promise<Session> {
    const sessions = await this.getAllSessionsForEvent(eventId);

    const stageSessions = sessions.filter((ses) => ses.stageId === stageId);

    if (!stageSessions) throw new Error("No sessions found for stage");
    for (const session of stageSessions) {
      const now = new Date();
      if (session.start <= now && session.end >= now) {
        return session;
      }
    }
    // return the last session
    return stageSessions[stageSessions.length - 1];
  }
}
