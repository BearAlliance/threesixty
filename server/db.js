var mysql = require('mysql'),
  async = require('async');

const PRODUCTION_DB = 'app_prod_db';
const TEST_DB = 'app_test_db';

export const MODE_TEST = 'mode_test';
export const MODE_PRODUCTION = 'mode_production';

var state = {
  pool: null,
  mode: null
};

function connect(mode, done) {
  return new Promise((resolve, reject) => {
    state.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'dbpassword@',
      database: mode === MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });

    state.pool.query('SELECT 1 + 1 AS solution', error => {
      if (error) return reject(error);
      state.mode = mode;
      resolve();
    });
  });
}

function get() {
  return state.pool;
}

function query(queryString) {
  return new Promise((resolve, reject) => {
    get().query(queryString, (err, result, fields) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function fixtures(data) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  var names = Object.keys(data.tables);
  async.each(
    names,
    function(name, cb) {
      async.each(
        data.tables[name],
        function(row, cb) {
          var keys = Object.keys(row),
            values = keys.map(function(key) {
              return "'" + row[key] + "'";
            });

          // pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
          pool.query(
            `INSERT INTO ${name} (${keys.join(',')}) VALUES (${values.join(
              ','
            )})`,
            cb
          );
        },
        cb
      );
    },
    done
  );
}

function drop(tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  async.each(
    tables,
    function(name, cb) {
      pool.query('DELETE * FROM ' + name, cb);
    },
    done
  );
}

export default {
  connect,
  get,
  fixtures,
  drop,
  query
};
