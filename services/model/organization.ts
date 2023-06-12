import { IsNotEmpty, IsUrl, IsUUID, validate } from "class-validator";

export interface IOrganization {
  name: string;
  description: string;
  url: string;
  logo: string;
  location: string;
}

export default class Organization implements IOrganization {
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

  constructor(
    name: string,
    description: string,
    url: string,
    logo: string,
    location: string
  ) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.logo = logo;
    this.location = location;
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

  static async fromJson(jsonData: string | IOrganization) {
    const { id, name, description, url, logo, location } =
      typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    const org = new Organization(name, description, url, logo, location);
    await org.validateThis();
    return org;
  }
}
