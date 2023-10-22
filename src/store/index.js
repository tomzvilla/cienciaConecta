import { configureStore } from "@reduxjs/toolkit";

//slices

import postulacionesSlice from "./postulaciones-slice";
import evaluacionSlice from "./evaluacion-slice";
import pendientesSlice from "./pendiente-slice";
import uiSlice from "./ui-slice";
import referentesSlice from "./referentes-slice";
import loginSlice from "./login-slice";
import feriaSlice from "./feria-slice";
import instanciasSlice from './instancias-slice'
import perfilSlice from "./perfil-slice";
import promocionesSlice from "./promocion-slice";
import categoriasSlice from "./categorias-slice";

const store = configureStore({
    reducer: { 
        postulaciones: postulacionesSlice.reducer, 
        evaluacion: evaluacionSlice.reducer, 
        ui: uiSlice.reducer, 
        referentes: referentesSlice.reducer,
        pendientes: pendientesSlice.reducer,
        login: loginSlice.reducer,
        feria: feriaSlice.reducer,
        instancias: instanciasSlice.reducer,
        perfil: perfilSlice.reducer,
        promociones: promocionesSlice.reducer,
        categorias: categoriasSlice.reducer,
    }
})

export default store