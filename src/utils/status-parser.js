export function statusToInt(status) {
	console.log(status);
	switch (status) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			return status;

		case 'watching':
		case 'reading':
			return 1;

		case 'completed':
			return 2;

		case 'onhold':
			return 3;

		case 'dropped':
			return 4;

		case 'plantowatch':
		case 'plantoread':
			return 5;

		default:
			return false;
	}
}

export function statusToStr(type, status) {
	switch (status) {
		case 1:
		case 'watching':
		case 'reading':
			return type === 'anime' ? 'Watching' : 'Reading';

		case 2:
		case 'completed':
			return 'Completed';

		case 3:
		case 'onhold':
			return 'On Hold';

		case 4:
		case 'dropped':
			return 'Dropped';

		case 5:
		case 'plantowatch':
		case 'plantoread':
			return type === 'anime' ? 'Plan to watch' : 'Plan to read';

		default:
			return false;
	}
}
