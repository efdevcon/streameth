import { ISession } from "../model/session";
import { IEvent } from "../model/event";
import { IStage } from "../model/stage";
import { ISpeaker } from "../model/speaker";
import SpeakerController from "../controllers/speaker";
import EventController from "../controllers/event";
import SessionController from "../controllers/session";
import StageController from "../controllers/stage";

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
  event: IEvent;

  constructor(event: IEvent) {
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
