// components
import InputField from "../InputField/InputField"
import Spinner from "../Spinner/Spinner"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
const SedeProvincialForm = (props) => {

    const { setFormValues, formValues } = props
    const axiosPrivate = useAxiosPrivate()


    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { niveles } = useCategoriasNiveles({ categoriaData: null, nivelData: nivelesData, enabled: !loadingNiveles })

    const handleChangeCupos = (e) => {
        e.preventDefault()
        let {name, value} = e.target
        if(parseInt(value) <= 0) value = Math.abs(value)
        const prevCupos = [...formValues.cuposProvincial]
        const existingIndex = prevCupos.findIndex(c1 => c1.nivel === name);
        if (existingIndex !== -1) {
            prevCupos[existingIndex].cantidad = Math.abs(value);
        } else {
            prevCupos.push({
                nivel: name,
                cantidad: Math.abs(value)
            });
        }
        setFormValues({
            ...formValues,
            cuposProvincial: prevCupos
        })
    }


    return (
            loadingNiveles ?
            <Spinner />
            :
            (<div className="cupos-modal">   
                <h2 className='sedes-feria-form__title'>Cupos Provinciales: </h2>
                {niveles && niveles.map((nivel) =>
                    nivel._id !== 0 ? (
                        <div key={nivel._id} className="cupos-modal__nivel"> 
                            <InputField
                                key={nivel._id}
                                label={nivel.nombre} 
                                name={nivel._id} 
                                type='number'
                                onChange={handleChangeCupos}
                                onBlur={() => {}}
                                value={
                                    formValues.cuposProvincial.find(cupo => cupo.nivel === nivel._id)?.cantidad || ""
                                }
                                errors={null}
                                required={true}
                            />
                        </div>
                    ) : ""
                )}
            </div>)

    )    
}

export default SedeProvincialForm
