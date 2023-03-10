import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FakeData } from './FakeData'
import Card from './Card'
import { Link } from 'react-router-dom'
import './Body.css'

const Body = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('/api/products')
        .then(res => setData(res.data))
    },[])
  return (
    <div className="Container-Grid-Body-F">{
        data.length>0
        ? data.map((product,i)=> <Link key={i} to={`/product/${product.id}`}><Card key={i} product={product}/></Link>)
        : <h1>Spinner</h1>
        }
    </div>
  )
}

export default Body