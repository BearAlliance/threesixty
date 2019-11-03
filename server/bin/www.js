/**
 * Module dependencies.
 */

const PORT = process.env.PORT || '8000';

var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');

app.bootstrap().then(() => {
  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(PORT);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log(`Server started. Listening on port ${PORT}`);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
});