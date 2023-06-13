import FileController from "./fs";
import Stage, { IStage } from "../model/stage";
import { IEvent } from "../model/event";
const PATH = "data";

export default class StageController extends FileController {
  public async getStage(id: string, event: IEvent): Promise<IStage> {
    const path = `${PATH}/${event.organization}/${event.name}/stages/${id}.json`;
    const data = await this.read(path);
    const stage = await Stage.fromJson(data);
    return stage;
  }

  public async saveStage(stage: Omit<IStage, "id">, event: IEvent): Promise<void> {
    const stg = await Stage.fromJson(stage);
    const path = `${PATH}/${event.organization}/${event.name}/stages/${stg.id}.json`;
    await this.write(path, stg.toJson());
  }
}
