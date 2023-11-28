export const emailValidator = (email) => {
    if (!email) {
      return "Tenés que ingresar un email";
    } else if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i).test(email)) { // eslint-disable-line
      return "El email que ingresaste no es válido";
    }
    return "";
};
  
export const passwordValidator = (password) => {
    if (!password) {
        return "Tenés que ingresar una contraseña";
    } else if (password.length < 7 || password.length > 20 ) {
      return "La contraseña tiene que tener entre 8 y 20 caracteres"
    } else if (!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/).test(password)) { // eslint-disable-line
      return "La contraseña tiene que tener al menos una letra mayúscula, una minúscula y un numero"
    }
    return "";
};

export const confirmPasswordValidator = (password, confirmPassword) => {
  if (!confirmPassword) {
      return "Tenés que ingresar nuevamente tu contraseña";
  } else if (confirmPassword !== password) {
    return "Las contraseñas deben ser iguales"
  } 
  return "";
};

export const nameValidator = (name) => {
  if (!name) {
    return "Tenés que ingresar un nombre";
  } else if (name.length > 30) {
    return "El nombre debe tener 30 caracteres como máximo"
  } else if (/[0-9]/.test(name)) {
    return "El nombre no puede tener números"
  }
  return "";
};

export const lastnameValidator = (lastname) => {
  if (!lastname) {
    return "Tenés que ingresar un apellido";
  } else if (lastname.length > 30) {
    return "El apellido tiene que tener 30 caracteres como máximo"
  } else if (/[0-9]/.test(lastname)) {
    return "El apellido no puede tener números"
  }
  return "";
};

export const cuilValidator = (cuil) => {
  const notFormattedCuil = cuil.replace(/\D/g, '');
  if (!cuil) {
    return "Tenés que ingresar un CUIL";
  } else if (notFormattedCuil.length > 11 || notFormattedCuil.length < 10) {
    return "El CUIL que ingresaste no es válido"
  } else if (!/^[0-9]+$/.test(notFormattedCuil)) {
    return "El CUIL no puede tener letras"
  }
  return "";
};

export const dniValidator = (dni) => {
  if (!dni) {
    return "Tenés que ingresar un DNI";
  } else if (dni.length > 8 || dni.length < 7) {
    return "El DNI que ingresaste no es válido"
  } else if (!/^[0-9]+$/.test(dni)) {
    return "El DNI no puede tener letras"
  }
  return "";
};

export const cueValidator = (cue) => {
  if (!cue) {
    return "Tenés que ingresar un CUE válido";
  } else if (cue.length !== 7) {
    return "El CUE que ingresaste no es válido"
  } else if (!/^[0-9]+$/.test(cue)) {
    return "El CUE no puede tener letras"
  }
  return "";
};

export const positionValidator = (position) => {
  if (!position) {
    return "Tenés que ingresar un cargo";
  } else if (position.length > 30) {
    return "El cargo tiene que tener menos de 30 caracteres"
  } else if (/[0-9]/.test(position)) {
    return "El cargo no puede tener números"
  }
  return "";
};

export const phoneNumberValidator = (phoneNumber) => {
  if (!phoneNumber) {
    return "Tenés que ingresar un número de teléfono";
  } else if (phoneNumber.length > 15 || phoneNumber.length < 7) {
    return "El número de teléfono que ingresaste no es válido"
  } else if (!/^[0-9]+$/.test(phoneNumber)) {
    return "El número de teléfono no puede tener letras"
  }
  return "";
};

export const titleValidator = (title) => {
  if (!title) {
    return "Debe ingresar un titulo para el proyecto";
  } else if (title.length > 30) {
    return "El titulo no puede contener mas de 30 caracteres"
  }
  return "";
};

export const descriptionValidator = (description) => {
  if (!description) {
    return "Debe ingresar una descripción";
  } else if (description.length > 500) {
    return "La descripción debe ser inferior a 500 caracteres"
  }
  return "";
};

export const schoolNameValidator = (schoolName) => {
  if (!schoolName) {
    return "Debe ingresar el nombre de la escuela";
  } else if (schoolName.length > 30) {
    return "El nombre de la escuela no puede contener mas de 30 caracteres"
  }
  return "";
};

