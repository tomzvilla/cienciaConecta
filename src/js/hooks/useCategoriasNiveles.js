

const useCategoriasNiveles = ({ categoriaData, nivelData, enabled }) => {

    let categorias = []
    let niveles = []

    if(enabled) {
        // mapear categorias
        categorias.push({_id: 0, nombre: ""})
        categorias = [...categorias, ...categoriaData.categoria]

        // mapear niveles

        niveles.push({_id: 0, nombre: "", codigo: '0'})
        niveles = [...niveles, ...nivelData.nivel].sort((level1, level2) => {
            if (level1.codigo < level2.codigo) {
            return -1; 
            } else if (level1.codigo > level2.codigo) {
            return 1;
            }
            return 0;
        });
    }

    const proyectosMapping = (proyectosData) => {
        const proyectos = proyectosData.map(p => {
            const categoria = categorias.find(c => c._id === p.categoria)
            const nivel = niveles.find(n => n._id === p.nivel)
            return {
                ...p,
                categoria,
                nivel,
            }
        })
        return proyectos

    }

    const proyectoMap = (proyectoData) => {
        
        const categoria = categorias.find(c => c._id === proyectoData.proyecto.categoria)
        const nivel = niveles.find(n => n._id === proyectoData.proyecto.nivel)
        const proyecto =  {
            ...proyectoData.proyecto,
            categoria,
            nivel,
        }
        return proyecto

    }
    
    return { niveles, categorias, proyectosMapping, proyectoMap }

}

export default useCategoriasNiveles