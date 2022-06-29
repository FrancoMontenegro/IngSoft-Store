import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import {mobile} from "../responsive";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/TTZxqph/loginbg.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #d0c09e;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { correo, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>INGRESAR</Title>
        <Form>
          <Input placeholder="correo" onChange={(e) => setCorreo(e.target.value)}
          />
          <Input placeholder="contraseña" type="password" onChange={(e) => setPassword(e.target.value)}
           />
          <Button onClick={handleClick} disabled={isFetching}>INGRESAR</Button>
          {error && <Error>Ups!, algo ha ido mal...</Error>}
          <Link>OLVIDASTE TU CONTRASEÑA?</Link>
          <Link>CREAR NUEVA CUENTA</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;