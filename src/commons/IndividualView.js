import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import PopUp from "./PopUp";

function IndividualView() {
  const { style } = useParams();
  const userLoged = useSelector((state) => state.user);
  const [popUp, setPopUp] = useState(false)
  const [data, setData] = useState({});
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [sizesAvailable, setSizesAvailable] = useState([]);
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("M");
  const [url, setUrl] = useState("");
  useEffect(() => {
    axios(`/api/products/styles/${style}/${color}/${size}`).then((res) =>
      setData(res.data)
    );
  }, [style, color, size]);

  useEffect(() => {
    axios(`/api/products/colors/${style}`).then((res) => {
      setColorsAvailable(res.data);
    });
    axios(`/api/products/sizes/${style}`).then((res) => {
      setSizesAvailable(res.data);
    });
  }, [style]);

  const addColor = (color) => {
    setColor(color);
  };
  const addSize = (size) => {
    setSize(size);
  };
  const addUrl = (e) => {
    const url = e.target.value;
    setUrl(url);
  };

  const addToCart = () => {
    const { id } = userLoged;
    axios.post(`/api/cart/add/${id}`, {
      data,
      url,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white e">
      <PopUp
        style={style}
        state={popUp}
        setState={setPopUp}
        color={color}
        urlImg={url}
      />
      <div className="mx-auto max-w-7xl py-20 sm:px-6 sm:py-32 lg:px-6 ">
        <div className=" relative isolate bg-slate-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px- lg:pt-0">
          <div className="relative mt-16 mb-16">
            <img
              className="rounded-md w-full h-full"
              src={data.image}
              alt="Remera"
            />
          </div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
            <p className="font-semibold text-white mb-14">Reviews</p>
            <p className="text-3xl font-bold  text-white sm:text-4xl pb-6">
              {data?.style}
            </p>
            <h3 className="text-2xl font-semibold text-white ">
              $ {data?.price}
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              {data?.description}
            </p>
            <div>
              <p className="mt-6 text-lg font-semibold leading-10 text-white">
                Talles
              </p>
              <p className="text-sm font-semibold text-white pb-4">
                Stock disponible de {data?.color} talle {data?.size}:{" "}
                {data?.stock}
              </p>
              <div className="flex gap-4">
                {sizesAvailable.map((size,i) => (
                  <button key={i}
                    className="w-16 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-fuchsia-700"
                    onClick={() => addSize(size)}
                  >
                    <span className="text-center">{size}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center border-b py-2 mt-5">
                <input
                  className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Insert URL"
                  aria-label="Full name"
                  value={url}
                  onChange={addUrl}
                ></input>
              </div>
              <p className="text-lg font-semibold leading-10 text-white mt-5">
                Colores
              </p>
              <div className="flex gap-4">
                <div className="mt-2 flex justify-between gap-2">
                  {colorsAvailable.map((color, i) => (
                    <button key={i}
                      className={`w-8 h-8 rounded-full bg-${
                        color === "white" ? color : color + "-500"
                      } border-2 border-gray-200 focus:outline-none`}
                      onClick={() => addColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                href="#"
                className="rounded-md bg-fuchsia-500 px-3.5 py-2.5 mb-5 text-sm font-semibold text-white  shadow-sm hover:bg-fuchsia-700 "
                onClick={addToCart}
              >
                ADD TO CART
              </button>
              <button
                href="#"
                className="rounded-md bg-fuchsia-500 px-3.5 py-2.5 mb-5 text-sm font-semibold text-white  shadow-sm hover:bg-fuchsia-700 "
                onClick={() => setPopUp(true)}
              >
                VIEW CUSTOMIZED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualView;
