import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { ITemplate } from "../models/interfaces";
import { findIndex, find } from "office-ui-fabric-react/lib/Utilities";

const AccountDocumentCollectionId = "shared-pull-request-templates";
const DocumentCollectionId = "pr-templates";

export class TemplateStoreService {
    getTemplates(): Promise<ITemplate[]> {
        return this.getService()
            .then(s => {
                // Migrate settings from account to project scope, remove in a couple versions
                return s.queryCollectionNames([AccountDocumentCollectionId])
                    .then(collections => {
                        if (collections.length > 0) {
                            const accountTemplates: ITemplate[] = collections[0].documents || [];
                            if (accountTemplates.length > 0) {
                                // Migrate templates
                                return Promise.all(
                                    accountTemplates.map(
                                        accountTemplate =>
                                            // Delete from account collection
                                            s.deleteDocument(AccountDocumentCollectionId, accountTemplate.id)
                                                .then(null, console.log.bind(console))
                                                // Add in project collection
                                                .then(() => this.createTemplate(accountTemplate))
                                                .then(null, console.log.bind(console))
                                    )
                                );
                            }
                        }
                    })
                    .then(() => s);
            })
            .then(s => s.queryCollectionNames([this.getCollectionId()]))
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
            .then(service => service.createDocument(this.getCollectionId(), template));
    }

    updateTemplate(template: ITemplate): Promise<ITemplate> {
        return this.getService()
            .then(service => service.updateDocument(this.getCollectionId(), template));
    }

    deleteTemplate(template: ITemplate): Promise<void> {
        return this.getService()
            .then(service => service.deleteDocument(this.getCollectionId(), template.id));
    }

    private getService(): Promise<ExtensionDataService> {
        return new Promise((resolve, reject) => VSS.getService(VSS.ServiceIds.ExtensionData).then(resolve, reject));
    }

    private getCollectionId() {
        const webContext = VSS.getWebContext();
        const projectId = webContext.project.id;

        return `${DocumentCollectionId}-${projectId}`;
    }
}