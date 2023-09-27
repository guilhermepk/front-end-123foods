import './UseradressRegister.css';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';
import InputMask from 'react-input-mask';
import iziToast from 'izitoast';
const Addressregister=()=>{ 
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    
        const [userCEP, setUserCEP] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            sendDataToServer(formValues);
          };

          useEffect(() => {
            const storedToken = localStorage.getItem('payload');
            if (storedToken) {
                setToken(storedToken);
                const decodedToken = jwt_decode(storedToken);
                setDecodedToken(decodedToken);
            }
        }, []);
        
        const [formValues, setFormValues] = useState({
        city:'',
        street:'',
        state:'',
        cep:'',
        numberhouse:'',
        complement:'',
        district:'',
        userId:'',
        });

        

        const sendDataToServer = (data) => {
            const formData = new FormData();
            formData.append('city', data.city);
            formData.append('street', data.street);
            formData.append('state', data.state);
            formData.append('cep', data.cep);
            formData.append('numberhouse', data.numberhouse);
            formData.append('complement', data.complement);
            formData.append('district', data.district);
            formData.append('userId', data.userId);
            

            fetch(`${process.env.REACT_APP_HOST}/address`, {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
                
            });
        }
        const handleCEPChange = (e) => {
          const { value } = e.target;
          setFormValues({ ...formValues, cep: value });
        };
        const handleCEPBlur =async () => {
        const cep = formValues.cep.replace(/\D/g, '');
        if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            console.log(data);

            if (data.erro) {
            throw new Error('CEP inválido');
            }

            setFormValues((prevFormValues) => ({
            ...prevFormValues,
            state: data.uf,
            userId :decoded_token?.sub,
            city: data.localidade,
            street: data.logradouro,
            cep: data.cep,
            district:data.bairro,
            }));
        } catch (error) {
            console.error(error);
            iziToast.error({
            title: 'Erro',
            message: 'CEP inválido',
            });
        }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };


    return(
<div className='container-cadastro-endereco'>
  <h3 className='titulo-cadastro-endereco'> Cadastro de Endereço</h3>
  <form className='form-cadastro-endereco' onSubmit={handleSubmit}>
    <div className='cep-div'>
      <label className='label-endereco-cadastro'>
        CEP:
      </label>
      <InputMask
        mask="99999-999"
        type="text" className="input-campo cep"
        name="cep"
        value={formValues.cep}
        onChange={handleCEPChange}
        onBlur={handleCEPBlur}
      />
    </div>
    <div className='cidade-div'>
      <label className='label-endereco-cadastro'>
        Cidade:
      </label>
      <input className="input-campo cidade"
        type="text"
        name="city"
        value={formValues.city}
        onChange={handleChange}
        disabled
      /> 
    </div>
    <div className='rua-div'>
      <label className='label-endereco-cadastro'>
        Rua:
      </label>
      <input className="input-campo rua"
        type="text"
        name="street"
        value={formValues.street}
        onChange={handleChange}
      />    
    </div>
    <div className='numero-div'>
      <label className='label-endereco-cadastro'>
        Numero:
      </label>
      <input className="input-campo numero"
        type="text"
        name="numberhouse"
        value={formValues.numberhouse}
        onChange={handleChange}
      />
    </div>
    <div className='estado-div'>
      <label className='label-endereco-cadastro'>
        Estado:
      </label>
      <input className="input-campo estado"
        type="text"
        name="state"
        value={formValues.state}
        onChange={handleChange}
        disabled
      />
    </div>
    <div className='bairro-div'>
      <label className='label-endereco-cadastro'>
        Bairro:
      </label>
      <input className="input-campo bairro"
        type="text"
        name="district"
        value={formValues.district}
        onChange={handleChange}
      />
    </div>
    <div className='complemento-div'>
      <label className='label-endereco-cadastro'>
        Complemento:
      </label>
      <input className="input-campo complemento"
        type="text"
        name="complement"
        value={formValues.complement}
        onChange={handleChange}
      />
    </div>
        <button className="botao-cadastro-endereco" type="submit" >Cadastrar</button>
  </form>
</div>


    )
}
export default Addressregister;