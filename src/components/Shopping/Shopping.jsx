import React,{useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import { getShoppingApi } from '../../state/ShoppingStore';
import Card from '../Home/Body_Home/Card';

let arrClon = [] // arreglo clon del estado "products"
let precioContext = 0 // controlador del precio total del carrito
let controller = false // controlador de ejecucion del useEffect que ejecuta una peticion a la api 

const Shopping = () => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([]) // Estado incial del componente shopping
    const [contadorProductos, setcontadorProductos] = useState(0) // Cantidad de productos en el carrito
    const [precioFinal, setprecioFinal] = useState(0) // Precio total del carrito

    const montoTotal = (array) => { // Actualiza el monto total del carrito
        array.map(product=> {
            let precioSuma = precioContext += (product.precio * product.cantidad) 
            setprecioFinal(precioSuma)
        })
    }

    useEffect(() => {
        // getShoppingApi es una funcion del componente de redux.
        dispatch(getShoppingApi()).then(productos=> {
            setProducts(productos.payload) // actualiza el estado de products con la respuesta a la api
            setcontadorProductos(productos.payload.length)
            if(!controller) { // controller evita que se duplique el monto total del carrito haciendo 2 peticiones api
                controller = true
                return montoTotal(productos.payload)
            }
        })
    }, [])

    const eliminarProducto = (el, cantidad) => { // Elimina un producto del carrito

        let cantidadProduct = cantidad || 1,
            precio = el.precio,
            precioTotal = precioFinal,
            id = el.id,
            precioResultado = cantidadProduct * precio // Multiplica por la cantidad de productos para generar un precio total
        precioTotal -= precioResultado // resta el precio total del proucto eliminado del precio total del carrito

        let newData = products.filter((el) => { // filtra el arr del carrito y lo devuelve sin el producto a eliminar
            setcontadorProductos(contadorProductos - 1) // resta en 1 la cantidad de productos del carrito
            return el.id !== id
        });

        const si = arrClon.filter(el=>{ // elimina el elemento  del Arreglo Pricipal Clon "arrClon"
            return el.disenio !== id
        })

        arrClon = si // devuelve el dato filtrado y lo setea en arrClon

        setprecioFinal(precioTotal) // Actualiza el precio total
        setProducts(newData)
    }  

    const eliminarUnidad = (el) => { // Elimina una unidad de un producto del carrito
        let precioCarrito = precioFinal
        let precioProducto = precioCarrito -= el.precio
        setprecioFinal(precioProducto) // devuelve el precioFinal con el valor de la unidad restada
    }

    const añadirUnidad = (el) => { // Agrega una unidad de un producto del carrito
        let precioCarrito = precioFinal
        let precioProducto = precioCarrito += el.precio
        setprecioFinal(precioProducto) // devuelve el precioFinal con el valor de la unidad añadida
    }
    
  return (
    <div>
        <div className="flex justify-between items-center px-12" style={{width:"90%", margin:"0 auto"}}>
        <h1>{`cantidad de productos: ${contadorProductos}`}</h1>
        <h1>{`Monto total: ${precioFinal}`}</h1>
        </div>
        <div className="Container-Grid-Body-F">{
        products.length>0
        ? products.map((el,index)=> <Card 
            el={el}
            key={index}
            eliminarUnidad={eliminarUnidad} 
            añadirUnidad={añadirUnidad} 
            eliminarProducto={eliminarProducto}/>)
        : <h1>Spinner</h1>
        }
    </div>
    </div>
  )
}

export default Shopping