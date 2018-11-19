import * as React from "react";
import { ITemplate, Mode } from "../../models/interfaces";
import { ActionsCreator } from "../actionsCreator";
import { ApplyTemplateStore } from "../store";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ApplyDialogContent } from "./ApplyDialogContent";
import { IDialogInputData } from "../../interfaces";
import { ActionsHub } from "../actions";
import { ApplyTemplateService } from "../../services/templateService";
import { Spinner } from "../../shared/Spinner";

export interface IApplyDialogProps {
    config: IDialogInputData;
}

export interface IApplyDialogState {
    mode: Mode;
}

export class ApplyDialog extends React.Component<IApplyDialogProps, IApplyDialogState> {
    private store: ApplyTemplateStore;
    private actionsCreator: ActionsCreator;
    private actions: ActionsHub;

    componentWillMount() {
        const { config } = this.props;

        this.actions = new ActionsHub();
        this.store = new ApplyTemplateStore(this.actions);
        this.actionsCreator = new ActionsCreator(this.actions, this.store);

        this.actionsCreator.initialize(config.pullRequest);

        this.store.addListener(this.storeChanged);

        config.registerSaveHandler(() => {
            return this.actionsCreator.applyTemplates(config.pullRequest);
        });

        this.setState(this.getStateFromStore());
    }

    componentWillUnmount() {
    }

    render(): JSX.Element {
        const { mode } = this.state;

        switch (mode) {
            case Mode.Loading: {
                return (
                    <Spinner label={"Loading templates"} />
                );
            }

            case Mode.Selecting: {
                return (
                    <ApplyDialogContent store={this.store} actionsCreator={this.actionsCreator} />
                );
            }

            case Mode.Saving: {
                return (
                    <Spinner label={"Applying templates"} />
                );
            }

            case Mode.PRNotActive: {
                return (
                    <div>The Pull Request is not active.</div>
                );
            }

            case Mode.Error: {
                return (
                    <div>Error</div>
                );
            }
        }
    }

    @autobind
    private storeChanged() {
        const { config } = this.props;

        const mode = this.store.getMode();
        config.onUpdate(mode === Mode.Selecting && this.store.isValid());

        this.setState(this.getStateFromStore());
    }

    private getStateFromStore(): IApplyDialogState {
        return {
            mode: this.store.getMode()
        };
    }
}
