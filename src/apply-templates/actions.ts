import { Action } from "../store";
import { ITemplate, Mode } from "../models/interfaces";

export class ActionsHub {
    public readonly initialize = new Action<ITemplate[]>();

    public readonly changeSelection = new Action<ITemplate[]>();

    public readonly changeMode = new Action<Mode>();
}