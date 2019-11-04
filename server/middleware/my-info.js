import * as db from '../db';
import logger from '../logger';

export function myInfo(req, res) {
  logger.debug('Getting my info');
  db.query({
    text:
      'SELECT user_id, first_name, last_name from accounts WHERE user_id = $1',
    values: [req.session.userData.user_id]
  }).then(result => {
    res.json(result.rows[0]);
  });
}

export function updatePersonalInfo(req, res) {
  const { user_id } = req.session.userData;
  db.query({
    text: `UPDATE accounts SET first_name=$2, last_name=$3 WHERE user_id = $1`,
    values: [user_id, req.body.firstName, req.body.lastName]
  }).then(() => {
    logger.debug('Updated user', user_id);
    res.sendStatus(204);
  });
}
