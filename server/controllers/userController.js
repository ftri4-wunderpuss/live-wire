const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};


userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password, city, email_notification } = req.body;
    if (!email || !password) return next('Missing email address or password in userController.createUser');
    const passhash = await bcrypt.hash(password, 12);
    const city_id = ``//get city name by id
    const createUser = `INSERT INTO users(
      name, email, passhash, city, email_notification)
      VALUES (${name}, ${email}, ${passhash}, ${city_id}, ${email_notification}`

    const newUser = await db.query(createUser);
    //
    res.locals.newUser = newUser.rows;
    res.redirect('/feed'); //does this need to be moved to login.js?
      //how do I store last_login and last_login_ip
      //use try/catch to handle errors?
  } catch (err) {
    console.error(error);
    res.redirect('/')
  }

}

userController.verifyUser = async (req, res, next) => {
  //get email and password from request body
  const { email, password } = req.body;

  //check if user has entered email and password
  if (!email || !password) return next('Missing email address or password in userController.createUser');
  //set up query to get the stored hashed password for the email address that was entered
  const getUserInfo = `SELECT * FROM users WHERE email = ${email}`
  const userInfo = await db.query(getUserInfo);
  const { passhash } = userInfo.rows //does this work to access the stored passhash?

  //if email address does not exist in the database, throw error (email or password does not match)
  if (!passhash) return next('username or password does not match in userController.verifyUser')
  //if email address does exist in the database, compare stored passhash to hashed version of password that was entered. It if doesn't match, redirect user to homepage with error message (frontend?)
  const isValidPassword = await bcrypt.compare(password, passhash);

  if(isValidPassword) {
    res.locals.user = userInfo.rows;
    return next();
  } else {
    res.redirect('/'); //does this need to be moved to login.js?
  }
  //use try/catch to handle errors?
}


module.exports = userController;