import { useEffect } from "react";
import { useState } from "react";
import { IMask, IMaskInput, IMaskMixin } from "react-imask";
import FlagMexico from './assets/Flag_of_Mexico.svg';
import { useFormik } from 'formik';
import './App.css'

import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Correo requerido'),
  phone: Yup.string().matches(/^\d{10}$/, 'Número de teléfono inválido').required('Número de teléfono requerido'),
});

function App() {
  const [inputType, setInputType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const {handleBlur, handleSubmit, handleChange, values, errors, isValid} = useFormik({
    initialValues: {
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleInputType = (type) => {
    if(type.match( /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/) ) {
      setInputType('email');
    } else if(type.match(/^\d{4}$/)) {
      values.phone = type
      setInputType('phone');
    }
  }

  const handleChangeV2 = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleInputType(value);
  }


  

  useEffect(() => {
    console.log(errors, values);
  }, [errors, values]);



  return (
    <div>
      <div className="input-group">
      {
        inputType === 'email' ?
            <input type="email" value={values.email} onChange={(e) => {
              handleChangeV2(e);
              handleChange(e);

            }} autoFocus id="email" name="email"
            onBlur={handleBlur}

            // onBlur={(e) => {
            //   const value = e.target.value;
            //   const valueMatch = value.match( /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
            //   if(!valueMatch) {
            //     setMessage('Correo inválido');
            //   } else {
            //     setMessage('');
            //   }
            // }}
            />
           :
          <>
            <img src={FlagMexico} alt="Flag of Mexico" style={{
              width: '30px',
              marginLeft: '10px',
            }} />
            <IMaskInput
            mask={'+{52} (00) 0000 00 00'}
            value={values.phone}
            id="phone"
            name="phone"
            autoFocus
            // onBlur={((e) => {
            //   const value = e.target.value;
            //   const clearValue = value.replace(/\D/g, '').slice(2);
            //   if(clearValue.length !== 10) {
            //     setMessage('Número de teléfono incompleto');
            //   } else  {
            //     setMessage('');
            //   }
            // })}
            onBlur={handleBlur}
            onAccept={(value) => {
              const clearValue = value.replace(/\D/g, '');
              const numberPhone = clearValue.slice(2);
              // if(numberPhone.length === 10) {
              //   setInputValue(value);
              // } else if(value.length === 0) {
              //   setInputValue('');
              //   setInputType('email');
              // }
              values.email = '';

              handleChange({
                target: {
                  name: 'phone',
                  value: numberPhone,
                }
              });

            }}
          />
          </>
      }
      </div>

      {message && <p>{message}</p>}

      <button
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: errors.email || errors.phone ? 'not-allowed' : 'pointer',
          marginTop: '10px',
          opacity: (errors.email || errors.phone) || values.email.length === 0 && values.phone.length === 0 ? 0.5 : 1
        }}
        disabled={errors.email || errors.phone}
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;