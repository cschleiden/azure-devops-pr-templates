import { ActionsHub } from "./actions";
import { ITemplate, IActionPullRequest, Mode } from "../models/interfaces";
import { ApplyTemplateService } from "../services/templateService";
import { ApplyTemplateStore } from "./store";
import { TemplateStoreService } from "../services/TemplateStore";

export class ActionsCreator {
    constructor(private actionsHub: ActionsHub, private store: ApplyTemplateStore) {
    }

    changeSelection(selectedTemplates: ITemplate[]): void {
        this.actionsHub.changeSelection.invoke(selectedTemplates);
    }

    initialize(pullRequest: IActionPullRequest): void {
        new TemplateStoreService().getTemplates().then(templates => {
            this.actionsHub.initializeTemplates.invoke(templates);
        }, error => {
            this.actionsHub.changeMode.invoke(Mode.Error);
        }).then(() => {
            new ApplyTemplateService().getStatus(pullRequest).then(prStatus => {
                this.actionsHub.initializeStatus.invoke(prStatus);
            }, error => {
                this.actionsHub.changeMode.invoke(Mode.Error);
            });
        });
    }

    applyTemplates(pullRequest: IActionPullRequest): Promise<void> {
        const service = new ApplyTemplateService();

        const selectedTemplates = this.store.getSelectedTemplates();

        this.actionsHub.changeMode.invoke(Mode.Saving);

        return service.applyTemplates(pullRequest, selectedTemplates).then(
            null,
            error => {
                this.actionsHub.changeMode.invoke(Mode.Error);
            });
    }
}