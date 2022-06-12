import { rm } from "fs/promises";
import { getFileInfo } from "../utils/index.js";

export const remove = async (filePath) => {
  const { directory, isExist } = await getFileInfo(filePath);
  if (!isExist) {
    throw "Invalid input; this file does not exist";
  }
  await rm(directory);
  process.stdout.write(`File ${directory} was successfully removed \n`);
};
