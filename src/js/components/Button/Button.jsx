const Button = (props) => {
  return (
    <button className='button' onClick={props.onClickHandler}>
        <img className="button_img" src={props.image} alt="" />
        <div className='button__text'>{props.text}</div>
        
    </button>
  )
}

export default Button;
