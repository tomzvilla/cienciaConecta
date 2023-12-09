// components
import Badge from "../Badge/Badge"
import Pagination from "../Pagination/Pagination"
import ImageButton from "../ImageButton/ImageButton"
import Button from "../Button/Button"
import BlankState from "../BlankState/BlankState"
import Spinner from "../Spinner/Spinner"
// hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import Swal from "sweetalert2"
import { promocionesActions } from "../../../store/promocion-slice"

const pageSize = 10

const TablaPromoverProyectos = (props) => {

    let proyectos = useSelector(state => state.promociones.listadoProyectos)
    if(props.categoria && proyectos.length > 0) {
        if(props.categoria !== '0')
            proyectos = proyectos.filter(p => p.categoria._id === props.categoria)
    }
    const loadingProyectos = useSelector(state => state.promociones.loadingProyectos)
    const selectedRows = useSelector(state => state.promociones.selectedRows)
    const cupos = useSelector(state => state.promociones.cupos)
    const [resize, setResize] = useState(window.innerWidth <= 1200);

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return proyectos?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const toggleRowSelection = (proyectoId) => {
        if(selectedRows.includes(proyectoId)) {
            dispatch(promocionesActions.toggleSelectedRow(proyectoId))
        }
        else {
            if(checkAvailability()) {
                const msg = !props.nacional ? '¡Los cupos para esta sede y este nivel están llenos!' : '¡Los cupos para este nivel están llenos!'
                Swal.fire({
                    text: msg,
                    title: 'Error al seleccionar proyectos',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
                return
            } else {
                dispatch(promocionesActions.toggleSelectedRow(proyectoId))
            }
        }
    }

    const checkAvailability = () => {
        const cuposNivelRestantes = (cupos.cuposNivel - cupos.promovidosNivel)
        const cuposSedeRestantes = (cupos?.cuposSede - cupos?.promovidosSede)
        if(!props.nacional) {
            return (selectedRows.length === cuposNivelRestantes || selectedRows.length === cuposSedeRestantes)
        } else {
            return (selectedRows.length === cuposNivelRestantes)
        }
       
    }

    const checkLength = async () => {
        if(selectedRows.length === 0) {
            await Swal.fire({
                text: '¡Al promover sin proyectos seleccionados, se eliminarán todas las promociones para este nivel y sede!',
                title: 'Atención',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }

    }

    const handlePromocion = async () => {

        await checkLength()

        Swal.fire({
            title: '¿Deseas promover los proyectos seleccionados?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await promoverProyectos()
                if(success) Swal.fire({
                    title: 'Proyectos promovidos!',
                    text: 'Se enviará un email a los responsables de proyecto informando que su proyecto pasó de instancia.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        // dispatch(promocionesActions.cargarProyectos({}))
                        navigate(0)
                    }
                })
            }
        })
    }

    const handleVolver = () => {
        const from = location?.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
    }
    
    const promoverProyectos = async () => {
        const endpoint = props.nacional ? '/promocion/nacional' : '/promocion/provincial'
        const body = {
            proyectos: selectedRows,
            nivel: props.nivel,
        }
        if(props.sede) body.sede = props.sede
        try {
            const response = await axiosPrivate.post(`${endpoint}`,
                JSON.stringify(body),
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
            } else if(err.response?.status === 400) {
                msg = 'Hubo un error en los datos ingresados, intente nuevamente.'
            } else if(err.response?.status === 401) {
                msg = 'No es posible promover los proyectos debido a restricciones de cupo en esta instancia.'
            } else {
                msg = `Falló selección de proyectos promovidos <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la selección de proyectos promovidos',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }

    const verEvaluacion = (proyecto) => {
        dispatch(promocionesActions.setPuntaje(proyecto.puntajeFinal))
        navigate(`/evaluacion/${proyecto._id}`, {replace: true, state: {from:`${location.pathname}`}})
    }

    const handleResize = () => {
        setResize(window.innerWidth <= 1200);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);




    return (
        <>
            {
                loadingProyectos ?
                <Spinner />
                :
                proyectos.length > 0 ?
                <>
                    <div className="promover-proyectos__cupos">
                        <h6>Cupos Disponibles: </h6>
                        <p>Para la sede: {cupos.cuposSede ? (cupos.cuposSede - cupos.promovidosSede) : 0}/{cupos.cuposSede ?? 0}</p>
                        <p>Para el nivel: {cupos.cuposSede ?  (cupos.cuposNivel - cupos.promovidosNivel) : 0}/{cupos.cuposNivel ?? 0}</p>
                    </div>
                    <table className="table">
                        <thead className="table__header">

                        {!resize ? 
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
                                <th scope="col" key={props.headers[0].value} className="table-header__head">{props.headers[0].name}</th>
                                <th scope="col" className="table-header__head">Acciones</th>
                                <th scope="col" className="table-header__head">Seleccionar</th>
                            </tr>
                        }
                        </thead>

                        <tbody className="table__body">
                            {proyectos && currentTableData.map((proyecto) => {
                                const isChecked = selectedRows.includes(proyecto._id)
                                return (
                                    !resize ? 
                                    <tr key={proyecto._id} className="table-body-row">
                                        {props.headers.map(header => {
                                            if(header.name === 'Categoría'){
                                                return (
                                                    <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                        <Badge key={proyecto.categoria._id} type={proyecto.categoria} />
                                                    </td>
                                                )
                                            } 
                                            if(header.name === 'Nivel'){
                                                return (
                                                    <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                        <Badge key={proyecto.nivel._id} type={proyecto.nivel} />
                                                    </td>
                                                )
                                            }
                                            else return (
                                            <td key={header.name} className="table-body-row__td" >{proyecto[`${header?.value}`]}</td>
                                        )})}
                                        <td className="table-body-row__td table-body-row__td--actions">
                                            <ImageButton callback={() => verEvaluacion(proyecto)} linkto={`${props.viewPath}/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                        </td>
                                        <td className="table-body-row__td">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleRowSelection(proyecto._id)}
                                            />
                                        </td>   
                                    </ tr>

                                    :

                                    <tr key={proyecto._id} className="table-body-row">
                                        <td key={props.headers[0].name} className="table-body-row__td" >{proyecto[props.headers[0].value]}</td>
                                        <td className="table-body-row__td table-body-row__td--actions">
                                            <ImageButton callback={() => verEvaluacion(proyecto)} linkto={`${props.viewPath}/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                        </td>
                                        <td className="table-body-row__td">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleRowSelection(proyecto._id)}
                                            />
                                        </td>   
                                    </ tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                :
                <BlankState msg={'No se encontraron proyectos con esos filtros'}/>
            }

            <Pagination currentPage={currentPage} totalCount={proyectos?.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
                <div className="button-container">
                    <Button 
                        text='Volver' 
                        onClickHandler={handleVolver}
                    />
                    <Button 
                        text='Promover' 
                        onClickHandler={handlePromocion}
                        activo={true}
                    />
                </div>

        </>
    )


}

export default TablaPromoverProyectos