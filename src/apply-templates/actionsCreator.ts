import { ActionsHub } from "./actions";
import { ITemplate, IActionPullRequest, Mode } from "../models/interfaces";
import { TemplateService } from "../services/templateService";
import { ApplyTemplateStore } from "./store";

export class ActionsCreator {
    constructor(private actionsHub: ActionsHub, private store: ApplyTemplateStore) {
    }

    changeSelection(selectedTemplates: ITemplate[]): void {
        this.actionsHub.changeSelection.invoke(selectedTemplates);
    }

    initialize(templates: ITemplate[]): void {
        this.actionsHub.initialize.invoke(templates);
    }

    applyTemplates(pullRequest: IActionPullRequest): Promise<void> {
        const service = new TemplateService();

        const selectedTemplates = this.store.getSelectedTemplates();

        this.actionsHub.changeMode.invoke(Mode.Saving);

        return service.applyTemplates(pullRequest, selectedTemplates).then(
            null,
            error => {
                this.actionsHub.changeMode.invoke(Mode.Error);
            });
    }
}