import { ITemplate } from "./interfaces";

export const TestData: ITemplate[] = [
  {
    id: "a",
    name: "Agile A11Y Checklist",
    description: "Add this for any new feature that might need an a11y pass.",
    createdBy: "Christopher Schleiden",
    template: "Foo \n\r Bar"
  },
  {
    id: "b",
    name: "Hotfix Compatibility Check",
    description: "Add this for any hotfix that affects the Web UI",
    createdBy: "Christopher Schleiden",
    template:
      "Browsers tested: \n\r - [ ] Chrome \n - [ ] Firefox \n - [ ] IE 11"
  }
];
