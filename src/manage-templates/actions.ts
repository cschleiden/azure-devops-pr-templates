import { Action } from "../store";
import { ITemplate } from "../models/interfaces";

export class ActionsHub {
    public readonly createTemplate = new Action<void>();

    public readonly selectTemplate = new Action<ITemplate>();

    public readonly saveTemplate = new Action<ITemplate>();

    public readonly deleteTemplate = new Action<ITemplate>();
}