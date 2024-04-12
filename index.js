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
        if (error == null){
            console.log(gradient.passion(data));
        }
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
            'Theme Only'
        ],
    });

    var values = answers.plugin_set;
    const spinner = createSpinner('Submitting Selection').start();
    await sleep();
    spinner.stop();

    const allow = await inquirer.prompt({
        name: 'confirmation',
        message: `You have chosen ${JSON.stringify(values)}. Is that correct?`,
        type: 'confirm',
        choices: [
            'Yes',
            'No'
        ],
    });

    var confirm_start = allow.confirmation;

    confirm_start == 'Yes' ? await loadPlugins(values) : process.exit(1);
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
        break;
        case 'Slim':
            exec('sh install_slim.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        break; 
        case 'SuperSlim':
            exec('sh install_superslim.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        break;
        case 'Theme Only':
            exec('sh install_theme.sh', (error) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        break;
    }
    const loadSpinner = createSpinner('Downloading').start();
    await sleep(5000);
    loadSpinner.success();
    complete();
}

function complete() {
    console.clear();
    const message = `Loading Complete!`;

    figlet(message, (error, data) => {
        if (error !== null){
            throw error;
        }
        if (error == null){
            console.log(gradient.pastel(data));
        }
    });
}

await welcome()