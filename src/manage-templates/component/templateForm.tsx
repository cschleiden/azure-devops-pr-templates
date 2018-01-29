import "./templateForm.scss";
import * as React from "react";
import { IEditTemplate } from "../models";
import { ITemplate } from "../../models/interfaces";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { autobind } from "office-ui-fabric-react/lib/Utilities";

export interface ITemplateFormProps {
    entry: IEditTemplate;

    onChanged: (template: ITemplate) => void;
}

export class TemplateForm extends React.Component<ITemplateFormProps> {
    public render(): JSX.Element {
        const { entry } = this.props;
        const { state, template } = entry;

        return (
            <div className="template-form">
                <TextField
                    label="Name"
                    value={template.name}
                    onChanged={this.changeName}
                    required
                />

                <TextField
                    name="description"
                    label="Description"
                    multiline
                    value={template.description}
                    onChanged={this.changeDescription}
                    required
                    autoAdjustHeight
                />

                <TextField
                    name="template"
                    label="Template"
                    multiline
                    value={template.template}
                    onChanged={this.changeTemplate}
                    required
                    autoAdjustHeight
                    rows={10}
                />
            </div>
        );
    }

    @autobind
    private changeName(value: string) {
        this.updateTemplate("name", value);
    }

    @autobind
    private changeDescription(value: string) {
        this.updateTemplate("description", value);
    }

    @autobind
    private changeTemplate(value: string) {
        this.updateTemplate("template", value);
    }

    private updateTemplate(key: keyof ITemplate, value: string) {
        const { entry, onChanged } = this.props;

        if (onChanged) {
            onChanged({
                ...entry.template,
                [key]: value
            });
        }
    }
}
