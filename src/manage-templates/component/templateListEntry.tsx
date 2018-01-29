import "./templateListEntry.scss";
import * as React from "react";
import { IEditTemplate, TemplateState } from "../models";
import { css, autobind } from "office-ui-fabric-react/lib/Utilities";

export interface ITemplateListEntryProps {
    entry: IEditTemplate;
    isSelected: boolean;

    onSelect: (template: IEditTemplate) => void;
}

export class TemplateListEntry extends React.Component<ITemplateListEntryProps> {
    public render(): JSX.Element {
        const { entry, isSelected } = this.props;

        return (
            <div className={css("template-list-entry", isSelected && "selected")} onClick={this.select}>
                <div className={css(
                    "name",
                    entry.state === TemplateState.Modified && "modified",
                    entry.state === TemplateState.New && "new"
                )}>
                    {entry.template.name || "<Template>"}
                </div>

                <div className="description">
                    {entry.template.description || "<Description>"}
                </div>
            </div>
        );
    }

    @autobind
    private select() {
        const { onSelect, entry } = this.props;
        if (onSelect) {
            onSelect(entry);
        }
    }
}