import { IsNotEmpty, IsUrl, validate } from "class-validator";
import { generateId, BASE_PATH } from "../utils";
import path from "path";
export interface IOrganization {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  location: string;
}

export default class Organization {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsUrl()
  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  location: string;

  constructor({
    name,
    description,
    url,
    logo,
    location,
  }: Omit<IOrganization, "id"> & { id?: string }) {
    this.id = generateId(name);
    this.name = name;
    this.description = description;
    this.url = url;
    this.logo = logo;
    this.location = location;
    this.validateThis();
  }

  async validateThis() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }

  async toJson(): Promise<string> {
    return JSON.stringify(this);
  }

  static async fromJson(jsonData: string): Promise<Organization> {
    const data = JSON.parse(jsonData) as IOrganization;
    return new Organization({ ...data });
  }

  static async getOrganizationPath(id?: string): Promise<string> {
    if (!id) return path.join(BASE_PATH, "organizations");
    return path.join(BASE_PATH, "organizations", `${id}.json`);
  }
}
