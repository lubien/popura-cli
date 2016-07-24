import ora from 'ora';
import {green, red} from 'chalk';
import user from '../user';
import {findByName} from '../utils';

const debug = require('debug')('popura-cli:update');

export default async function updateCommand(who, opts) {
	const {type = 'anime'} = opts;

	const values = {};
	for (const prop of ['episode', 'chapter', 'volume', 'score', 'status']) {
		const value = opts[prop];

		if (value) {
			values[prop] = value;
		}
	}

	debug(`Updating ${type} ${who} to`, values);
	const method = type === 'anime' ?
		'updateAnime' :
		'updateManga';

	const id = isNaN(who) ?
		(await findByName(who, type)) :
		who;

	const spinner = ora('Processing').start();

	try {
		await user[method](id, values);

		spinner.stop();

		console.log(green('Success'));
	} catch (err) {
		spinner.stop();

		console.log(red('Error:'), err.message);
	}
}

