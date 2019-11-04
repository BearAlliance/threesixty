import logger from '../logger';
import * as db from '../db';

export function login(req, res) {
  const { email, password } = req.body;
  logger.debug(`Attempting login for ${email}`);
  authenticateUser(email, password).then(userData => {
    if (userData) {
      logger.debug(`Login successful for ${email}`);
      req.session.authenticated = true;
      req.session.userData = userData;
      res.status(200).json({ authenticated: true });
    } else {
      logger.debug(`Login failed for ${email}`);
      res.status(401).json({ error: 'invalid credentials' });
    }
  });
}

function authenticateUser(email, password) {
  if (!email || !password) {
    return Promise.resolve(false);
  }
  return db
    .query({
      text: 'SELECT * from accounts WHERE email = $1 AND password = $2',
      values: [email, password]
    })
    .then(result => {
      return result.rows.length && result.rows[0];
    });
}
