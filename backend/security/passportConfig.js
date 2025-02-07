const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const connection = require('../db/connection');
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [jwt_payload.id], (err, results) => {
        if (err) return done(err, false);
        if (results.length === 0) return done(null, false);
        return done(null, results[0]);
    });
}));

module.exports = passport;
