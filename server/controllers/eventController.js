const eventController = {};

eventController.getEvents = async (req, res, next) => {
  const { location, dateFrom, dateTo } = req.body;

  //check api for events with location and date range

  const response = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=3&apikey=67tWlO0wFALQ7IcG4jF7eArtbz9ALaPW&classificationName=music&city=london&keyword=billie');

  console.log(response);

}