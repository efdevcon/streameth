import BaseController from "./baseController";
import Speaker, { ISpeaker } from "../model/speaker";

export default class SpeakerController {
  private controller: BaseController<ISpeaker>;

  constructor() {
    this.controller = new BaseController<ISpeaker>("fs");
  }

  public async getSpeaker(
    speakerId: ISpeaker["id"],
    eventId: ISpeaker["eventId"]
  ): Promise<Speaker> {
    const speakerQuery = await Speaker.getSpeakerPath(eventId, speakerId);
    const data = await this.controller.get(speakerQuery);
    return new Speaker({ ...data });
  }

  public async createSpeaker(speaker: Omit<ISpeaker, "id">): Promise<Speaker> {
    const ses = new Speaker({ ...speaker });
    const speakerQuery = await Speaker.getSpeakerPath(ses.eventId, ses.id);
    await this.controller.create(speakerQuery, ses);
    return ses;
  }

  public async getAllSpeakersForEvent(
    eventId: ISpeaker["eventId"]
  ): Promise<Speaker[]> {
    const speakers: Speaker[] = [];
    const speakerQuery = await Speaker.getSpeakerPath(eventId);
    const data = await this.controller.getAll(speakerQuery);
    for (const ses of data) {
      speakers.push(new Speaker({ ...ses }));
    }
    return speakers;
  }
}
