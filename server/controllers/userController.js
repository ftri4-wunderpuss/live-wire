const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};

//TODO: Add/clean up error handling

/**
 * Middleware: Create/register a new user by inserting a new entry into the users table in the database, based on information provided by the client. User information is stored in res.locals.user
 */
userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password, city, email_notification } = req.body;
    // console.log(req.body);
    const pad = function(num) { return ('00'+num).slice(-2) };
    let date;
    date = new Date();
    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate());       //+ ' ' +
            // pad(date.getUTCHours())      + ':' +
            // pad(date.getUTCMinutes())    + ':' +
            // pad(date.getUTCSeconds());
    const last_login = date; //new Date();
    const last_login_ip = req.headers['x-forwarded-for'] || req.ip;
    //TODO add time 
    // if (!email || !password) return next('Missing email address or password in userController.createUser');
    // TODO validate user inputs (check that email is correct format, validate name, check that email_notification is a boolean)
    const passhash = await bcrypt.hash(password, 12);
    // TODO validate the city against out db, or the API
    // TODO get city name by id (placeholder)

    //TODO: add SQL queries to db folder
    // FIX SQL injection error (pass in array of parameters so they are sanitized - pg.query)
    // const createCity = `INSERT INTO cities(name) VALUES('${city}') RETURNING _id`;
    const findCity = `SELECT _id FROM cities WHERE name = '${city}' `;
    const createCity = `INSERT INTO cities(name) VALUES('${city}') RETURNING *`;
    let city_id;
    

    const foundCity = await db.query(findCity);
    if (foundCity.rows.length === 0) {
      const newCity = await db.query(createCity);
      city_id = newCity.rows[0]._id;
    } else {
      city_id = foundCity.rows[0]._id;
    }

    const createUser = `INSERT INTO users(
      name, email, passhash, city_id, email_notification, last_login, last_login_ip)
      VALUES ('${name}', '${email}', '${passhash}', ${city_id}, ${email_notification}, '${last_login}', '${last_login_ip}')
      RETURNING *`;
    const newUser = await db.query(createUser);
    res.locals.user = newUser.rows[0];
    return next();
  } catch (err) {
    next(err);
  }

};


/**
 * Middleware: Verify that a user's email address is in the database and that the input password matches the user's hashed password in the database based on the email address they provide. isValidPassword (boolean) is stored in `res.locals.isValidPassword`, and if password matches, user information is stored in `res.locals.user`.
 */
userController.verifyUser = async (req, res, next) => {
  //get email and password from request body
  const { email, password } = req.body;

  //check if user has entered email and password
  if (!email || !password) return next('Missing email address or password in userController.createUser');
  //set up query to get the stored hashed password for the email address that was entered
  const getUserInfo = `SELECT * FROM users WHERE email = '${email}'`;
  const userInfo = await db.query(getUserInfo);
  const { passhash } = userInfo.rows[0];//does this work to access the stored passhash? access based on index, rows is an array

  //if email address does not exist in the database, throw error (email or password does not match)
  if (!passhash) return next('username or password does not match in userController.verifyUser');
  //if email address does exist in the database, compare stored passhash to hashed version of password that was entered. It if doesn't match, redirect user to homepage with error message (frontend?)
  const isCorrectPassword = await bcrypt.compare(password, passhash);
  res.locals.isCorrectPassword = isCorrectPassword;
  if (isCorrectPassword) {
    res.locals.user = userInfo.rows[0];
    return next();
  } else {
    return next();
  }
};


/**
 * Middleware: Retrieve user's information: User (name, email), Settings (city, email notifications), followed_artists, and starred_events. If successful, results are stored in res.locals.userObject.
 */
userController.getUserInfo = async(req, res, next) => {
  if (!res.locals.user) return next();

  const { _id, name, email, city_id, email_notification } = res.locals.user; //TODO: console log to confirm the correct way to access these values
  //const followedArtists = await userModel.getFollowedArtists() (return array)
  //const starredEvents = await userModel.getStarredEvents() (return array)
  
  const getCity = `SELECT name FROM cities WHERE _id = ${city_id}`;
  const retrievedCity = await db.query(getCity);
  const city = retrievedCity.rows[0].name;
  console.log(city);

  const getFollowedArtists = 
  `SELECT artists.name, followed_artists.user_id 
  FROM artists 
  LEFT JOIN followed_artists ON artists._id = followed_artists.artist_id  
  WHERE user_id = ${_id}`;
  const retrievedFollowedArtists = await db.query(getFollowedArtists);
  const followedArtists = retrievedFollowedArtists.rows;

  const getStarredEvents = 
  `SELECT event_id
  FROM starred_events 
  WHERE user_id = ${_id}`;
  const retrievedStarredEvents = await db.query(getStarredEvents);
  const starredEvents = retrievedStarredEvents.rows;


  res.locals.userObject = {
    user: {
      name: name,
      email: email
    }, 
    settings: {
      city: city,
      email_notification: email_notification
    }, 
    followedArtists: followedArtists, 
    starredEvents: starredEvents
  };
  console.log(res.locals.user);
  return next();
};


userController.updateUser = async (req, res, next) => {
  if(!res.locals.isLoggedIn) return next();
  //TODO: define function in userModel file
  if (req.body.name) res.locals.name = req.body.name;
  if (req.body.email) res.locals.email = req.body.email;
  if (req.body.password) res.locals.password = req.body.password;
  if (req.body.city) res.locals.city = req.body.city;
  if (req.body.email_notification) res.locals.email_notification = req.body.email_notification;

  // const user = await updateUser(...values);
  // res.locals.user = user;
  return next();
};

/**
 * Middleware: Delete a user's information from the users table
 */
userController.deleteUser = async (req, res, next) => {
  if(!res.locals.isLoggedIn) return next();
  //TODO: define function in userModel file
  //deleteUser();
  return next();
};


module.exports = userController;