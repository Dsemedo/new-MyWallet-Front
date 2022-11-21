import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [forms, setForms] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleForms(e) {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  }

  function submitUser(e) {
    e.preventDefault();

    const promise = axios.post(`http://localhost:5000/sign-up`, forms);

    promise.then(() => navigate("/"));
    promise.catch((err) => {
      console.log(err.response);
      if (err.response.status === 409) {
        alert("Este email já existe");
        setForms(...forms, forms.email === "");
      } else {
        alert("Preencha corretamente");
      }
    });
  }

  return (
    <>
      <Form>
        <Logo>MyWallet</Logo>

        <Input
          placeholder="Seu nome"
          name="name"
          type="name"
          value={forms.name}
          onChange={handleForms}
        />
        <Input
          placeholder="E-mail"
          name="email"
          type="email"
          value={forms.email}
          onChange={handleForms}
        />
        <Input
          placeholder="Senha"
          name="password"
          type="password"
          value={forms.password}
          onChange={handleForms}
        />

        <Input
          placeholder="Confirme sua senha"
          name="confirmPassword"
          type="password"
        />

        <Button type="submit" onClick={submitUser}>
          Entrar
        </Button>

        <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
      </Form>
    </>
  );
}

const Form = styled.form`
  margin-top: 25vh;
  height: 50vh;
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.h1`
  margin-bottom: 10%;
  font-family: "Saira Stencil One", cursive;
  color: #ffffff;
  font-size: 35px;
`;

const Input = styled.input`
  width: 90%;
  height: 15%;
  margin-bottom: 5%;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  width: 90%;
  height: 12%;
  margin-bottom: 8%;
  border-radius: 5px;
  border: none;
  background-color: #3e63bd;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;
