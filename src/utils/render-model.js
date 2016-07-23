import {green, cyan, magenta} from 'chalk';
import {normalizeModel} from './';

export default function renderModel(model) {
	const {
		modelType, id, title, type, status, current, total, score,
	} = normalizeModel(model);

	let progressLabel = type === 'anime' ?
		'episode' :
		'chapter';

	if (total === '?' || total > 1) {
		progressLabel += 's';
	}

	const progressText = current === total || modelType === 'search' ?
		`${total} ${progressLabel}` :
		`${current} of ${total} ${progressLabel}`;

	const scoreText = modelType === 'list' ?
		`| ${cyan('Score:')} ${score}` :
		``;

	return `[${cyan(id)}] ${green(title)}
${magenta('Status:')} ${status} | ${progressText} ${scoreText}`;
}

