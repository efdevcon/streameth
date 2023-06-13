import { IsNotEmpty, IsUrl, validate } from "class-validator";
import { IStage } from "./stage";
import { ISpeaker } from "./speaker";
export interface ISession {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  stageId: IStage["id"];
  speakers: ISpeaker[];
  videoUrl?: string;
}

export default class Session implements ISession {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;

  @IsNotEmpty()
  stageId: IStage["id"];

  @IsNotEmpty()
  speakers: ISpeaker[];

  @IsUrl()
  videoUrl?: string;

  constructor(
    name: string,
    description: string,
    start: Date,
    end: Date,
    stageId: IStage["id"],
    speakers: ISpeaker[],
    videoUrl?: string
  ) {
    this.id = `session_${name.trim().replace(/\s/g, "_")}`;
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.stageId = stageId;
    this.speakers = speakers;
    this.videoUrl = videoUrl;
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

  static async fromJson(jsonData: string | Omit<ISession, "id">) {
    const { name, description, start, end, stage, speakers, videoUrl } =
      typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const session = new Session(
      name,
      description,
      new Date(start),
      new Date(end),
      stage,
      speakers,
      videoUrl
    );
    await session.validateThis();
    return session;
  }
}
