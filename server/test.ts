import OrganizationController from "./controller/organization";
import EventController from "./controller/event";
import { IEvent, IDataImporter } from "./model/event";
const run = async () => {
  const Organization = {
    name: "Spagetteth",
    description: "The Italian Ethereum movement to buidl an open sauce future together.",
    url: "https://www.spaghett-eth.com/",
    logo: "https://www.spaghett-eth.com/assets/logoNav.6b3e7427.png",
    location: "Italy",
  };

  const orgController = new OrganizationController();
  const organizationInstance = await orgController.createOrganization(
    Organization
  );

  const Event = {
    name: "Spagetteth Naples",
    description: "The Italian Ethereum movement to buidl an open sauce future together.",
    start: new Date("2023-04-24T00:00:00.000Z"), // "2021-10-01T00:00:00.000Z
    end: new Date("2023-04-26T00:00:00.000Z"), // "2021-10-01T00:00:00.000Z
    location: "Naples, Italy",
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
