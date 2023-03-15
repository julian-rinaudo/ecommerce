import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getInventoryApi } from '../../state/InventoryStore'
import AddUpdateInventory from './AddUpdateInventory'
import CardInventory from './CardInventory'
import './Inventory.css'

const Inventory = () => {

    const dispatch = useDispatch()
    const [inventoryState, setInventoryState] = useState([])
    const [inputController, setInputController] = useState(false)

    useEffect(() => {
      
        dispatch(getInventoryApi())
        .then(product => setInventoryState(product.payload))
    
      return () => {
        
      }
    }, [])

    const eliminarProducto =(el)=>{

        let id = el.id
         
        let newData = inventoryState.filter((el) => { 
            return el.id !== id
        });
    
        // const si = arrClon.filter(el=>{ // elimina el elemento  del Arreglo Pricipal Clon "arrClon"
        //     return el.disenio !== id
        // })
    
        // arrClon = si // devuelve el dato filtrado y lo setea en arrClon
        setInventoryState(newData)
    }
    
    const editarProducto = (el) => {
        setInputController(el)
    }
    
  return (
    <div>
        <span className="Container-Inventory-Table">
            <h1>Id</h1>
            <h1>Color</h1>
            <h1>Style</h1>
            <h1>Price</h1>
            <h1>Stock</h1>
            <h1>Size</h1>
        </span>
        <button style={{marginLeft:"5%"}} className="add-To-Inventory" onClick={()=>setInputController("add")}>Agregar al inventario</button>
        <span>
            {
                inventoryState.length>0
                ? inventoryState.map((el,index) => <div key={index}>
                    <CardInventory el={el} eliminarProducto={eliminarProducto} editarProducto={editarProducto}/>
                    </div>
                    )
                : <h1>Spinner</h1>
            }
        </span>

        {
            inputController&&<AddUpdateInventory inputController={inputController} setInputController={setInputController}/>
        }
    </div>
  )
}

export default Inventory