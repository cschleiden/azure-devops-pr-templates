export interface ITemplate {
    id: string;

    name: string;

    description: string;

    createdBy: string;

    template: string;
}

/**
 * The type provided to the extension is not quite the same as the REST API contract
 */
export interface IActionPullRequest {
    pullRequestId: number;

    description: string;

    repositoryId: string;
}

export const enum Mode {
    Loading,
    Selecting,
    Saving,
    Error
}