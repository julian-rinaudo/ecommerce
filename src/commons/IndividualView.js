import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function IndividualView() {
  const { style } = useParams();
  const userLoged = useSelector((state) => state.user);

  const [data, setData] = useState({});
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("M");
  const [url, setUrl] = useState("");

  useEffect(() => {
    axios(`/api/products/styles/${style}/${color}/${size}`).then((res) =>
      setData(res.data)
    );
  }, [style, color, size]);

  const addColor = (color) => {
    setColor(color);
  };
  const addSize = (size) => {
    setSize(size);
  };
  const addUrl = (e) => {
    const url = e.target.value
    setUrl(url)
  };

  const createShirtCustom = () => {
    const { id } = userLoged;
    axios.post(`/api/products/shirtCustomized/${id}`, {
      data,
      url,
    });
    console.log(data);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-20 sm:px-6 sm:py-32 lg:px-6">
        <div className="relative isolate bg-slate-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px- lg:pt-0">
          <div className="relative mt-16 mb-16">
            <img
              className="rounded-md h-full w-full"
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
                Stock disponible: {data?.stock}
              </p>
              <div className="flex gap-4">
                <button
                  className="w-16 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-fuchsia-700"
                  onClick={() => addSize("S")}
                >
                  <span className="text-center">S</span>
                </button>
                <button
                  className="w-16 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-fuchsia-700"
                  onClick={() => addSize("M")}
                >
                  <span className="text-center">M</span>
                </button>
                <button
                  className="w-16 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-fuchsia-700"
                  onClick={() => addSize("L")}
                >
                  <span className="text-center">L</span>
                </button>
                <button
                  className="w-16 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-fuchsia-700"
                  onClick={() => addSize("XL")}
                >
                  <span className="text-center">XL</span>
                </button>
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
                  <button
                    className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 focus:outline-none"
                    title="White"
                    onClick={() => addColor("white")}
                  ></button>
                  <button
                    className="w-8 h-8 rounded-full bg-red-500 focus:outline-none"
                    title="Red"
                    onClick={() => addColor("red")}
                  ></button>
                  <button
                    className="w-8 h-8 rounded-full bg-blue-300 focus:outline-none"
                    title="Light Blue"
                    onClick={() => addColor("blue")}
                  ></button>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                href="#"
                className="rounded-md bg-fuchsia-500 px-3.5 py-2.5 mb-5 text-sm font-semibold text-white  shadow-sm hover:bg-fuchsia-700 "
                onClick={createShirtCustom}
              >
                CUSTOMIZAR
              </button>
              <button
                href="#"
                className="rounded-md bg-fuchsia-500 px-3.5 py-2.5 mb-5 text-sm font-semibold text-white  shadow-sm hover:bg-fuchsia-700 "
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualView;
