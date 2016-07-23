import inquirer from 'inquirer';
import ora from 'ora';
import {green, red} from 'chalk';
import config from '../config';
import user from '../user';

const debug = require('debug')('popura-cli:login');

export default async function loginCommand(username) {
	const {password} = await inquirer.prompt([{
		type: 'password',
		name: 'password',
		message: 'MyAnimeList password: ',
	}]);

	const spinner = ora('Verifying credentials').start();

	try {
		user.setUser(username, password);

		const authResponse = await user.verifyAuth();

		debug('Auth succeeded with', authResponse);

		spinner.stop();

		config.set('username', username);
		config.set('password', password);

		console.log(green('Logged in!'));
	} catch (err) {
		spinner.stop();

		console.log(red('Failed to login'), err.message);
	}
}

