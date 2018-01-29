import { Actions } from "./actions";
import { TemplateStoreService } from "../services/TemplateStore";
import { ManageTemplatesStore } from "./store";
import { TemplateState } from "./models";
import { TestData } from "../models/testData";
import { ITemplate } from "../models/interfaces";

export class ActionsCreator {
    constructor(private actions: Actions, private store: ManageTemplatesStore) { }

    create(): void {
        this.actions.createTemplate.invoke(null);
    }

    initialize(): void {
        new TemplateStoreService().getTemplates().then(
            templates => {
                this.actions.initialize.invoke(templates);
            },
            error => {
                // TODO
            }
        );
    }

    selectTemplate(id: string): void {
        this.actions.selectTemplate.invoke(id);
    }

    updateTemplate(template: ITemplate): void {
        this.actions.updatedTemplate.invoke(template);
    }

    saveCurrentTemplate(): void {
        const entry = this.store.getSelectedTemplate();

        Promise.resolve()
            .then(() => {
                if (entry.state === TemplateState.New) {
                    return this.getStorage().createTemplate(entry.template);
                } else if (entry.state === TemplateState.Modified) {
                    return this.getStorage().updateTemplate(entry.template);
                }
            })
            .then((updatedTemplate) => {
                this.actions.savedTemplate.invoke(updatedTemplate);
            }, error => {

            });
    }

    discardCurrentTemplate(): void {
        const entry = this.store.getSelectedTemplate();
        if (entry.state === TemplateState.New) {
            this.actions.deletedTemplate.invoke(entry.template.id);
        }
    }

    deleteCurrentTemplate(): void {
        const entry = this.store.getSelectedTemplate();
        this.getStorage().deleteTemplate(entry.template).then(
            () => {
                this.actions.deletedTemplate.invoke(entry.template.id);
            }, error => {

            }
        );
    }

    private getStorage(): TemplateStoreService {
        return new TemplateStoreService();
    }
}