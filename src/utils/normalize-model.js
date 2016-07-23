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
	let modelType;
	let id;
	let title;
	let type;
	let status;
	let current;
	let total;

	if (searchId) {
		modelType = 'search';
		id = searchId;
		title = searchTitle;
		type = isNaN(searchEpisodes) ? 'manga' : 'anime';
		status = searchStatus;
		current = 0;
		total = searchEpisodes || searchChapters || '?';
	} else {
		modelType = 'list';
		id = listAnimeId || listMangaId;
		title = listTitle;
		type = isNaN(listEpisodes) ? 'manga' : 'anime';
		status = statusToStr(type, listStatus);
		current = listCurrentEpisode || listCurrentChapter || '?';
		total = listEpisodes || listChapters || '?';
	}

	return {
		modelType, id, title, type, status, current, total,
	};
}

