import { IsNotEmpty, validate } from "class-validator";
import { IEvent } from "./event";
import { generateId, BASE_PATH } from "../utils";
import { IOrganization } from "./organization";
import path from "path";
export interface IStreamSettings {
  streamId: string;
}

export interface IPlugin {
  name: string;
}

export interface IStage {
  id: string;
  name: string;
  eventId: IEvent["id"];
  streamSettings: IStreamSettings;
  plugins?: IPlugin[];
}

export default class Stage implements IStage {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  eventId: IEvent["id"];

  @IsNotEmpty()
  streamSettings: IStreamSettings;

  plugins?: IPlugin[];

  constructor({
    name,
    eventId,
    streamSettings,
    plugins,
  }: Omit<IStage, "id"> & { id?: string }) {
    this.id = generateId(name);
    this.name = name;
    this.eventId = eventId;
    this.streamSettings = streamSettings;
    this.plugins = plugins;
    this.validateThis();
  }

  async validateThis() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }

  toJson(): IStage {
    return { ...this };
  }

  static async fromJson(jsonData: string | Omit<IStage, "id">) {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const stage = new Stage({ ...data });
    await stage.validateThis();
    return stage;
  }

  static async getStagePath(
    eventId: IStage["eventId"],
    stageId?: IStage["id"]
  ): Promise<string> {
    if (stageId) {
      return path.join(BASE_PATH, "stages", eventId, `${stageId}.json`);
    }
    return path.join(BASE_PATH, "stages", eventId);
  }
}
