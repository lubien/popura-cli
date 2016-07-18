import renderModel from '../utils/render-model';
import statusParser from '../utils/status-parser';

const debug = require('debug')('popura-cli:search');

export default function searchCommand(user) {
	return async function searchHandler(pattern, {type = 'anime', status = false}) {
		debug(`Searching ${type} matching /${pattern}/i`);
		const matcher = new RegExp(pattern, 'i');

		debug('Search for specific status:', status);
		const statusNumber = Number(status) ?
			Number(status) :
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
