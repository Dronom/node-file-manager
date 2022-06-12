import path from "path";
import { homedir } from "os";
import { commandHandler, currentDirectory } from "./utils/index.js";

export const start = () => {
  const argvs = process.argv;
  let username = "Username";
  for (let i = 0; i < argvs.length; i++) {
    if (argvs[i].startsWith("--username")) {
      username = argvs[i].split("=")[1];
    }
  }
  process.env.USERNAME = username;
  process.env.current_path =
    process.env.current_path || path.normalize(homedir());

  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  currentDirectory();
  process.stdin.on("data", (data) => {
    const [command, ...args] = data.toString().trim().split(/\s+/);

    commandHandler(command, args);
  });

  process.on("SIGINT", () => {
    console.log(`\n Thank you for using File Manager, ${username}!`);
    process.exit();
  });
};

start();
