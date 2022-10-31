import * as types from "./types";

const initialState = {
  balance: 0,
  income: 0,
  expense: 0,
  transactions: [],
};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [
          ...state.transactions,
          {
            description: action.payload.description,
            amount: action.payload.amount,
          },
        ],
      };
    case types.ADD_TO_BALANCE:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case types.ADD_TO_INCOME:
      return {
        ...state,
        income: state.income + action.payload,
      };
    case types.ADD_TO_EXPENSE:
      return {
        ...state,
        expense: state.expense + action.payload,
      };
    case types.EXCHANGE_CURRENCY:
      return {
        ...state,
        balance: state.balance / action.payload,
      };
    default:
      return state;
  }
}
