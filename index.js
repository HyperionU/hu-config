#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { exec } from 'child_process';
import { stderr, stdout } from "process";

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

async function welcome(){
    const title = chalkAnimation.rainbow(
        'Hello World! \n'
    );

    await sleep();
    title.stop();

    console.log(`
        ${chalk.bgBlue('Welcome to HU-Config')}
        The easy way to configure Hyperion University codespaces.
    `)
    loadStep()
}

async function loadStep() {
    const answers = await inquirer.prompt({
        name: 'plugins',
        type: 'list',
        message: 'Which plugin set would you want to load? \n',
        choices: [
            'Default',
            'Slim',
            'SuperSlim'
        ],
    });

    var values = answers.plugins;
    const spinner = createSpinner('Submitting Selection').start();
    await sleep();
    spinner.stop();
    await inquirer.prompt({
        name: 'Confirmation',
        message: `You have chosen ${JSON.stringify(values)}. Is that correct?`,
        type: 'list',
        choices: [
            'Yes',
            'No'
        ],
    });
    const loadSpinner = createSpinner('Downloading').start();
    await loadPlugins(values);
    loadSpinner.success();
    complete();
}

async function loadPlugins(plugin_set){
    plugin_set ? 
        exec('echo hello', (error, stdout, stderr) => {
            if (error){
                console.error(`exec error: ${error}`);
                return;
            }
        }): console.error(`Plugin Set is undefined`);
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