// components
import InputField from "../InputField/InputField"

const InstanciasFeriaForm = (props) => {
    const {handleChange, onBlurField, formValues, errors} = props
    return (
        <>
            <h2>Instancias</h2>
            <h3>Instancia Escolar</h3>
            <div className='edit-project-form__input edit-project-form__input--first'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioInstanciaEscolar'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioInstanciaEscolar}
                    errors={errors.fechaInicioInstanciaEscolar}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinInstanciaEscolar'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinInstanciaEscolar}
                    errors={errors.fechaFinInstanciaEscolar}
                    required={true}
                />
            </div>
            <h3>Instancia Regional</h3>
            <h4> Evaluacion de los Proyectos</h4>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioEvaluacionRegional'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionRegional}
                    errors={errors.fechaInicioEvaluacionRegional}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionRegional'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionRegional}
                    errors={errors.fechaFinEvaluacionRegional}
                    required={true}
                />
            </div>
            <h4> Exposición de los Proyectos</h4>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioExposicionRegional'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioExposicionRegional}
                    errors={errors.fechaInicioExposicionRegional}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinExposicionRegional'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinExposicionRegional}
                    errors={errors.fechaFinExposicionRegional}
                    required={true}
                />
            </div>
            <h3> Instancia Provincial</h3>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioEvaluacionProvincial'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionProvincial}
                    errors={errors.fechaInicioEvaluacionProvincial}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionProvincial'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionProvincial}
                    errors={errors.fechaFinEvaluacionProvincial}
                    required={true}
                />
            </div>
        </>
    )
}

export default InstanciasFeriaForm