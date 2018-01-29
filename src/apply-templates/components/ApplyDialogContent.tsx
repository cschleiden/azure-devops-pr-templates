import "./ApplyDialogContent.scss";
import * as React from "react";
import { ITemplate } from "../../models/interfaces";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TestData } from "../../models/testData";
import { ActionsCreator } from "../actionsCreator";
import { ApplyTemplateStore } from "../store";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { TemplateList } from "./TemplateList";

export interface IApplyDialogContentProps {
    store: ApplyTemplateStore;
    actionsCreator: ActionsCreator;
}

export interface IApplyDialogContentState {
    templates: ITemplate[];
}

export class ApplyDialogContent extends React.Component<IApplyDialogContentProps, IApplyDialogContentState> {
    constructor(props: IApplyDialogContentProps, context: any) {
        super(props, context);

        this.state = this.getState(props.store);
    }

    componentDidMount() {
        const { store } = this.props;

        store.addListener(this.storeUpdated);
    }

    componentWillUnmount() {
        const { store } = this.props;

        store.removeListener(this.storeUpdated);
    }

    render(): JSX.Element {
        const { templates } = this.state;

        const context = VSS.getWebContext();
        const extensionContext = VSS.getExtensionContext();
        const url = `${context.collection.uri}${context.project.name}/_apps/hub/${extensionContext.publisherId}.${extensionContext.extensionId}.manage-templates-hub`;

        return (
            <div className="apply-template-root">
                <Label className="apply-template-description">
                    Select one or more template to apply to the PR description.&nbsp;<a href={url} target="_top">Manage templates</a>
                </Label>

                <TemplateList templates={templates} onSelectionChanged={this.selectionChanged} />
            </div>
        );
    }

    @autobind
    private storeUpdated() {
        this.setState(this.getState(this.props.store));
    }

    private getState(store: ApplyTemplateStore): IApplyDialogContentState {
        return {
            templates: store.getTemplates()
        };
    }

    @autobind
    private selectionChanged(selectedTemplates: ITemplate[]): void {
        const { actionsCreator } = this.props;

        actionsCreator.changeSelection(selectedTemplates);
    }
}
