import BaseController from "./baseController";
import Session, { ISession } from "../model/session";
import Speaker from "../model/speaker";
import Stage from "../model/stage";
import SpeakerController from "./speaker";
import StageController from "./stage";
export default class SessionController {
  private controller: BaseController<ISession>;

  constructor() {
    this.controller = new BaseController<ISession>("fs");
  }

  public async getSession(
    sessionId: ISession["id"],
    eventId: ISession["eventId"]
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

  // dont get past sessions
  public async getSessionsForStage(
    stageId: ISession["stageId"],
    eventId: ISession["eventId"]
  ): Promise<Session[]> {
    const sessions = await this.getAllSessionsForEvent(eventId);
    const stageSessions = sessions.filter((ses) => ses.stageId === stageId);
    const now = new Date();
    return stageSessions.filter((ses) => ses.end >= now);
  }

  public async getCurrentSessionForStage(
    stageId: ISession["stageId"],
    eventId: ISession["eventId"]
  ): Promise<Session | undefined> {
    const sessions = await this.getAllSessionsForEvent(eventId);

    const stageSessions = sessions.filter((ses) => ses.stageId === stageId);

    if (!stageSessions) throw new Error("No sessions found for stage");
    for (const session of stageSessions) {
      const now = new Date();
      if (session.start <= now && session.end >= now) {
        return session;
      }
    }
    return undefined;
  }

  public async getSessionSpeakers(
    sessionId: ISession["id"],
    eventId: ISession["eventId"]
  ): Promise<Speaker[]> {
    const speakerController = new SpeakerController();
    const session = await this.getSession(sessionId, eventId);
    const speakers = session.speakers.map((speaker) =>
      speakerController.getSpeaker(speaker.id, eventId)
    );

    return Promise.all(speakers);
  }

  public async getSessionStage(
    sessionId: ISession["id"],
    eventId: ISession["eventId"]
  ): Promise<Stage> {
    const stageController = new StageController();
    const session = await this.getSession(sessionId, eventId);
    return await stageController.getStage(session.stageId, eventId);
  }
}
