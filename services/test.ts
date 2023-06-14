import OrganizationController from "./controller/organization";
import EventController from "./controller/event";
import { IEvent, IDataImporter } from "./model/event";
const run = async () => {
  const Organization = {
    name: "test",
    description: "Test",
    url: "http://test.com",
    logo: "http://test.com",
    location: "Test",
  };

  const orgController = new OrganizationController();
  const organizationInstance = await orgController.createOrganization(
    Organization
  );

  const Event = {
    name: "Test",
    description: "Test",
    start: new Date(),
    end: new Date(),
    location: "Test",
    organizationId: organizationInstance.id,
    dataImporter: [
      {
        type: "gsheet" as "gsheet",
        config: {
          sheetId: "17aPr5DDYwH2pv20xpdS_Ci08r0pkgpWD-mm5-vDre2w",
          apiKey: "AIzaSyBfg-L5lDCUx7L-s6ubJe3z6mYeXIkIFU4",
        },
      },
    ],
  };

  const eventController = new EventController();
  const EventInstance = await eventController.createEvent(Event);
  await eventController.importEventData(EventInstance);
};

run();
