import 'loud-rejection/register';
import program from 'commander';
import {version} from '../package.json';

import {
	loginCommand,
	listCommand,
	searchCommand,
	addOrDeleteCommandFactory,
	updateCommand,
} from './commands';

program.version(version);

const texts = {
	animeOrManga: `'anime' or 'manga'. Defaults to 'anime'`,
};

program
	.command('login <username>')
	.action(loginCommand);

program
	.command('list [pattern]')
	.option('-t, --type <type>', texts.animeOrManga)
	.option('-s, --status <status>', '1 / watching / reading, 2 / completed, 3 / onhold, 4 / dropped, 6 / plantowatch / plantoread')
	.action(listCommand);

program
	.command('search <name>')
	.option('-t, --type <type>', texts.animeOrManga)
	.action(searchCommand);

program
	.command('add <id>')
	.option('-t, --type <type>', texts.animeOrManga)
	.action(addOrDeleteCommandFactory('add'));

program
	.command('delete <pattern|id>')
	.option('-t, --type <type>', texts.animeOrManga)
	.action(addOrDeleteCommandFactory('delete'));

program
	.command('update <pattern|id>')
	.option('-t, --type <type>', texts.animeOrManga)
	.option('-s, --status <status>')
	.option('-e, --episode <episode>')
	.option('-c, --chapter <chapter>')
	.option('-v, --volume <volume>')
	.option('-r, --score <score>')
	.action(updateCommand);

program.parse(process.argv);

