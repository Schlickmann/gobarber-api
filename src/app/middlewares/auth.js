import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class Auth {
  async isUserAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    return next();
  }
}

export default new Auth();
