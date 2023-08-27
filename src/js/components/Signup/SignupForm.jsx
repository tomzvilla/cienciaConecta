// components
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

// Agregar on submit
const SignupForm = (props) => {

    return (
        props.personal ? 
        
        <form  className="signup-form">
          <div className='signup-form__input'>
            <InputField
                label='CUIL' 
                name='cuil'
                type='text'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.cuil}
                errors={props.errors.cuil}
                required={true}
            />
          </div>

          <div className='signup-form__input'>
            <InputField
                label='Apellido: ' 
                name='lastname'
                type='text'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.lastname}
                errors={props.errors.lastname}
                required={true}
            />
          </div>

          <div className='signup-form__input'>
            <InputField
                label='Nombre: ' 
                name='name'
                type='text'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.name}
                errors={props.errors.name}
                required={true}
            />     
          </div>

          <div className='signup-form__input'>
            <InputField
                label='Cargo' 
                name='position'
                type='text'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.position}
                errors={props.errors.position}
                required={true}
            />
          </div>
          
          
          
          
          
          
          
          <div className='signup-form__button-container'>
            <Button text='Avanzar' onClickHandler={props.handleAvanzar} activo={true}/>
          </div>
          
          </form>

          :
        
          <form className='signup-form'>
          <div className='signup-form__input'>
            <InputField
                label='Teléfono' 
                name='phoneNumber'
                type='number'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.phoneNumber}
                errors={props.errors.phoneNumber}
                required={true}
            />
          </div>

          <div className='signup-form__input'>
            <InputField
                label='Email' 
                name='email'
                type='email'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.email}
                errors={props.errors.email}
                required={true}
            />
          </div>

          <div className='signup-form__input'>
            <InputField 
                label='Contraseña: '
                name='password'
                type='password'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.password}
                errors={props.errors.password}
                required={true}
            />
          </div>

          <div className='signup-form__input'>
            <InputField 
                label='Repita la contraseña: '
                name='confirmPassword'
                type='password'
                onChange={props.handleChange}
                onBlur={props.onBlurField}
                value={props.formValues.confirmPassword}
                errors={props.errors.confirmPassword}
                required={true}
            />    
          </div>
        
          
          
          
          <div className='signup-form__button-container signup-form__button-container--double'>
            <Button text='Volver' onClickHandler={props.handleVolver} activo={false}/>
            <Button text='Avanzar' onClickHandler={props.handleAvanzar} activo={true}/>
          </div>
          
          </form>
    )
}

export default SignupForm;

