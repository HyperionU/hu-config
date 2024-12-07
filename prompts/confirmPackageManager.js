import { confirm } from "@inquirer/prompts"
import { setTimeout } from "timers/promises";

export const confirmPackageManager = async (user) => {
    if (await confirm({
        message: `${user.name}, are you using ${user.packageManager}?`
    })){
        console.log("Great! Noted.")
        await setTimeout(1000)
    }
    else {
        console.error("Session Cancelled.")
        process.exit(1)
    }
}