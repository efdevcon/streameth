import BaseController from "./baseController";
import Event, { IEvent } from "../model/event";
import OrganizationController from "./organization";
export default class EventController {
  private controller: BaseController<IEvent>;

  constructor() {
    this.controller = new BaseController<IEvent>("fs");
  }

  public async getEvent(
    eventId: IEvent["id"],
    organizationId: IEvent["organizationId"]
  ): Promise<Event> {
    const eventQuery = await Event.getEventPath(eventId, organizationId);
    const data = await this.controller.get(eventQuery);
    return new Event({ ...data });
  }

  public async createEvent(event: Omit<IEvent, "id">): Promise<Event> {
    const org = new Event({ ...event });
    const eventQuery = await Event.getEventPath(org.id, org.organizationId);
    await this.controller.create(eventQuery, org);
    return org;
  }

  public async getAllEventsForOrganization(
    organizationId: IEvent["organizationId"]
  ): Promise<Event[]> {
    const events: Event[] = [];
    const eventQuery = await Event.getEventPath(organizationId);
    const data = await this.controller.getAll(eventQuery);
    for (const evt of data) {
      events.push(new Event({ ...evt }));
    }
    return events;
  }

  public async getAllEvents(): Promise<Event[]> {
    const orgController = new OrganizationController();
    const organizations = await orgController.getAllOrganizations();
    const events: Event[] = [];
    for (const organization of organizations) {
      const data = await this.getAllEventsForOrganization(organization.id);
      events.push(...data);
    }
    return events;
  }

  public async importEventData(event: Event): Promise<void> {
    const { dataImporter } = event;
    if (!dataImporter) return;
    for (const importer of dataImporter) {
      const importedModule = await import(
        `../importers/${importer.type}/index`
      );
      const Importer = importedModule.default;
      // Not typesafe
      const data = new Importer({ importer, event });
      return await data.generateSessions();
    }
  }
}
