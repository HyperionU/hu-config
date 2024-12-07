import { checkbox } from "@inquirer/prompts";
import { themePrompt } from "../prompts/theme.js";

export const installPrep = async (packageSet) => {
    const pack = []

    switch (packageSet) {
        case "std":
            const stdPackages = [
                "ghActions", 
                "ghMarkdown", 
                "gitLens", 
                "htmlHint", 
                "marp", 
                "mdLint", 
                "prettier", 
                "vsIcons"
            ]
            stdPackages.forEach(element => {
                pack.push(element);
            });
            pack.push(await themePrompt())
            break;
        case "slim":
            const slimPackages = [
                "ghActions", 
                "htmlHint", 
                "marp", 
                "vsIcons"
            ];
            slimPackages.forEach(element => {
                pack.push(element);
            });
            pack.push(await themePrompt())
            break;
        case "sslim":
            const sslimPackages = [
                "ghActions",  
                "marp", 
                "vsIcons"
            ];
            sslimPackages.forEach(element => {
                pack.push(element);
            });
            pack.push(await themePrompt())
            break;
        case "custom":
            const customPack = await checkbox({
                message: "Which packages would you like to install?",
                choices: [
                    {value: "vsIcons", name: "VSCode Icons"},
                    {value: "night", name: "Tokyo Night"},
                    {value: "nightDark", name: "Tokyo Night Dark"},
                    {value: "mdLint", name: "MarkdownLint"},
                    {value: "gitLens", name: "GitLens"},
                    {value: "prettier", name: "Prettier"},
                    {value: "ghMarkdown", name: "GitHub Markdown"},
                    {value: "htmlHint", name: "HTMLHint"},
                    {value: "marp", name: "Marp for VS Code"},
                    {value: "ghActions", name: "GitHub Actions"},
                ]
            });
            customPack.forEach(element => {
                pack.push(element);
            });
            break;
        default:
            break;
    }

    return pack;
}