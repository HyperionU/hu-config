import { confirm, input, select } from "@inquirer/prompts";
import { isEmpty } from "../utils/checkDir.js";

export const nitroxCLI = async (params) => {
    const config = {
        route: await input({
            message: "What is the path to your new site?",
            validate: (value) => {
                if (!value) return 'Please enter a path.';
				if (value[0] !== '.') return 'Please enter a relative path.';
                if (!isEmpty(value)) return 'Please enter an empty path.';
                return true;
            }
        }),
        typescript: await select({
            message: "How strict should TypeScript be?",
            default: "strict",
            choices: [
                {value: "strict", name: "Strict"},
                {value: "strictest", name: "Strictest"},
                {value: "relaxed", name: "Relaxed"}
            ],
        }),
        runInstall: await confirm({
            message: "Install dependencies?",
            default: true
        }),
        initGit: await confirm({
            message: "Initialize a Git Repository?",
            default: false
        }),
    };

    console.log(config);

    /*prompt.note("Now, let's add some integrations.", `${flags.turbo ? "Step 3b." : "Step 2b."}`)
    await setTimeout(1000)

    const integrationConfig = {
        uiInt: () => prompt.multiselect({
            message: "Which UI integrations do you want to add?",
            choices: [
                {value: "alpinejs", name: "Alpine"},
                {value: "preact", name: "Preact"},
                {value: "react", name: "React"},
                {value: "solid", name: "Solid"},
                {value: "svelte", name: "Svelte"},
                {value: "vue", name: "Vue"},
            ],
            required: false,
            initialValues: ["react"],
        }),
        ssrAdapter: () => prompt.select({
            message: "Would you like to add a SSR Adapter?",
            initialValue: "none",
            choices: [
                {value: "cloudflare", name: "Cloudflare"},
                {value: "netlify", name: "Netlify"},
                {value: "node", name: "Node"},
                {value: "vercel", name: "Vercel"},
                {value: "none", name: "None"},
            ],
        }), 
        otherInt: () => prompt.multiselect({
            message: "Would you like to add any other integrations?",
            choices: [
                {value: "db", name: "AstroDB"},
                {value: "markdoc", name: "MarkDoc"},
                {value: "mdx", name: "MDX"},
                {value: "partytown", name: "Partytown"},
                {value: "sitemap", name: "Sitemap"},
                {value: "tailwind", name: "Tailwind"},
            ],
            required: false,
            initialValues: ["tailwind"],
        }),
    };

    const integrations = [];
    integrations.push(integrationConfig.uiInt, integrationConfig.otherInt);
    integrationConfig.ssrAdapter !== "none" && integrations.push(integrationConfig.ssrAdapter);


    switch (packageManager) {
        case "npm":
            await execa({stdout: 'inherit', stderr: 'inherit'})`${packageManager} create astro ${config.route} -- --template minimal --typescript ${config.typescript} ${config.runInstall ? "--install" : "--no-install"} ${config.initGit ? "--git" : "--no-git"} --add ${integrations.join(' ')}`
            break;
    
        default:
            await execa({stdout: 'inherit', stderr: 'inherit'})`${packageManager} create astro ${config.route} --template minimal --typescript ${config.typescript} ${config.runInstall ? "--install" : "--no-install"} ${config.initGit ? "--git" : "--no-git"} --add ${integrations.join(' ')}`
            break;
    }*/
}