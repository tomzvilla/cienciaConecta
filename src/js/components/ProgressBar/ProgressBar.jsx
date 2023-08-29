const ProgressBar = (props) => {

    const dataEntries = Object.entries(props.etapas);



    return (
        <div className="progress-bar">
            {dataEntries.map((item, index) => {
                return (
                <div className={item[1] <= props.etapaActual ? "progress-bar__barra progress-bar__barra--fill" : "progress-bar__barra"} key={index}>
                    {item[0].replace(/([A-Z])/g, ' $1').trim()}
                </div>)
            })}
        </div>
    )
}

export default ProgressBar;