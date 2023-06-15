import BaseController from "./baseController";
import Stage, { IStage} from "../model/stage";

export default class StageController {
  private controller: BaseController<IStage>;

  constructor() {
    this.controller = new BaseController<IStage>("fs");
  }

  public async getStage(
    stageId: IStage["id"],
    eventId: IStage["eventId"],
    organizationId: IStage["organizationId"]
  ): Promise<Stage> {
    const stageQuery = await Stage.getStagePath(
      organizationId,
      eventId,
      stageId
    );
    const data = await this.controller.get(stageQuery);
    return new Stage({ ...data });
  }

  public async createStage(stage: Omit<IStage, "id">): Promise<Stage> {
    const ses = new Stage({ ...stage });
    const stageQuery = await Stage.getStagePath(
      ses.organizationId,
      ses.eventId,
      ses.id
    );
    await this.controller.create(stageQuery, ses);
    return ses;
  }

  public async getAllStagesForEvent(
    eventId: IStage["eventId"],
    organizationId: IStage["organizationId"]
  ): Promise<Stage[]> {
    const stages: Stage[] = [];
    const stageQuery = await Stage.getStagePath(organizationId, eventId);
    const data = await this.controller.getAll(stageQuery);
    for (const ses of data) {
      stages.push(new Stage({ ...ses }));
    }
    return stages;
  }
}
