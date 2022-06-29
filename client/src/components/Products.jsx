import styled from "styled-components";
//import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({categoria,filters,sort}) => {

  console.log(categoria,filters,sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          categoria
            ? `http://localhost:3001/api/products?categoria=${categoria}`
            : "http://localhost:3001/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [categoria]);

  useEffect(() => {
    categoria &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, categoria, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.precio - b.precio)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.precio - a.precio)
      );
    }
  }, [sort]);

  return (
    <Container>
      {categoria
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;