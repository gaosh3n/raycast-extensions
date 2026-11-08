import { closeMainWindow, open, showHUD } from "@raycast/api";
import { execFile } from "child_process";
import { promisify } from "util";
import { App } from "../models";

const execFileAsync = promisify(execFile);

function desktopFileId(path: string): string {
  return path.split("/").pop() ?? path;
}

export default async function openApplication(item: App) {
  try {
    if (process.platform === "linux") {
      await closeMainWindow();
      await execFileAsync("vicinae", ["app", "launch", desktopFileId(item.path)]);
      return;
    }

    await open(item.path, item.name);
    await closeMainWindow();
  } catch (error) {
    await showHUD(`Failed to open ${item.name}: ${error instanceof Error ? error.message : `${error}`}`);
  }
}
