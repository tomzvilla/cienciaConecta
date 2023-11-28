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

    const verEvaluacion = (event) => {
        switch (event) {
            case 'evaluacion': {
                setDevolucion(data.devoluciones.evaluacion)
                break
            }
            case 'exposicion': {
                setDevolucion(data.devoluciones.exposicion)
                break
            }
            case 'exposicionProvincial': {
                setDevolucion(data.devoluciones.exposicionProvincial)
                break
            }
            default:
                setDevolucion(null)
                break
        }
        
    }

    return(
        !isLoading ?
        <Card title={data?.titulo ?? 'Oops'}>
            <div className="evaluacion-card__button-container">
                {data?.devoluciones?.evaluacion &&
                    <Button 
                        text='Evaluación Regional' 
                        onClickHandler={() => verEvaluacion('evaluacion')}
                        activo={true}
                    />
                }
                {data?.devoluciones?.exposicion &&
                    <Button 
                        text='Exposición Regional' 
                        onClickHandler={() => verEvaluacion('exposicion')}
                        activo={true}
                    />
                }
                {data?.devoluciones?.exposicionProvincial &&
                    <Button 
                        text='Exposición Provincial' 
                        onClickHandler={() => verEvaluacion('exposicionProvincial')}
                        activo={true}
                    />
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