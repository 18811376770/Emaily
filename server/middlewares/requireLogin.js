//next like down call that will exeucte after req finished
//it will be passed to next middleware once the current middleware is completed
//attention! only /api/strip will use this middleware, not every routes use this
//so we shouldn't ware it up in index.js but in billingRoutes.js
module.exports = (req, res, next) => {
  if(!req.user){
    res.status(401).send({error: 'You must log in!'});
  }
  next();
};
