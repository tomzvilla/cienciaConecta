

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

    const evaluadorMapping = (evaluadoresData) => {
        if(!evaluadoresData) return
        const evaluadores = evaluadoresData.map(e => {
            const categoriasCompletas = e.categorias.map((categoriaId) => {
                const categoria = categorias.find((c) => c._id === categoriaId);
                return categoria ? categoria : undefined;
            });
            const nivelesCompletos = e.niveles.map((nivelId) => {
                const nivel = niveles.find((n) => n._id === nivelId);
                return nivel ? nivel : undefined;
            });
            return {
                ...e,
                categorias: categoriasCompletas,
                niveles: nivelesCompletos,
                asignado: false,
            }
        })

        return evaluadores
    }
    
    return { niveles, categorias, proyectosMapping, proyectoMap, evaluadorMapping }

}

export default useCategoriasNiveles