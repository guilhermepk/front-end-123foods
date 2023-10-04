import React, { useState } from 'react';

function Categorymodal({ onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCategoryName('');
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = () => {
    fetch(`${process.env.REACT_APP_HOST}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        onCategoryAdded(data);
        closeModal();
      })
      .catch((error) => {
        console.error('Erro ao criar a categoria:', error);
      });
  };

  return (
    <div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5 className="modal-title">Adicionar Categoria</h5>
              <button type="button" className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="categoryName">Nome da Categoria</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Fechar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorymodal;
