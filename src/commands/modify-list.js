import ora from 'ora';
import {green, red} from 'chalk';
import user from '../user';

const debug = require('debug')('popura-cli:modify-list');

export default function modifyListCommandFactory(action) {
	return async function modifyListCommand(id, {type = 'anime'}) {
		const method = `${action}${type === 'anime' ? 'Anime' : 'Manga'}`;
		debug(`Modifying list with ${method} for ID ${id}`);

		const spinner = ora('Processing').start();

		try {
			await user[method](id);

			spinner.stop();

			console.log(green('Success'));
		} catch (err) {
			spinner.stop();

			console.log(red('Error:'), err.message);
		}
	};
}

