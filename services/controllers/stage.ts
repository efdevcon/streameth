import FileController from "./fs";
import Stage, { IStage } from "../model/stage";
import Event from "../model/event";
const PATH = "data";

export default class StageController extends FileController {
  public async getStage(id: string, event: Event): Promise<Stage> {
    const path = `${this.stagePath(event.organizationId, event.id, id)}.json`;
    const data = await this.read(path);
    const stage = await Stage.fromJson(data);
    return stage;
  }

  public async createStage(
    stage: Omit<IStage, "id">,
    event: Event
  ): Promise<Stage> {
    const stg = new Stage({
      ...stage,
    });
    const path = `${this.stagePath(
      event.organizationId,
      event.id,
      stg.id
    )}.json`;
    await this.write(path, stg.toJson());
    return stg;
  }
}
