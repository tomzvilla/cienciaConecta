const Button = (props) => {

  // Si se pasa el parametro activo como true, se cambiara el estilo de boton a activo
  let modifier = props.activo ? "--activo" : "";
  if(props.borrar) modifier = "--borrar";
  return (
    <button className={`button button${modifier}`} onClick={props.onClickHandler}>
        <img className={`button__img button__img${modifier}`} src={props.image} alt="" />
        <div className={`button__text button__text${modifier}`}>{props.text}</div>
        
    </button>
  )
}

export default Button;
