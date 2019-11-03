import express from 'express';

const router = express.Router();

import * as db from '../db';
import logger from '../logger';
import { signup } from '../middleware/singup';
import { login } from '../middleware/login';

// Get app health
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/login', login);
router.post('/signup', signup);

export default router;
