// components
import Button from "../Button/Button"
import InputField from "../InputField/InputField"
import Card from "../Card/Card"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
const SedeProvincialForm = (props) => {

    const {handleChange, setFormValues, formValues} = props
    const axiosPrivate = useAxiosPrivate()

    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { niveles } = useCategoriasNiveles({ categoriaData: null, nivelData: nivelesData, enabled: !loadingNiveles })


    const confirmarCupo = (cupos) => {
        const prevCupos = [...formValues.cuposProvincial]

        for (const cupo of cupos) {
            const existingIndex = prevCupos.findIndex(c1 => c1.nivel === cupo.nivel);
            
            if (existingIndex !== -1) {
              prevCupos[existingIndex].cantidad = cupo.cantidad;
            } else {
                prevCupos.push(cupo);
            }
        }
        setFormValues({
            ...formValues,
            cuposProvincial: prevCupos
        })
    }


    return (
        <Card title={'Cupos instancia'}>
            <div className="cupos-modal">
            {niveles && niveles.map((nivel) => 
                nivel._id !== 0 ? (
                    <div key={nivel._id} className="cupos-modal__nivel"> 
                        <InputField
                            key={nivel._id}
                            label={nivel.nombre} 
                            name={nivel._id} 
                            type='number'
                            onChange={handleChange}
                            onBlur={() => {}}
                            value={
                                formValues.cuposProvincial.length === 0 ? 0 : formValues.cuposProvincial[nivel._id]
                            }
                            errors={null}
                            required={true}
                        />
                    </div>
                ) : ""
            )}
            <div className="cupos-modal__button">
                <Button 
                    text={'Confirmar'} 
                    onClickHandler={confirmarCupo} activo={true}
                />
            </div>
            </div>
        </Card>

    )    
}

export default SedeProvincialForm
