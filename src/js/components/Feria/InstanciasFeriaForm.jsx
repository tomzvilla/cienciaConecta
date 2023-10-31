// components
import InputField from "../InputField/InputField"
import GrupoFechas from "./GrupoFechas"

const InstanciasFeriaForm = (props) => {
    const {handleDateChange, onBlurField, formValues, errors, disabled = {}} = props


    return (
        <div className="instancias-feria-form">
            <h2 className="instancias-feria-form__title">Instancias</h2>
            
            <GrupoFechas title={"Instancia Escolar"} 
            date1={<InputField
                label='Fecha de inicio: ' 
                name='fechaInicioInstanciaEscolar'
                type='date'
                onChange={handleDateChange}
                onBlur={onBlurField}
                value={formValues.fechaInicioInstanciaEscolar.split("T")[0]}
                errors={errors.fechaInicioInstanciaEscolar}
                required={true}
                disabled={disabled ? disabled.fechaInicioInstanciaEscolar : false}
            />}

            date2={<InputField
                label='Fecha de fin: ' 
                name='fechaFinInstanciaEscolar'
                type='date'
                onChange={handleDateChange}
                onBlur={onBlurField}
                value={formValues.fechaFinInstanciaEscolar.split("T")[0]}
                errors={errors.fechaFinInstanciaEscolar}
                required={true}
                disabled={disabled ? disabled.fechaFinInstanciaEscolar : false}
            />}
            />

            
            <GrupoFechas 
                title="Instancia Regional"
                sub1="Evaluación de los Proyectos"
                sub2="Exposición de los Proyectos"

                date1={<InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioEvaluacionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionRegional.split("T")[0]}
                    errors={errors.fechaInicioEvaluacionRegional}
                    required={true}
                    disabled={disabled ? disabled.fechaInicioEvaluacionRegional : false}
                />}
                date2={<InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionRegional.split("T")[0]}
                    errors={errors.fechaFinEvaluacionRegional}
                    required={true}
                    disabled={disabled ? disabled.fechaFinEvaluacionRegional : false}
                />}
                date3={<InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioExposicionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioExposicionRegional.split("T")[0]}
                    errors={errors.fechaInicioExposicionRegional}
                    required={true}
                    disabled={disabled ? disabled.fechaInicioExposicionRegional : false}
                />}
                date4={<InputField
                    label='Fecha de fin: ' 
                    name='fechaFinExposicionRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinExposicionRegional.split("T")[0]}
                    errors={errors.fechaFinExposicionRegional}
                    required={true}
                    disabled={disabled ? disabled.fechaFinExposicionRegional : false}
                />}
            />


            <GrupoFechas 
                title="Instancia Provincial"
                date1={<InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioEvaluacionProvincial'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioEvaluacionProvincial.split("T")[0]}
                    errors={errors.fechaInicioEvaluacionProvincial}
                    required={true}
                    disabled={disabled ? disabled.fechaInicioEvaluacionProvincial : false}
                />}
                date2={<InputField
                    label='Fecha de fin: ' 
                    name='fechaFinEvaluacionProvincial'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinEvaluacionProvincial.split("T")[0]}
                    errors={errors.fechaFinEvaluacionProvincial}
                    required={true}
                    disabled={disabled ? disabled.fechaFinEvaluacionProvincial : false}
                />}
            />

            <GrupoFechas 
                title="Promoción de Proyectos"
                date1={<InputField
                    label='Fecha promoción a provincial: ' 
                    name='fechaPromocionInstanciaRegional'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaPromocionInstanciaRegional.split("T")[0]}
                    errors={errors.fechaPromocionInstanciaRegional}
                    required={true}
                    disabled={disabled ? disabled.fechaPromocionInstanciaRegional : false}
                />}
                date2={<InputField
                    label='Fecha promoción a nacional: ' 
                    name='fechaPromocionInstanciaProvincial'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaPromocionInstanciaProvincial.split("T")[0]}
                    errors={errors.fechaPromocionInstanciaProvincial}
                    required={true}
                    disabled={disabled ? disabled.fechaPromocionInstanciaProvincial : false}
                />}
            />

            <GrupoFechas 
                title="Postulación de Evaluadores"
                date1={<InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioPostulacionEvaluadores'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioPostulacionEvaluadores.split("T")[0]}
                    errors={errors.fechaInicioPostulacionEvaluadores}
                    required={true}
                    disabled={disabled ? disabled.fechaInicioPostulacionEvaluadores : false}
                />}
                date2={<InputField
                    label='Fecha de fin: ' 
                    name='fechaFinPostulacionEvaluadores'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinPostulacionEvaluadores.split("T")[0]}
                    errors={errors.fechaFinPostulacionEvaluadores}
                    required={true}
                    disabled={disabled ? disabled.fechaFinPostulacionEvaluadores : false}
                />}
            />

            <GrupoFechas 
                title="Asignación de Proyectos"
                date1={<InputField
                    label='Fecha de inicio: ' 
                    name='fechaInicioAsignacionProyectos'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioAsignacionProyectos.split("T")[0]}
                    errors={errors.fechaInicioAsignacionProyectos}
                    required={true}
                    disabled={disabled ? disabled.fechaInicioAsignacionProyectos : false}
                />}
                date2={<InputField
                    label='Fecha de fin: ' 
                    name='fechaFinAsignacionProyectos'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinAsignacionProyectos.split("T")[0]}
                    errors={errors.fechaFinAsignacionProyectos}
                    required={true}
                    disabled={disabled ? disabled.fechaFinAsignacionProyectos : false}
                />}
            />
        </div>
    )
}

export default InstanciasFeriaForm