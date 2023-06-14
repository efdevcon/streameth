import { IsNotEmpty, IsDate, validate } from "class-validator";
import { IOrganization } from "./organization";
import { generateId } from "../utils";
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
  organizationId: IOrganization["id"];
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
  organizationId: string;

  dataImporter: IDataImporter[] | undefined;

  constructor({
    name,
    description,
    start,
    end,
    location,
    organizationId,
    dataImporter,
    id,
  }: Omit<IEvent, "id"> & { id?: string }) {
    this.id = id ?? generateId(name);
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.location = location;
    this.organizationId = organizationId;
    this.dataImporter = dataImporter;
    this.validateThis();
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

  public static async fromJson(json: string): Promise<Event> {
    const data = typeof json === "string" ? JSON.parse(json) : json;
    const evt = new Event({ ...data });
    return evt;
  }
}
