import express from 'express';

const router = express.Router();

import * as db from '../db';
import logger from '../logger';

// Get app health
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/login', login);

router.post('/signup', signup);

function signup(req, res, next) {
  logger.info('creating user', req.body.email1);
  const { email1, password } = req.body;

  userExists(email1).then(alreadyExists => {
    if (alreadyExists) {
      logger.warn(`User ${email1} already exists`);
      res.status(400).json({ error: 'User already exists' });
    } else {
      return createUser(email1, password).then(() => {
        logger.info(`Created user ${email1}`);
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

function login(req, res, next) {
  const { email, password } = req.body;
  logger.debug(`Attempting login for ${email}`);
  authenticateUser(email, password).then(isAuthenticated => {
    if (isAuthenticated) {
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

export default router;
