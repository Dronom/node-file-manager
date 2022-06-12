import fs from "fs";
import { getFileInfo } from "../utils/index.js";

export const read = async (filePath) => {
  const { directory, isExist } = await getFileInfo(filePath);
  if (isExist) {
    const readStream = fs.createReadStream(directory);
    readStream.pipe(process.stdout);
    readStream.on("error", () => {
      throw "Operation failed";
    });
  } else {
    throw "Invalid input";
  }
};
