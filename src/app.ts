/// <reference types="vss-web-extension-sdk" />

import { IDialogInputData } from "./interfaces";

const extensionContext = VSS.getExtensionContext();

let dialog: IExternalDialog;

VSS.register(`${extensionContext.publisherId}.${extensionContext.extensionId}.context-menu`, () => ({
    execute: (actionContext) => {
        VSS.getService(VSS.ServiceIds.Dialog).then((hostDialogService: IHostDialogService) => {
            hostDialogService.openDialog(`${extensionContext.publisherId}.${extensionContext.extensionId}.apply-templates`, {
                title: "Templates",
                width: 500,
                height: 400,
                modal: true,
                buttons: {
                    "ok": {
                        id: "ok",
                        text: "Apply",
                        click: () => {
                            dialog.updateOkButton(false);

                            // return onSaveHandler().then(() => {
                            //     dialog.close();
                            // }, (error: Error | string) => {
                            //     if (typeof error === "string") {
                            //         dialog.setTitle(error);
                            //     } else {
                            //         dialog.setTitle(error.message);
                            //     }
                            // });
                        },
                        class: "cta",
                        disabled: "disabled"
                    }
                }
            }, <IDialogInputData>{
            }).then(d => {
                dialog = d;
            });
        });
    }
}));
