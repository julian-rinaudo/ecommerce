/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './AddUpdateInventory.css'
import axios from 'axios'


const AddUpdateInventory = ({inputController, setInputController}) => {

    let initialState = {
        description: "",
        color: "",
        style: "",
        price: "",
        stock: "",
        size: "",
        image:""
    }
    const [valueForm, setvalueForm] = useState(initialState)
    const url = 'https://newbackend2.herokuapp.com/register';

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            if(inputController === "add"){
                await axios.post(url, valueForm)
                .then(el => {
                    setTimeout(() => {
                        setInputController(false)
                    }, 1000);
                })
            }else{
                await axios.put(url, valueForm)
                .then(el => {
                    setTimeout(() => {
                        setInputController(false)
                    }, 1000);
                })
            }
        } catch (res) {
            alert(res)
        }
    }

    const actualizarDatos = (e) => {
        setvalueForm({
            ...valueForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if(inputController !== "add") setvalueForm(inputController)
    },[])

    return (
        <div className="input-C-Usuario-Padre" onClick={()=> setInputController(false)}>
            <form className="input-C-Usuario-Contenedor"
                onClick={e => { e.stopPropagation() }}
                onSubmit={formSubmit}
            >
                <div className="titulo-Sesion">
                    <h1 className='crear-Cuenta-Home'>{inputController === 'add' ? "Agregar Producto" : "Editar Producto"}</h1>
                    <button
                        className="btn-C-Usuario-X"
                        onClick={()=> setInputController(false)}
                    >x</button>
                </div>
                <section className="crear-C-Inputs">
                    <div className="inputs-C-Sesion">
                        <label htmlFor="color">
                            <p style={{ margin: "0", color: "#495057" }}>Color:</p>
                            <input
                                type="text"
                                name="color"
                                className="input-C-name"
                                onChange={actualizarDatos}
                                value={valueForm.color}
                                required
                            />
                        </label>
                        <label htmlFor="style">
                            <p style={{ margin: "0", color: "#495057" }}>Estilo:</p>
                            <input
                                type="text"
                                name="style"
                                className="input-C-email"
                                onChange={actualizarDatos}
                                value={valueForm.style}
                                required
                            />
                        </label>
                        <label htmlFor="price">
                            <p className='input-tel' style={{ margin: "0", color: "#495057" }}>Precio:</p>
                            <input
                                type="text"
                                name="price"
                                className="input-C-tel"
                                onChange={actualizarDatos}
                                value={valueForm.price}
                                pattern="[0-9]"
                                title="No puede contener letras"
                                required
                            />
                        </label>
                    </div>
                    <div className="inputs-C-Sesion">
                        <label htmlFor="stock">
                            <p style={{ margin: "0", color: "#495057" }}>Cantidad:</p>
                            <input
                                type="text"
                                name="stock"
                                className="input-C-surname"
                                onChange={actualizarDatos}
                                value={valueForm.stock}
                                pattern="[0-9]"
                                title="No puede contener letras"
                                required
                            />
                        </label>
                        <label htmlFor="size">
                            <p style={{ margin: "0", color: "#495057" }}>Talla:</p>
                            <input
                                type="text"
                                name="size"
                                className="input-C-password"
                                onChange={actualizarDatos}
                                value={valueForm.size}
                                required
                            />
                        </label>
                        <label htmlFor="image">
                            <p style={{ margin: "0", color: "#495057" }}>Imagen</p>
                            <input
                                type="text"
                                name="image"
                                className="input-cp"
                                onChange={actualizarDatos}
                                value={valueForm.image}
                                required
                            />
                        </label>
                    </div>
                </section>
                <button type="submit" className="crear-Usuario">{inputController === 'add' ? "Agregar" : "Actualizar"}</button>
            </form>
        </div>
    )
}

export default AddUpdateInventory