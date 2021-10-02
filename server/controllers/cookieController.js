const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  const { _id } = res.locals.user;
  res.cookie('ssid', _id, { httpOnly: true });
  return next();
}

module.exports = cookieController;