import React,{useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getShoppingApi } from '../../store/shopping/ShoppingStore';
import Card from '../Home/Body_Home/Card';

let arrC = []
let precioContext = 0
let controller = false

const Shopping = () => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const [contadorProductos, setcontadorProductos] = useState(0) // Cantidad de productos en el carrito
    const [precioFinal, setprecioFinal] = useState(0) // Precio total del carrito

    const precioTotal = (array) => { // Actualiza el precio final del carrito
        array.map(product=> {
            let precioSuma = precioContext += (product.precio * product.cantidad) 
            setprecioFinal(precioSuma)
        })
    }

    useEffect(() => {
        dispatch(getShoppingApi()).then(el=> {
            setProducts(el.payload)
            setcontadorProductos(el.payload.length)
            if(!controller) {
                controller = true
                return precioTotal(el.payload)
            }
        })
    }, [])

    const eliminarPedido = (el) => { // Elimina un producto del carrito

        let cantidad = el.cantidad || 1,
            precio = el.precio,
            precioTotal = precioFinal,
            id = el.id,
            precioResultado = cantidad * precio // Multiplica por la cantidad de productos para generar un precio total
        precioTotal -= precioResultado // resta el precio total del proucto eliminado del precio total del carrito

        let newData = products.filter((el) => { // filtra el arr del carrito y lo devuelve sin el producto a eliminar
            setcontadorProductos(contadorProductos - 1) // resta en 1 la cantidad de productos del carrito
            return el.id !== id
        });

        const si = arrC.filter(el=>{ // elimina el elemento  del Arreglo Pricipal Clon "arrC"
            return el.disenio !== id
        })

        arrC = si // devuelve el dato filtrado y lo setea en arrC

        setprecioFinal(precioTotal) // Actualiza el precio total
        setProducts(newData)
    }  

    const eliminarUnidad = (el) => { // Elimina una unidad de un producto del carrito
        for (let index = 0; index < products.length; index++) {
            if (products[index].id === el.id) { // Recorre cada elemento del arreglo Principal
                const { cantidad } = products[index]
                console.log(products[index].cantidad, cantidad)
            }
        }
        let precioCarrito = precioFinal
        let precioProducto = precioCarrito -= el.precio
        setprecioFinal(precioProducto) // devuelve el precioFinal con el valor de la unidad restada
    }

    const añadirUnidad = (el) => { // Agrega una unidad de un producto del carrito
        for (let index = 0; index < products.length; index++) {
            if (products[index].id === el.id) { // Recorre cada elemento del arreglo Principal
                const { cantidad } = products[index]
                console.log(products[index].cantidad, cantidad)
            }
        }
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
            eliminarPedido={eliminarPedido}/>)
        : <h1>Spinner</h1>
        }
    </div>
    </div>
  )
}

export default Shopping