import React, { useContext, useEffect } from "react";
import { Hooks } from "../../providers/ListCrypto";
import Pintu from "../../assets/pintu.png";
function RowTable({ val }) {
  const { Data } = useContext(Hooks);
  return (
    <>
      <div className="content-table shadow-sm">
        <div className="content text-gray-400 flex flex-col">
          <div className="">
            <div className="flex flex-row">
              <img
                className="shadow-sm rounded-full"
                src={Pintu}
                width="40px"
                alt=""
              />
              <div>
                <h1>Pintu</h1>
                <p>pintu</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content text-gray-400">Last Price</div>
        <div className="content text-gray-400">24hr Change</div>
        <div className="content text-gray-400">Market Cap</div>
        <div className="content text-gray-400">Action</div>
        <div className="value text-green-600">{val.Coin}</div>
        <div
          className={`value ${
            val.statLastPrice === "up"
              ? `text-green-400`
              : val.statLastPrice === "down"
              ? "text-red-400"
              : "text-gray-900"
          }`}
        >
          {val.LastPrice}
        </div>
        <div
          className={`value ${
            val.statPercent === "up"
              ? `text-green-400`
              : val.statLastPrice === "down"
              ? "text-red-400"
              : "text-gray-900"
          }`}
        >
          {val.hrChange}
        </div>
        <div className="value">{val.MarketCap}</div>
        <div className="value">{val.Action}</div>
      </div>

      {/* <div className="content-table shadow-sm">
        <div className="content text-gray-400 flex flex-col">
          <div className="">
            <div className="flex flex-row">
              <img
                className="shadow-sm rounded-full"
                src={Pintu}
                width="40px"
                alt=""
              />
              <div>
                <h1>Pintu</h1>
                <p>pintu</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content text-gray-400">Last Price</div>
        <div className="content text-gray-400">24hr Change</div>
        <div className="content text-gray-400">Market Cap</div>
        <div className="content text-gray-400">Action</div>
        <div className="value text-green-600">1</div>
        <div className="value">2</div>
        <div className="value">3</div>
        <div className="value">4</div>
        <div className="value">5</div>
      </div> */}
    </>
  );
}

export default RowTable;
