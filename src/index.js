import program from 'commander';
import popura from 'popura';
import Conf from 'conf';
import {version} from '../package.json';

import loginCommand from './commands/login';
import searchCommand from './commands/search';

const debug = require('debug')('popura-cli:main');

const conf = new Conf({
	defaults: {username: false, password: false},
});

const user = popura(conf.get('username'), conf.get('password'));
debug('Started with user', user.getUser());

program.version(version);

program
	.command('login <username>')
	.action(loginCommand(user, conf));

program
	.command('search <pattern>')
	.option('-t, --type <type>', 'anime or manga. Defaults to anime')
	.option('-s, --status <status>', '1 / reading, 2 / completed, 3 / onhold, 4 / dropped, 6 / plantoread')
	.action(searchCommand(user));

program.parse(process.argv);

