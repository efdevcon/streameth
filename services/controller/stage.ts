import FileController from "./fs";
import Stage, { IStage } from "../model/stage";
import Event from "../model/event";
import EventController from "./event";
export default class StageController extends FileController {
  public async getStage(id: string, event: Event): Promise<Stage> {
    const path = `${this.stagePath(event.organizationId, event.id)}/${id}.json`;
    const data = await this.read(path);
    const stage = await Stage.fromJson(data);
    return stage;
  }

  public async getStagesForEvent(event: Event): Promise<Stage[]> {
    const path = `${this.stagePath(event.organizationId, event.id)}`;
    const files = await this.readDir(path);
    const stages: Stage[] = [];
    for (const file of files) {
      const data = await this.read(`${path}/${file}`);
      const stage = await Stage.fromJson(data);
      stages.push(stage);
    }
    return stages;
  }

  public async getAllStages(): Promise<Stage[]> {
    const eventController = new EventController();
    const allEvents = await eventController.getAllEvents();
    const stages: Stage[] = [];
    for (const event of allEvents) {
      const eventStages = await this.getStagesForEvent(event);
      stages.push(...eventStages);
    }
    return stages;
  }

  public async createStage(
    stage: Omit<IStage, "id">,
    event: Event
  ): Promise<Stage> {
    const stg = new Stage({
      ...stage,
    });
    const path = `${this.stagePath(event.organizationId, event.id)}/${
      stg.id
    }.json`;
    await this.write(path, stg.toJson());
    return stg;
  }
}
