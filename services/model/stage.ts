import { IsNotEmpty, validate } from "class-validator";
import { IEvent } from "./event";
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
    this.id = `stage_${name.trim().replace(/\s/g, "_")}`;
    this.name = name;
    this.eventId = eventId;
    this.streamSettings = streamSettings;
    this.plugins = plugins;
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
}
