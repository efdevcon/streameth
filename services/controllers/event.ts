import FileController from "./fs";
import OrganizationController from "./organization";
import Event, { IEvent } from "../model/event";
export default class EventController extends FileController {
  public async getEvent(
    organizationId: IEvent["organizationId"],
    eventId: IEvent["id"]
  ): Promise<Event> {
    const path = `${this.eventPath(organizationId, eventId)}.json`;
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

    const path = `${this.eventPath(organizationId, evt.id)}/config.json`;
    await this.write(path, evt.toJson());
    return evt;
  }

  public async importEventData(event: Event): Promise<void> {
    const { dataImporter } = event;
    console.log(typeof event);
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
}

export class EventsController extends FileController {
  public async getEvents(orgName: string): Promise<IEvent[]> {
    const path = `./data/${orgName}/events`;
    const files = await this.readDir(path);
    const events: IEvent[] = [];
    for (const file of files) {
      const data = await this.read(`${path}/${file}`);
      const event = await Event.fromJson(data);
      events.push(event);
    }
    return events;
  }
}
