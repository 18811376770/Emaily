const passport = require('passport');
//once the user comes to this URL,
//kick user into oauth flow, which is entirely managed by strategy 'google'
//however, we never assign a variale called google above, that's because google inplicitly
//referenced to GoogleStrategy
//scope specify what access user want to use in this user's profile
//'profile','email' are not randomly created.
module.exports=(app)=>{
  app.get(
    '/auth/google',
    passport.authenticate('google',{
    scope:['profile','email']
  }));

  app.get('/auth/google/callback',passport.authenticate('google'));

  app.get('/api/current_user',(req,res)=>{
    res.send(req.user);
  });

  app.get('/api/logout',(req,res)=>{
    req.logout();
    res.send(req.user);
  });
};
