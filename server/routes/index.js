import express from 'express';
const router = express.Router();

import db from '../db';
import logger from '../logger';

// Get app health
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/login', login);

router.post('/signup', signup);

function signup(req, res, next) {
  logger.info('creating user', req.body);
  const { email1, password } = req.body;

  userExists(email1).then(alreadyExists => {
    if (alreadyExists) {
      res.status(400).json({ error: 'User already exists' });
    } else {
      return createUser(email1, password).then(() => {
        res.status(201).json({ success: true });
      });
    }
  });
}

function userExists(email) {
  return db
    .query(`SELECT * from users WHERE email = '${email}'`)
    .then(result => {
      return result.length > 0;
    });
}

function createUser(email, password) {
  return db.query(`INSERT INTO users VALUES ('${email}', '${password}')`);
}

function login(req, res, next) {
  const { email, password } = req.body;
  authenticateUser(email, password).then(isAuthenticated => {
    if (isAuthenticated) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(400).json({ error: 'invalid credentials' });
    }
  });
}

function authenticateUser(email, password) {
  if (!email || !password) {
    return Promise.resolve(false);
  }
  return db
    .query(
      `SELECT * from users WHERE email = '${email}' AND psw = '${password}'`
    )
    .then(result => {
      console.log('result', result);
      return result.length > 0;
    });
}

export default router;
