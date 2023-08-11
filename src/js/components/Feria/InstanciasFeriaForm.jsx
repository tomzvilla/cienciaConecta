// components
import InputField from "../InputField/InputField"

const InstanciasFeriaForm = (props) => {
    const {handleDateChange, onBlurField, formValues, errors} = props

    return (
        <>
            <h2>Instancias</h2>
            <h3>Instancia Escolar</h3>
            <div className='edit-project-form__input edit-project-form__input--first'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioInstanciaEscolar'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioInstanciaEscolar.split("T")[0]}
                    errors={errors.fechaInicioInstanciaEscolar}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinInstanciaEscolar'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinInstanciaEscolar.split("T")[0]}
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
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionRegional.split("T")[0]}
                    errors={errors.fechaInicioEvaluacionRegional}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionRegional.split("T")[0]}
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
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioExposicionRegional.split("T")[0]}
                    errors={errors.fechaInicioExposicionRegional}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinExposicionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinExposicionRegional.split("T")[0]}
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
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionProvincial.split("T")[0]}
                    errors={errors.fechaInicioEvaluacionProvincial}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionProvincial'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionProvincial.split("T")[0]}
                    errors={errors.fechaFinEvaluacionProvincial}
                    required={true}
                />
            </div>
            <h3> Postulacion de Evaluadores </h3>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioPostulacionEvaluadores'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioPostulacionEvaluadores.split("T")[0]}
                    errors={errors.fechaInicioPostulacionEvaluadores}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinPostulacionEvaluadores'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinPostulacionEvaluadores.split("T")[0]}
                    errors={errors.fechaFinPostulacionEvaluadores}
                    required={true}
                />
            </div>
            <h3> Asignación de Proyectos </h3>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioAsignacionProyectos'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioAsignacionProyectos.split("T")[0]}
                    errors={errors.fechaInicioAsignacionProyectos}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha de fin: ' 
                    name='fechaFinAsignacionProyectos'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinAsignacionProyectos.split("T")[0]}
                    errors={errors.fechaFinAsignacionProyectos}
                    required={true}
                />
            </div>
        </>
    )
}

export default InstanciasFeriaForm