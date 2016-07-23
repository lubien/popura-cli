import {cyan} from 'chalk';
import ora from 'ora';
import user from '../user';
import {renderModel} from '../utils';

const debug = require('debug')('popura-cli:search');

export default async function searchCommand(name, {type = 'anime'}) {
	debug(`Searching ${type} with title '${name}'`);
	const method = type === 'anime' ?
		'searchAnimes' :
		'searchMangas';

	const spinner = ora('Searching').start();

	const list = await user[method](name);

	spinner.stop();

	console.log(
		list
			.map(renderModel)
			.join('\n\n')
	);

	console.log(`\n${cyan('Found:')} ${list.length} results`);
}

