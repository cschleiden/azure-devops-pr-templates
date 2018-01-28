import "./manage.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { ManageView } from "./manage-templates/component/manageView";

initializeIcons(/* optional base url */);

// Render dialog
const element = document.getElementById("content");
ReactDOM.render(
    <ManageView />,
    element
);