import "./manageView.scss";
import * as React from "react";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Hub } from "vss-ui/Hub";
import { HubHeader } from "vss-ui/HubHeader";
import { HubViewState } from "vss-ui/Utilities/HubViewState";
import { PivotBarItem } from "vss-ui/PivotBar";
import { IPivotBarAction } from "vss-ui/Components/PivotBar";
import { VssIconType } from "vss-ui/VssIcon";
import { ActionsCreator } from "../actionsCreator";
import { Actions } from "../actions";
import { ManageTemplatesStore } from "../store";
import { Spinner } from "../../shared/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Mode, IEditTemplate, TemplateState, canSave } from "../models";
import { TemplateListEntry } from "./templateListEntry";
import { TemplateForm } from "./templateForm";
import { ITemplate } from "../../models/interfaces";

export interface IManageViewProps {
}

export interface IManageViewState {
    mode: Mode;
    templates: IEditTemplate[];
    selectedTemplate?: IEditTemplate;
}

export class ManageView extends React.Component<IManageViewProps, IManageViewState> {
    private actions: Actions;
    private actionsCreator: ActionsCreator;
    private store: ManageTemplatesStore;

    private hubViewState = new HubViewState();

    componentWillMount() {
        this.actions = new Actions();
        this.store = new ManageTemplatesStore(this.actions);
        this.actionsCreator = new ActionsCreator(this.actions, this.store);

        this.state = this.getStateFromStore();

        this.store.addListener(this.storeChanged);
    }

    componentDidMount() {
        this.actionsCreator.initialize();
    }

    render(): JSX.Element {
        const { mode, templates, selectedTemplate } = this.state;

        let content: JSX.Element;
        let commands: IPivotBarAction[] = [];

        switch (mode) {
            case Mode.Loading: {
                content = (
                    <Spinner label="Loading templates" />
                );
                break;
            }

            case Mode.Editing: {
                commands = [
                    {
                        key: "create",
                        name: "Create template",
                        important: true,
                        disabled: false,
                        iconProps: {
                            iconName: "Add",
                            iconType: VssIconType.fabric
                        },
                        onClick: this.createTemplate
                    },
                    {
                        key: "save",
                        name: "Save template",
                        important: true,
                        disabled: !selectedTemplate || selectedTemplate.state === TemplateState.Unchanged || !canSave(selectedTemplate),
                        iconProps: {
                            iconName: "Save",
                            iconType: VssIconType.fabric
                        },
                        onClick: this.saveTemplate
                    },
                    {
                        key: "discard",
                        name: "Discard template",
                        important: true,
                        disabled: !selectedTemplate || selectedTemplate.state !== TemplateState.New,
                        iconProps: {
                            iconName: "Undo",
                            iconType: VssIconType.fabric
                        },
                        onClick: this.discardTemplate
                    },
                    {
                        key: "delete",
                        name: "Delete template",
                        important: true,
                        disabled: !selectedTemplate ||  selectedTemplate.state === TemplateState.New,
                        iconProps: {
                            iconName: "Delete",
                            iconType: VssIconType.fabric
                        },
                        onClick: this.deleteTemplate
                    }
                ];

                content = (
                    <div className="manage-view-edit">
                        <div className="manage-view-list">
                            {templates.map(entry => (
                                <TemplateListEntry
                                    key={entry.template.id}
                                    entry={entry}
                                    onSelect={this.selectTemplate}
                                    isSelected={entry === selectedTemplate}
                                />
                            ))}
                        </div>

                        <div className="manage-view-edit">
                            {
                                selectedTemplate &&
                                <TemplateForm
                                    entry={selectedTemplate}
                                    onChanged={this.updateTemplate}
                                />
                            }
                        </div>
                    </div>
                );
                break;
            }
        }

        return (
            <Hub className="manage-hub" hubViewState={this.hubViewState} hideFullScreenToggle={true}>
                <HubHeader
                    title={"Pull Request Templates"}
                />

                <PivotBarItem
                    name="Templates"
                    itemKey="main"
                    commands={commands}>
                    {content}
                </PivotBarItem>
            </Hub>
        );
    }

    private getStateFromStore(): IManageViewState {
        return {
            mode: this.store.getMode(),
            templates: this.store.getTemplates(),
            selectedTemplate: this.store.getSelectedTemplate()
        }
    }

    @autobind
    private storeChanged() {
        this.setState(this.getStateFromStore());
    }

    @autobind
    private createTemplate(): void {
        this.actionsCreator.create();
    }

    @autobind
    private saveTemplate(): void {
        this.actionsCreator.saveCurrentTemplate();
    }

    @autobind
    private discardTemplate(): void {
        this.actionsCreator.discardCurrentTemplate();
    }

    @autobind
    private deleteTemplate(): void {
        if (confirm("Do you really want to delete this template? This cannot be undone.")) {
            this.actionsCreator.deleteCurrentTemplate()
        }
    }

    @autobind
    private selectTemplate(entry: IEditTemplate): void {
        this.actionsCreator.selectTemplate(entry.template.id);
    }

    @autobind
    private updateTemplate(template: ITemplate): void {
        this.actionsCreator.updateTemplate(template);
    }
}