export const categoryValidator = (category) => {
  if (category === '' || category === '0') {
    return "Debe ingresar una categoría";
  } 
  return "";
};

export const levelValidator = (level) => {
  if (level === '' || level === '0') {
    return "Debe ingresar una nivel";
  } 
  return "";
};

export const schoolTypeValidator = (schoolType) => {
  if (schoolType === '' || schoolType === '2') {
    return "Debe ingresar pública o privada";
  } 
  return "";
};

export const urlValidator = (url) => {
  if (!url) {
    return "Tenés que ingresar un enlace al video presentación del proyecto";
  } else if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url)) { // eslint-disable-line
    return "El enlace que ingresaste no es válido"
  } 
  return "";
};

export const fileValidator = (file, msg, format) => {
  let formato = '*'
  if(format === 'PDF') formato = 'application/pdf'
  else if(format === 'imágen') formato = 'image/'
  else if(format === 'xlsx') formato = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  if (!file) {
    return "Tenés que subir " + msg; 
  } else if (!file.type?.startsWith(formato)){
    return "El archivo se debe subir en formato " + format 
  }
  else if (file.size > 10240000) { // 10 MB
    return "El tamaño del archivo debe ser menor a 10 MB"
  }
  return "";
};

export const sedeValidator = (sede) => {
  if (sede === '' || sede === '0') {
    return "Tenés que ingresar una sede";
  } 
  return "";
};

export const groupValidator = (group) => {
  if (!group || group.length < 1) {
    return "El grupo tiene que estar formado por al menos 1 integrante";
  } 
  return "";
};

export const nombreFeriaValidator = (nombreFeria) => {
  if (!nombreFeria) {
    return "El nombre de la feria debe estar definido";
  } else if (nombreFeria.length > 100) {
    return "El nombre de la feria no puede contener mas de 100 caracteres"
  }
  return "";
};

export const dateValidator = (fechaAnterior, fechaPosterior, fechaFinal='') => {
  const fecha = new Date()
  const fechaActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
  if (!fechaPosterior || !fechaAnterior || fechaAnterior.fecha === '' || fechaPosterior.fecha === '') {
    return "Debe ingresar una fecha";
  } else if (fechaActual > fechaPosterior.fecha) {
    return `La fecha ${fechaPosterior.nombre} debe ser posterior a la fecha actual `
  } else if (fechaAnterior.fecha > fechaPosterior.fecha) {
    return `La fecha ${fechaPosterior.nombre} debe ser posterior a la fecha ${fechaAnterior.nombre} `
  } else if (fechaFinal !== '' & fechaPosterior.fecha > fechaFinal.fecha ) {
    return `La fecha ${fechaPosterior.nombre} debe ser anterior a la fecha ${fechaFinal.nombre} `
  }
  return "";
};

export const criterioValidator = (nombreCriterio) => {
  if (!nombreCriterio) {
    return "El nombre del criterio debe estar definido";
  }
  return "";
};

export const rubricaValidator = (nombreRubrica) => {
  if (!nombreRubrica) {
    return "El nombre de la rúbrica debe estar definido";
  }
  return "";
};


export const ponderacionValidator = (ponderacion) => {
  if (!ponderacion) {
    return "Se debe ingresar una ponderación";
  } else if(parseInt(ponderacion) > 1 || parseInt(ponderacion) < 0) {
    return "La ponderación debe estar entre 0 y 1"
  }
  return "";
};

export const nombreCategoriaValidator = (nombreCategoria) => {
  if (!nombreCategoria) {
    return "Se debe ingresar un nombre para la categoría";
  } else if (nombreCategoria.length > 150) {
    return "El nombre de la categoría no puede contener mas de 150 caracteres"
  }
  return "";
};

export const abreviaturaValidator = (abreviatura) => {
  if (!abreviatura) {
    return "Se debe ingresar una abreviatura para la categoría";
  } else if (abreviatura.length > 12) {
    return "La abreviatura no puede contener mas de 12 caracteres"
  }
  return "";
};

export const colorValidator = (color) => {
  if (!color) {
    return "Se debe ingresar un color para la categoría";
  }
  return "";
};