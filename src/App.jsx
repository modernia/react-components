import { useState } from "react";
import { IMaskInput } from "react-imask";
import FlagMexico from './assets/Flag_of_Mexico.svg';
import { useFormik } from 'formik';
import './App.css'

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone: Yup.string().when('email', {
    is: (email) => email?.length === 0,
    then:() => Yup.string().matches(/^\d{10}$/, 'Número de teléfono inválido').required('Número de teléfono requerido'),
    otherwise:() => Yup.string().matches(/^\d{10}$/, 'Número de teléfono inválido').optional(),
  }),
  email: Yup.string().when('phone', {
    is: (phone) => phone?.length === 0 || phone === undefined,
    then: (e) =>  Yup.string().email('Correo inválido').required('Correo o número de teléfono requerido'),
    otherwise: () => Yup.string().email('Correo inválido'),
  })
  
}, ['email', 'phone']);

function App() {
  const [inputType, setInputType] = useState('email');
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
      setInputType('phone');
      values.phone = type
    }
  }

  const handleChangeV2 = (e) => {
    const value = e.target.value;
    handleInputType(value);
  }


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
            onBlur={handleBlur}
            onAccept={(value) => {
              const clearValue = value.replace(/\D/g, '');
              const numberPhone = clearValue.slice(2);
              if(value.length === 0) {
                setInputType('email');
                values.phone = '';
              }
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

      {errors.email && <p>{errors.email}</p>}
      {errors.phone && <p>{errors.phone}</p>}

      <button className="p-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md mt-4"
        style={{
          opacity: (errors.email || errors.phone) || !isValid ? 0.5 : 1,
        }}
        type="submit"
        disabled={errors.email || errors.phone}
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;