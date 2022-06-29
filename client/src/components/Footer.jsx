import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import styled from "styled-components";
import { mobile } from "../responsive";
  
  
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;


const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>DOLCE TENTAZIONE.</Logo>
          <Desc>
          Dolce Tentazione Chile es un emprendimiento a cargo de Támara Costa y Sebastián Gutiérrez dedicado a la elaboración y venta de giftboxs decorativos. El objetivo es establecer una unión entre nuestros clientes y nosotros para brindar las más dulces experiencias y sensaciones a sus seres queridos a través de nuestros detalles los cuales constan principalmente de desayunos personalizados, tablas de picoteo y arreglos de rosas.

          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
        </Center>
        <Right>
          <Title>Contacto</Title>
          <ContactItem>
            <RoomIcon style={{marginRight:"10px"}}/> Envíos a todo Santiago!
          </ContactItem>
          <ContactItem>
            <PhoneIcon style={{marginRight:"10px"}}/> +56 9 7440 3376
          </ContactItem>
          <ContactItem>
            <MailOutlineIcon style={{marginRight:"10px"}} /> contacto@dolcetentazione.cl
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;