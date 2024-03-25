import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, getOrders, getCollNames } from "../Firebase";

export const fetchOrders = createAsyncThunk(
    'toolkit/fetchOrders',
    async function (arg, { getState }) {
        const state = getState();
        const data = await getOrders(db, state.globalOrders.currentCollName.name);
        return data
    },
  );

export const fetchCollNames = createAsyncThunk(
    'toolkit/fetchNames',
    async function () {
        const data = await getCollNames(db);
        return data
    },
  );

const GlobalOrderList = createSlice({
    name: "globalOrders",
    initialState: {
    currentCollName: {id: '1', name: "newOrders"},
    err: "",
    isLoading: "",
    orders: [],
    collNames: []
    },
    reducers : {
        changeCurrentCollInOrders(initialState, {payload:data}) {
            initialState.currentCollName = data
        },
        saveOrders(initialState, {payload:data}) {
            initialState.orders = data
        },
        handleExitOrders(initialState){
          initialState.orders = ''
        },
        changeStatus(initialState, {payload:data}){
          initialState.orders[data.index].status = data.value
        }
    },
    extraReducers : {
        [fetchOrders.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.isLoading = true;
          },
          [fetchOrders.fulfilled]: (initialState, action) => {
            initialState.orders = action.payload;
            initialState.err = null;
            initialState.isLoading = false;
          },
          [fetchOrders.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('order fetch error');
          },
          [fetchCollNames.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.isLoading = true;
          },
          [fetchCollNames.fulfilled]: (initialState, action) => {
            initialState.collNames = action.payload;
            initialState.err = null;
            initialState.isLoading = false;
          },
          [fetchCollNames.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('Coll names fetch error');
          },
    }
})

export default GlobalOrderList.reducer
export const {
  changeCurrentCollInOrders,
  changeStatus,
    saveOrders,
    handleExitOrders
} = GlobalOrderList.actions