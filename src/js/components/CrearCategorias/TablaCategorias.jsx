// Components
import Badge from "../Badge/Badge"
import ImageButton from "../ImageButton/ImageButton"
// hooks
import { useSelector, useDispatch } from "react-redux"
import { categoriasActions } from "../../../store/categorias-slice"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import Swal from "sweetalert2"

const TablaCategorias = (props) => {

    const axiosPrivate = useAxiosPrivate()
    // state with redux
    const categorias = useSelector(state => state.categorias.categorias)
    const dispatch = useDispatch()

    const handleBorrar = (idCategoria) => {
        Swal.fire({
            title: '¿Deseas borrar la categoría?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Borrar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await borrarCategoria(idCategoria)
                if(success) {
                    dispatch(categoriasActions.borrarCategoria(idCategoria))
                    Swal.fire({
                        title: ' ¡Categoría Borrada!',
                        text: 'Borraste una categoría con éxito',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    })
                }
            }
        })
    }

    const borrarCategoria = async (idCategoria) => {
        try {
            const res = await axiosPrivate.delete(`/categoria/${idCategoria}`)
            return res.status === 200

        } catch(err) {
            let msg = ''
            console.log(JSON.stringify(err?.response?.data))
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 404) {
                msg = 'No se ha encontrado ninguna categoría con el ID ingresado'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló la eliminación de la categoría <br> ${err.response?.data?.message}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la eliminación de la categoría',
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
                    <tr>
                        {props.headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {categorias && categorias.map((categoria) => {
                        return (
                            <tr key={categoria._id} className="table-body-row">
                                {props.headers.map(header => {
                                    if(header.name === 'Categoría') {
                                        return (
                                            <td key={header.name} className="table-body-row__td">
                                                {categoria.nombre}
                                            </td>
                                        )
                                    } 
                                    if(header.name === 'Badge'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                <Badge key={categoria._id} type={categoria} />  
                                            </td>
                                        )
                                    }
                                    else return (
                                        <td key={header.name} className="table-body-row__td" >{categoria[`${header?.value}`]}</td>
                                    )
                                })}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageButton small={true} src={require("../../../assets/x.png")} callback={() => handleBorrar(categoria._id)} text="Borrar"/>
                                </td>
                            </ tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )


}

export default TablaCategorias