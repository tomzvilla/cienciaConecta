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



