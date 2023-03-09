import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FakeData } from './FakeData'
import Card from './Card'
import { Link } from 'react-router-dom'
import './Body.css'

const Body = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
        const dataFunction=async()=>{
            const getDataPromise = await FakeData
            setData(getDataPromise)
        }

        dataFunction()
    },[])

  return (
    <div className="Container-Grid-Body-F">{
        data.length>0
        ? data.map((el,index)=> <Link key={index} to={`/${el.color}/${el.disenio}`}><Card key={index} el={el}/></Link>)
        : <h1>Spinner</h1>
        }
    </div>
  )
}

export default Body