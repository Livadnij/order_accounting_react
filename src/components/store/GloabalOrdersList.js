import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getClients, { getOrders, getCollNames, getQueryData, dbForWork, dbForTests } from "../Firebase";

export const fetchOrders = createAsyncThunk(
    'toolkit/fetchOrders',
    async function (arg, { getState }) {
        const state = getState();
        const data = await getOrders(state.globalOrders.dbSelected?dbForWork:dbForTests, state.globalOrders.currentCollName.name);
        return data
    },
  );

export const fetchCollNames = createAsyncThunk(
    'toolkit/fetchNames',
    async function (arg, { getState }) {
      const state = getState();
        const data = await getCollNames(state.globalOrders.dbSelected?dbForWork:dbForTests);
        return data
    },
  );

  export const fetchClients = createAsyncThunk(
    'toolkit/fetchClients',
    async function (arg, { getState }) {
      const state = getState();
        const data = await getClients(state.globalOrders.dbSelected?dbForWork:dbForTests);
        return data
    },
  );

  export const queryData = createAsyncThunk(
    'toolkit/queryData',
    async function (arg, { getState }) {
        const state = getState();
        const data = await getQueryData(state.globalOrders.dbSelected?dbForWork:dbForTests, state.globalOrders.queryRequest.search, state.globalOrders.queryRequest.key, state.globalOrders.queryRequest.currentCol);
        return data
    },
  );

  export const queryOrder = createAsyncThunk(
    'toolkit/queryOrder',
    async function (arg, { getState }) {
        const state = getState();
        const data = await getQueryData(state.globalOrders.dbSelected?dbForWork:dbForTests, state.globalOrders.queryRequest.search, state.globalOrders.queryRequest.key, state.globalOrders.queryRequest.currentCol);
        return data
    },
  );
  

const GlobalOrderList = createSlice({
    name: "globalOrders",
    initialState: {
    dbSelected : true,
    queryRequest : {search: "", key: "", currentCol: ""},
    MainPageSearch:'',
    currentCollName: {id: '0', name: "orders"},
    err: "",
    ordersAreLoading: "",
    clientsAreLoading: "",
    collectionsAreLoading: "",
    queryIsLoading: "",
    ordersQuery: [],
    orders: [],
    clientsAllList: [],
    collNames: []
    },
    reducers : {
        setDBInOrders (initialState, {payload:data}){
          initialState.dbSelected = data
        },
        setQueryRequest(initialState, {payload:data}){
          initialState.queryRequest = {
            search: data.search,
            key: data.key,
            currentCol: data.currentCol
          }
        },
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
        },
        deleteOrder(initialState, {payload:data}){
          const elementIndex = initialState.orders.findIndex(order=>order.ranID === data.ranID) 
          initialState.orders.splice(elementIndex, 1)
        },
    },
    extraReducers : {
        [fetchOrders.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.ordersAreLoading = true;
          },
          [fetchOrders.fulfilled]: (initialState, action) => {
            initialState.orders = action.payload;
            initialState.err = null;
            initialState.ordersAreLoading = false;
            console.log('order fetch done');
          },
          [fetchOrders.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('order fetch error');
          },
          [fetchCollNames.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.collectionsAreLoading = true;
          },
          [fetchCollNames.fulfilled]: (initialState, action) => {
            initialState.collNames = action.payload;
            initialState.err = null;
            initialState.collectionsAreLoading = false;
            console.log('CollNames fetch done');
          },
          [fetchCollNames.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('Coll names fetch error');
          },
          [fetchClients.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.clientsAreLoading = true;
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
            initialState.clientsAreLoading = false;
          },
          [fetchClients.rejected]: (initialState, action) => {
            initialState.err = 'error';
            console.log('client fetch error');
          },
          [queryData.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.queryIsLoading = true;
          },
          [queryData.fulfilled]: (initialState, action) => {
            initialState.ordersQuery = action.payload;
            initialState.err = null;
            initialState.queryIsLoading = false;
            console.log('query Data done');
          },
          [queryData.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('query Data error');
          },
          [queryOrder.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.queryIsLoading = true;
          },
          [queryOrder.fulfilled]: (initialState, action) => {
            const elementIndex = initialState.orders.findIndex(order=>order.ranID === action.payload[0].ranID)
            if(action.payload.length === 1 && elementIndex > -1){
            initialState.orders[elementIndex]=action.payload[0]
          } else if(action.payload.length === 1 && elementIndex === -1){
            initialState.orders.push(action.payload[0])
          } else { console.log('query length error')}
            initialState.err = null;
            initialState.queryIsLoading = false;
            console.log('query Data done');
          },
          [queryOrder.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('query Data error');
          },
    }
})

export default GlobalOrderList.reducer
export const {
  deleteOrder,
  setDBInOrders,
  setQueryRequest,
  setMainPageSearch,
  changeCurrentCollInOrders,
  changeStatus,
    saveOrders,
    handleExitOrders
} = GlobalOrderList.actions