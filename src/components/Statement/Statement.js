import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import LoadTransactions from "./LoadTransactions";
import Logout from "../../assets/Logout.png";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios.get("http://localhost:5000/statement", config).then((res) => {
      console.log(res.data);
      setUsername(res.data.name);
      setTransactions(res.data.transactions);
    });
  }, []);

  let saldoTotal = 0;

  if (transactions.length > 0) {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].status === true) {
        saldoTotal += Number(transactions[i].moneyValue);
      } else {
        saldoTotal -= Number(transactions[i].moneyValue);
      }
    }
  }

  function LoadStatement() {
    return transactions.length === 0 ? (
      <h3>Não há registros de entrada e saída na sua conta</h3>
    ) : (
      <LoadTransactions transactions={transactions} />
    );
  }

  function logoutSession() {
    axios
      .delete(`http://localhost:5000/statement`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        navigate("/");
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function TotalBalance() {
    if (saldoTotal > 0) {
      return <h2 color="green">{saldoTotal}</h2>;
    } else if (saldoTotal < 0) {
      return <h2 color="red">{saldoTotal}</h2>;
    } else {
      return <h2>{saldoTotal}</h2>;
    }
  }

  return (
    <>
      <WelcomeUser>
        Olá, {username}
        <img
          src={Logout}
          alt="Imagem de Logout"
          onClick={() => logoutSession()}
        />
      </WelcomeUser>

      <TransactionsBoard>
        <Divisor>
          <LoadStatement />
        </Divisor>

        <Total>
          <h1>Saldo</h1>
          <TotalBalance />
        </Total>
      </TransactionsBoard>

      <Options>
        <Button onClick={() => navigate("/inputs")}>
          <SmallButton>+</SmallButton>
          <h1>Nova Entrada</h1>
        </Button>

        <Button onClick={() => navigate("/outputs")}>
          <SmallButton>-</SmallButton>
          <h1>Nova Saída</h1>
        </Button>
      </Options>
    </>
  );
}

const TransactionsBoard = styled.div`
  width: 90vw;
  height: 70vh;
  background-color: #ffffff;
  margin-bottom: 5%;
  position: relative;
  justify-content: center;
  text-align: center;

  h3 {
    font-size: 17px;
    height: 20%;
    width: 84%;
    margin: 0 8%;
    padding-top: 80%;
    font-family: "Raleway", sans-serif;
    color: #3e63bd;
    font-weight: 700;
  }
`;

const WelcomeUser = styled.h1`
  margin: 5% 0 5% 0;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const Options = styled.div`
  height: 15vh;
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.div`
  width: 45%;
  height: 100%;
  border-radius: 5px;
  border: none;
  background-color: #3e63bd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  h1 {
    font-size: 15px;
    margin-left: 4%;
  }
`;

const SmallButton = styled.div`
  width: 15%;
  height: 22%;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  margin-left: 4%;
`;

const Total = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5%;
  background-color: #ebeef6;
  h1 {
    display: flex;
    justify-content: start;
    width: 50%;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 20px;
    margin-left: 2%;
  }

  h2 {
    width: 50%;
    display: flex;
    justify-content: end;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 18px;
    margin-right: 2%;
    color: ${(props) => props.color};
  }
`;

const Divisor = styled.div`
  width: 100%;
  height: 95%;
  overflow-y: scroll;
`;
