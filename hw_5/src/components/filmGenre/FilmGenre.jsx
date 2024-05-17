import React from "react";

const FilmGenre = ({ genres }) => {
  return (
    <div className="px-6 py-4">
      Жанры: {genres.slice(0, 2).map((genre, index) => (
        <span key={index}>{genre.name}{index < genres.length - 1 && index < 1 ? ', ' : ''}</span>
      ))}
    </div>
  );
}

export default FilmGenre;
