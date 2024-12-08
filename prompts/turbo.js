import { input } from "@inquirer/prompts";
import { setTimeout } from "timers/promises"

export const turboPrompt = async () => {
    console.log(`Welcome to ${gradient.passion("Turbo")}. Let's get started.`)
    await setTimeout(1000)

    const turbo = await input({
        message: "What is the path to your new site?",
        validate: (value) => {
            if (!value) return 'Please enter a path.';
            if (value[0] !== '.') return 'Please enter a relative path.';
            if (!isEmpty(value)) return 'Please enter an empty path.';
            return;
        }
    });

    return turbo;
    
}