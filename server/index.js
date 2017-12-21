const express=require('express');
//running express app
//all the hanlders implemented after will be registered on this single app
const app=express();
app.get('/',(rep,res)=>{
  res.send({hi:'there'});
});
//look at the underline environment and see if there's a port we'll gonna use
//if we are in development environment, heroku won;t assign us a port(in production, it will) 
//so we listen to default port 5000
const PORT = process.env.port || 5000;
app.listen(PORT);
