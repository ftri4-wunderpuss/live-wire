const db = require('../models/userModel');
const fetch = require('node-fetch');

const eventController = {};

eventController.getEvents = async (req, res, next) => {
  const { _id, location, dateFrom, dateTo } = req.body;
  res.locals.eventData = [];
  //for each artist in the user's followed artists,
  /*
  const getFollowedArtists = 
  `SELECT artists.name, followed_artists.user_id 
  FROM artists 
  LEFT JOIN followed_artists ON artists._id = followed_artists.artist_id  
  WHERE user_id = ${_id}`;
  const retrievedFollowedArtists = await db.query(getFollowedArtists);
  const followedArtists = retrievedFollowedArtists.rows;
  console.log(followedArtists);
  //check api for events with location and date range
*/

  const data = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=3&apikey=67tWlO0wFALQ7IcG4jF7eArtbz9ALaPW&classificationName=music&city=London&keyword=Alanis')
  .then(response => response.json());
  
  const event_id = data._embedded.events[0].id;
  const eventUrl = data._embedded.events[0].url;
  const name = data._embedded.events[0].name;
  const photo = data._embedded.events[0].images[0].url;
  const venue = data._embedded.events[0]._embedded.venues[0].name;
  const date = data._embedded.events[0].dates.start.localDate;
  const ticketPrice = 'varied';

  const findArtist = `SELECT _id FROM artists WHERE name = '${name}' `;
  const createArtist = `INSERT INTO artists(name, photo, description) VALUES('${name}', '${photo}', 'description') RETURNING *`;
  let artist_id;
  
  const foundArtist = await db.query(findArtist);
  if (foundArtist.rows.length === 0) {
    const newArtist = await db.query(createArtist);
    artist_id = newArtist.rows[0]._id;
  } else {
    artist_id = foundArtist.rows[0]._id;
  }

  // const getArtistId = `SELECT _id FROM artists WHERE name = '${name}'`;
  // const retrievedArtistId = await db.query(getArtistId);
  // const artist_id = retrievedArtistId.rows[0]
  const artists = [name, artist_id];
  
  res.locals.eventData.push({
    eventId: event_id,
    eventUrl: eventUrl,
    artists: artists,
    eventImageUrl: photo,
    venue: venue,
    date: date,
    ticketPrice: ticketPrice
  });
  console.log(res.locals.eventData);
  // .catch(err => console.log(err));
  //{events: [
   //{ 
    //eventId: event_id,
    //   eventUrl:
    //   artists: [artistId, name]
    //   eventImageUrl:
    //   venue:
    //   date:
    //   ticketPrice
    // }
    // ]}

  return next();

};

module.exports = eventController;