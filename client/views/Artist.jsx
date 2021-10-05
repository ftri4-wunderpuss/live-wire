import React from 'react';

import './../sass/views/Artist.scss';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import FollowButton from './FollowButton.jsx';
import UnfollowButton from './UnfollowButton.jsx';

export default function Artist({
  artistId,
  artistName,
  artistBio,
  artistImageUrl,
  artistIsOnTour,
  isFollowed,
  addArtist,
  removeArtist
}) {
  const theme = useTheme();

  // TODO add useCallback for onCLick of follow and unfollow

  return (
    <Card
      className='artist-item'
      elevation={4}
    >
      <CardMedia
        component="img"
        height="360"
        image={artistImageUrl}
        alt={`${artistName}'s image.`}
      />
      <CardContent className='artist-body'>
        <Typography variant="h4" component="h3" mb={2}>{artistName}</Typography>
        <Typography mb={2}><span style={{ color: theme.palette.secondary.dark }}>Bio:</span> {artistBio}</Typography>
      </CardContent>
      <CardActions className='artist-footer' sx={{ justifyContent: 'flex-end' }}>
        {isFollowed && <UnfollowButton onClick={() => removeArtist({ artistId, artistName })} />}
        {!isFollowed && <FollowButton onClick={() => addArtist({ artistId, artistName })} />}
      </CardActions>
    </Card>
  );
}
