import ffmpeg from "fluent-ffmpeg";
import axios from "axios";
import path from "path";

export async function extractFirstFrame(hlsUrl: string, filePath: string) {
  try {
    console.log(hlsUrl)
    // replace index.m3u8 with 720p0/index.m3u8
    hlsUrl = hlsUrl.replace("index.m3u8", "720p0/index.m3u8");
    const response = await axios.get(hlsUrl);
    const body = response.data;
    console.log(body);
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
        filename: filePath,
        size: "1920x1080",
      });
  } catch (err) {
    console.error(err);
  }
}