import BaseController from "./baseController";
import Stage, { IStage } from "../model/stage";
import EventController from "./event";
export default class StageController {
  private controller: BaseController<IStage>;

  constructor() {
    this.controller = new BaseController<IStage>("fs");
  }

  public async createStage(stage: Omit<IStage, "id">): Promise<Stage> {
    const ses = new Stage({ ...stage });
    const stageQuery = await Stage.getStagePath(ses.eventId, ses.id);
    await this.controller.create(stageQuery, ses);
    return ses;
  }

  public async getStage(
    stageId: IStage["id"],
    eventId: IStage["eventId"]
  ): Promise<Stage> {
    const stageQuery = await Stage.getStagePath(eventId, stageId);
    const data = await this.controller.get(stageQuery);
    return new Stage({ ...data });
  }

  public async getAllStages(): Promise<Stage[]> {
    const eventController = new EventController();
    const events = await eventController.getAllEvents();
    const stages: Stage[] = [];
    for (const event of events) {
      const data = await this.getAllStagesForEvent(event.id);
      stages.push(...data);
    }
    return stages;
  }

  public async getAllStagesForEvent(
    eventId: IStage["eventId"]
  ): Promise<Stage[]> {
    const stages: Stage[] = [];
    const stageQuery = await Stage.getStagePath(eventId);
    const data = await this.controller.getAll(stageQuery);
    for (const ses of data) {
      stages.push(new Stage({ ...ses }));
    }
    return stages;
  }
}
