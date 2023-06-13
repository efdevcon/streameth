import { IsNotEmpty, validate } from "class-validator";
import { RemoveFromUnion } from "../utlis";
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
  eventId: string;
  streamSettings: IStreamSettings;
  plugins?: IPlugin[];
}


export default class Stage implements IStage {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  streamSettings: IStreamSettings;

  plugins?: IPlugin[];

  constructor(
    name: string,
    event: string,
    streamSettings: IStreamSettings,
    plugins?: IPlugin[]
  ) {
    this.id = `${name}-${event}`;
    this.name = name;
    this.eventId = event;
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

  static async fromJson(jsonData: string | RemoveFromUnion<IStage, "id">) {
    const { name, event, streamSettings, plugins } =
      typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const stage = new Stage(name, event, streamSettings, plugins);
    await stage.validateThis();
    return stage;
  }
}
