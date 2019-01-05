import { Action } from "../store";
import { ITemplate, Mode } from "../models/interfaces";
import { PullRequestStatus } from "TFS/VersionControl/Contracts";

export class ActionsHub {
  public readonly initializeTemplates = new Action<ITemplate[]>();
  public readonly initializeStatus = new Action<PullRequestStatus>();

  public readonly changeSelection = new Action<ITemplate[]>();

  public readonly changeMode = new Action<Mode>();
}
