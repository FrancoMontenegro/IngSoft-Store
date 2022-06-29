import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useState } from "react";

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Últimos miembros</span>
      <ul className="widgetSmList">
        {users.map(user=> (
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.nombre} {user.apellido_p} {user.apellido_m}</span>
            <span className="widgetSmUserCorreo">{user.correo}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
