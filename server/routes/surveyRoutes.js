const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = app => {
  app.get('/api/surveys/thanks',(req,res) => {
    res.send('Thanks for voting!');
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
    //we assume req.body has been send to backend server firstly
    //In real life development, it's common to start off from backend
    //even though frontend seems easier to start off
    const {title, subject, body, recipients} = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      //es6 fancy syntax
      //map(email => {return {email: email}})
      recipients: recipients.split(',').map(email=> ({ email: email.trim() })),
      //req.user.id available on any mongoose model
      _user: req.user.id,
      dateSent: Date.now()
    });
    //Great place to send a eamil, template is some HTML used for showing
    const mailer = new Mailer(survey,surveyTemplate(survey));
    try{
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      //update credits
      res.send(user);
    }catch(err){
      res.status(422).send(err);
    }
  });
};
