import inquirer from 'inquirer';
import ora from 'ora';
import {green, red} from 'chalk';

const debug = require('debug')('popura-cli:login');

export default function loginCommand(user, conf) {
	return async function loginHandler(username) {
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

			conf.set('username', username);
			conf.set('password', password);

			console.log(green('Logged in!'));
		} catch (err) {
			spinner.stop();

			console.log(red('Failed to login'), err.message);
		}
	};
}

