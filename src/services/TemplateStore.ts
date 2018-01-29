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
                    const templates: ITemplate[] = collections[0].documents || [];
                    templates.sort((a, b) => a.name.localeCompare(b.name));
                    return templates;
                }

                return [];
            });
    }

    createTemplate(template: ITemplate): Promise<ITemplate> {
        return this.getService()
            .then(service => service.createDocument(DocumentCollectionId, template));
    }

    updateTemplate(template: ITemplate): Promise<ITemplate> {
        return this.getService()
            .then(service => service.updateDocument(DocumentCollectionId, template));
    }

    deleteTemplate(template: ITemplate): Promise<void> {
        return this.getService()
            .then(service => service.deleteDocument(DocumentCollectionId, template.id));
    }

    private getService(): Promise<ExtensionDataService> {
        return new Promise((resolve, reject) => VSS.getService(VSS.ServiceIds.ExtensionData).then(resolve, reject));
    }
}