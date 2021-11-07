import React, { Suspense, useContext } from "react";
import { Hooks } from "../../providers/ListCrypto";
import RowTable from "./RowTable";
function Table() {
  const { setTag, Data } = useContext(Hooks);
  return (
    <div style={{ width: "100%" }}>
      {/* <div>
        <label htmlFor="data">dtes</label>
        <input
          id="data"
          type="checkbox"
          value="defi"
          onChange={(e) => {
            e.target.checked === true ? setTag(e.target.value) : setTag("all");
          }}
        />
      </div> */}
      <div className="wrapping-table">
        <div className="crypto-table">
          <div>Name</div>
          <div>Last Price</div>
          <div>24hr Change</div>
          <div>Market Cap</div>
          <div>Action</div>
        </div>
        {Data?.map((val) => (
          <RowTable val={val} />
        ))}
      </div>
    </div>
  );
}

export default Table;
