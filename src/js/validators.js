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
  if (!cuil) {
    return "Tenés que ingresar un CUIL";
  } else if (cuil.length > 11 || cuil.length < 10) {
    return "El CUIL que ingresaste no es válido"
  } else if (!/^[0-9]+$/.test(cuil)) {
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
    return "Debe ingresar una descripción para el proyecto";
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

export const fileValidator = (file, form, msg) => {
  if (!file) {
    return "Tenés que subir " + msg; 
  } else if (file.type !== 'application/pdf'){
    return "El archivo se debe subir en PDF"
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



