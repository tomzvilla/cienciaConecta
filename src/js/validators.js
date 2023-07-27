export const emailValidator = (email) => {
    if (!email) {
      return "Debe ingresar un email";
    } else if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i).test(email)) { // eslint-disable-line
      return "Debe ingresar un email válido";
    }
    return "";
};
  
export const passwordValidator = (password) => {
    if (!password) {
        return "Debe ingresar una contraseña";
    } else if (password.length < 7 || password.length > 20 ) {
      return "La contraseña debe tener entre 8 y 20 caracteres"
    } else if (!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/).test(password)) { // eslint-disable-line
      return "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero"
    }
    return "";
};

export const nameValidator = (name) => {
  if (!name) {
    return "Debe ingresar un nombre";
  } else if (name.length > 30) {
    return "El nombre debe tener 30 caracteres como maximo"
  } else if (/[0-9]/.test(name)) {
    return "El nombre no puede contener expresiones numericas"
  }
  return "";
};

export const lastnameValidator = (lastname) => {
  if (!lastname) {
    return "Debe ingresar un apellido";
  } else if (lastname.length > 30) {
    return "El apellido debe tener 30 caracteres como maximo"
  } else if (/[0-9]/.test(lastname)) {
    return "El apellido no puede contener expresiones numericas"
  }
  return "";
};

export const cuilValidator = (cuil) => {
  if (!cuil) {
    return "Debe ingresar un cuil";
  } else if (cuil.length > 11 || cuil.length < 10) {
    return "El cuil ingresado no es valido"
  } else if (!/^[0-9]+$/.test(cuil)) {
    return "El cuil no puede contener letras"
  }
  return "";
};

export const dniValidator = (dni) => {
  if (!dni) {
    return "Debe ingresar un dni";
  } else if (dni.length > 8 || dni.length < 7) {
    return "El dni ingresado no es valido"
  } else if (!/^[0-9]+$/.test(dni)) {
    return "El dni no puede contener letras"
  }
  return "";
};

export const cueValidator = (cue) => {
  if (!cue) {
    return "Debe ingresar un cue valido";
  } else if (cue.length !== 7) {
    return "El cue ingresado no es valido"
  } else if (!/^[0-9]+$/.test(cue)) {
    return "El cue no puede contener letras"
  }
  return "";
};

export const positionValidator = (position) => {
  if (!position) {
    return "Debe ingresar un cargo";
  } else if (position.length > 30) {
    return "El cargo ingresado debe tener menos de 30 caracteres"
  } else if (/[0-9]/.test(position)) {
    return "El cargo no puede contener expresiones numericas"
  }
  return "";
};

export const phoneNumberValidator = (phoneNumber) => {
  if (!phoneNumber) {
    return "Debe ingresar un numero de telefono";
  } else if (phoneNumber.length > 15 || phoneNumber.length < 7) {
    return "El numero de telefono ingresado no es valido"
  } else if (!/^[0-9]+$/.test(phoneNumber)) {
    return "El numero de telefono no puede contener letras"
  }
  return "";
};


