import { ICON_SET } from "src/heplers";

export const PROGRAMMING_LANGUAGES = [
    { id: 1, name: "JavaScript", icon: ICON_SET.JavaScript || "❌" },
    { id: 2, name: "Python", icon: ICON_SET.Python || "❌" },
    { id: 3, name: "Java", icon: ICON_SET.Java || "❌" },
    { id: 4, name: "C#", icon: ICON_SET["C#"] || "❌" },
    { id: 5, name: "C++", icon: ICON_SET["C++"] || "❌" },
];
export const BUG_TYPES = [
    { id: 1, name: 'Compilation Errors' },
    { id: 2, name: 'Runtime Errors' },
    { id: 3, name: 'Arithmetic Errors' },
    { id: 4, name: 'Resource Errors' },
    { id: 5, name: 'Code Smells' },
    { id: 6, name: 'Golden Hammer' },
    { id: 7, name: 'Analysis Paralysis' }
];
