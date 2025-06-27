const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');
const colors = require('colors');

module.exports = function (passport) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // We'll keep this as a fallback
  };

  // The error occurs if process.env.JWT_SECRET is not available when this file is loaded.
  // We'll double-check the secret is present before creating the strategy.
  if (!options.secretOrKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      console.log('--- JWT Payload Received by Passport ---'.yellow);
      console.log(jwt_payload);

      try {
        const user = await User.findByPk(jwt_payload.id);

        console.log('--- User Found by Passport ---'.yellow);
        console.log(user ? user.toJSON() : 'User not found');

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error('--- Error in Passport Strategy ---'.red);
        console.error(err);
        return done(err, false);
      }
    })
  );
}; 