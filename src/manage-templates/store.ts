import { BaseStore } from "../store";
import { Actions } from "./actions";
import { autobind, find, findIndex } from "office-ui-fabric-react/lib/Utilities";
import { ITemplate } from "../models/interfaces";
import { Mode, IEditTemplate, TemplateState } from "./models";
import { uuidv4 } from "../utils/uuidv4";
import { makeElementUnselectable } from "VSS/Utils/UI";

export class ManageTemplatesStore extends BaseStore<Actions> {
    private mode: Mode = Mode.Loading;
    private templates: IEditTemplate[] = [];
    private selectedTemplate: IEditTemplate = null;

    init() {
        super.init();

        this.actionsHub.initialize.addListener(this.initialize);
        this.actionsHub.createTemplate.addListener(this.createTemplate);
        this.actionsHub.updatedTemplate.addListener(this.updateTemplate);
        this.actionsHub.selectTemplate.addListener(this.selectTemplate);
        this.actionsHub.deletedTemplate.addListener(this.deletedTemplate);

        this.actionsHub.savedTemplate.addListener(this.savedTemplate);
    }

    getMode() {
        return this.mode;
    }

    getTemplates(): IEditTemplate[] {
        return this.templates;
    }

    getSelectedTemplate(): IEditTemplate {
        return this.selectedTemplate;
    }    

    @autobind
    private initialize(templates: ITemplate[]) {
        this.templates = templates.map(template => ({
            state: TemplateState.Unchanged,
            template
        }));
        this.mode = Mode.Editing;

        this.emitChanged();
    }

    @autobind
    private createTemplate() {
        const newTemplate = {
            state: TemplateState.New,
            template: {
                id: uuidv4(),
                name: "",
                description: "",
                template: "",
                createdBy: VSS.getWebContext().user.name
            }
        };
        this.templates.push(newTemplate);
        this.selectedTemplate = newTemplate;

        this.emitChanged();
    }

    @autobind
    private selectTemplate(id: string) {
        const template = find(this.templates, x => x.template.id === id);
        if (template) {
            this.selectedTemplate = template;
            this.emitChanged();
        }
    }

    @autobind
    private updateTemplate(template: ITemplate) {
        const entry = find(this.templates, x => x.template.id === template.id);
        if (entry) {
            entry.template = template;

            // Mark entry as dirty, if it isn't already
            if (entry.state === TemplateState.Unchanged) {
                entry.state = TemplateState.Modified;
            }

            this.emitChanged();
        }
    }

    @autobind
    private savedTemplate(template: ITemplate) {
        const entry = find(this.templates, x => x.template.id === template.id);
        if (entry) {
            entry.template = template;
            entry.state = TemplateState.Unchanged;
            this.emitChanged();
        }
    }

    @autobind
    private deletedTemplate(templateId: string) {
        const idx = findIndex(this.templates, x => x.template.id === templateId);
        if (idx >= 0) {
            const entry = this.templates[idx];
            this.templates.splice(idx);

            if (this.selectedTemplate === entry) {
                this.selectedTemplate = null;
            }

            this.emitChanged();
        }
    }
}