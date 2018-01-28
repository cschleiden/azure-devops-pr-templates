import "./manageView.scss";
import * as React from "react";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Hub } from "vss-ui/Hub";
import { HubHeader } from "vss-ui/HubHeader";
import { HubViewState } from "vss-ui/Utilities/HubViewState";

export interface IManageViewProps {
}

export class ManageView extends React.Component<IManageViewProps> {
    private hubViewState = new HubViewState();

    public render(): JSX.Element {
        return (
            <Hub className="manage-view" hubViewState={this.hubViewState}>
                <HubHeader
                    title={"Pull Request Templates"}
                />

                <CommandBar items={[

                ]} />

                <div className="manage-view-list">
                </div>

                <div className="manage-view-edit">
                </div>
            </Hub >
        );
    }
}