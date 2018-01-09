//figure out what set of credential to return
if(process.env.NODE_ENV === 'production'){
  //we are in production mode-return the prod keys
  module.exports = require('./prod');
}
else{
  //we are in development-return dev keys
  module.exports = require('./dev');
}
