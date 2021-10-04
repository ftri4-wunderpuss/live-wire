const { Pool } = require ('pg')

const PG_URI = 'postgres://jxdmlpwa:VDXT5tjsvYntixux2GVQ4UVxxRsGANZt@fanny.db.elephantsql.com/jxdmlpwa'

const pool = new Pool({
  connectionString: PG_URI,
  max: 5
})

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
/* Query to delete database model

Copy and paste in query to execute

DROP TABLE starred_events, followed_artists, artists_in_event, 
sessions, users, events, artists, cities;
*/

/* Query to recreate database model

CREATE TABLE cities (
    _id INT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE users(
    _id INT NOT NULL PRIMARY KEY ,
      name VARCHAR(75) NOT NULL,
      email VARCHAR(100) NOT NULL,
      passhash VARCHAR NOT NULL,
      email_notification VARCHAR NOT NULL,
      last_login DATE NOT NULL,
      last_login_ip INT NOT NULL,
      city_id INT NOT NULL,
        FOREIGN KEY (city_id) REFERENCES cities(_id)
    );
    
    CREATE TABLE artists (
    _id INT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    photo VARCHAR NOT NULL,
    description VARCHAR NOT NULL
    );
    
    CREATE TABLE events (
    _id INT NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    venue VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    city_id INT NOT NULL,
       FOREIGN KEY (city_id) REFERENCES cities(_id)
    );
    
    CREATE TABLE sessions (
    _id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    expires_at TIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(_id)
    );
    
    CREATE TABLE followed_artists (
    _id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(_id),
      FOREIGN KEY (artist_id) REFERENCES artists(_id)
    );
    
    CREATE TABLE starred_events (
    _id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(_id),
      FOREIGN KEY (event_id) REFERENCES events(_id)
    );
    
    CREATE TABLE artists_in_event (
    _id INT NOT NULL PRIMARY KEY,
    artist_id INT NOT NULL,
    event_id INT NOT NULL,
      FOREIGN KEY (artist_id) REFERENCES artists(_id),
      FOREIGN KEY (event_id) REFERENCES events(_id)
    );
*/

//Possible examples of database query functions
// const getUserInfo = (email) => {
//   `SELECT * FROM users WHERE email = ${email}`
// }

// const createUser = (...values) => {
//   `INSERT INTO users(
//     name, email, passhash, city, email_notification, last_login_ip)
//     VALUES (${values})
//     RETURNING *`
// }

//TODO: write SQL queries in functions

const getFollowedArtists = (userId) => {
  //get followed artists from database and store in an array
}

const getStarredEvents = (userId) => {
  //get starred events from database and store in an array by eventId
}
