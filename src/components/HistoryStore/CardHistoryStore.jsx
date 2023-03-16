import React, {useState} from "react";

const initalState = {
  card: "Container-History-Component active",
  table: "Container-Table-Product-History active",
};

const CardHistoryStore = ({el}) => {

    const [state, setState] = useState(false);
    const [controller, setControlller] = useState(initalState);

    const controllerVision = () => {
        if (!state) {
          setControlller({
            ...controller,
            card: "Container-History-Component",
            table: "Container-Table-Product-History",
          });
          setState(!state);
        } else {
          setControlller({
            ...controller,
            card: "Container-History-Component active",
            table: "Container-Table-Product-History active",
          });
          setState(!state);
        }
      };

  return (
    <div className={controller.card} onClick={controllerVision}>
      <div className="Component-State-Total-Created">
        <h1>{el.state === "fulfilled" ? "Finalizado" : "Sin confirmar"}</h1>
        <h1>{el.totalCost}</h1>
        <h1>{el.createdAt.slice(0, 10)}</h1>
      </div>
      <div className={controller.table}>
        <span className="Table-Info-Product-History">
          <h1>Color</h1>
          <h1>Precio</h1>
          <h1>talla</h1>
          <h1>Estilo</h1>
          <h1>Cantidad</h1>
        </span>
        {el.item.map((item, index) => {
          const model = item.model;
          return (
            <span key={index} className="Info-Product-History">
              <h1>{model.color}</h1>
              <h1>{model.price}</h1>
              <h1>{model.size}</h1>
              <h1>{model.style}</h1>
              <h1>{item.quantity}</h1>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CardHistoryStore;
