import React, { useState } from "react";
import FilmCard from "../filmCard/FilmCard";
import axios from "axios";
import Select from 'react-select';
import { Link } from "react-router-dom";

const categories = [
    { label: "аниме", value: "anime" },
    { label: "биография", value: "biografiya" },
    { label: "боевик", value: "boevik" },
    { label: "вестерн", value: "vestern" },
    { label: "военный", value: "voennyy" },
    { label: "детектив", value: "detektiv" },
    { label: "детский", value: "detskiy" },
    { label: "для взрослых", value: "dlya-vzroslyh" },
    { label: "документальный", value: "dokumentalnyy" },
    { label: "драма", value: "drama" },
    { label: "игра", value: "igra" },
    { label: "история", value: "istoriya" },
    { label: "комедия", value: "komediya" },
    { label: "концерт", value: "koncert" },
    { label: "короткометражка", value: "korotkometrazhka" },
    { label: "криминал", value: "kriminal" },
    { label: "мелодрама", value: "melodrama" },
    { label: "музыка", value: "muzyka" },
    { label: "мультфильм", value: "multfilm" },
    { label: "мюзикл", value: "myuzikl" },
    { label: "новости", value: "novosti" },
    { label: "приключения", value: "priklyucheniya" },
    { label: "реальное ТВ", value: "realnoe-TV" },
    { label: "семейный", value: "semeynyy" },
    { label: "спорт", value: "sport" },
    { label: "ток-шоу", value: "tok-shou" },
    { label: "триллер", value: "triller" },
    { label: "ужасы", value: "uzhasy" },
    { label: "фантастика", value: "fantastika" },
    { label: "фильм-нуар", value: "film-nuar" },
    { label: "фэнтези", value: "fentezi" },
    { label: "церемония", value: "ceremoniya" }
];

const SearchPanel = () => {
    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=14&query=${query}`, {
                headers: { accept: 'application/json', 'X-API-KEY': '9W0XWJM-8GR4B3Q-MRN6V6B-VSBT9MW' }
            });
            const fetchedFilms = response.data.docs || [];
            setFilms(fetchedFilms);
            filterFilms(fetchedFilms, selectedCategories);
        } catch (error) {
            console.error("Error fetching films:", error);
        }
    };

    const filterFilms = (films, categories) => {
        if (!categories.length) {
            setFilteredFilms(films);
            return;
        }
        const filtered = films.filter(film =>
            film.genres.some(genre =>
                categories.some(category => category.label === genre.name)
            )
        );
        setFilteredFilms(filtered);
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
        filterFilms(films, selectedOptions);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between my-4">
                <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">На главную</Link>
            </div>
            <h1 className="text-4xl font-bold my-6 text-center">Поиск Фильмов</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Введите название фильма"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="mb-4">
                    <Select
                        isMulti
                        options={categories}
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        placeholder="Выберите жанры"
                        className="w-full"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Найти
                </button>
            </div>
            <div className="flex flex-wrap -mx-2">
                {filteredFilms.length > 0 ? (
                    filteredFilms.map(film => (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={film.id}>
                            <Link to={`/film/${film.id}`}>
                                <FilmCard film={film} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="w-full text-center text-gray-500">Ничего не найдено</p>
                )}
            </div>
        </div>
    );
}

export default SearchPanel;
