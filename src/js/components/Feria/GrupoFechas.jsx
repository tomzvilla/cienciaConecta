

const GrupoFechas = (props) => {

    const grupo4 = props.date3 ? false : true;



    return (

        grupo4 ?

        <div className="grupo-fechas">
            <h3 className="grupo-fechas__title" >{props.title}</h3>
            <div className="grupo-fechas__group">
                {props.date1}
                {props.date2}
            </div>
        </div>


        :

        <div className="grupo-fechas">
            <h3 className="grupo-fechas__title" >{props.title}</h3>
            <h3 className="grupo-fechas__sub" >{props.sub1}</h3>
            <div className="grupo-fechas__group">
                {props.date1}
                {props.date2}
            </div>

            <h3 className="grupo-fechas__sub" >{props.sub2}</h3>
            <div className="grupo-fechas__group">
                {props.date3}
                {props.date4}
            </div>
        </div>



    );
}

export default GrupoFechas;