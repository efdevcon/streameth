import FileController from "./fs";
import OrganizationController from "./organization";
import Event, { IEvent } from "../model/event";

export default class EventController extends FileController {
  public async getEvent(
    organizationId: IEvent["organizationId"],
    eventId: IEvent["id"]
  ): Promise<Event> {
    const path = `${this.eventPath(organizationId)}/${eventId}/config.json`;
    const data = await this.read(path);
    return await Event.fromJson(data);
  }

  public async createEvent(event: Omit<IEvent, "id">): Promise<Event> {
    const { organizationId } = event;
    const organizationController = new OrganizationController();
    const existingOrganization = await organizationController.getOrganization(
      organizationId
    );
    if (!existingOrganization) {
      throw new Error(`Organization '${organizationId}' does not exist.`);
    }

    const evt = new Event({ ...event });

    const path = `${this.eventPath(organizationId)}/${evt.id}/config.json`;
    await this.write(path, evt.toJson());
    return evt;
  }

  public async importEventData(event: Event): Promise<void> {
    const { dataImporter } = event;
    if (!dataImporter) return;
    for (const importer of dataImporter) {
      try {
        const importedModule = await import(
          `../importers/${importer.type}/index`
        );
        const Importer = importedModule.default;
        // Not typesafe
        const data = new Importer({ importer, event });
        return await data.generateSessions();
      } catch (e) {
        console.error(e);
        throw new Error("Unable to get session data...");
      }
    }
  }

  public async getAllEvents(): Promise<Event[]> {
    const orgController = new OrganizationController();
    const organizations = await orgController.getAllOrganizations();
    const events: Event[] = [];
    for (const organization of organizations) {
      const files = await this.readDir(this.eventPath(organization.id));
      for (const file of files) {
        const data = await this.read(
          `${this.eventPath(organization.id)}/${file}/config.json`
        );
        const event = await Event.fromJson(data);
        events.push(event);
      }
    }
    return events;
  }
}
