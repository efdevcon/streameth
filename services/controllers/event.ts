import FileController from "./fs";
import OrganizationController from "./organization";
import Event, { IEvent } from "../model/event";

export class EventController extends FileController {
  public async getEvent(orgName: string, eventName: string): Promise<IEvent> {
    const path = `./data/${orgName}/events/${eventName}.json`;
    const data = await this.read(path);
    const event = await Event.fromJson(data);
    event.validateThis();
    return event;
  }

  public async saveEvent(event: IEvent): Promise<void> {
    const { organization } = event;
    // Check if the organization exists
    const organizationController = new OrganizationController();
    const existingOrganization = await organizationController.getOrganization(
      organization
    );
    if (!existingOrganization) {
      throw new Error(`Organization '${organization}' does not exist.`);
    }

    const evt = await Event.fromJson(event);
    evt.validateThis();
    const path = `./data/${evt.organization}/events/${evt.name}/config.json`;
    await this.write(path, evt.toJson());
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