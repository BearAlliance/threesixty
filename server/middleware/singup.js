import logger from '../logger';
import * as db from '../db';

export function signup(req, res) {
  const { email1, password } = req.body;

  userExists(email1).then(alreadyExists => {
    if (alreadyExists) {
      logger.warn(`User ${email1} already exists`);
      res.status(400).json({ error: 'User already exists' });
    } else {
      logger.debug('creating user', req.body.email1);
      return createUser(email1, password).then(() => {
        logger.debug(`Created user ${email1}`);
        res.status(201).json({ success: true });
      });
    }
  });
}

function userExists(email) {
  console.log(email);
  return db
    .query({ text: `SELECT * from accounts WHERE email = $1`, values: [email] })
    .then(result => result.rows.length > 0);
}

function createUser(email, password) {
  const createdOn = new Date().toISOString();
  return db.query({
    text: `INSERT INTO accounts(email, password, created_on) VALUES($1, $2, $3)`,
    values: [email, password, createdOn]
  });
}
