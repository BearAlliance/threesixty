import express from 'express';

const router = express.Router();

import { signup } from '../middleware/singup';
import { login } from '../middleware/login';
import { logout } from '../middleware/logout';
import { authenticate } from '../middleware/authenticate';
import { myInfo, updatePersonalInfo } from '../middleware/my-info';

// Get app health
router.get('/', function(req, res) {
  res.sendStatus(200);
});

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);

router.use('/user', authenticate);
router.get('/user/me', myInfo);
router.post('/user/me', updatePersonalInfo);

export default router;
