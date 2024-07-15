import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../schema/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Profile from '../schema/profile.js';

dotenv.config();

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => { //here done is 'next' used in middlewares
    try {
      console.log('email: ',email);
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://blog-verse-abrx.onrender.com/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user= await User.findOne({email: profile.emails[0].value});
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value
        });
        await Profile.create({
          name:profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value
        })
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }));


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  export default passport;