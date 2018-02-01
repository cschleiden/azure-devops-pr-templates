import "./TemplateList.scss";
import * as React from "react";
import { DetailsList, SelectionMode, IColumn, ISelection, Selection, ConstrainMode, CheckboxVisibility, DetailsListLayoutMode } from "office-ui-fabric-react/lib/DetailsList";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITemplate } from "../../models/interfaces";

export interface ITemplateListProps {
    templates: ITemplate[];

    onSelectionChanged: (selectedTemplates: ITemplate[]) => void;
}

export class TemplateList extends React.PureComponent<ITemplateListProps> {
    private readonly columns: IColumn[] = [
        {
            key: "name",
            name: "Name",
            fieldName: "name",
            minWidth: 200,
            isCollapsable: false,
            isResizable: true,
            isMultiline: true,
            isSortedDescending: true,
            onRender: this.renderName
        },
        {
            key: "createdBy",
            name: "Created By",
            fieldName: "createdBy",
            minWidth: 150,
            isCollapsable: true,
            isResizable: true
        }
    ];

    private selection: ISelection = new Selection({
        onSelectionChanged: this.onSelectionChanged,
        selectionMode: SelectionMode.multiple
    });

    componentDidMount(): void {
        this.selection.setModal(true);
    }

    render(): JSX.Element {
        const { templates } = this.props;

        return (
            <div className="template-list" data-is-scrollable={true}>
                <DetailsList
                    isHeaderVisible={true}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.unconstrained}
                    selectionPreservedOnEmptyClick={true}
                    checkboxVisibility={CheckboxVisibility.always}
                    items={templates}
                    columns={this.columns}
                    selection={this.selection}
                />
            </div>
        );
    }

    renderName(template: ITemplate): JSX.Element {
        return (
            <div>
                <div className="template-name">{template.name}</div>
                <div className="template-description">{template.description}</div>
            </div>
        );
    }

    @autobind
    private onSelectionChanged(): void {
        const { onSelectionChanged } = this.props;
        if (onSelectionChanged) {
            const selection: ITemplate[] = this.selection.getSelection() as ITemplate[];
            onSelectionChanged(selection);
        }

        // Force selection to be modal all the time
        this.selection.setModal(true);
    }
}