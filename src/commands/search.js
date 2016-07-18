import ora from 'ora';
import renderModel from '../utils/render-model';
import {statusToInt} from '../utils/status-parser';

const debug = require('debug')('popura-cli:search');

export default function searchCommand(user) {
	return async function searchHandler(pattern, {type = 'anime', status = false}) {
		debug(`Searching ${type} matching /${pattern}/i`);
		const matcher = new RegExp(pattern, 'i');

		debug('Search for specific status:', status);
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
	};
}

