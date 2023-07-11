import fs from "fs";
import path from "path";

class LoggerService {
  private logFilePath: string;

  constructor() {
    this.logFilePath = path.join(__dirname, "error.log");
  }

  public logError(message: string): void {
    const date = new Date();
    const formattedMessage = `${date.toISOString()} - ERROR: ${message}\n`;
    fs.appendFile(this.logFilePath, formattedMessage, (err) => {
      if (err) {
        console.error(`Failed to write to log file: ${err.message}`);
      }
    });
  }
}

export default LoggerService;
