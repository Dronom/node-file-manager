import fs from "fs";
import { getFileInfo } from "../utils/index.js";
import { remove } from "./index.js";

export const copy = async (currentFile, newFilePath, isMoveMode = false) => {
  const { directory, isExist: isOldFileExist } = await getFileInfo(currentFile);

  if (!isOldFileExist) {
    throw "Invalid input; Input name is not exist";
  }

  const { directory: newDirectory, isExist: isNewFileExist } =
    await getFileInfo(newFilePath);

  if (isNewFileExist) {
    throw "Invalid input; new file name is busy";
  }
  const readStream = fs.createReadStream(directory);
  const writeStream = fs.createWriteStream(newDirectory);
  readStream.pipe(writeStream);

  readStream.on("error", () => {
    throw "Operation failed";
  });
  writeStream.on("error", () => {
    throw "Operation failed";
  });

  if (isMoveMode) {
    await remove(currentFile);
    writeStream.on("close", () => console.log("file was moved"));
  } else {
    writeStream.on("close", () => console.log("file was copied"));
  }
};
