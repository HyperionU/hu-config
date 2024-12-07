import { input } from "@inquirer/prompts"
/*import { confirm } from "@inquirer/prompts";*/
import { setTimeout } from "timers/promises";
import { getUserPkgManager } from "../utils/getPackageManager.js";
import { confirmPackageManager } from "./confirmPackageManager.js";
/*import gradient from "gradient-string";*/

export const intro = async () => {
    await setTimeout(2000);

    const user = {
        name: await input({
            message: "What is your name?"
        }),
        packageManager: getUserPkgManager()
    }

    await confirmPackageManager(user)

    /*const flags = {
        nitrox: await confirm({
            message: `Would you like to start the ${gradient.atlas("Nitrox")} DevKit?`
        }),
        turbo: await confirm({
            message: `Would you like to start ${gradient.passion("Turbo")}?`
        }),
    }*/

    return /*{user, flags}*/ user;
}