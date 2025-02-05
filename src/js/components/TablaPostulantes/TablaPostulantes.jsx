// components
import ImageLink from "../ImageLink/ImageLink"
import Button from "../Button/Button"
import Badge from "../Badge/Badge"
import Pagination from "../Pagination/Pagination"
// hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import Swal from "sweetalert2"
import { useSelector } from "react-redux"
import { postulacionesActions } from "../../../store/postulaciones-slice"
import { useDispatch } from "react-redux"
import GenericBadge from "../Badge/GenericBadge"

const pageSize = 10

const TablaPostulantes = (props) => {

    const selectedRows = useSelector(state => state.postulaciones.selectedRows) || []
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()

    // state with redux
    const postulaciones = useSelector(state => state.postulaciones.listadoPostulantes) || []
    const dispatch = useDispatch()

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return postulaciones?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const toggleRowSelection = (postulanteId) => {
        if (selectedRows.includes(postulanteId)) {
            dispatch(postulacionesActions.cargarSelectedRows(selectedRows.filter((id) => id !== postulanteId)));
        } else {
            dispatch(postulacionesActions.cargarSelectedRows(([...selectedRows, postulanteId])));
        }
    }

    const handleSeleccion = () => {
        if(selectedRows.length === 0) {
            Swal.fire({
                text: '¡No puede seleccionar postulantes sin marcar ninguno!',
                title: 'Error al seleccionar postulantes',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }

        Swal.fire({
            title: '¿Deseas convertir en evaluadores a los postulantes seleccionados?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await seleccionarPostulantes()
                if(success) Swal.fire({
                    title: '¡Postulantes seleccionados!',
                    text: 'Se enviará un email a los postulantes confirmando su selección como evaluadores',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        dispatch(postulacionesActions.actualizarPostulaciones(selectedRows))
                        dispatch(postulacionesActions.cargarSelectedRows([]))
                        navigate(0)
                    }
                })
            }
        })
    }

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/seleccionarPostulantes'}})
    }
    
    const seleccionarPostulantes = async () => {
        try {
            const response = await axiosPrivate.post(`/evaluador/seleccionar`,
                JSON.stringify({postulaciones: selectedRows}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
                
            )

            if(response.status === 200) return true

        } catch (err) {
            let msg = ''
            console.log(JSON.stringify(err.response.data))
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'El postulante ya tiene el rol de evaluador.'
            } else if(err.response?.status === 401) {
                msg = 'No existe la postulación, el docente asociado a la postulación o el usuario.'
            } else {
                msg = `Falló selección de postulantes <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la selección de postulantes',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }

    return (
        <>
            <table className="table">

                <thead className="table__header">
                    {!props.resize ?
                    
                    <tr>
                        {props.headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Acciones</th>
                        <th scope="col" className="table-header__head">Seleccionar</th>
                    </tr>

                    :

                    <tr>
                        <th scope="col" className="table-header__head">Nombre</th>
                        <th scope="col" className="table-header__head">Acciones</th>
                        <th scope="col" className="table-header__head">Seleccionar</th>
                    </tr>
                    
                
                }
                </thead>

                <tbody className="table__body">
                    {postulaciones && currentTableData.map((postulacion, index) => {
                        const isChecked = selectedRows.includes(postulacion._id);
                        return (
                            !props.resize ? 
                            <tr key={postulacion._id} className="table-body-row">
                                {props.headers.map(header => {
                                    if(header.name === 'Categorías'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {postulacion.categorias.slice(0, 3).map( (c) => (
                                                    <Badge key={c._id} type={c} />
                                                ))
                                                }
                                                {
                                                    postulacion.categorias.length > 3 ? <GenericBadge text="Más..."/> : ""
                                                }   
                                            </td>
                                        )
                                    } 
                                    if(header.name === 'Niveles'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {postulacion?.niveles?.length > 0 ? postulacion.niveles.slice(0, 3).map((n) => (
                                                    <Badge key={n._id} type={n} />
                                                ))
                                                :
                                                <GenericBadge text="Investigador"/>
                                                }
                                                {
                                                    postulacion.niveles.length > 3 ? <GenericBadge text="Más..."/> : ""
                                                }    
                                            </td>
                                        )
                                    }
                                    else return (
                                    <td key={header.name} className="table-body-row__td" >{postulacion[`${header?.value}`]}</td>
                                )})}
                                <td className="table-body-row__td">
                                    <ImageLink linkto={`${props.viewPath}/${postulacion._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                </td>
                                <td className="table-body-row__td">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleRowSelection(postulacion._id)}
                                    />
                                </td>   
                            </ tr>

                            :

                            <tr key={postulacion._id} className="table-body-row">

                                <td key={props.headers[0].name} className="table-body-row__td" >{postulacion[`${props.headers[0]?.value}`] + " " + postulacion[`${props.headers[1]?.value}`]}</td>

                                <td className="table-body-row__td">
                                    <ImageLink linkto={`${props.viewPath}/${postulacion._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                </td>
                                <td className="table-body-row__td">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleRowSelection(postulacion._id)}
                                    />
                                </td>   
                            </ tr>
                        )
                        
                    }
                    )}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalCount={postulaciones?.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />


                
                <div className="button-container">

                    <Button 
                        text='Volver' 
                        onClickHandler={handleVolver}
                    />
                    <Button 
                        text='Seleccionar' 
                        onClickHandler={handleSeleccion}
                        activo={true}
                    />
                </div>

        </>
    )

}

export default TablaPostulantes