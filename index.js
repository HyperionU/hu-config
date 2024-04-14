#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { exec } from 'child_process';

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))
var name;

async function welcome(){
    console.clear();
    const title = 'Hello World!';

    figlet(title, (error, data) => { error !== null ? console.error(error) : console.log(gradient.atlas(data));});

    await sleep();

    console.log(`
        ${chalk.bgGreenBright('Welcome to HU-Config')}
        The easy way to configure ${chalk.red('Hyperion University')} codespaces.
    `)

    const getName = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is your name?'
    });

    name = getName.name;

    const usedBefore = await inquirer.prompt({
        name: 'tutorial',
        type: 'list',
        message: `So, ${gradient.atlas(name)}, Have you used ${chalk.bgGreenBright('HU-Config')} before?`,
        choices: [
            'Yes',
            'No'
        ]
    })
    
    usedBefore.tutorial == 'No' ? runTutorial(): loadStep()
}

async function runTutorial(){
    console.clear();
    const text = 'How HU-Config Works';

    figlet(text, (error, data) => { error !== null ? console.error(error) : console.log(gradient.atlas(data))});

    await sleep(1000);

    console.log(`
        1. Run the CLI (obviously)
        2. Select your plugin set to load. There are 5 plugin sets:
            ${chalk.bgGrey('Normal')}: This includes all of the packages.
            ${chalk.bgRedBright('Slim')}: This includes all packages in Normal, except:
                - MarkdownLint
                - GitLens
                - Prettier
                - GitHub Markdown Preview
            ${chalk.bgGreenBright('SuperSlim')}: This includes all packages in Slim, except:
                - HTMLHint
            ${chalk.bgBlackBright('Theme Only')}: This includes all theme packages, including:
                - VS Code Icons
                - Tokyo Dark
            ${chalk.bgBlueBright('Custom')}: This allows you to pick your packages.
        3. Confirm your choices.
        4. Sit back. HU-Config downloads the packages for you.
    `)

    const ready = await inquirer.prompt({
        name: 'start',
        type: 'confirm',
        message: `So, ${gradient.atlas(name)}, are you ready?`,
    }); 

    ready.start ? loadStep() : process.exit(1);
}

async function loadStep() {
    console.clear();
    const answers = await inquirer.prompt({
        name: 'plugin_set',
        type: 'list',
        message: `So, ${gradient.atlas(name)}, which plugin set would you want to load? \n`,
        choices: [
            'Normal',
            'Slim',
            'SuperSlim',
            'Theme Only',
            'Custom'
        ],
    });

    var values = answers.plugin_set;
    const spinner = createSpinner('Submitting Selection').start();
    await sleep();
    spinner.stop();

    const allow = await inquirer.prompt({
        name: 'confirmation',
        message: `You have chosen ${JSON.stringify(values)}. Is that correct?`,
        type: 'list',
        choices: [
            'Yes',
            'No'
        ]
    });

    var confirm = allow.confirmation;
    confirm == 'Yes' ? loadPluginSet(values) : process.exit(1);
}

async function loadPluginSet(plugin_set){
    var ms;
    switch (plugin_set) {
        case 'Normal':
           exec('sh install_default.sh');
           ms = 22000;
        break;
        case 'Slim':
            exec('sh install_slim.sh'); 
            ms = 10000;
        break; 
        case 'SuperSlim':
            exec('sh install_superslim.sh'); 
            ms = 8000;
        break;
        case 'Theme Only':
            exec('sh install_theme.sh'); 
            ms = 5000;
        break;
        case 'Custom':
            await selectPlugins();
            ms = 2000
        break;
    }

    const loadSpinner = createSpinner(`Downloading ${plugin_set}`).start();
    await sleep(ms);
    loadSpinner.success();
    complete();
}

async function selectPlugins(){
    const customPlugin = await inquirer.prompt({
        name: 'pluginList',
        type: 'checkbox',
        message: 'Select the plugins to download:',
        choices: [
            'VS Code Icons',
            'Tokyo Dark',
            'MarkdownLint',
            'GitLens',
            'Prettier',
            'GitHub Markdown Preview',
            'HTMLHint',
            'Marp for VS Code',
            'GitHub Actions'
        ]
    });

    var plugins = customPlugin.pluginList;
    await loadPlugins(plugins);
}

async function loadPlugins(plugins){
    for (let index in plugins){
        switch (plugins[index]){
            case 'VS Code Icons':
                exec('code --install-extension vscode-icons-team.vscode-icons');
            break;
            case 'Tokyo Dark':
                exec('code --install-extension enkia.tokyo-night');
            break;
            case 'MarkdownLint':
                exec('code --install-extension DavidAnson.vscode-markdownlint');
            break;
            case 'GitLens':
                exec('code --install-extension eamodio.gitlens');
            break;
            case 'Prettier':
                exec('code --install-extension esbenp.prettier-vscode');
            break;
            case 'GitHub Markdown Preview':
                exec('code --install-extension bierner.github-markdown-preview');
            break;
            case 'HTMLHint':
                exec('code --install-extension htmlhint.vscode-htmlhint');
            break;
            case 'Marp for VS Code':
                exec('code --install-extension marp-team.marp-vscode');
            break;
            case 'GitHub Actions':
                exec('code --install-extension GitHub.vscode-github-actions');
            break;
        }
    }
}

async function complete() {
    console.clear();
    const message = `Loading Complete!`;
    figlet(message, (error, data) => { error ? console.error(error) : console.log(gradient.pastel(data))});

    await sleep();

    console.log(`${gradient.atlas(name)}, You are now ready to hit the ground runnin!`);
    process.exit(0);
}

await welcome()