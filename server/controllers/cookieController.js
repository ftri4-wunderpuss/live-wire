const cookieController = {};

/**
 * Middleware: Send an SID cookie using the session ID stored in res.locals.sid.
 */
cookieController.setSIDCookie = (req, res, next) => {
  //if no session was store, return next()
  if (res.locals.session === {}) return next();
  
  const { sid, expires_at } = res.locals.session; 
  
  res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax', expires_at: expires_at }
  );
  return next(); 
};

cookieController.removeSIDCookie = async (req, res, next) => {
  res.cookie(
    'sid', 
    'invalidate', 
    { httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() - 1000) }
  );
  return next();
};

module.exports = cookieController;
