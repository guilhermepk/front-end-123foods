const SendImage = () => {
    return (
        <label>
        Imagens:
        <div>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          {formValues.images.length > 0 ? (
            <div>
              {formValues.images.map((image) => (
                <img key={image.name} src={URL.createObjectURL(image)} alt="Imagem selecionada" />
              ))}
            </div>
          ) : (
            <p>Arraste e solte as imagens aqui ou clique para selecionar</p>
          )}
        </div>
      </label>
      );
}

export default SendImage