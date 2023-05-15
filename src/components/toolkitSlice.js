import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { nanoid } from "nanoid";



const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        logined: "",
        clientAddModalState: false,
        clientAddModalName: '',
        clientModalState: false,
        orderModalState: false,
        orderMaterialAdditionalState: false,
        orderMaterialAdditionalIndex: '',
        ordersAllList: [],
        clientsAllList: [],
        orderMaterialDelete: false,
        tempOrderInfo: {
            ranID:'',
            ordID:'',
            ready:false,
            given:false,
            dateStart: '',
            dateFinish: '',
            clID:'',
            fullPrice:'',
            paid:'',
            status:'',
            installation:false,
            delivery:false,
            adress:'',
            comments:''
        },
        tempMaterialInfo: [
            // { num: 1, count:2, material:3, thickness:4, width:1000, height:1000, edge: 2 }
        ]
    },
    reducers : {
        getClientsData(initialState, data) {
            console.log(data)
            initialState.clientsAllList = data
        },
        orderDeleteStatusUpdate(initialState){
            initialState.orderMaterialDelete = !initialState.orderMaterialDelete
        },
        orderDeleteMaterial (initialState, {payload:index}) {
            console.log(index)
            initialState.tempMaterialInfo.splice(index, 1)
        },
        uploadNewClient(initialState, data){
            const id = data.payload.id.toString()
            const cName = data.payload.Name.toString()
            const cDiscount = data.payload.discount
            const cId = data.payload.id.toString()
            const cPhoneNum = data.payload.phoneNum.toString()
            setDoc(doc(db, "clients", id), {
                Name: cName,
                discount: cDiscount,
                id: cId,
                phoneNum: cPhoneNum
            });
        },
        uploadNewOrder(initialState){
            const ranID = nanoid()
            setDoc(doc(db, "orders", ranID), {
            ranID,
            ordID:initialState.tempOrderInfo.ordID,
            ready:initialState.tempOrderInfo.ready,
            given:initialState.tempOrderInfo.given,
            dateStart:initialState.tempOrderInfo.dateStart,
            dateFinish:initialState.tempOrderInfo.dateFinish,
            clID:initialState.tempOrderInfo.clID,
            fullPrice:initialState.tempOrderInfo.fullPrice,
            paid:initialState.tempOrderInfo.paid,
            status:initialState.tempOrderInfo.status,
            installation:initialState.tempOrderInfo.installation,
            delivery:initialState.tempOrderInfo.delivery,
            adress:initialState.tempOrderInfo.adress,
            comments:initialState.tempOrderInfo.comments,
            material: initialState.tempMaterialInfo
            });
        },
        additionalWorkPush(initialState, {payload:data}) {
            console.log(data)
            console.log(initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].drilling)
            if(data[0] === 1) {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].drilling.push(data)
            } else {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].painting.push(data)
            }
        },
        userLogined(initialState, data) {
        initialState.logined = data
        },
        openModal(initialState, {payload:propName}){
            if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='orderMaterialAdditionalState'){
            console.log (propName)
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null) {
                console.log (propName)
                initialState[propName.name] = !initialState[propName.name]
                initialState.clientAddModalName = propName.value
        } else {
            console.log (propName)
            initialState[propName] = !initialState[propName] 
        }
        },
        tempOrderSave(initialState, data) {
            initialState.tempOrderInfo = data;
        },
        orderStateUpdate(initialState, {payload:data}) {
            console.log(data)
            initialState.tempOrderInfo[data.propName] = data.value;
        },
        orderMaterialUpdate(initialState, {payload:data}) {
            console.log(data)
            initialState.tempMaterialInfo[data.index][data.propName] = data.value;
        },
        orderMaterialAddNewObject(initialState) {
            console.log('object added')
            const body = { num: initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1] ? initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1].num + 1 : 1, count: '', material: '', thickness: '', width: '', height: '', edge: '', drilling: [], painting: [] }
            initialState.tempMaterialInfo.push(body)
        },
        orderMaterialRemoveAddition(initialState, {payload:data}) {
            const rowIndex= data.rowIndex
            const propName= data.propName
            const index = data.index
            console.log(rowIndex, propName, index)
            console.log(initialState.tempMaterialInfo[rowIndex][propName])
            initialState.tempMaterialInfo[rowIndex][propName].splice(index, 1)
        },
        orderModalHandleClose(initialState) {
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
            initialState.tempMaterialInfo = [];            
        }
    }
})

export default toolkitSlice.reducer
export const {orderDeleteMaterial, orderDeleteStatusUpdate, orderModalHandleClose, orderMaterialRemoveAddition, additionalWorkPush, openModal, orderMaterialAddNewObject, orderMaterialUpdate, orderStateUpdate, tempOrderSave, userLogined, uploadNewClient, getClientsData, uploadNewOrder} = toolkitSlice.actions
