import { IsNotEmpty, IsUrl, validate } from "class-validator";

export interface IOrganization {
  organizationId: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  location: string;
}

export default class Organization {
  @IsNotEmpty()
  organizationId: string;

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
    location: string,
    id?: string
  ) {
    this.organizationId =
      id ?? `organization_${name.trim().replace(/\s/g, "_")}`;
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

  async toJson(): Promise<string> {
    return JSON.stringify(this);
  }

  static async fromJson(jsonData: string): Promise<Organization> {
    const data = JSON.parse(jsonData) as IOrganization;
    return new Organization(
      data.name,
      data.description,
      data.url,
      data.logo,
      data.location,
      data.organizationId
    );
  }
}
