import { IsNotEmpty, validate } from "class-validator";
import { IStage } from "./stage";
import Speaker from "./speaker";
import { generateId, BASE_PATH } from "../utils";
import { IEvent } from "./event";
import path from "path";
import { extractFirstFrame } from "../utils/video";

export interface ISession {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  stageId: IStage["id"];
  speakers: Speaker[];
  videoUrl?: string;
  playbackId?: string;
  eventId: IEvent["id"];
  track?: string[];
}

export default class Session implements ISession {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  start: Date;

  //@IsNotEmpty()
  end: Date;

  @IsNotEmpty()
  stageId: IStage["id"];

  @IsNotEmpty()
  speakers: Speaker[];

  videoUrl?: string;

  playbackId?: string;

  @IsNotEmpty()
  eventId: IEvent["id"];

  track?: string[];

  constructor({
    name,
    description,
    start,
    end,
    stageId,
    speakers,
    videoUrl,
    eventId,
    track,
  }: Omit<ISession, "id"> & { id?: string }) {
    this.id = generateId(name);
    this.name = name;
    this.description = description;
    this.start = new Date(start);
    this.end = new Date(end);
    this.stageId = stageId;
    this.speakers = speakers;
    this.videoUrl = videoUrl;
    this.playbackId = this.getPlaybackId();
    this.eventId = eventId;
    this.track = track;
    this.validateThis();
  }

  async validateThis() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }

  toJson(): ISession {
    return { ...this };
  }

  getPlaybackId(): string {
    if (this.playbackId) {
      return this.playbackId;
    } else if (this.videoUrl) {
      // https://lp-playback.com/hls/73e7hmd7ch7k8bnw/index.m3u8
      return this.videoUrl.split("/")?.[4];
    }
    return "";
  }

  static getSessionDate(date: Date): string {
    return new Date(date).toISOString();
  }

  static getSessionTime(date: Date): string {
    return date.toLocaleTimeString();
  }

  static async fromJson(jsonData: string | Promise<Session>) {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const session = new Session({
      ...data,
    });
    await session.validateThis();
    return session;
  }

  static async getSessionPath(
    eventId: ISession["eventId"],
    sessionId?: ISession["id"]
  ): Promise<string> {
    if (sessionId) {
      return path.join(BASE_PATH, "sessions", eventId, `${sessionId}.json`);
    }
    return path.join(BASE_PATH, "sessions", eventId);
  }
}
