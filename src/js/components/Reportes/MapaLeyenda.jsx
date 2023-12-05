const MapaLeyenda = (props) => {

    

    return (
        <div className='reportes-leyenda'>
                <p className="reportes-leyenda__title">Leyenda</p>
                {props.intervals.map((i, index) => 
                <div key={index} className="reportes-leyenda__item"> 
                    <div className="reportes-leyenda__square" style={{ backgroundColor: props.getColor(i.interval) }}></div>
                    <div className="reportes-leyenda__text" style={{ "color": `${props.getColor(i.interval)}`}}>{i.start} - {i.end}</div>   
                </div> 
                    
                )}
        </div>
    )
}

export default MapaLeyenda;