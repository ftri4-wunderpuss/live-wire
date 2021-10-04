const cookieController = {};

/**
 * Middleware: Send an SID cookie using the session ID stored in res.locals.sid.
 */
cookieController.setSIDCookie = (req, res, next) => {
  //if no ssid was store, return next()
  if (!res.locals.sid) return next();
  
  const { sid } = res.locals; //TODO: console log res.locals.session to determine how to access sid
  res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax' });
  return next();
};

module.exports = cookieController;
