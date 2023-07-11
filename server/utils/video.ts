import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import axios from "axios";
import path from "path";

export async function extractFirstFrame(hlsUrl: string, outputImagePath: string) {
  try {
    const response = await axios.get(hlsUrl);
    const body = response.data;
    const lines = body.split("\n");
    const tsUrl = lines.find((line: string) => line.endsWith(".ts"));

    if (!tsUrl) {
      throw new Error("No .ts URL found in HLS stream");
    }

    const tsAbsoluteUrl = path.join(hlsUrl, "..", tsUrl);

    ffmpeg(tsAbsoluteUrl)
      .on("end", function () {
        console.log("Frames: extracted");
      })
      .on("error", function (err) {
        console.log("An error occurred: " + err.message);
      })
      .screenshots({
        count: 1,
        folder: ".",
        filename: outputImagePath,
        size: "1920x1080",
      });
  } catch (err) {
    console.error(err);
  }
}