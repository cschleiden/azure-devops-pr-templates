import { ITemplate } from "../models/interfaces";

export const enum Mode {
  Loading,
  Editing
}

export const enum TemplateState {
  Unchanged,
  New,
  Modified
}

export interface IEditTemplate {
  state: TemplateState;

  template: ITemplate;
}

export function canSave(entry: IEditTemplate): boolean {
  return (
    entry.state !== TemplateState.Unchanged &&
    entry.template.name.trim() !== "" &&
    entry.template.description.trim() !== "" &&
    entry.template.template.trim() !== ""
  );
}
