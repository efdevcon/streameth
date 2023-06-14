import FileController from "./fs";
import Organization, { IOrganization } from "../model/organization";

const PATH = "data";

export default class OrganizationController extends FileController {
  public async getOrganization(
    organizationId: IOrganization["id"]
  ): Promise<Organization> {
    const path = `${PATH}/${organizationId}/config.json`;
    const data = await this.read(path);
    return await Organization.fromJson(data);
  }

  public async createOrganization(
    data: Omit<IOrganization, "id">
  ): Promise<Organization> {
    const org = new Organization(
      data.name,
      data.description,
      data.url,
      data.logo,
      data.location
    );

    const path = `${PATH}/${org.id}/config.json`;
    await this.write(path, await org.toJson());
    return org;
  }
}
