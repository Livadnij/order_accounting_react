import { createSlice } from "@reduxjs/toolkit";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { dbForTests, dbForWork } from "../Firebase";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        dbSelected : true,
        currentCollName: {id: '0', name: "orders"}, 
        err: "",
        isLoading: "",
        dbModalState: true,
        clientAddModalState: false,
        clientAddModalName: '',
        clientModalState: false,
        orderDeleteModal: false,
        clientEditIndex: "",
        orderSearch: "",
        orderModalState: false,
        orderMainPageSearch: false,
        clientsDeleteModal: false,
        clientsCurrentDelete: "",
        searchModalState: false,
        sideBarState: false,
        orderCloseModal:false,
        orderPrintModalState: false,
        orderMaterialAdditionalState: false,
        orderMaterialAdditionalIndex: '',
        orderSelectClient: false,
        lastOrderRanID: "",
        orderPrintTable:"",
        makeThemRed: false,
        orderMaterialDelete: false,
        tempOrderInfo: {
            ranID:'',
            ordID:'',
            clID:'',
            status: 1,
            dateStart: '',
            dateFinish: '',
            fullPrice:'',
            fullPaid:false,
            paid:'',
            paidOnCard: false,
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
        setDBInClients (initialState, {payload:data}){
            initialState.dbSelected = data
          },
        setOrderSearch(initialState,{payload:data}){
            initialState.orderSearch = data
        },
        changeCurrentCollInClients(initialState, {payload:data}) {
              initialState.currentCollName = data
          },
        openCloseModal(initialState){
            initialState.orderCloseModal= !initialState.orderCloseModal
        },
        orderDeleteStatusUpdate(initialState){
            initialState.orderMaterialDelete = !initialState.orderMaterialDelete
        },
        orderDeleteMaterial (initialState, {payload:index}) {
            initialState.tempMaterialInfo.splice(index, 1)
        },
        uploadNewClient(initialState, data){
            const id = data.payload.id.toString()
            const cName = data.payload.Name.toString()
            const cDiscount = data.payload.discount
            const cId = data.payload.id.toString()
            const cPhoneNum = data.payload.phoneNum.toString()
            setDoc(doc(initialState.dbSelected?dbForWork:dbForTests, "clients", id), {
                Name: cName,
                discount: cDiscount,
                id: cId,
                phoneNum: cPhoneNum
            });
        },
        uploadNewColl(initialState, data){
            const id = data.payload.id.toString()
            const name = data.payload.Name.toString()
            setDoc(doc(initialState.db, "CollectionNames", id), {
                name: name,
                id: id,
            });
        },
        uploadEditClient(initialState, {payload:data}){
            deleteDoc(doc(initialState.dbSelected?dbForWork:dbForTests, "clients", data.id));
            setDoc(doc(initialState.dbSelected?dbForWork:dbForTests, "clients", data.id), {
                Name: data.Name,
                discount: data.discount,
                id: data.id,
                phoneNum: data.phoneNum
            });
        },
        uploadNewOrder(initialState){ 
            const notify = (e) => toast(e);
            if(initialState.tempOrderInfo.ordID&&initialState.tempOrderInfo.dateStart&&initialState.tempOrderInfo&&initialState.tempOrderInfo.dateFinish&&initialState.tempOrderInfo.clID&&initialState.tempOrderInfo.status) {
            const ranID = nanoid()
            initialState.lastOrderRanID = ranID
            setDoc(doc(initialState.dbSelected?dbForWork:dbForTests, initialState.currentCollName.name, ranID), {
            ranID,
            ordID:initialState.tempOrderInfo.ordID,
            dateStart:initialState.tempOrderInfo.dateStart,
            dateFinish:initialState.tempOrderInfo.dateFinish,
            clID:initialState.tempOrderInfo.clID,
            fullPrice:initialState.tempOrderInfo.fullPrice,
            paid:initialState.tempOrderInfo.paid,
            status:initialState.tempOrderInfo.status,
            installation:initialState.tempOrderInfo.installation,
            delivery:initialState.tempOrderInfo.delivery,
            fullPaid:initialState.tempOrderInfo.fullPaid,
            paidOnCard:initialState.tempOrderInfo.paidOnCard,
            adress:initialState.tempOrderInfo.adress,
            comments:initialState.tempOrderInfo.comments,
            material: initialState.tempMaterialInfo.filter((element)=>{
                if(element.width && element.height && element.count && element.material && element.thickness){return true}
                return false
            })
            });
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempMaterialInfo = [];      
            initialState.orderModalState = !initialState.orderModalState
            initialState.makeThemRed = false
        } else {
            notify(`Поля мають бути заповнені`); 
            initialState.makeThemRed = true
        }
        },
        additionalWorkPush(initialState, {payload:data}) {
            if(data.work === 1) {
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
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientModalState'){
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderSelectClient = propName.value
            } else if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='orderPrintModalState'){
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientAddModalState') {
                initialState.clientEditIndex = propName.id
                initialState.clientAddModalName = propName.value
                initialState[propName.name] = !initialState[propName.name]
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientsDeleteModal') {
                initialState[propName.name] = !initialState[propName.name]
                initialState.clientsCurrentDelete = propName.value
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null) {
                initialState[propName.name] = !initialState[propName.name]
                initialState.orderPrint = propName.value
        } else {
            initialState[propName] = !initialState[propName] 
        }
        },
        tempOrderSave(initialState, {payload:order}) {
            initialState.tempOrderInfo = order
            initialState.tempMaterialInfo = order.material
        },
        orderStateUpdate(initialState, {payload:data}) {
            initialState.tempOrderInfo[data.propName] = data.value;
        },
        orderMaterialUpdate(initialState, {payload:data}) {
            initialState.tempMaterialInfo[data.index][data.propName] = data.value;
        },
        orderMaterialAddNewObject(initialState) {
            const body = { num: initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1] ? initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1].num + 1 : 1, count: '', material: '', thickness: '', width: '', height: '', edge: 7, drilling: [], painting: [] }
            initialState.tempMaterialInfo.push(body)
        },
        orderMaterialRemoveAddition(initialState, {payload:data}) {
            const rowIndex= data.rowIndex
            const propName= data.propName
            const index = data.index
            initialState.tempMaterialInfo[rowIndex][propName].splice(index, 1)
        },
        orderModalHandleClose(initialState) {
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempMaterialInfo = [];            
        },
        orderModalEdit(initialState, {payload:order}){
            initialState.tempOrderInfo = order
            initialState.tempMaterialInfo = order.material
            initialState.orderModalState = !initialState.orderModalState
        },
        orderDelete(initialState){
            deleteDoc(doc(initialState.dbSelected?dbForWork:dbForTests, initialState.currentCollName.name, initialState.tempOrderInfo.ranID));
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '');
            initialState.tempMaterialInfo = [];   
            initialState.orderModalState = !initialState.orderModalState;
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
        },
        orderUpdate(initialState){
            const notify = (e) => toast(e);
            if(initialState.tempOrderInfo.ordID&&initialState.tempOrderInfo.dateStart&&initialState.tempOrderInfo.dateFinish&&initialState.tempOrderInfo.clID&&initialState.tempOrderInfo.status) {
            deleteDoc(doc(initialState.dbSelected?dbForWork:dbForTests, initialState.currentCollName.name, initialState.tempOrderInfo.ranID));
            setDoc(doc(initialState.dbSelected?dbForWork:dbForTests, initialState.currentCollName.name, initialState.tempOrderInfo.ranID), {
                ranID:initialState.tempOrderInfo.ranID,
                ordID:initialState.tempOrderInfo.ordID,
                dateStart:initialState.tempOrderInfo.dateStart,
                dateFinish:initialState.tempOrderInfo.dateFinish,
                clID:initialState.tempOrderInfo.clID,
                fullPrice:initialState.tempOrderInfo.fullPrice,
                paid:initialState.tempOrderInfo.paid,
                status:initialState.tempOrderInfo.status,
                fullPaid:initialState.tempOrderInfo.fullPaid,
                paidOnCard:initialState.tempOrderInfo.paidOnCard?initialState.tempOrderInfo.paidOnCard:false,
                installation:initialState.tempOrderInfo.installation,
                delivery:initialState.tempOrderInfo.delivery,
                adress:initialState.tempOrderInfo.adress,
                comments:initialState.tempOrderInfo.comments,
                material: initialState.tempMaterialInfo.filter((element)=>{
                    if(element.width && element.height && element.count && element.material && element.thickness){return true}
                    return false
                })
                });
                Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
                initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempOrderInfo.status = 1
                initialState.tempMaterialInfo = []; 
                initialState.makeThemRed = false 
                if(initialState.orderModalState){
                initialState.orderModalState = !initialState.orderModalState}}  else {
                    notify(`Поля мають бути заповнені`)
                    initialState.makeThemRed = true
                }
        },
        orderSaveTable(initialState, {payload:table}){
            initialState.orderPrintTable = table
        },
        clientsDelete(initialState){
            deleteDoc(doc(initialState.dbSelected?dbForWork:dbForTests, "clients", initialState.clientsCurrentDelete));
        }
        },
})

export default toolkitSlice.reducer
export const {changeCurrentCollInClients, 
    setOrderSearch,
    setDBInClients,
    orderDeleteMaterial, 
    uploadNewColl,
    uploadEditClient, 
    orderDeleteStatusUpdate, 
    orderModalHandleClose, 
    orderMaterialRemoveAddition, 
    additionalWorkPush, 
    openModal, 
    orderMaterialAddNewObject, 
    orderMaterialUpdate, 
    orderStateUpdate, 
    tempOrderSave, 
    userLogined, 
    uploadNewClient, 
    uploadNewOrder, 
    orderModalEdit, 
    orderDelete, 
    orderUpdate, 
    orderSaveTable, 
    clientsDelete,
    openCloseModal} = toolkitSlice.actions