// components
import SelectField from "../SelectField/SelectField"

const notFiltros = ['cantidadEvaluadores', 'cantidadProyectosFeria']
const notFerias = ['cantidadProyectosFeria']
const notGraficos = ['cantidadProyectosFeria', 'cantidadEvaluadores']

const FiltroReportes = (props) => {
    return (        
        <>
            <div className="promover-proyectos">
                <div className="promover-proyectos__input">
                    <SelectField
                        label='Reporte: ' 
                        name='reporteSeleccionado'
                        dataValues={props.reportes}
                        onChange={props.handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>
                {!notFiltros.includes(props.reporteSeleccionado) ?
                    <div className="promover-proyectos__input">
                        <SelectField
                            label='Filtro: ' 
                            name='filtroSeleccionado'
                            dataValues={props.filtros}
                            onChange={props.handleChange}
                            value={props.searchState.filtroSeleccionado}
                            onBlur={() => {}}
                            errors={null}
                            required={true}
                        />
                    </div>
                : 
                null
                }
                {!notFerias.includes(props.reporteSeleccionado) ?
                    <div className="promover-proyectos__input">
                        <SelectField
                            label='Feria: ' 
                            name='feriaSeleccionada'
                            dataValues={props.ferias}
                            value={props.searchState.feriaSeleccionada}
                            onChange={props.handleChange}
                            onBlur={() => {}}
                            errors={null}
                            required={true}
                        />
                    </div>
                : 
                null
                }
                {!notGraficos.includes(props.reporteSeleccionado) && props.searchState.filtroSeleccionado !== "departamento" ?
                    <div className="promover-proyectos__input">
                        <SelectField
                            label='Grafico: ' 
                            name='graficoSeleccionado'
                            dataValues={props.graficos}
                            value={props.searchState.graficoSeleccionado}
                            onChange={props.handleChange}
                            onBlur={() => {}}
                            errors={null}
                            required={true}
                        />
                    </div>
                : 
                null
                }
            </div>
        </>
    )


}

export default FiltroReportes