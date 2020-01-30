require('dotenv').config();

export default {
  secret: process.env.JWT_SECRET,
  ttl: process.env.JWT_EXPIRES,
};
