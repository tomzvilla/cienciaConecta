import ImageLink from "../ImageLink/ImageLink";


// Actualmente esta configurada solo para proyectos.
const SmallTable = (props) => {

    return (
        <table className="small-table">
            <thead className="small-table__header">
                <tr>
                    <th>{props.title}</th>
                </tr>
                
                </thead>
            <tbody className="small-table__body">
                {props.data.map((item, index) => {

                    return (
                        <tr key={index} className="small-table__tr">
                            <td className="small-table__td">{item.titulo}</td>
                            <td className="small-table__td small-table__td--img" ><ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${item._id}`} src={require("../../../assets/ver.png")}/></td>
                        </tr>
                    )
                })}
            </tbody>

        </table>


    );

}


export default SmallTable;