import "apply.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IDialogInputData } from "./interfaces";
import { ApplyDialog } from "./apply-templates/components/ApplyDialog";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

initializeIcons(/* optional base url */);

// Render dialog
const element = document.getElementById("content");
var config: IDialogInputData = VSS.getConfiguration();
ReactDOM.render(
    <ApplyDialog config={config} />,
    element
);