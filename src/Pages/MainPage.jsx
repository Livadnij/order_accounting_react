import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NestedClientsListModal from "../components/clientList/ClientListModal";
import { Box, TextField } from "@mui/material";
import OrderCreateModal from "../components/orderComp/orderModalTabs/OrderCreateModal";
import CollapsibleTable from "../components/orderComp/OrderMainPageTable";
import { ClientAddModal } from "../components/clientList/ClientAddModal";
import OrderPrintModal from "../components/orderComp/OrderPrintModal";
import { useState } from "react";
import OrderDeleteModal from "../components/orderComp/orderModalTabs/OrderDeleteModal";
import Slide from '@mui/material/Slide';
import ButtonGroupMainPage from "../components/ButtonGroupMainPage";
import { fetchClients } from "../components/store/toolkitSlice";
import { fetchCollNames } from "../components/store/GloabalOrdersList";
// import { fetchOrders } from "../components/store/GloabalOrdersList";
import HiddenAdminSideBar from "../components/adminSidebar/HiddenAdminSideBar";


//проверка на вход в систему
const MainPage = () => {

  const dispatch = useDispatch();

  const checked = useSelector((state) => state.toolkit.orderMainPageSearch);
  const [searchValue, setSearchValue]= useState("")
  const [sideBarStatus, setSideBarStatus] = useState(false)

  useEffect(()=>{
    setSearchValue("")
  }, [checked])


  const sideBarStatusChanger = (message) => {
    setSideBarStatus(message);
  }

  useEffect(()=>{
    dispatch(fetchCollNames());
    dispatch(fetchClients());
    // dispatch(fetchOrders());
  })

  return (
    <div>
      <Box style={{ position: "absolute", right: "5%", top: "-235px" }}>
        <NestedClientsListModal />
        <OrderDeleteModal/>
        <ClientAddModal />
        <OrderCreateModal />
        <OrderPrintModal />
         <ButtonGroupMainPage sideBarStatusChanger={sideBarStatusChanger}/>
      </Box>
      <Box sx={{ zIndex: 2}}>
        <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
        <Box sx={{position: "absolute" ,boxSizing: "border-box",p:1.25, paddingTop: '20px',backgroundColor:"white", width:"30%", mb:1.5, borderRadius:'0 0 4px 4px', left:"35%", top: "0px"}}>
        <TextField
        value={searchValue}
        fullWidth
        variant="outlined"
        size='small'
        label="Пошук"
        onChange={(e)=>{setSearchValue(e.target.value)}}
        />
        </Box>
        </Slide>
        <HiddenAdminSideBar sideBarStatus={sideBarStatus} sideBarStatusChanger={sideBarStatusChanger}/>

        <CollapsibleTable search={searchValue} />
      </Box>
    </div>
  );
};

export default MainPage;
