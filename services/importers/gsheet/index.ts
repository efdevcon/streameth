import BaseImporter from "../baseImporter";
import PQueue from "p-queue";
import { google } from "googleapis";
import { IEvent } from "../../model/event";
const SPEAKER_SHEET = "Speakers";
const SPEAKER_DATA_RANGE = "A3:I";

const STAGE_SHEET = "Stages";
const STAGE_DATA_RANGE = "A3:D";

const SESSION_SHEET = "Sessions";
const SESSION_DATA_RANGE = "A3:M";

const API_QUEUE = new PQueue({ concurrency: 1, interval: 1500 });

export default class GsheetImporter extends BaseImporter {
  sheetId: string;
  apiKey: string;
  connection: any;

  // event contains sheetId and apiKey, seem redudant to pass it here
  constructor(sheetId: string, apiKey: string, event: IEvent) {
    super(event);
    this.sheetId = sheetId;
    this.apiKey = apiKey;
    this.connection = this.connectToGoogleSheets();
  }

  private connectToGoogleSheets() {
    if (!this.sheetId)
      throw new Error("No valid sheetId set for gsheet module");
    if (!this.apiKey)
      throw new Error(
        "gsheet module requires a valid 'GOOGLE_API_KEY' env variable"
      );

    const sheets = google.sheets({
      version: "v4",
      auth: this.apiKey,
    });

    return sheets;
  }

  private async getDataForRange(
    sheetName: string,
    range: string
  ): Promise<any> {
    const response = (await API_QUEUE.add(() =>
      this.connection.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: `${sheetName}!${range}`,
      })
    )) as any;

    const rows = response.data.values;
    if (!rows) return [];

    return rows;
  }

  public override async generateSpeakers(): Promise<void> {
    const data = await this.getDataForRange(SPEAKER_SHEET, SPEAKER_DATA_RANGE);

    for (const row in data) {
      const { id, name, description, avatar } = data[row];
      const speaker = {
        name: name,
        bio: description,
        photo: avatar,
        eventId: this.event.id,
      };

      this.speakerController.saveSpeaker(speaker, this.event);
    }
  }

  public override async generateStages(): Promise<void> {
    const data = await this.getDataForRange(STAGE_SHEET, STAGE_DATA_RANGE);

    for (const row in data) {
      const { id, name, streamId, image } = data[row];
      const stage = {
        name: name,
        eventId: this.event.id,
        streamSettings: {
          streamId,
        },
      };

      this.stageController.saveStage(stage, this.event);
    }
  }

  public override async generateSessions(): Promise<void> {
    await Promise.all([this.generateStages(), this.generateSpeakers()]);

    const data = await this.getDataForRange(SESSION_SHEET, SESSION_DATA_RANGE);

    for (const row in data) {
      const {
        id,
        Name,
        Description,
        stageId,
        Day,
        Start,
        End,
        Speaker1,
        Speaker2,
        Speaker3,
        Speaker4,
        Speaker5,
        video,
      } = data[row];

      const speakerIds = [Speaker1, Speaker2, Speaker3, Speaker4, Speaker5];
      const speakerPromises = speakerIds
        .filter((speakerId) => !!speakerId)
        .map((speakerId) =>
          this.speakerController.getSpeaker(speakerId, this.event)
        );

      const [speakers, stage] = await Promise.all([
        Promise.all(speakerPromises),
        this.stageController.getStage(stageId, this.event),
      ]);

      const session = {
        name: Name,
        description: Description,
        stageId: stage.id,
        speakers: speakers,
        start: new Date(`${Day} ${Start}`),
        end: new Date(`${Day} ${End}`),
        videoUrl: video,
      };

      this.sessionController.saveSession(session, this.event);
    }
  }
}
