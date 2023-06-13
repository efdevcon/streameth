import OrganizationController from "./controllers/organization";
import EventController from "./controllers/event";
import StageController from "./controllers/stage";
import SpeakerController from "./controllers/speaker";
import SessionController from "./controllers/session";
import Organization from "./model/organization";
import { IOrganization } from "./model/organization";
import { IEvent } from "./model/event";
import { IStage, IStreamSettings } from "./model/stage";
import { ISpeaker } from "./model/speaker";
import { ISession } from "./model/session";

import Event from "./model/event";
import Stage from "./model/stage";
import Speaker from "./model/speaker";
import Session from "./model/session";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const organizationController = new OrganizationController();
const eventController = new EventController();
const stageController = new StageController();
const speakerController = new SpeakerController();
const sessionController = new SessionController();

interface GetOrgArgs {
  name: string;
}

interface GetEventArgs {
  name: string;
}

interface GetStageArgs {
  id: string;
}

interface GetSpeakerArgs {
  name: string;
}

interface GetSessionArgs {
  name: string;
}

yargs(hideBin(process.argv))
  .command<IOrganization>(
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
  .command<IEvent>(
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
  .command<IStage>(
    "create-stage <id> <name> <event> [streamUrl] [streamId] [plugins...]",
    "create a new stage",
    (yargs) => {
      yargs
        .positional("id", { describe: "Stage ID", type: "string" })
        .positional("name", { describe: "Stage name", type: "string" })
        .positional("event", { describe: "Event name", type: "string" })
        .positional("streamUrl", {
          describe: "Stream URL",
          type: "string",
          default: undefined,
        })
        .positional("streamId", {
          describe: "Stream ID",
          type: "string",
          default: undefined,
        })
        .positional("plugins", {
          describe: "Plugins",
          type: "string",
          array: true,
          default: [],
        });
    },
    async (argv) => {
      const { id, name, eventId, streamUrl, streamId, plugins } = argv;

      const streamSettings: IStreamSettings = {
        url: streamUrl,
        streamId: streamId,
      };

      const stage = new Stage( name, eventId, streamSettings, plugins);
      await stageController.saveStage(stage);
      console.log("Stage created successfully");
    }
  )
  .command<ISpeaker>(
    "create-speaker <name> <organization>",
    "create a new speaker",
    (yargs) => {
      yargs
        .positional("name", { describe: "Speaker name", type: "string" })
        .positional("organization", {
          describe: "Organization name",
          type: "string",
        });
    },
    async (argv) => {
      const { name, organization } = argv;

      const speaker = new Speaker(name, organization);
      await speakerController.saveSpeaker(speaker);
      console.log("Speaker created successfully");
    }
  )
  .command<ISession>(
    "create-session <name> <description> <startTime> <endTime> <speaker> <stage>",
    "create a new session",
    (yargs) => {
      yargs
        .positional("name", { describe: "Session name", type: "string" })
        .positional("description", {
          describe: "Session description",
          type: "string",
        })
        .positional("startTime", {
          describe: "Session start time",
          type: "string",
        })
        .positional("endTime", { describe: "Session end time", type: "string" })
        .positional("speaker", { describe: "Speaker name", type: "string" })
        .positional("stage", { describe: "Stage ID", type: "string" });
    },
    async (argv) => {
      const { name, description, startTime, endTime, speaker, stage } = argv;

      const session = new Session(
        name,
        description,
        new Date(startTime),
        new Date(endTime),
        speaker,
        stage
      );
      await sessionController.saveSession(session);
      console.log("Session created successfully");
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
      });
    },
    async (argv) => {
      const event = await eventController.getEvent(argv.name);
      console.log(event);
    }
  )
  .command<GetStageArgs>(
    "get-stage <id>",
    "get a stage",
    (yargs) => {
      yargs.positional("id", {
        describe: "Stage ID",
        type: "string",
      });
    },
    async (argv) => {
      const stage = await stageController.getStage(argv.id);
      console.log(stage);
    }
  )
  .command<GetSpeakerArgs>(
    "get-speaker <name>",
    "get a speaker",
    (yargs) => {
      yargs.positional("name", {
        describe: "Speaker name",
        type: "string",
      });
    },
    async (argv) => {
      const speaker = await speakerController.getSpeaker(argv.name);
      console.log(speaker);
    }
  )
  .command<GetSessionArgs>(
    "get-session <name>",
    "get a session",
    (yargs) => {
      yargs.positional("name", {
        describe: "Session name",
        type: "string",
      });
    },
    async (argv) => {
      const session = await sessionController.getSession(argv.name);
      console.log(session);
    }
  )
  .help().argv;
