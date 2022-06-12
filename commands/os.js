import os from "os";

export const osCommands = (value) => {
  switch (value) {
    case "--EOL":
      process.stdout.write(JSON.stringify(os.EOL), "\n");
      break;
    case "--cpus":
      const cpus = os.cpus();
      cpus.map((item) => {
        delete item.times;
      });
      console.table(cpus);
      break;
    case "--homedir":
      const homedir = os.userInfo().homedir;
      process.stdout.write(homedir, "\n");
      break;
    case "--username":
      const username = os.userInfo().username;
      process.stdout.write(username, "\n");
      break;
    case "--architecture":
      const architecture = os.arch();
      process.stdout.write(architecture, "\n");
      break;
    default:
      throw "Invalid input";
  }
};
