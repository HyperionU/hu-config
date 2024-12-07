import { select } from "@inquirer/prompts";

export const packagePrompt = async (user) => {
    const packages = await select({
        message: `So ${user.name}, Which set would you like to install?`,
        choices: [
            {value: "std", name: "Standard"},
            {value: "slim", name: "Slim"},
            {value: "sslim", name: "SuperSlim"},
            {value: "custom", name: "Custom"},
            {value: "skip", name: "Skip"},
        ],
    });

    return packages
}