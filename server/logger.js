import chalk from 'chalk';

function joinArguments(args) {
  return Array.prototype.join.call(args, ' ');
}

function log(message) {
  console.log(message);
}

function info(message) {
  log(`${chalk.bgCyan(' INFO ')} ${joinArguments(arguments)}`);
}

function error(message) {
  log(`${chalk.bgRed(' ERROR ')} ${joinArguments(arguments)}`);
}

const logger = {
  info,
  error
};

export default logger;
