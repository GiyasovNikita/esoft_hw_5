import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import FilmRating from "../filmRating/FilmRating";
import ActorsList from "../actorsList/ActorsList";
import CommentsSection from "../commentsSection/CommentsSection";
import FilmPoster from "../filmPoster/FilmPoster";

const API_KEY = '9W0XWJM-8GR4B3Q-MRN6V6B-VSBT9MW';

const defaultImage = "src/assets/no-photos.png";

const FilmDetails = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);

    const getImageSrc = () => {
        if (film.poster && film.poster.url) {
          return film.poster.url;
        }
        return defaultImage;
      };

    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                    headers: { 'X-API-KEY': API_KEY }
                });
                setFilm(response.data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        };

        fetchFilmDetails();
    }, [id]);

    if (!film) return <div className="text-center mt-10">Загрузка...</div>;

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between my-4">
                <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">На главную</Link>
                <Link to="/search" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Страница поиска</Link>
            </div>
            <div className="flex flex-col lg:flex-row items-start">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <FilmPoster url={getImageSrc()} className="rounded shadow-lg"/>
                </div>
                <div className="w-full lg:w-2/3 lg:pl-8">
                    <h1 className="text-4xl font-bold mb-4">{film.name}</h1>
                    <p className="mb-6">{film.description}</p>
                    <FilmRating rating={film.rating.imdb} />
                    <ActorsList actors={film.persons} />
                </div>
            </div>
            <div className="mt-8">
                <CommentsSection filmId={film.id} />
            </div>
        </div>
    );
};

export default FilmDetails;
