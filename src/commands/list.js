import ora from 'ora';
import {cyan} from 'chalk';
import user from '../user';
import {statusToInt, renderModel} from '../utils';

const debug = require('debug')('popura-cli:search');

export default async function listCommand(pattern = false, {type = 'anime', status = false}) {
	debug(`Listing ${type} matching ${pattern ? '/${pattern}/i' : 'everything'}`);
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

	const filteredList = status || pattern ?
		list
			.filter(series => {
				if (status && series.my_status !== statusNumber) {
					return false;
				}

				if (pattern && !matcher.test(series.series_title)) {
					return false;
				}

				return true;
			}) :
		list;

	console.log(
		filteredList
			.map(renderModel)
			.join('\n\n')
	);

	console.log(`\n${cyan('Found:')} ${filteredList.length} results`);
}

