#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { exec } from 'child_process';

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

async function welcome(){
    console.clear();
    const title = 'Hello World!';

    figlet(title, (error, data) => {
        if (error !== null){
            throw error;
        }
        console.log(gradient.atlas(data));
    });

    await sleep();

    console.log(`
        ${chalk.bgGreenBright('Welcome to HU-Config')}
        The easy way to configure ${chalk.red('Hyperion University')} codespaces.
    `)
    loadStep()
}

async function loadStep() {
    const answers = await inquirer.prompt({
        name: 'plugin_set',
        type: 'list',
        message: 'Which plugin set would you want to load? \n',
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
    confirm == 'Yes' ? loadPlugins(values) : process.exit(1);
}

async function loadPlugins(plugin_set){
    switch (plugin_set) {
        case 'Normal':
            exec('sh install_default.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
            var ms = 22000;
        break;
        case 'Slim':
            exec('sh install_slim.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
            var ms = 10000;
        break; 
        case 'SuperSlim':
            exec('sh install_superslim.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
            var ms = 8000;
        break;
        case 'Theme Only':
            exec('sh install_theme.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
            var ms = 5000;
        break;
        case 'Custom':
            await selectPlugins();
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
        message: 'Select the plugins to download',
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

    for (let index in plugins){
        switch (plugins[index]){
            case 'VS Code Icons':
                exec('code --install-extension vscode-icons-team.vscode-icons', (error) => {});
            break;
            case 'Tokyo Dark':
                exec('code --install-extension enkia.tokyo-night', (error) => {});
            break;
            case 'MarkdownLint':
                exec('code --install-extension DavidAnson.vscode-markdownlint', (error) => {});
            break;
            case 'GitLens':
                exec('code --install-extension eamodio.gitlens', (error) => {});
            break;
            case 'Prettier':
                exec('code --install-extension esbenp.prettier-vscode', (error) => {});
            break;
            case 'GitHub Markdown Preview':
                exec('code --install-extension bierner.github-markdown-preview', (error) => {});
            break;
            case 'HTMLHint':
                exec('code --install-extension htmlhint.vscode-htmlhint', (error) => {});
            break;
            case 'Marp for VS Code':
                exec('code --install-extension marp-team.marp-vscode', (error) => {});
            break;
            case 'GitHub Actions':
                exec('code --install-extension GitHub.vscode-github-actions', (error) => {});
            break;
        }
    }

}

function complete() {
    console.clear();
    const message = `Loading Complete!`;

    figlet(message, (error, data) => {
        if (error !== null){
            throw error;
        }
        console.log(gradient.pastel(data));
    });
}

await welcome()