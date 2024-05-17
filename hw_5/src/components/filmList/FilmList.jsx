import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import FilmCard from "../filmCard/FilmCard";
import { useFilms } from '../../context/FilmContext';

const options = {
    method: 'GET',
    url: 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=50',
    headers: { accept: 'application/json', 'X-API-KEY': '9W0XWJM-8GR4B3Q-MRN6V6B-VSBT9MW' }
};

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [filmType, setFilmType] = useState('');
    const [sortRating, setSortRating] = useState(false);
    const { favorites, setFavorites, watchLater, setWatchLater } = useFilms();

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                axios.request(options)
                    .then(function (response) {
                        if (Array.isArray(response.data.docs)) {
                            setFilms(response.data.docs);
                            console.log(response.data.docs);
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });

            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchFilms();
    }, []);

    const toggleFavorite = (film) => {
        setFavorites(prev => {
            const isFavorite = prev.some(item => item.id === film.id);
            if (isFavorite) {
                return prev.filter(item => item.id !== film.id); // Удаляем фильм, если он уже есть в избранном
            } else {
                return [...prev, { id: film.id, name: film.name }]; // Добавляем объект с id и name, если его нет
            }
        });
    };

    const toggleWatchLater = (film) => {
        setWatchLater(prev => {
            const isWatchLater = prev.some(item => item.id === film.id);
            if (isWatchLater) {
                return prev.filter(item => item.id !== film.id);
            } else {
                return [...prev, { id: film.id, name: film.name }];
            }
        });
    };

    const handleSortRating = () => {
        setSortRating(!sortRating);
        setFilms(prev => [...prev].sort((a, b) => sortRating ? a.rating.imdb - b.rating.imdb : b.rating.imdb - a.rating.imdb));
    };

    const filteredFilms = films.filter(film => filmType ? film.type === filmType : true);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-6 text-center">Список фильмов</h1>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleSortRating}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Сортировать по рейтингу
                </button>
                <select
                    onChange={e => setFilmType(e.target.value)}
                    value={filmType}
                    className="border rounded py-2 px-4"
                >
                    <option value="">Все типы</option>
                    <option value="movie">Фильм</option>
                    <option value="tv-series">Сериал</option>
                </select>
                <Link
                    to="/search"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                >
                    Поиск фильмов
                </Link>
            </div>
            <div className="flex flex-wrap -mx-2">
                {filteredFilms.map(film => (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={film.id}>
                        <Link to={`/film/${film.id}`}>
                            <FilmCard film={film} className="rounded-lg shadow-md hover:shadow-lg transition duration-300" />
                        </Link>
                        <div className="flex justify-between mt-2">
                            <button
                                onClick={() => toggleFavorite(film)}
                                className={`py-1 px-3 rounded ${favorites.some(f => f.id === film.id) ? 'bg-yellow-400' : 'bg-gray-300'} hover:bg-yellow-500 transition duration-300`}
                            >
                                {favorites.some(f => f.id === film.id) ? '★' : '☆'} В избранное
                            </button>
                            <button
                                onClick={() => toggleWatchLater(film)}
                                className={`py-1 px-3 rounded ${watchLater.some(f => f.id === film.id) ? 'bg-green-400' : 'bg-gray-300'} hover:bg-green-500 transition duration-300`}
                            >
                                {watchLater.some(f => f.id === film.id) ? '⏳' : '⌛'} Смотреть позже
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilmList;
