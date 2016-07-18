export default function statusParser(type, status) {
	switch (status) {
		case 1:
			return type === 'anime' ? 'Watching' : 'Reading';
		case 2:
			return 'Completed';
		case 3:
			return 'On Hold';
		case 4:
			return 'Dropped';
		case 5:
			return type === 'anime' ? 'Plan to watch' : 'Plan to read';

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

