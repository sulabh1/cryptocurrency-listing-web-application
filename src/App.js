import { React, useState, useEffect } from "react";
import "./App.css";
import Zabo from "zabo-sdk-js";
import TableRow from "./components/Tablerow";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState([]);
  const [zabo, setZabo] = useState({});

  useEffect(() => {
    setLoading(true);
    Zabo.init({
      clientId:
        "jE6alLWXBjw0S3XRLMlip46LpcvpzPAACQQPkyh2yocwxYKadAfmlUCVEAyB6TaM",
      env: "sandbox",
    }).then((zabo) => {
      zabo
        .connect()
        .onConnection(async (account) => {
          setZabo(zabo);
          const a = await zabo.currencies.getList();
          setData(a.data);
          setLoading(false);
        })
        .onError((error) => {
          console.error("account connection error:", error);
        });
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="body">
      <table className="table">
        <thead className="header">
          <tr className="header-tableRow">
            <th className="header-tableRow-TN">Ticker Name</th>
            <th className="header-tableRow-name">Name</th>
            <th className="header-tableRow-type">Type</th>
            <th className="header-tableRow-logo">Logo</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return <TableRow data={data} zabo={zabo} key={data.ticker} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
