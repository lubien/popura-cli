import popura from 'popura';
import config from './config';

const debug = require('debug')('popura-cli:user');

const user = popura(config.get('username'), config.get('password'));
debug('Started with user', user.getUser());

export default user;

