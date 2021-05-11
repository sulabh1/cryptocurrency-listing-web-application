import React, { useState } from "react";
import "./Tablerow.css";
const TableRow = ({ zabo, data }) => {
  const [currency, setCurrency] = useState(null);
  const [showRate, setshowRate] = useState(false);

  const getrate = () => {
    setshowRate(true);
    zabo.currencies
      .getExchangeRates({ tickers: data.ticker })
      .then(function (exchangeRate) {
        setCurrency(exchangeRate);
      });
  };
  return (
    <tr className="tableRow">
      <td>{data.ticker}</td>
      <td>{data.type}</td>
      <td>{data.name}</td>

      <td>
        <img src={data.logo} height="40" alt={data.name + " logo"} />
      </td>
      <td>
        {showRate ? (
          currency ? (
            currency.rate
          ) : (
            "Loading..."
          )
        ) : (
          <button onClick={getrate} className="button">
            Show Rate
          </button>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
