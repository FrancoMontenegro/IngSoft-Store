import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) => 
    state.product.products.find((product)=> product._id === productId)
    );
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Producto</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Ventas del producto (NF)"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.nombre}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">0</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.stock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Nombre</label>
                  <input type="text" placeholder={product.nombre} />
                  <label>Descripción</label>
                  <input type="text" placeholder={product.desc} />
                  <label>Categoría</label>
                  <input type="text" placeholder={product.categoria} />
                  <label>Precio</label>
                  <input type="text" placeholder={product.precio} />
                  <label>In Stock</label>
                  <select name="stock" id="idStock">
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Actualizar</button>
              </div>
          </form>
      </div>
    </div>
  );
}
