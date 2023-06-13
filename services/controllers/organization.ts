import FileController from "./fs";
import Organization, { IOrganization } from "../model/organization";

const PATH = "data";

export default class OrganizationController extends FileController {
  public async getOrganization(name: string): Promise<Organization> {
    const path = `${PATH}/${name}/config.json`;
    const data = await this.read(path);
    return await Organization.fromJson(data);
  }

  public async saveOrganization(data): Promise<void> {
    const org = new Organization(
      data.name,
      data.description,
      data.url,
      data.logo,
      data.location,
      data.organizationId ?? null
    );

    const path = `${PATH}/a/config.json`;
    await this.write(path, await org.toJson());
  }
}
