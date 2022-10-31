import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../context";
import Navigation from "../components/Navigation";
import { TextField, Box, Typography, Button } from "@mui/material";
import {
  addTransaction,
  addToIncome,
  addToExpense,
  addToBalance,
  currencyExchange,
} from "../redux/actions";

export default function Home() {
  const { income, balance, expense, transactions } = useSelector((state) => ({
    ...state.app,
  }));
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const { toggle, toggleFunction } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const addToBank = (amount) => {
    dispatch(addToBalance(Number(amount)));
    if (amount < 0) {
      dispatch(addToExpense(Number(amount)));
    } else if (amount > 0) {
      dispatch(addToIncome(Number(amount)));
    }
  };
  const exchangeCurrency = () => {
    dispatch(currencyExchange());
  };

  const transactionHistory = () => {
    dispatch(addTransaction({ description: description, amount: amount }));
  };
  return (
    <div
      className={toggle ? "dark" : "light"}
      style={
        toggle ? { background: "black", color: "white", height: "200vh" } : {}
      }
    >
      <Navigation />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          Hello User
        </Typography>
        <Button
          onClick={toggleFunction}
          variant="contained"
          sx={{ height: "max-content" }}
        >
          Change theme
        </Button>
      </div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Your balance is:{Math.round(balance)}
        <Button
          variant="contained"
          onClick={() => {
            exchangeCurrency();
          }}
          sx={{ ml: 3 }}
        >
          Convert to EUR
        </Button>
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Income:{income}
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Expense:{expense}
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Transaction history:
        </Typography>
        {transactions.map((item) => {
          return (
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {item.description} {item.amount}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ flexGrow: 1, mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, mb: 2 }}>
          Transactions:
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Transaction description"
          sx={{ mr: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          sx={{ mr: 2 }}
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            transactionHistory();
            addToBank(amount);
          }}
        >
          Send
        </Button>
      </Box>
    </div>
  );
}
