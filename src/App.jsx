import { useEffect } from "react";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import FlagMexico from './assets/Flag_of_Mexico.svg';
import './App.css'

function App() {
  const [inputType, setInputType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleInputType = (type) => {
    if(type.match( /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/) ) {
      setInputType('email');
    } else if(type.match(/^\d{4}$/)) {
      setInputType('phone');
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleInputType(value);
  }


  return (
    <div>
      <div className="input-group">
      {
        inputType === 'email' ?
            <input type="email" value={inputValue} onChange={handleChange} autoFocus id="email" name="email"
            onBlur={(e) => {
              const value = e.target.value;
              const valueMatch = value.match( /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
              if(!valueMatch) {
                setMessage('Correo inválido');
              } else {
                setMessage('');
              }
            }}
            />
           :
          <>
            <img src={FlagMexico} alt="Flag of Mexico" style={{
              width: '30px',
              marginLeft: '10px',
            }} />
            <IMaskInput
            mask={'+{52} (00) 0000 00 00'}
            value={inputValue}
            autoFocus
            onBlur={((e) => {
              const value = e.target.value;
              const clearValue = value.replace(/\D/g, '').slice(2);
              if(clearValue.length !== 10) {
                setMessage('Número de teléfono incompleto');
              } else  {
                setMessage('');
              }
            })}
            onAccept={(value) => {
              const clearValue = value.replace(/\D/g, '');
              const numberPhone = clearValue.slice(2);
              if(numberPhone.length === 10) {
                setInputValue(value);
              } else if(value.length === 0) {
                setInputValue('');
                setInputType('email');
              }

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
          cursor: !message && inputValue ? 'pointer' : 'not-allowed',
          marginTop: '10px',
          opacity: !message && inputValue ? 1 : .5,
        }}
        disabled={message || !inputValue}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;