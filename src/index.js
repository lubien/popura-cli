import program from 'commander';
import popura from 'popura';
import Conf from 'conf';
import {version} from '../package.json';

import loginCommand from './commands/login';

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

program.parse(process.argv);

