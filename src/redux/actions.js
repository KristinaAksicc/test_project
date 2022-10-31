import * as types from "./types";

export function addTransaction(payload) {
  return {
    type: types.ADD_TRANSACTION,
    payload,
  };
}
export function addToBalance(payload) {
  return {
    type: types.ADD_TO_BALANCE,
    payload,
  };
}
export function addToIncome(payload) {
  return {
    type: types.ADD_TO_INCOME,
    payload,
  };
}
export function addToExpense(payload) {
  return {
    type: types.ADD_TO_EXPENSE,
    payload,
  };
}
export function currencyExchangeToEUR(payload) {
  return {
    type: types.EXCHANGE_CURRENCY,
    payload,
  };
}

export const getInfo = async () => {
  return Promise.resolve({
    code: "EUR",
    date: "2022-10-31",
    date_from: "2022-10-31",
    number: 208,
    parity: 1,
    cash_buy: 116.4876,
    cash_sell: 118.13,
    exchange_buy: 116.9569,
    exchange_middle: 117.3088,
    exchange_sell: 117.6607,
  });
};

export function currencyExchange() {
  return function (dispatch) {
    getInfo()
      .then((response) => {
        const exchange = response.exchange_middle;
        console.log(exchange);
        dispatch(currencyExchangeToEUR(exchange));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
