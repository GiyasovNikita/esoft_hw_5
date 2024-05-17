import React from 'react';
import { useFilms } from '../../context/FilmContext';

const Sidebar = () => {
    const { favorites, watchLater } = useFilms();

    return (
        <div className="sidebar">
            <h3>Любимые фильмы</h3>
            <ul>
                {favorites.map(film => (
                    <li key={film.id}>{film.name}</li>
                ))}
                {console.log(favorites)}            
            </ul>
            <h3>Фильмы к просмотру</h3>
            <ul>
                {watchLater.map(film => (
                    <li key={film.id}>{film.name}</li>
                ))}
                {console.log(watchLater)}    
            </ul>
        </div>
    );
};

export default Sidebar;
