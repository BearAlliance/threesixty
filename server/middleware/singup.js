import logger from '../logger';
import * as db from '../db';

export function signup(req, res, next) {
  logger.debug('creating user', req.body.email1);
  const { email1, password } = req.body;

  userExists(email1).then(alreadyExists => {
    if (alreadyExists) {
      logger.warn(`User ${email1} already exists`);
      res.status(400).json({ error: 'User already exists' });
    } else {
      return createUser(email1, password).then(() => {
        logger.debug(`Created user ${email1}`);
        res.status(201).json({ success: true });
      });
    }
  });
}

function userExists(email) {
  return db
    .query(`SELECT * from users WHERE email = '${email}'`)
    .then(result => {
      return result.rows.length > 0;
    });
}

function createUser(email, password) {
  return db.query(
    `INSERT INTO users(email, password) VALUES('${email}', '${password}')`
  );
}
