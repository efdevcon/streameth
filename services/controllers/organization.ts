import FileController from "./fs";
import Organization, { IOrganization } from "../model/organization";

const PATH = "data";

export default class OrganizationController extends FileController {
  public async getOrganization(name: string): Promise<IOrganization> {
    const path = `${PATH}/${name}/config.json`;
    const data = await this.read(path);
    const organization = await Organization.fromJson(data);
    return organization;
  }

  public async saveOrganization(organization: IOrganization): Promise<void> {
    const org = await Organization.fromJson(organization);
    const path = `${PATH}/${org.name}/config.json`;
    await this.write(path, org.toJson());
  }
}
