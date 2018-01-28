import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { ITemplate } from "../models/interfaces";
import { findIndex, find } from "office-ui-fabric-react/lib/Utilities";

const DocumentCollectionId = "shared-pull-request-templates";

export class TemplateStoreService {
    getTemplates(): Promise<ITemplate[]> {
        return this.getService()
            .then(s => s.queryCollectionNames([DocumentCollectionId]))
            .then(collections => {
                if (collections.length > 0) {
                    return collections[0].documents || [];
                }

                return [];
            });
    }

    createTemplate(template: ITemplate): Promise<void> {
        return this.getService()
            .then(service => service.createDocument(DocumentCollectionId, template));
    }

    saveTemplate(template: ITemplate): Promise<void> {
        return this.getService()
            .then(service => service.updateDocument(DocumentCollectionId, template));
    }

    private getService(): Promise<ExtensionDataService> {
        return new Promise((resolve, reject) => VSS.getService(VSS.ServiceIds.ExtensionData).then(resolve, reject));
    }
}