import React, { createContext, useState, useContext } from 'react';

const FilmContext = createContext();

export const useFilms = () => useContext(FilmContext);

export const FilmProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [comments, setComments] = useState({});

    const addComment = (filmId, newComment) => {
        setComments(prevComments => ({
            ...prevComments,
            [filmId]: [...(prevComments[filmId] || []), newComment]
        }));
    };

    return (
        <FilmContext.Provider value={{ favorites, setFavorites, watchLater, setWatchLater, comments, addComment }}>
            {children}
        </FilmContext.Provider>
    );
};
