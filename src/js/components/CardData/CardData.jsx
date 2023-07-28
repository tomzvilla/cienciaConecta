const CardData = (props) => {

    return (
        <div className="card-data">
            <p className="card-data__title">{props.title}</p>
            <p className="card-data__value">{props.value}</p>
        </div>
    );
}

export default CardData;