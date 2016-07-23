import ora from 'ora';
import user from '../user';
import {statusToInt, renderModel} from '../utils';

const debug = require('debug')('popura-cli:search');

export default async function listCommand(pattern, {type = 'anime', status = false}) {
	debug(`Listing ${type} matching /${pattern}/i`);
	const matcher = new RegExp(pattern, 'i');

	debug('List specific status:', status);
	const statusNumber = isNaN(status) ?
		statusToInt(status) :
		Number(status);

	const method = type === 'anime' ?
		'getAnimeList' :
		'getMangaList';

	const spinner = ora('Loading').start();

	const {list} = await user[method]();

	spinner.stop();

	console.log(
		list
			.filter(series => {
				if (status && series.my_status !== statusNumber) {
					return false;
				}

				return matcher.test(series.series_title);
			})
			.map(renderModel)
			.join('\n\n')
	);
}

