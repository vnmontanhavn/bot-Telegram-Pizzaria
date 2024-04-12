/* eslint-disable global-require */

'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const public_key = fs.readFileSync(path.join(__dirname, process.env.JWT_PUBLIC_KEY));
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = public_key;
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      return done(null, jwtPayload);
    })
  );
};
