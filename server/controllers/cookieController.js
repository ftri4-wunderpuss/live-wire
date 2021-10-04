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
<<<<<<< HEAD

cookieController.removeSIDCookie = async (req, res, next) => {
  res.cookie(
    'sid', 
    'invalidate', 
    { httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() - 1000) }
  );
  return next();
};
=======
>>>>>>> d9dd5e64783c6478ef0189fa144bc367c899a825

module.exports = cookieController;
