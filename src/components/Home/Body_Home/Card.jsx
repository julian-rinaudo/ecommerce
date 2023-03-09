import React from "react";
import './Card.css'

const Card = ({ el }) => {
  return (
    <>
      <div id="Card-Grid" className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={el.imagen} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{el.color}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {el.tamanio}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {el.disenio}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {el.precio}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
