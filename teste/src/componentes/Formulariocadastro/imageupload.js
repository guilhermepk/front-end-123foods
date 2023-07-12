import React, { useState } from 'react';

const Imageupload = () => {
  const [file, setfile] = useState(null);

  const handlefileUpload = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer();
  };

  const sendDataToServer = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/users/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imagem:
        <input
          type="file"
          accept="file/*"
          name='file'
          onChange={handlefileUpload}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Imageupload;