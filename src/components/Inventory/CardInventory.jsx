import React from 'react'
import './CardInventory.css'

const CardInventory = ({el, eliminarProducto, editarProducto}) => {  

  return (
    <div className="Container-Product-Inventory">
        <h1>{el.id}</h1>
        <h1>{el.color}</h1>
        <h1>{el.style}</h1>
        <h1>{el.price}</h1>
        <h1>{el.stock}</h1>
        <h1>{el.size}</h1>
        <div className="Container-Buttons-Inventory">
            <button
                onClick={()=>editarProducto(el)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
            <button
                onClick={()=>eliminarProducto(el)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Elminar</button>
        </div>
    </div>
  )
}

export default CardInventory