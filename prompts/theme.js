import { select } from "@inquirer/prompts";

export const themePrompt = async () => {
    const theme = await select({
        message: "What theme do you want to install?",
        choices: [
            {value: "night", name: "Tokyo Night"},
            {value: "nightDark", name: "Tokyo Night Dark"}
        ]
    });
    return theme;
}