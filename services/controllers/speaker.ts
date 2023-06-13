import FileController from "./fs";
import Speaker, { ISpeaker } from "../model/speaker";
import { IEvent } from "../model/event";
const PATH = "data";

export default class SpeakerController extends FileController {
  public async getSpeaker(name: string, event: IEvent): Promise<ISpeaker> {
    const path = `${PATH}/${event.organization}/${event.name}/speakers/${name}.json`;
    const data = await this.read(path);
    const speaker = await Speaker.fromJson(data);
    return speaker;
  }

  public async saveSpeaker(
    speaker: Omit<ISpeaker, "id">,
    event: IEvent
  ): Promise<void> {
    const spk = await Speaker.fromJson(speaker);
    const path = `${PATH}/${event.organization}/${event.name}/speakers/${spk.name}.json`;
    await this.write(path, spk.toJson());
  }
}
