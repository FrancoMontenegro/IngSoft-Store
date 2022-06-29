import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const categoria = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log(filters);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Title>Nuestros productos:</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar productos</FilterText>
          <Select name="categoria" onChange={handleFilters}>
            <Option disabled>
              Categoría
            </Option>
            <Option>desayuno</Option>
            <Option>tabla</Option>
            <Option>otros</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Ordernar productos</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="desc">Precio (mayor a menor)</Option>
            <Option value="asc">Precio (menor a mayor)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products categoria={categoria} filters={filters} sort={sort}/>
      <Footer />
    </Container>
  )
}
export default ProductList;