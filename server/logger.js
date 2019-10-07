import chalk from 'chalk';

function log(message) {
  console.log(message);
}

function info(message) {
  log(chalk.bgCyan(' INFO ') + ' ' + message);
}

function error(message) {
  log(chalk.bgRed(' ERROR ') + ' ' + message);
}

const logger = {
  info
};

export default logger;
