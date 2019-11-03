import express from 'express';

const router = express.Router();

import { signup } from '../middleware/singup';
import { login } from '../middleware/login';
import { logout } from '../middleware/logout';

// Get app health
router.get('/', function(req, res) {
  res.sendStatus(200);
});

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);

export default router;
