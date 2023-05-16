import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";


const GlobalOrderList = createSlice({
    name: "toolkit",
    initialState: {
    orders: []
    },
    reducers : {
        getOrders(initialState) {
            initialState.clientsAllList = data
        },
    }
})

export default GlobalOrderList.reducer
export const {
    getOrders
} = GlobalOrderList.actions