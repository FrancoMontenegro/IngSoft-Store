import Badge from '@mui/material/Badge';
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const cantidad = useSelector(state=>state.cart.cantidad)

  console.log(cantidad)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>ES</Language>
                    <SearchContainer>
                        <Input placeholder="Buscar" />
                        <Search />
                    </SearchContainer>
                </Left>
                <Center><Logo>Dolce Tentazione</Logo></Center>
                <Right>
                    <MenuItem>Registrarse</MenuItem>
                    <MenuItem>Ingresar</MenuItem>
                    <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={cantidad} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;