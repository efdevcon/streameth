import { IsNotEmpty, IsDate, validate } from "class-validator";

interface GSheetConfig {
  sheetId: string;
  apiKey: string;
}

interface PretalxConfig {
  url: string;
  apiToken: string;
}

export type IDataImporter =
  | { type: "gsheet"; config: GSheetConfig }
  | { type: "pretalx"; config: PretalxConfig };

export interface IEvent {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  organization: string;
  dataImporter?: IDataImporter[];
}

export default class Event implements IEvent {
  @IsNotEmpty()
  id: string;

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

  dataImporter: IDataImporter[];

  constructor(
    name: string,
    description: string,
    start: Date,
    end: Date,
    location: string,
    organization: string,
    dataImporter?: IDataImporter[]
  ) {
    this.id = `${name}-${organization}`;
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.location = location;
    this.organization = organization;
    this.dataImporter = dataImporter;
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

  public static async fromJson(
    json: string | Omit<IEvent, "id">
  ): Promise<Event> {
    const {
      name,
      description,
      start,
      end,
      location,
      organization,
      dataImporter,
    } = typeof json === "string" ? JSON.parse(json) : json;

    const evt = new Event(
      name,
      description,
      new Date(start),
      new Date(end),
      location,
      organization,
      dataImporter
    );
    await evt.validateThis();

    return evt;
  }
}
