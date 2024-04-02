import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NestedClientsListModal from "../components/clientList/ClientListModal";
import { Box, Button, TextField } from "@mui/material";
import OrderCreateModal from "../components/orderComp/orderModalTabs/OrderCreateModal";
import CollapsibleTable from "../components/orderComp/OrderMainPageTable";
import { ClientAddModal } from "../components/clientList/ClientAddModal";
import OrderPrintModal from "../components/orderComp/OrderPrintModal";
import { useState } from "react";
import OrderDeleteModal from "../components/orderComp/orderModalTabs/OrderDeleteModal";
import Slide from '@mui/material/Slide';
import ButtonGroupMainPage from "../components/ButtonGroupMainPage";
import { fetchCollNames, setMainPageSearch } from "../components/store/GloabalOrdersList";
import HiddenAdminSideBar from "../components/adminSidebar/HiddenAdminSideBar";
import SearchIcon from '@mui/icons-material/Search';


//проверка на вход в систему
const MainPage = () => {

  const dispatch = useDispatch();

  const checked = useSelector((state) => state.toolkit.orderMainPageSearch);
  const [sideBarStatus, setSideBarStatus] = useState(false)
  const [tempSearchValue, setTempSearchValue] = useState("")
  const [search, setSearch] = useState("")

  useEffect(()=>{
    dispatch(setMainPageSearch(''))
  }, [checked])


  const sideBarStatusChanger = (message) => {
    setSideBarStatus(message);
  }

  useEffect(()=>{
    dispatch(fetchCollNames());
    // dispatch(fetchClients());
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
        <Box sx={{display:"flex",alignItems:"center",position: "absolute" ,boxSizing: "border-box",p:1.25, paddingTop: '20px',backgroundColor:"white", width:"30%", mb:1.5, borderRadius:'0 0 4px 4px', left:"35%", top: "0px"}}>
        <TextField
        value={tempSearchValue}
        fullWidth
        variant="outlined"
        size='small'
        label="Пошук"
        onChange={(e)=>{setTempSearchValue(e.target.value)}}
        />
        <Button
        sx={{marginLeft:2}}
        variant="contained"
        color="success"
        onClick={()=>{
          setSearch(tempSearchValue)
        }}
        >
          <SearchIcon/>
        </Button>
        </Box>
        </Slide>
        <HiddenAdminSideBar sideBarStatus={sideBarStatus} sideBarStatusChanger={sideBarStatusChanger}/>

        <CollapsibleTable search={search}/>
      </Box>
    </div>
  );
};

export default MainPage;
