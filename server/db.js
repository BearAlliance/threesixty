const { Client } = require('pg');

let client;

export function connect() {
  console.log('connecting');
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
  });

  client.connect();
}

export function query(string) {
  return client.query(string);
}

export async function testQuery() {
  let res = await client.query('SELECT 1 + 1 AS solution');
  console.log('Test query result', res.rows);
}
