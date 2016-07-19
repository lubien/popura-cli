import {cyan} from 'chalk';
import ora from 'ora';
import renderModel from '../utils/render-model';

const debug = require('debug')('popura-cli:search');

export default function searchCommand(user) {
	return async function searchHandler(name, {type = 'anime'}) {
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
	};
}

