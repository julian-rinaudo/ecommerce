import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import InventoryStore from "./InventoryStore";
import ShoppingStore from "./ShoppingStore";
import usersReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: usersReducer,
    ShoppingStore:ShoppingStore,
    InventoryStore:InventoryStore
  },
});

export default store;
