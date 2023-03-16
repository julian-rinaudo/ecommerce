import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./HistoryStore.css";
import CardHistoryStore from "./CardHistoryStore";
import { useParams } from "react-router";

const HistoryStore = () => {
  
  const [history, setHistory] = useState([]);
  const {id} = useParams()

  useEffect(() => {
      axios.get(`/api/cart/history/${id}`).then(res=>setHistory(res.data))
    return () => {};
  }, []);

  return (
    <div>
      <span className="Header-History-Component">
        <h1>Estado</h1>
        <h1>Total</h1>
        <h1>Fecha</h1>
      </span>
      {
        history.length > 0 
            ? (history.map((el, index) => <CardHistoryStore el={el} key={index} />)) 
            : (<h1>Spinner</h1>)
      }
    </div>
  );
};

export default HistoryStore;
