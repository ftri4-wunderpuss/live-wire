/**
 * @throws TypeError if artistListItem validates front-end ArtistListItem schema.
 */
export function validateArtistListItem(artistListItem) {
  if (typeof artistListItem.artistId !== 'string' || typeof artistListItem.artistName !== 'string') {
    throw new TypeError('ArtistListItem must follow front-end schema.');
  }
}

export function validateEventId(eventId) {
  if (typeof eventId !== 'string') {
    throw new TypeError('eventId must be of type String.');
  }
}
