import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useState } from "react";
import { format } from "timeago.js";
import "./widgetLg.css";


export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Últimos pedidos</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Id Cliente</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Monto</th>
          <th className="widgetLgTh">Estado</th>
        </tr>
        {orders.map(order=>(
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">{order.monto}</td>
          <td className="widgetLgStatus">
            <Button type={order.estado} />
          </td>
        </tr>
        ))}
      </table>
    </div>
  );
}
