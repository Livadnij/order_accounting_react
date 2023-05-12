import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NestedClientsListModal from "../components/clientList/ClientListModal";
import { Box } from "@mui/material";
import BasicSpeedDial from "../components/SpeedDialCustom";
import OrderList from "../components/orderComp/OrderList";
import OrderCreateModal from "../components/orderComp/OrderCreateModal";
import CollapsibleTable from "../components/orderComp/OrderTableTest";
import { ClientAddModal } from "../components/clientList/ClientAddModal";

//проверка на вход в систему
const MainPage = () => {
  const navigate = useNavigate();
  const loginedStatus = useSelector((state) => state.toolkit.logined.payload);
  const checkIfNotLogined = () => {
    if (loginedStatus !== "signIn") {
      navigate("/login");
    }
  };

  useEffect(checkIfNotLogined);

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
