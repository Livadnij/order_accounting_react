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
import ButtonGroupMainPage from "../components/ButtonGroupMainPage";
import { setMainPageSearch } from "../components/store/GloabalOrdersList";
import HiddenAdminSideBar from "../components/adminSidebar/HiddenAdminSideBar";
import { SearchModal } from "../components/searchModal/SearchModal";
import SearchIcon from '@mui/icons-material/Search';
import { setOrderSearch } from "../components/store/toolkitSlice";



//проверка на вход в систему
const MainPage = () => {

  const dispatch = useDispatch();

  const checked = useSelector((state) => state.toolkit.orderMainPageSearch);
  const [sideBarStatus, setSideBarStatus] = useState(false)
  const [search, setSearch] = useState("")


  useEffect(()=>{
    dispatch(setMainPageSearch(''))
  }, [checked])

  const sideBarStatusChanger = (message) => {
    setSideBarStatus(message);
  }


  return (
    <div>
      <Box style={{ position: "absolute", right: "5%", top: "-235px" }}>
        <NestedClientsListModal />
        <OrderDeleteModal/>
        <SearchModal/>
        <ClientAddModal />
        <OrderCreateModal />
        <OrderPrintModal />
        <ButtonGroupMainPage sideBarStatusChanger={sideBarStatusChanger}/>
        <HiddenAdminSideBar sideBarStatus={sideBarStatus} sideBarStatusChanger={sideBarStatusChanger}/>
      </Box>
      <Box sx={{ zIndex: 2}}>
      <Box sx={{display:"flex",alignItems:"center",position: "absolute" ,boxSizing: "border-box",p:1.25, paddingTop: '20px',backgroundColor:"white", width:"30%", mb:1.5, borderRadius:'0 0 4px 4px', left:"35%", top: "0px"}}>
        <TextField
        value={search}
        fullWidth
        variant="outlined"
        size='small'
        label="Пошук за номером"
        onChange={(e)=>{setSearch(e.target.value)}}
        />
          <Button
        sx={{marginLeft:2}}
        variant="contained"
        color="success"
        onClick={()=>{
          dispatch(setOrderSearch(search))
        }}
        >
          <SearchIcon/>
        </Button>
        </Box>
        <CollapsibleTable/>
      </Box>
    </div>
  );
};

export default MainPage;
