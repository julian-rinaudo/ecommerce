
import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ el, eliminarUnidad, añadirUnidad, eliminarProducto }) => {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (el.cantidad > 1) setCantidad(el.cantidad);
    return () => {};
  }, [el]);

  const agregar = (product) => {
    if (cantidad < 5) {
      setCantidad(cantidad + 1);
      añadirUnidad(product);
    }
  };

  const disminuir = (product) => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      eliminarUnidad(product);
    }
  };

  const eliminarProductF = () =>{
    eliminarProducto(el, cantidad)
  }


  return (
    <>
      <div
        id="Card-Grid"
        className="max-w-sm rounded overflow-hidden shadow-lg"
      >

        <img className="w-full" src={el.imagen} alt="Sunset in the mountains" />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {product.style.toUpperCase()}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {product.size}
          </span> */}
          <span className="inline-block bg-gray-200 rounded px-3 py-3 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
            {product.description}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            $ {product.price}
          </span>
        </div>
        {eliminarProducto && eliminarUnidad && añadirUnidad && (
          <div className="flex justify-between items-center px-6 pt-4 pb-12" style={{width:"80%"}}>
            <button
              onClick={() => disminuir(el)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">-</button>
            <span>{cantidad}</span>
            <button
              onClick={() => agregar(el)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</button>
            <button
              onClick={() => eliminarProductF()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Elminar</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
