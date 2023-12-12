// components
import Card  from "../../components/Card/Card"
import Button from "../../components/Button/Button"
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import DevolucionForm from "../../components/Evaluacion/DevolucionForm"

// hooks
import { useState } from "react"
import { useParams } from "react-router"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"


const Devolucion = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const [devolucion, setDevolucion] = useState(null)

    const { data, isLoading, status } = useAxiosFetch(`/devoluciones/${id}`, axiosPrivate)


    return(
        !isLoading ?
        <Card title={data?.titulo ?? 'Oops'}>
            <div className="devolucion__selector">
                {data?.devoluciones?.evaluacion &&
                    <div 
                        className={devolucion === data.devoluciones.evaluacion  ? `devolucion__selector-button devolucion__selector-button--activo` : `devolucion__selector-button`} 
                        key={1}
                        onClick={() => setDevolucion(data.devoluciones.evaluacion)}
                    >
                        <p>Evaluación Regional</p>
                    </div>
                }
                {data?.devoluciones?.exposicion &&
                    <div 
                        className={devolucion === data?.devoluciones?.exposicion   ? `devolucion__selector-button devolucion__selector-button--activo` : `devolucion__selector-button`} 
                        key={2}
                        onClick={() => setDevolucion(data.devoluciones.exposicion)}
                    >
                        <p>Exposición Regional</p>
                    </div>
                }
                {data?.devoluciones?.exposicion_provincial &&
                    <div 
                        className={devolucion === data?.devoluciones?.exposicion_provincial ? `devolucion__selector-button devolucion__selector-button--activo` : `devolucion__selector-button`} 
                        key={3}
                        onClick={() => setDevolucion(data.devoluciones.exposicion_provincial)}
                    >
                        <p>Exposición Provincial</p>
                    </div>
                }
            </div>
                {
                    status > 399 ?
                    <BlankState msg={'No hemos podido encontrar su proyecto.'} />
                    :
                    !data.devoluciones ?
                    <BlankState msg={'Su proyecto aún no ha sido evaluado.'} />
                    :
                    !devolucion ?
                    <BlankState msg={'Debe seleccionar una instancia de evaluación.'} />
                    :
                        <DevolucionForm rubricas={devolucion} />
                    
                }
        </Card>
        :
        <Spinner/>
        
    )

}

export default Devolucion