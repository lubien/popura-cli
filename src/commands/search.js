import renderModel from '../utils/render-model';
import statusParser from '../utils/status-parser';

const debug = require('debug')('popura-cli:search');

export default function searchCommand(user) {
	return async function searchHandler(query, {type = 'anime', status = false}) {
		debug(`Searching ${type} matching /${query}/i`);

		const matcher = new RegExp(query, 'i');

		status = Number(status);
		debug('Search for specific status:', status);
		const statusNumber = status ?
			status :
			statusParser(type, status);

		const method = type === 'anime' ?
			'getAnimeList' :
			'getMangaList';

		const {list} = await user[method]();

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

