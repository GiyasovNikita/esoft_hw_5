import React, { useState } from "react";
import { useFilms } from '../../context/FilmContext';

const CommentsSection = ({ filmId }) => {
    const { comments, addComment } = useFilms();
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        const comment = { text: newComment, author: "Анонимный пользователь" };
        addComment(filmId, comment);
        setNewComment("");
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Комментарии</h2>
            {comments[filmId] && comments[filmId].length > 0 ? (
                comments[filmId].map((comment, index) => (
                    <div key={index} className="mb-2">
                        <p className="bg-white p-2 rounded-lg shadow-sm">
                            {comment.text} - <span className="font-bold">{comment.author}</span>
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mb-4">Нет комментариев</p>
            )}
            <textarea
                className="w-full p-2 mb-4 border rounded-lg"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Введите ваш комментарий"
            />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                onClick={handleAddComment}
            >
                Добавить комментарий
            </button>
        </div>
    );
};

export default CommentsSection;

