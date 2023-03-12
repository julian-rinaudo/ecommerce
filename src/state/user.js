import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const usersReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    console.log("prueba");
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default usersReducer;
