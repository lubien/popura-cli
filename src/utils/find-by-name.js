import user from '../user';

const debug = require('debug')('popura-cli:find-by-name');

export default async function findByName(who, type) {
	debug(`Searching for ${type} matching ${who}`);

	const matcher = new RegExp(who, 'i');

	const method = type === 'anime' ?
		'getAnimeList' :
		'getMangaList';

	const {list} = await user[method]();

	const matched = list
		.filter(series => matcher.test(series.series_title))
		.sort((a, b) => {
			if (a.series_title < b.series_title) {
				return -1;
			}

			if (a.series_title > b.series_title) {
				return 1;
			}

			return 0;
		})
		.shift();

	if (!matched) {
		return 0;
	}

	// eslint-disable-next-line
	return type === 'anime' ? matched.series_animedb_id : series_mangadb_id;
}

