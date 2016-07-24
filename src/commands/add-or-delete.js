import ora from 'ora';
import {green, red} from 'chalk';
import user from '../user';
import {findByName} from '../utils';

const debug = require('debug')('popura-cli:modify-list');

export default function addOrDeleteCommandFactory(action) {
	return async function addOrDeleteCommand(who, {type = 'anime'}) {
		const method = `${action}${type === 'anime' ? 'Anime' : 'Manga'}`;
		debug(`Modifying list with ${method} for ID ${id}`);

		// Why not support regex 'who' in add?
		// Because we search in the list :p
		const id = isNaN(who) && action === 'delete' ?
			(await findByName(who, type)) :
			who;

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

