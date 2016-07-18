import renderModel from '../utils/render-model';
import statusParser from '../utils/status-parser';

export default function searchCommand(user) {
	return async function searchHandler(query, {type = 'anime', status = false}) {
		const matcher = new RegExp(query, 'i');
		const statusNumber = typeof status === 'number' ?
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

