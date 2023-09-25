const CardHeader = (props) => {

    return (
        <div className={`card-header card-header--${props.wide ? 'wide' : ''}`}>
            <h3 className="card-header__title">{props.title}</h3>
        </div>
    );
}


export default CardHeader;