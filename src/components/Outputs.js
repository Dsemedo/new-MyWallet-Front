import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Outputs() {
  const navigate = useNavigate();
  const [outputs, setOutputs] = useState({
    moneyValue: "",
    description: "",
  });

  function handleOutputs(e) {
    setOutputs({
      ...outputs,
      [e.target.name]: e.target.value,
    });
  }

  function submitInput(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/outputs`, outputs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        navigate("/statement");
        console.outputs(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <Forms>
      <Header>Nova saída</Header>
      <Output
        placeholder="Valor"
        name="moneyValue"
        type="number"
        defaultValue={outputs.moneyValue}
        onChange={handleOutputs}
      />
      <Output
        placeholder="Descrição"
        name="description"
        type="text"
        value={outputs.description}
        onChange={handleOutputs}
      />
      <Button type="submit" onClick={submitInput}>
        Salvar Saída
      </Button>
    </Forms>
  );
}

const Forms = styled.form`
  margin-top: 1vh;
  height: 35vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  width: 70vw;
  margin-bottom: 10%;
  font-family: "Saira Stencil One", cursive;
  color: #ffffff;
  font-size: 25px;
`;

const Output = styled.input`
  height: 6vh;
  margin-bottom: 5%;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  height: 5vh;
  margin-bottom: 8%;
  border-radius: 3px;
  border: none;
  background-color: #3e63bd;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  border: 1px solid #ffffff;
`;
