import "./Spinner.scss";
import * as React from "react";
import SpinkitSpinner = require("react-spinkit");

export interface ISpinnerProps {
    label?: string;
}

export class Spinner extends React.PureComponent<ISpinnerProps> {
    public render(): JSX.Element {
        const { label } = this.props;

        return (
            <div className="templates-spinner">
                <SpinkitSpinner name="rotating-plane" fadeIn="none" />
                {label && <div className="templates-spinner-label">{label}</div>}
            </div>
        )
    }
}