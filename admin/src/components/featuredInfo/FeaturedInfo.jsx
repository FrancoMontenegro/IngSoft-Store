import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward, CallMergeTwoTone } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useState } from "react";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total*100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  console.log(perc);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Ingresos</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1] || 0}</span>
          <span className="featuredMoneyRate">
            %{perc} <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Comparado con el mes pasado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Comparado con el mes pasado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costos</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Comparado con el mes pasado</span>
      </div>
    </div>
  );
}
