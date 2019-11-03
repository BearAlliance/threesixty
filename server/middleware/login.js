import logger from '../logger';
import * as db from '../db';

export function login(req, res) {
  const { email, password } = req.body;
  logger.debug(`Attempting login for ${email}`);
  authenticateUser(email, password).then(isAuthenticated => {
    if (isAuthenticated) {
      req.session.authenticated = true;
      logger.debug(`Login successful for ${email}`);
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
    .query(
      `SELECT * from users WHERE email = '${email}' AND password = '${password}'`
    )
    .then(result => {
      return result.rows.length > 0;
    });
}
