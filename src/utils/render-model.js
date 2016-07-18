import {green, cyan, magenta} from 'chalk';
import statusParser from './status-parser';

export default function renderModel({
	series_episodes: episodes,
	series_chapters: chapters,
	series_animedb_id: animeId,
	series_mangadb_id: mangaId,
	series_title: title,
	my_status: status,
	my_watched_episodes: currentEpisode,
	my_read_chapters: currentChapter,
}) {
	const id = animeId || mangaId;

	const type = typeof episodes === 'number' ?
		'anime' :
		'manga';

	const current = currentEpisode || currentChapter;
	const total = episodes || chapters || '?';

	let progressLabel = type === 'anime' ?
		'episode' :
		'chapter';

	if (total === '?' || total > 1) {
		progressLabel += 's';
	}

	const statusText = statusParser(type, status);
	const progressText = current === total ?
		`${total} ${progressLabel}` :
		`${current} of ${total} ${progressLabel}`;

	return `[${cyan(id)}] ${green(title)}
${magenta('Status:')} ${statusText} | ${progressText}`;
}

