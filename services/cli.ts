import OrganizationController from "./controllers/organization";
import Organization from "./model/organization";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const controller = new OrganizationController();

interface CreateArgs {
  name: string;
  description: string;
  url: string;
  logo: string;
  location: string;
}

interface GetArgs {
  name: string;
}

yargs(hideBin(process.argv))
  .command<CreateArgs>(
    "create [name] [description] [url] [logo] [location]",
    "create a new organization",
    (yargs) => {
      yargs
        .positional("name", { describe: "Organization name", type: "string" })
        .positional("description", {
          describe: "Organization description",
          type: "string",
        })
        .positional("url", { describe: "Organization url", type: "string" })
        .positional("logo", { describe: "Organization logo", type: "string" })
        .positional("location", {
          describe: "Organization location",
          type: "string",
        });
    },
    async (argv) => {
      const org = new Organization(
        argv.name,
        argv.description,
        argv.url,
        argv.logo,
        argv.location
      );
      await controller.saveOrganization(org);
      console.log("Organization created successfully");
    }
  )
  .command<GetArgs>(
    "get [name]",
    "get an organization",
    (yargs) => {
      yargs.positional("name", {
        describe: "Organization name",
        type: "string",
      });
    },
    async (argv) => {
      const org = await controller.getOrganization(argv.name);
      console.log(org);
    }
  )
  .help().argv;
