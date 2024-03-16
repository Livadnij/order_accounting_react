import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./store/toolkitSlice";
import GloabalOrdersList from "./store/GloabalOrdersList";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    globalOrders: GloabalOrdersList
})

export const store = configureStore({
    reducer:rootReducer,
})