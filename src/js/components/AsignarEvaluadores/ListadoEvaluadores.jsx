// components
import Pagination from "../Pagination/Pagination"
import ImageButton from "../ImageButton/ImageButton"
import ImageLink from "../ImageLink/ImageLink"
import Badge from "../Badge/Badge"
import GenericBadge from "../Badge/GenericBadge"
// hooks
import { useState, useMemo } from "react"
import useUtils from "../../hooks/useUtils"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"

const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'Apellido', value: 'apellido'},
    {name: 'CUIL', value: 'cuil'},
    {name: 'Niveles', value: 'niveles'},
    {name: 'Categorías', value: 'categorias'},
]

const pageSize = 10

const ListadoEvaluadores = (props) => {

    const evaluadores = useSelector(state => state.referentes.evaluadoresProyecto)

    const dispatch = useDispatch()

    const { formatCuil } = useUtils()

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return evaluadores.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const handleAdd = (idEvaluador) => {
        dispatch(referentesActions.asignarEvaluador({idEvaluador, idProyecto: props.idProyecto}))
    }

    return (
        <>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        {headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Ver</th>
                        <th scope="col" className="table-header__head">Asignar</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {evaluadores && currentTableData.map((evaluador, index) => {
                        return (
                            <tr key={evaluador._id} className="table-body-row">
                                {headers.map(header => {
                                    if(header.name === 'Categorías'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {evaluador.categorias.map( (c, i) => {
                                                    if (i < 2) {

                                                    return (<Badge key={c._id} type={c} />)}})}

                                                    {
                                                    evaluador.categorias.length > 3 ? <GenericBadge text="Más..."/> : ""


                                                }   

                                            </td>
                                        )
                                    } 
                                    else if(header.name === 'Niveles'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {evaluador.niveles.map( (n, i) => {
                                            
                                                    if (i < 2) {
                                                    return (<Badge  key={n._id} type={n} />)}})}

                                                {
                                                    evaluador.niveles.length > 3 ? <GenericBadge text="Más..."/> : ""
                                                }    
                                            </td>
                                        )
                                    }
                                    else if(header.name === 'CUIL') {
                                        console.log(formatCuil(evaluador.datos_docente[`${header?.value}`]))
                                        return (<td key={header.name} className="table-body-row__td" >{formatCuil(evaluador.datos_docente[`${header?.value}`])}</td>)
                                    }
                                    else return (
                                    <td key={header.name} className="table-body-row__td" >{evaluador.datos_docente[`${header?.value}`]}</td>
                                )})}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink linkto={`/postulante/${evaluador._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                </td>
                                <td className="table-body-row__td">
                                    <ImageButton small={true} src={require("../../../assets/add.png")} callback={() => handleAdd(evaluador._id)} text="Asignar"/>
                                </td>   
                            </ tr>
                        )
                        
                    }
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={evaluadores .length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
        </>
    )
}

export default ListadoEvaluadores