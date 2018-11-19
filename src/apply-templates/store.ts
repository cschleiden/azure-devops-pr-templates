import { BaseStore } from "../store";
import { ActionsHub } from "./actions";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITemplate, Mode } from "../models/interfaces";
import { PullRequestStatus } from "TFS/VersionControl/Contracts";

export class ApplyTemplateStore extends BaseStore<ActionsHub> {
    private templates: ITemplate[] = [];
    private selectedTemplates: ITemplate[] = [];
    private mode: Mode = Mode.Loading;

    protected init() {
        this.actionsHub.initializeTemplates.addListener(this.initializeTemplates);
        this.actionsHub.initializeStatus.addListener(this.initializeStatus);
        this.actionsHub.changeSelection.addListener(this.changeSelection);
        this.actionsHub.changeMode.addListener(this.changeMode);
    }

    getTemplates(): ITemplate[] {
        return this.templates;
    }

    getSelectedTemplates(): ITemplate[] {
        return this.selectedTemplates;
    }

    getMode(): Mode {
        return this.mode;
    }

    isValid(): boolean {
        return this.selectedTemplates.length > 0;
    }

    @autobind
    private initializeTemplates(templates: ITemplate[]) {
        this.templates = templates.slice(0);
        this.mode = Mode.Selecting;

        this.emitChanged();
    }

    @autobind
    private initializeStatus(prStatus: PullRequestStatus) {
        if (prStatus !== PullRequestStatus.Active) {
            this.mode = Mode.PRNotActive;
        }

        this.emitChanged();
    }

    @autobind
    private changeSelection(selectedTemplates: ITemplate[]) {
        this.selectedTemplates = selectedTemplates.slice(0);

        this.emitChanged();
    }

    @autobind
    private changeMode(mode: Mode): void {
        this.mode = mode;

        this.emitChanged();
    }
}