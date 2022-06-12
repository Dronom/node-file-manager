import fs from "fs/promises";
import url from "url";
import os, { homedir } from "os";
import path from "path";
import {
  add,
  read,
  rename,
  remove,
  copy,
  osCommands,
} from "../commands/index.js";

export const isAbsolutePath = (directory) => {
  const rootPath = path.parse(homedir()).root;
  return path.normalize(directory).startsWith(rootPath);
};

export const commandHandler = async (command, args) => {
  try {
    switch (command) {
      case ".exit":
        process.stdout.write(
          `Thank you for using File Manager, ${process.env.USERNAME}!`
        );
        process.exit();
      case "up":
        const { directory } = await getFileInfo("..");
        await changePath(directory);
        currentDirectory();
        break;
      case "ls":
        const files = (await fs.readdir(process.env.current_path)).join(", ");
        process.stdout.write(files);
        currentDirectory();
        break;
      case "cd":
        if (args.length === 1) {
          await changePath(args[0]);
          currentDirectory();
        } else {
          throw "Invalid Input";
        }
        break;
      case "add":
        if (args.length === 1) {
          add(args[0]);
        } else {
          throw "Invalid Input";
        }
        break;
      case "cat":
        if (args.length === 1) {
          read(args[0]);
        } else {
          throw "Invalid Input";
        }
        break;
      case "rn": {
        if (args.length === 2) {
          await rename(args[0], args[1]);
          currentDirectory();
          break;
        } else {
          throw "Invalid Input";
        }
      }
      case "rm": {
        if (args.length == 1) {
          await remove(args[0]);
        } else {
          throw "Invalid Input";
        }
        break;
      }
      case "cp": {
        if (args.length == 2) {
          await copy(args[0], args[1]);
          currentDirectory();
        } else {
          throw "Invalid Input";
        }
        break;
      }
      case "mv": {
        if (args.length == 2) {
          await copy(args[0], args[1], true);
          currentDirectory();
        } else {
          throw "Invalid Input";
        }
        break;
      }
      case "os":
        if (args.length === 1) {
          osCommands(args[0]);
        } else {
          showError("Invalid input; Please provide argument");
        }
        currentDirectory();
        break;
      default:
        throw "unexpected error";
    }
  } catch (err) {
    console.error("e", err);
  }
};

export const getFileInfo = async (directory) => {
  const { current_path } = process.env;
  const rootPath = path.parse(homedir()).root;
  let normalizedPath = path.normalize(directory);
  if (!normalizedPath.startsWith(rootPath)) {
    normalizedPath = path.normalize(path.join(current_path, normalizedPath));
  }
  const isExist = await isPathExist(normalizedPath);
  let isFolder;

  if (isExist) {
    isFolder = (await fs.stat(normalizedPath)).isDirectory();
  }
  return { directory: normalizedPath, isExist, isFolder };
};

export const isPathExist = async (directory) => {
  try {
    await fs.access(directory);
    return true;
  } catch (e) {
    return false;
  }
};

export const changePath = async (directory) => {
  const pathInfo = await getFileInfo(directory);
  const rootPath = path.parse(homedir()).root;
  if (!pathInfo.isExist) {
    throw "the current path is not existing";
  }

  if (!pathInfo.directory.startsWith(rootPath)) {
    throw "current path outside our scope";
  }
  if (pathInfo.isFolder) {
    process.env.current_path = pathInfo.directory;
  } else {
    throw "Incorrect path";
  }
};

export const currentDirectory = async () => {
  const directory = process.env.current_path;
  process.stdout.write(`You are currently in ${directory} \n`);
};
