import * as db from '../db';
import logger from '../logger';

export async function checkTables() {
  const tables = [
    {
      name: 'accounts',
      create: createAccounts
    }
  ];

  for (let table of tables) {
    logger.debug(`Checking for table "${table.name}"`);
    const exists = await tableExists(table.name);
    if (!exists) {
      logger.info(`Table "${table.name}" does not exist, creating...`);
      await table.create();
    }
  }

  logger.info('All necessary tables exist');
}

async function tableExists(tableName) {
  const result = await db.query(`SELECT EXISTS (
   SELECT 1
   FROM   information_schema.tables 
   WHERE    table_name = '${tableName}'
   );`);

  return result.rows[0].exists;
}

async function createAccounts() {
  const createAccountsQuery = `CREATE TABLE accounts
(
  user_id serial PRIMARY KEY,
  password character varying(50) COLLATE pg_catalog."default" NOT NULL,
  email character varying(355) COLLATE pg_catalog."default" NOT NULL,
  created_on timestamp without time zone NOT NULL,
  last_login timestamp without time zone,
  CONSTRAINT account_email_key UNIQUE (email)
)`;

  return await db.query(createAccountsQuery);
}
