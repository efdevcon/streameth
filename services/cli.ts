import OrganizationController from "./controllers/organization";
import { EventController } from "./controllers/event";
import Organization, {IOrganization} from "./model/organization";
import Event, {IEvent} from "./model/event";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const organizationController = new OrganizationController();
const eventController = new EventController();

interface CreateOrgArgs extends IOrganization {}

interface CreateEventArgs extends IEvent {}

interface GetOrgArgs {
  name: string;
}

interface GetEventArgs {
  name: string;
  organization: string;
}

yargs(hideBin(process.argv))
  .command<CreateOrgArgs>(
    "create-org <name> <description> <url> <logo> <location>",
    "create a new organization",
    (yargs) => {
      yargs
        .positional("name", { describe: "Organization name", type: "string" })
        .positional("description", {
          describe: "Organization description",
          type: "string",
        })
        .positional("url", { describe: "Organization URL", type: "string" })
        .positional("logo", { describe: "Organization logo", type: "string" })
        .positional("location", {
          describe: "Organization location",
          type: "string",
        });
    },
    async (argv) => {
      const { name, description, url, logo, location } = argv;

      const organization = new Organization(
        name,
        description,
        url,
        logo,
        location
      );
      await organizationController.saveOrganization(organization);
      console.log("Organization created successfully");
    }
  )
  .command<CreateEventArgs>(
    "create-event <name> <description> <start> <end> <location> <organization>",
    "create a new event",
    (yargs) => {
      yargs
        .positional("name", { describe: "Event name", type: "string" })
        .positional("description", {
          describe: "Event description",
          type: "string",
        })
        .positional("start", { describe: "Event start date", type: "string" })
        .positional("end", { describe: "Event end date", type: "string" })
        .positional("location", { describe: "Event location", type: "string" })
        .positional("organization", {
          describe: "Organization name",
          type: "string",
        });
    },
    async (argv) => {
      const { name, description, start, end, location, organization } = argv;

      const event = new Event(
        name,
        description,
        new Date(start),
        new Date(end),
        location,
        organization
      );
      await eventController.saveEvent(event);
      console.log("Event created successfully");
    }
  )
  .command<GetOrgArgs>(
    "get-org <name>",
    "get an organization",
    (yargs) => {
      yargs.positional("name", {
        describe: "Organization name",
        type: "string",
      });
    },
    async (argv) => {
      const org = await organizationController.getOrganization(argv.name);
      console.log(org);
    }
  )
  .command<GetEventArgs>(
    "get-event <name>",
    "get an event",
    (yargs) => {
      yargs.positional("name", {
        describe: "Event name",
        type: "string",
      }).positional("organization", {
        describe: "Organization name",
        type: "string",
      });
    },
    async (argv) => {
      const event = await eventController.getEvent(argv.name, argv.organization);
      console.log(event);
    }
  )
  .help().argv;
