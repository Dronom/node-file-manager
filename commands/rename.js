import { rename as renameFn } from "fs/promises";
import { getFileInfo } from "../utils/index.js";

export const rename = async (oldFilePath, newFilePath) => {
  const { directory: oldFileDirectory, isExist: oldFileIsExist } =
    await getFileInfo(oldFilePath);
  const a = await getFileInfo(oldFilePath);
  const { directory: newFileDirectory, isExist: newFileIsExist } =
    await getFileInfo(newFilePath);

  if (!oldFileIsExist) {
    throw "Invalid input; current file does not exist";
  }
  if (newFileIsExist) {
    throw "file already exists";
  }

  await renameFn(oldFileDirectory, newFileDirectory);
};
