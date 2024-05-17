import React, { useState, useEffect } from "react";
import FilmDescription from "../filmDescription/FilmDescription";
import FilmPoster from "../filmPoster/FilmPoster"
import FilmTitle from "../filmTitle/FilmTitle";
import FilmGenre from "../filmGenre/FilmGenre";
import FilmRating from "../filmRating/FilmRating";

const defaultImage = "src/assets/no-photos.png"

const FilmCard = ({ film }) => {

  const getImageSrc = () => {
    // Проверяем, существует ли объект poster и его свойство url
    if (film.poster && film.poster.url) {
      return film.poster.url;
    }
    // Возвращаем изображение по умолчанию, если poster отсутствует или url не предоставлен
    return defaultImage;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <FilmPoster url={getImageSrc()} />
      <FilmTitle title={film.name} />
      <FilmDescription description={film.shortDescription} />
      <FilmGenre genres={film.genres} />
      <FilmRating rating={film.rating.imdb}/>

    </div>
  );
}


export default FilmCard