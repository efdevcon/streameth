import FileController from "./fs";
import Speaker, { ISpeaker } from "../model/speaker";
import Event from "../model/event";
const PATH = "data";

export default class SpeakerController extends FileController {
  public async getSpeaker(id: string, event: Event): Promise<ISpeaker> {
    const path = `${this.speakerPath(event.organizationId, event.id, id)}.json`;
    const data = await this.read(path);
    const speaker = await Speaker.fromJson(data);
    return speaker;
  }

  public async saveSpeaker(
    speaker: Omit<ISpeaker, "id">,
    event: Event
  ): Promise<Speaker> {
    const spk = new Speaker({
      ...speaker,
    });
    const path = `${this.speakerPath(
      event.organizationId,
      event.id,
      spk.id
    )}.json`;
    await this.write(path, spk.toJson());
    return spk;
  }
}
