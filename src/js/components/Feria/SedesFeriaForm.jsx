// components
import SelectField from "../SelectField/SelectField"
import DataList from "../DataList/DataList"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const SedesFeriaForm = (props) => {
    const {handleChange, onBlurField, formValues, errors} = props
    const axiosPrivate = useAxiosPrivate()

    const { data: dptoData } = useAxiosFetch('/departamento', axiosPrivate)
    
    let departamentos = [{_id: '', nombre: ''}]
    let localidades = [{_id: '', nombre: ''}]
    let establecimientos = [{_id: '', nombre: ''}]

    if(dptoData) {
        const sigDepartamentos = dptoData.departamentos.map((dpto) => {
           return { 
            _id: dpto,
            nombre: dpto,
        }
        }).sort((dpto1, dpto2) => {
            if (dpto1.nombre < dpto2.nombre) {
              return -1; 
            } else if (dpto1.nombre > dpto2.nombre) {
              return 1;
            }
            return 0;
          });
        departamentos = departamentos.concat(sigDepartamentos)
    }

    const { data: localData } = useAxiosFetch(`/localidad/${formValues.departamento}`, axiosPrivate)
    if(localData) {
        const sigLocalidades = localData.localidades.map((localidad) => {
            return { 
            _id: localidad,
            nombre: localidad 
        }
        }).sort((local1, local2) => {
            if (local1.nombre < local2.nombre) {
              return -1; 
            } else if (local1.nombre > local2.nombre) {
              return 1;
            }
            return 0;
          });
        localidades = localidades.concat(sigLocalidades)
    }

    const { data: establecimientosData } = useAxiosFetch(`/establecimiento/${formValues.localidad}`, axiosPrivate)
    if(establecimientosData){
        establecimientos = establecimientos.concat(establecimientosData.establecimientos)
        console.log(establecimientos)
    }

    return (
        <>
            <h2>Datos de la Sede</h2>
            <div className='edit-project-form__input'>
                <SelectField
                    label='Deparamento: ' 
                    name='departamento'
                    dataValues={departamentos}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.departamento}
                    errors={errors.departamento}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <SelectField
                    label='Localidad: ' 
                    name='localidad'
                    dataValues={localidades}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.localidad}
                    errors={errors.localidad}
                    required={true}
                    disabled={!formValues.departamento}
                />
            </div>
            <div className='edit-project-form__input'>
                <DataList
                    label='Establecimiento: ' 
                    name='establecimiento'
                    dataValues={establecimientos}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.establecimiento}
                    errors={errors.establecimiento}
                    required={true}
                    disabled={!formValues.localidad}
                />
            </div> 
        </>
    )
}

export default SedesFeriaForm