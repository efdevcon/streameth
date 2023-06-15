import { IsNotEmpty, validate } from "class-validator";
import { IEvent } from "./event";
import { generateId, BASE_PATH } from "../utils";
import { IOrganization } from "./organization";
import path from "path";
export interface IStreamSettings {
  url?: string;
  streamId?: string;
}

export interface IPlugin {
  name: string;
}

export interface IStage {
  id: string;
  name: string;
  eventId: IEvent["id"];
  organizationId: IOrganization["id"];
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
  organizationId: IEvent["organizationId"];

  @IsNotEmpty()
  streamSettings: IStreamSettings;

  plugins?: IPlugin[];

  constructor({
    name,
    eventId,
    organizationId,
    streamSettings,
    plugins,
  }: Omit<IStage, "id"> & { id?: string }) {
    this.id = generateId(name);
    this.name = name;
    this.eventId = eventId;
    this.organizationId = organizationId;
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

  toJson(): string {
    return JSON.stringify(this);
  }

  static async fromJson(jsonData: string | Omit<IStage, "id">) {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const stage = new Stage({ ...data });
    await stage.validateThis();
    return stage;
  }

  static async getStagePath(
    organizationId: IStage["organizationId"],
    eventId: IStage["eventId"],
    sessionId?: IStage["id"]
  ): Promise<string> {
    if (sessionId) {
      return path.join(
        BASE_PATH,
        organizationId,
        "events",
        eventId,
        "stages",
        sessionId
      );
    }
    return path.join(BASE_PATH, organizationId, "events", eventId, "stges");
  }
}
