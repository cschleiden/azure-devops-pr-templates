import { PullRequestStatus } from "TFS/VersionControl/Contracts";
import { getClient, GitHttpClient4 } from "TFS/VersionControl/GitRestClient";
import { IActionPullRequest, ITemplate } from "../models/interfaces";

const newLine = "\n";
const twoNewLines = newLine + newLine;

export class ApplyTemplateService {
  public applyTemplates(
    pullRequest: IActionPullRequest,
    templates: ITemplate[]
  ): Promise<void> {
    const currentDescription = pullRequest.description;

    const updatedDescription = `${currentDescription} ${twoNewLines} ${this.formatTemplates(
      templates
    )}`;

    const client = this.getClient();

    return new Promise<void>((resolve, reject) =>
      client
        .getPullRequest(pullRequest.repositoryId, pullRequest.pullRequestId)
        .then(pr => {
          if (pr.status === PullRequestStatus.Active) {
            return client.updatePullRequest(
              {
                description: updatedDescription
              } as any,
              pullRequest.repositoryId,
              pullRequest.pullRequestId
            );
          }
        })
        .then(() => resolve(), reject)
    );
  }

  public getStatus(
    pullRequest: IActionPullRequest
  ): Promise<PullRequestStatus> {
    const client = this.getClient();

    return new Promise<PullRequestStatus>((resolve, reject) =>
      client
        .getPullRequest(pullRequest.repositoryId, pullRequest.pullRequestId)
        .then(pr => resolve(pr.status), reject)
    );
  }

  private getClient(): GitHttpClient4 {
    return getClient();
  }

  private formatTemplates(templates: ITemplate[]): string {
    return templates
      .map(
        template => `### ${template.name} ${twoNewLines} ${template.template}`
      )
      .join(`${twoNewLines}`);
  }
}
