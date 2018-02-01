import "./Spinner.scss";
import * as React from "react";
import { Spinner as OfficeFabricSpinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

export interface ISpinnerProps {
    label?: string;
}

export class Spinner extends React.PureComponent<ISpinnerProps> {
    public render(): JSX.Element {
        const { label } = this.props;

        return (
            <div className="templates-spinner">
                <OfficeFabricSpinner label={label} size={SpinnerSize.large} />
            </div>
        )
    }
}