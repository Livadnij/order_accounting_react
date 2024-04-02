import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getClients, { db, getOrders, getCollNames } from "../Firebase";

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

  export const fetchClients = createAsyncThunk(
    'toolkit/fetchClients',
    async function () {
        const data = await getClients(db);
        return data
    },
  );

const GlobalOrderList = createSlice({
    name: "globalOrders",
    initialState: {
    MainPageSearch:'',
    currentCollName: {id: '1', name: "newOrders"},
    err: "",
    isLoading: "",
    orders: [],
    clientsAllList: [],
    collNames: []
    },
    reducers : {
        setMainPageSearch(initialState, {payload:data}) {
          initialState.MainPageSearch = data
        },
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
            console.log('order fetch done');
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
          [fetchClients.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.isLoading = true;
          },
          [fetchClients.fulfilled]: (initialState, action) => {
            const clientsArr = [...action.payload]
            const notNumber = clientsArr.filter((element)=>{
                if (isNaN(Number(element.id))) {
                    return true
                }
                return false
            })
            let isNumber = clientsArr.filter((element)=>{
                if (!isNaN(Number(element.id))) {
                    return true
                }
                return false
            })
            if(isNumber.length){
                isNumber = isNumber.sort((b,a) => (Number(a.id) > Number(b.id)) ? 1 : ((Number(b.id) > Number(a.id)) ? -1 : 0))
            }
            console.log('client fetch done')
            const finishedFilter = [...isNumber, ...notNumber]
            initialState.clientsAllList = finishedFilter;
            initialState.err = null;
            initialState.isLoading = false;
          },
          [fetchClients.rejected]: (initialState, action) => {
            initialState.err = 'error';
            console.log('client fetch error');
          },
    }
})

export default GlobalOrderList.reducer
export const {
  setMainPageSearch,
  changeCurrentCollInOrders,
  changeStatus,
    saveOrders,
    handleExitOrders
} = GlobalOrderList.actions