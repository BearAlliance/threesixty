import logger from '../logger';

export function authenticate(req, res, next) {
  logger.debug('Checking auth');
  if (req.session.authenticated) {
    logger.debug(`Authentication success for ${req.session.userData.email}`);
    next();
  } else {
    logger.debug(`Authentication failed`);
    res.status(401);
    res.json({ message: 'unauthorized' });
  }
}
