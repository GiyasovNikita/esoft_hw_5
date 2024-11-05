import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../mainPage/MainPage";
import SearchPage from "../searchPage/SearchPage";
import FilmPage from "../filmPage/FilmPage";
import Layout from "../../layout/Layout";
import { FilmProvider } from "../../context/FilmContext"

const Router = () => {
    return (
        <BrowserRouter>
            <FilmProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/film/:id" element={<FilmPage />} />
                    </Route>
                </Routes>
            </FilmProvider>
        </BrowserRouter>
    );
}

export default Router;
