import { GitPullRequest } from "TFS/VersionControl/Contracts";
import { IActionPullRequest } from "./models/interfaces";

export interface IDialogInputData {
  pullRequest: IActionPullRequest;

  registerSaveHandler(handler: () => Promise<void>): void;

  onUpdate(isValid: boolean): void;
}
