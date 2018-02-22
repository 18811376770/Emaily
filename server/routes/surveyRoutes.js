const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = app => {
  app.get('/api/surveys',requireLogin,async (req,res) => {
    //_user is referenced from /models/Survey
    //don't return entire recipients field
    const surveys = await Survey.find({_user:req.user.id})
      .select({recipients:false});
    res.send(surveys);
  });
  app.get('/api/surveys/:surveyId/:choice',(req,res) => {
    res.send('Thanks for voting!');
  });
  app.post('/api/surveys/webhook',(req,res)=>{
    //extract id,choice
    const p = new Path('/api/surveys/:surveyId/:choice');
    // const events1 = _.map(req.body, ({email,url}) => {
    //   //only pathname is extracted
    //   //it's an object like { surveyId: '5a8e64d0475ddb0965dcbf63', choice: 'no' } or null
    //   const match = p.test(new URL(url).pathname);
    //   if(match){
    //     return {email,surveyId:match.surveyId,choice:match.choice};
    //   }
    // });
    // const compactEvents = _.compact(events1);
    // const events = _.uniqBy(compactEvents,'email','surveyId');
    _.chain(req.body)
    .map(({email, url}) =>{
      const match = p.test(new URL(url).pathname);
      if(match){
          return {email,surveyId:match.surveyId,choice:match.choice};
      }
    })
    .compact()
    .uniqBy('email','surveyId')
    .each(({ surveyId, email, choice}) => {
      Survey.updateOne({
        _id:surveyId,
        recipients:{
          $elemMatch:{email: email, responded: false}
        }
      },{
        $inc:{[choice]:1},
        $set:{'recipients.$.responded':true},
        lastResponded: new Date()
      }).exec();
    })
    .value();
    res.send({});
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
