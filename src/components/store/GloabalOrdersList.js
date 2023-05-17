import { createSlice } from "@reduxjs/toolkit";


const GlobalOrderList = createSlice({
    name: "globalOrders",
    initialState: {
    orders: []
    },
    reducers : {
        saveOrders(initialState, {payload:data}) {
            console.log(data)
            initialState.orders = data
        },
    }
})

export default GlobalOrderList.reducer
export const {
    saveOrders
} = GlobalOrderList.actions