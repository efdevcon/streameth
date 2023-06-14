import FileController from "./fs";
import Organization, { IOrganization } from "../model/organization";

export default class OrganizationController extends FileController {
  public async getOrganization(
    organizationId: IOrganization["id"]
  ): Promise<Organization> {
    const path = `${this.organizationPath()}/${organizationId}/config.json`;
    const data = await this.read(path);
    return await Organization.fromJson(data);
  }

  public async createOrganization(
    data: Omit<IOrganization, "id">
  ): Promise<Organization> {
    const org = new Organization({ ...data });

    const path = `${this.organizationPath()}/${org.id}/config.json`;
    await this.write(path, await org.toJson());
    return org;
  }

  public async getAllOrganizations(): Promise<Organization[]> {
    const files = await this.readDir(this.organizationPath());
    const organizations: Organization[] = [];
    for (const file of files) {
      const data = await this.read(
        `${this.organizationPath()}/${file}/config.json`
      );
      const organization = await Organization.fromJson(data);
      organizations.push(organization);
    }
    return organizations;
  }
}
