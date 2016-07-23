import user from '../user';

export default async function findByName(who, type) {
	const method = type === 'anime' ?
		'searchAnimes' :
		'searchManga';

	return await user[method](who);
}

