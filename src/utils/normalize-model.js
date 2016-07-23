import {statusToStr} from './';

export default function normalizeModel({
	id: searchId,
	title: searchTitle,
	episodes: searchEpisodes,
	chapters: searchChapters,
	status: searchStatus,

	series_episodes: listEpisodes,
	series_chapters: listChapters,
	series_animedb_id: listAnimeId,
	series_mangadb_id: listMangaId,
	series_title: listTitle,
	my_status: listStatus,
	my_watched_episodes: listCurrentEpisode,
	my_read_chapters: listCurrentChapter,
}) {
	if (searchId) {
		return {
			modelType: 'search',
			id: searchId,
			title: searchTitle,
			type: isNaN(searchEpisodes) ? 'manga' : 'anime',
			status: searchStatus,
			current: 0,
			total: searchEpisodes || searchChapters || '?',
		};
	}

	const type = isNaN(listEpisodes) ? 'manga' : 'anime';
	return {
		modelType: 'list',
		id: listAnimeId || listMangaId,
		title: listTitle,
		type,
		status: statusToStr(type, listStatus),
		current: listCurrentEpisode || listCurrentChapter || '?',
		total: listEpisodes || listChapters || '?',
	};
}

