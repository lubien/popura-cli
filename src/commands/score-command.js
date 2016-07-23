import ora from 'ora';
import {green, red} from 'chalk';
import user from '../user';
import {findByName} from '../utils';

const debug = require('debug')('popura-cli:score');

export default async function scoreCommand(who, score, {type = 'anime'}) {
	debug(`Scoring ${type} ${who} to ${score}`);
	const method = type === 'anime' ?
		'updateAnime' :
		'updateManga';

	const id = isNaN(who) ?
		(await findByName(who, type))[0].id :
		who;

	const spinner = ora('Processing').start();

	try {
		await user[method](id, {score});

		spinner.stop();

		console.log(green('Success'));
	} catch (err) {
		spinner.stop();

		console.log(red('Error:'), err.message);
	}
}

