import figlet from "figlet";
import { intro } from "./prompts/intro.js";
import { packagePrompt } from "./prompts/packages.js";
import { installPrep } from "./utils/prepPackageSet.js";
import { installPackage } from "./utils/installPackage.js";
/*import { startTurbo } from "./utils/installTurbo.js";*/
/*import { nitroxCLI } from "./prompts/nitrox.js";*/

const runCLI = async () => {
    console.clear();
    const introText = "Hello World!"
    figlet(introText, (err, res) => err !== null ? console.error(err) : console.log(res));

    const user = await intro();

    const packageSet = await packagePrompt(user);

    const packages = await installPrep(packageSet);

    packages.forEach(async (element) => {
        await installPackage(element)
    })

    /*flags.nitrox && await nitroxCLI()*/
    /*flags.turbo && await startTurbo()*/

}

await runCLI()