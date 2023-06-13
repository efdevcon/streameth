import { IsNotEmpty, IsUrl, IsOptional, validate } from "class-validator";
import { IEvent } from "./event";
export interface ISpeaker {
  id: string;
  name: string;
  bio: string;
  eventId: IEvent["id"];
  twitter?: string;
  github?: string;
  website?: string;
  photo?: string;
}

export default class Speaker implements ISpeaker {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  bio: string;

  @IsNotEmpty()
  eventId: IEvent["id"];

  @IsUrl()
  @IsOptional()
  twitter?: string;

  @IsUrl()
  @IsOptional()
  github?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsUrl()
  @IsOptional()
  photo?: string;

  constructor(
    name: string,
    bio: string,
    event: string,
    twitter?: string,
    github?: string,
    website?: string,
    photo?: string
  ) {
    this.id = `speaker_${name.trim().replace(/\s/g, "_")}`;
    this.name = name;
    this.bio = bio;
    this.eventId = event;
    this.twitter = twitter;
    this.github = github;
    this.website = website;
    this.photo = photo;
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

  static async fromJson(jsonData: string | Omit<ISpeaker, "id">) {
    const { name, bio, event, twitter, github, website, photo } =
      typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const speaker = new Speaker(
      name,
      bio,
      event,
      twitter,
      github,
      website,
      photo
    );
    await speaker.validateThis();
    return speaker;
  }
}
