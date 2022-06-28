import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #d0c09e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Bienvenidos a la primera vista de nuestro sitio web!</Container>;
};

export default Announcement;