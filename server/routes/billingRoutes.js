const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');

module.exports = app => {
  //we can put arbitrary numbers of middlewares
  //only requirement: one of the middlewares must process the req, and res.
  app.post('/api/stripe', requireLogin, async (req, res) => {
      const charge = await stripe.charges.create({
        amount:500,
        currency:'usd',
        description:'$5 for 5 credits',
        source: req.body.id
      });
      req.user.credits += 5;
      //this statement ensures the user model referenced is the most
      //up-to-date user model
      const user = await req.user.save();
      res.send(user);
  });
};
