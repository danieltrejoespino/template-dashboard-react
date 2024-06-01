// import React from 'react'

export const ImageRender = (props) => {
  const handleClick = () => {
    alert(`Imagen de ${props.value} clickeada!`);
  };
  return (
    <img
      src={`http://172.20.1.79/fotos/Fotos/${props.value}.jpg`}
      alt="Foto"
      style={{ width: "50px", height: "50px", borderRadius: "10px" }}
      onClick={handleClick}
      className="imagenRedondeada"
      // border-radius: 10px
    />
  );
};
