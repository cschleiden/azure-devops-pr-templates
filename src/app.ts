/// <reference types="vss-web-extension-sdk" />
import "es6-promise";

import { IDialogInputData } from "./interfaces";
import { PullRequestAsyncStatus } from "TFS/VersionControl/Contracts";

const extensionContext = VSS.getExtensionContext();

let dialog: IExternalDialog;
let saveHandler: Function;

VSS.register(
  `${extensionContext.publisherId}.${
    extensionContext.extensionId
  }.context-menu`,
  () => ({
    execute: actionContext => {
      VSS.getService(VSS.ServiceIds.Dialog).then(
        (hostDialogService: IHostDialogService) => {
          hostDialogService
            .openDialog(
              `${extensionContext.publisherId}.${
                extensionContext.extensionId
              }.apply-templates`,
              {
                title: "Pull Request Templates",
                width: 700,
                height: 400,
                modal: true,
                resizable: true,
                buttons: {
                  ok: {
                    id: "ok",
                    text: "Apply",
                    click: () => {
                      dialog.updateOkButton(false);

                      return saveHandler().then(
                        () => {
                          dialog.close();
                        },
                        (error: Error | string) => {
                          if (typeof error === "string") {
                            dialog.setTitle(error);
                          } else {
                            dialog.setTitle(error.message);
                          }
                        }
                      );
                    },
                    class: "cta",
                    disabled: "disabled"
                  }
                }
              },
              <IDialogInputData>{
                pullRequest: actionContext.pullRequest,
                registerSaveHandler: s => {
                  saveHandler = s;
                },
                onUpdate: (isValid: boolean) => {
                  if (dialog) {
                    dialog.updateOkButton(isValid);
                  }
                }
              }
            )
            .then(d => {
              dialog = d;
            });
        }
      );
    }
  })
);
