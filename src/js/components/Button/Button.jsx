const Button = (props) => {

  // Si se pasa el parametro activo como true, se cambiara el estilo de boton a activo
  let modifier = props.activo ? "--activo" : "";
  if(props.borrar) modifier = "--borrar";

  // Si se pasa el parametro small como true, se cambiara el estilo de boton a tamaño pequeño
  let small = props.small ? "--small" : "";
  return (
    <button className={`button button${modifier} button${small}`} onClick={props.onClickHandler}>
        <img className={`button__img button__img${modifier} button__img${small}`} src={props.image} alt="" />
        <div className={`button__text button__text${modifier} button__text${small}`}>{props.text}</div>
        
    </button>
  )
}

export default Button;
