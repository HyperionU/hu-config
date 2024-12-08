import { execa } from "execa";
import { turboPrompt } from "../prompts/turbo";

export const startTurbo = async (packageManager) => {
    switch (packageManager) {
        case "yarn":
            await execa({ stdout: 'inherit', stderr: 'inherit' })`yarn global add turbo`;
            break;
        case "pnpm":
            await execa({ stdout: 'inherit', stderr: 'inherit' })`pnpm add turbo --global`;
            break;
        case "npm":
            await execa({ stdout: 'inherit', stderr: 'inherit' })`npm i turbo --global`;
            break;
        default:
            break;
    }

    const turboPath = await turboPrompt();

    switch (packageManager) {
        case "npm":
            await execa({ stdout: 'inherit', stderr: 'inherit' })`npx create-turbo ${turboPath} -m ${packageManager}`;
            break;

        default:
            await execa({ stdout: 'inherit', stderr: 'inherit' })`${packageManager} dlx create-turbo ${turboPath} -m ${packageManager}`;
            break;
    }
};
