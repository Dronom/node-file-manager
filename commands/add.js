import fs from "fs";
import { getFileInfo } from "../utils/index.js";

export const add = async (path) => {
  const { directory, isExist } = await getFileInfo(path);
  if (isExist) {
    throw "Invalid input";
  }
  const writeStream = fs.createWriteStream(directory);

  writeStream.on("finish", () => {
    process.stdout.write("file was added");
  });

  writeStream.on("error", () => {
    throw "Operation failed";
  });
};
