import React, { useState } from 'react';

function Measurementmodal({ isOpen, onClose, onMeasurementAdded }) {
  const [measurementName, setMeasurementName] = useState('');

  const handleMeasurementNameChange = (e) => {
    setMeasurementName(e.target.value);
  };

  const handleAddMeasurement = () => {
    fetch(`${process.env.REACT_APP_HOST}/unitsofmeasurement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: measurementName }),
    })
      .then((response) => response.json())
      .then((data) => {
        onMeasurementAdded(data);
        setMeasurementName('');
        onClose();
      })
      .catch((error) => {
        console.error('Erro ao criar a unidade de medida:', error);
      });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Adicionar Unidade de Medida</h5>
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="measurementName">Nome da Unidade de Medida</label>
            <input
              type="text"
              className="form-control"
              id="measurementName"
              value={measurementName}
              onChange={handleMeasurementNameChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
          <button type="button" className="btn btn-primary" onClick={handleAddMeasurement}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Measurementmodal;
