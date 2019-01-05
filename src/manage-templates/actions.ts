import { Action } from "../store";
import { ITemplate } from "../models/interfaces";

export class Actions {
  public readonly initialize = new Action<ITemplate[]>();

  public readonly selectTemplate = new Action<string>();

  public readonly createTemplate = new Action<void>();
  public readonly savedTemplate = new Action<ITemplate>();
  public readonly updatedTemplate = new Action<ITemplate>();
  public readonly deletedTemplate = new Action<string>();
}
