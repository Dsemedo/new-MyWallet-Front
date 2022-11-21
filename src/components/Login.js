import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    });
  }

  function loginUser(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/login`, log)

      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        navigate("/statement");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Email não cadastrado");
        }
      });
  }

  return (
    <>
      <Form>
        <Logo>MyWallet</Logo>

        <Input
          placeholder="E-mail"
          name="email"
          type="email"
          value={log.email}
          onChange={handleLogin}
        />
        <Input
          placeholder="Senha"
          name="password"
          type="password"
          value={log.password}
          onChange={handleLogin}
        />

        <Button type="submit" onClick={loginUser}>
          Entrar
        </Button>

        <StyledLink to="/sign-up">Primeira vez? Cadastre-se</StyledLink>
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
  width: 90vw;
  height: 5vh;
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
  /* font-family: 'Saira Stencil One', cursive; */
  /* font-family: "Playball", cursive; */

  text-decoration: none;
  color: #ffffff;
`;
