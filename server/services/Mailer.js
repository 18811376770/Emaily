const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
//contains codes tie to helper.Mail, like a react component
class Mailer extends helper.Mail{
  //survey,template pass to constrcutor
  constructor({subject,recipients},content){
    super();
    //this is the api we can communicate with sendgrid
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html',content);
    //recipients is a array of objects, we extract each email from subdocument collection
    this.recipients = this.formatAddresses(recipients);
    //addContent is built-in function inside Mail
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  //take format of lists emails and add into Mailer
  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  //return array of email
  formatAddresses(recipients){
    return recipients.map(({email})=>{
      return new helper.Email(email);
    });
  }
  //don't dive into it, it;s just document that tell us write these codes.
  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  async send(){
    const request = this.sgApi.emptyRequest({
      method:'POST',
      path:'/v3/mail/send',
      body:this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }

}
module.exports = Mailer;
