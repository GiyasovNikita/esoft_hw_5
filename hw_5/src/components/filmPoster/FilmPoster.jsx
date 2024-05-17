import React from 'react';

const FilmPoster = ({ url }) => {
  return (
    <div>
      <img src={url} alt="Film Poster" style={{ height: '300px' }} />
    </div>
  );
}

export default FilmPoster;

