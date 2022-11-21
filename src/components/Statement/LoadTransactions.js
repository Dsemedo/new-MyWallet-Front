import styled from "styled-components";

export default function LoadTransactions({ transactions }) {
  return transactions.map((transaction) =>
    transaction.status === true ? (
      <InputValue key={transaction._id}>
        <Date>{transaction.now}</Date>
        <Description>{transaction.description}</Description>
        <Money color="green">{transaction.moneyValue}</Money>
      </InputValue>
    ) : (
      <InputValue key={transaction._id}>
        <Date>{transaction.now}</Date>
        <Description>{transaction.description}</Description>
        <Money color="red">{transaction.moneyValue}</Money>
      </InputValue>
    )
  );
}

const InputValue = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 4%;
`;

const Date = styled.h1`
  margin-left: 1%;
  width: 17%;
  font-size: 16px;
  color: black;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  color: #3e63bd;
`;

const Description = styled.h1`
  width: 59%;
  font-size: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
`;

const Money = styled.h1`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 23%;
  height: 100%;
  font-size: 16px;
  font-family: "Raleway", sans-serif;
  color: ${(props) => props.color};
  margin-right: 2%;
`;
