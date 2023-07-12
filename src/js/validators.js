export const emailValidator = (email) => {
    if (!email) {
      return "Debe ingresar un email";
    } else if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i).test(email)) {
      return "Debe ingresar un email válido";
    }
    return "";
};
  
export const passwordValidator = (password) => {
    if (!password) {
        return "Debe ingresar una contraseña";
    }
    return "";
};
  