import program from 'commander';
import popura from 'popura';
import Conf from 'conf';
import {version} from '../package.json';

import loginCommand from './commands/login';

const debug = require('debug')('popura-cli');

const conf = new Conf({
	defaults: {username: false, password: false},
});

const user = popura(conf.get('username'), conf.get('password'));
debug('Started with user', user.getUser());

program.version(version);

program
	.command('login <username>')
	.action(loginCommand(conf, user));

program.parse(process.argv);

