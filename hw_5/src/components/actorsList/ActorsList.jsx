const ActorsList = ({ actors }) => {
    return (
        <div>
            <h2 className="text-2xl">Актеры</h2>
            <ul>
                {actors.map(actor => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ActorsList;
