import {
  IsNotEmpty,
  IsDateString,
  IsDate,
  validate,
} from "class-validator";

export interface IEvent {
  name: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  organization: string;
}

export default class Event implements IEvent {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  organization: string;

  constructor(
    name: string,
    description: string,
    start: Date,
    end: Date,
    location: string,
    organization: string
  ) {
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.location = location;
    this.organization = organization;
  }

  async validateThis() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static async fromJson(json: string | IEvent): Promise<Event> {
    const { name, description, start, end, location, organization } =
      typeof json === "string" ? JSON.parse(json) : json;

    const evt = new Event(
      name,
      description,
      new Date(start),
      new Date(end),
      location,
      organization
    );
    console.log(evt.end)
    await evt.validateThis();

    return evt;
  }
}
