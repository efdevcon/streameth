import BaseController from "./baseController";
import Organization, { IOrganization } from "../model/organization";

export default class OrganizationController {
  private controller: BaseController<IOrganization>;

  constructor() {
    this.controller = new BaseController<IOrganization>("fs");
  }

  public async getOrganization(
    organizationId: IOrganization["id"]
  ): Promise<Organization> {
    const organizationQuery = await Organization.getOrganizationPath(organizationId);
    const data = await this.controller.get(organizationQuery);
    return new Organization({ ...data });
  }

  public async createOrganization(
    organization: Omit<IOrganization, "id">
  ): Promise<Organization> {
    const org = new Organization({ ...organization });
    const organizationQuery = await Organization.getOrganizationPath(org.id);
    await this.controller.create(organizationQuery, org);
    return org;
  }


  public async getAllOrganizations(): Promise<Organization[]> {
    const organizations: Organization[] = [];
    const organizationQuery = await Organization.getOrganizationPath();
    const data = await this.controller.getAll(organizationQuery);
    for (const org of data) {
      organizations.push(new Organization({ ...org }));
    }
    return organizations;
  }
}
