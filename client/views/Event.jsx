import React from 'react';

import './../sass/views/Event.scss';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import UnfollowButton from './UnfollowButton.jsx';
import Star from './Star.jsx';

export default function Event({
  hasMultipleArtist,
  artistId,
  artistName,
  eventImageUrl,
  venue,
  date,
  ticketPrice,
  isStarred,
  removeArtist,
  toggleIsStarred
}) {
  const theme = useTheme();

  // TODO useCallback for unfollow onClick

  return (
    <Card
      className='event-item'
      elevation={4}
    >
      <Star isStarred={isStarred} toggleIsStarred={toggleIsStarred} />
      <CardMedia
        component="img"
        height="360"
        image={eventImageUrl}
        alt={`Event image for ${artistName}'s upcoming event.`}
      />
      <CardContent className='event-body'>
        <Typography><span style={{ color: theme.palette.secondary.dark }}>Artist:</span> {artistName}</Typography>
        <Typography><span style={{ color: theme.palette.secondary.dark }}>Venue:</span> {venue}</Typography>
        <Typography><span style={{ color: theme.palette.secondary.dark }}>Date & Time:</span> {date.toLocaleDateString()}</Typography>
        <Typography><span style={{ color: theme.palette.secondary.dark }}>Ticket Price:</span> {ticketPrice} USD</Typography >
      </CardContent>
      {!hasMultipleArtist &&
        <CardActions className='event-footer' sx={{ justifyContent: 'flex-end' }}>
          <UnfollowButton onClick={() => removeArtist({ artistId, artistName })} />
        </CardActions>
      }
    </Card>
  );
}
