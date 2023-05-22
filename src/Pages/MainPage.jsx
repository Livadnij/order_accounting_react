import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NestedClientsListModal from "../components/clientList/ClientListModal";
import { Box } from "@mui/material";
import BasicSpeedDial from "../components/SpeedDialCustom";
import OrderCreateModal from "../components/orderComp/OrderCreateModal";
import CollapsibleTable from "../components/orderComp/OrderMainPageTable";
import { ClientAddModal } from "../components/clientList/ClientAddModal";
import getClients, { db, getOrders } from "../components/Firebase";
import { fetchOrders, saveOrders } from "../components/store/GloabalOrdersList";
import { fetchClients, getClientsData } from "../components/toolkitSlice";

//проверка на вход в систему
const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginedStatus = useSelector((state) => state.toolkit.logined.payload);

const onLogin = async () => {
  if (loginedStatus !== "signIn") {
    navigate("/login");
  } {
    console.log("bip")
    dispatch(fetchClients());
    dispatch(fetchOrders());
    // let clientsData = await getClients(db);
    // let ordersData = await getOrders(db);
    //   dispatch(saveOrders(ordersData))
    //   dispatch(getClientsData(clientsData));
  }
}

  useEffect( () => {
    onLogin();
  }, [1]);

  return (
    <div>
      <Box style={{ position: "absolute", right: "5%", top: "-235px" }}>
        <NestedClientsListModal />
        <ClientAddModal/>
        <OrderCreateModal/>
        <BasicSpeedDial />
      </Box>
      <Box sx={{zIndex: 2}}>
        <CollapsibleTable/>
      </Box>
    </div>
  );
};

export default MainPage;
