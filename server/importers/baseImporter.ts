import SpeakerController from "../controller/speaker";
import EventController from "../controller/event";
import SessionController from "../controller/session";
import StageController from "../controller/stage";
import Event from "../model/event";
export interface IBaseImporter {
  generateSessions(): Promise<void>;
  generateStages(): Promise<void>;
  generateSpeakers(): Promise<void>;
}

export default class BaseImporter implements IBaseImporter {
  speakerController: SpeakerController;
  eventController: EventController;
  sessionController: SessionController;
  stageController: StageController;
  event: Event;

  constructor(event: Event) {
    this.speakerController = new SpeakerController();
    this.eventController = new EventController();
    this.sessionController = new SessionController();
    this.stageController = new StageController();
    this.event = event;
  }

  async generateSessions(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async generateStages(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async generateSpeakers(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
