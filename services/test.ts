import OrganizationController from "./controllers/organization";
import EventController from "./controllers/event";

const Organization = {
  name: "test",
  description: "Test",
  url: "http://test.com",
  logo: "http://test.com",
  location: "Test",
};

const orgController = new OrganizationController();
orgController.saveOrganization(Organization);

const Event = {
  name: "Test",
  description: "Test",
  start: new Date(),
  end: new Date(),
  location: "Test",
  organization: "Test",
};

const eventController = new EventController();
eventController.saveEvent(Event);
