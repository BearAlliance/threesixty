import chalk from 'chalk';

function joinArguments(args) {
  return Array.prototype.join.call(args, ' ');
}

function log(message) {
  console.log(message);
}

function debug() {
  if (process.env.LOG_LEVEL === 'debug') {
    log(`${chalk.bgBlue(' DEBUG ')} ${joinArguments(arguments)}`);
  }
}

function info() {
  log(`${chalk.bgCyan(' INFO ')} ${joinArguments(arguments)}`);
}

function warn() {
  log(`${chalk.bgYellow(' WARN ')} ${joinArguments(arguments)}`);
}

function error() {
  log(`${chalk.bgRed(' ERROR ')} ${joinArguments(arguments)}`);
}

const logger = {
  info,
  warn,
  error,
  debug
};

export default logger;
