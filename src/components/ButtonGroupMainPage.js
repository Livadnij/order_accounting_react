import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  openModal,
  orderSaveTable,
} from "./store/toolkitSlice";
import { useDispatch, useSelector } from "react-redux";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { fetchClients, fetchCollNames, fetchOrders, handleExitOrders } from "./store/GloabalOrdersList";
import RefreshIcon from "@mui/icons-material/Refresh";
import pdfMake from "pdfmake/build/pdfmake";
import SearchIcon from "@mui/icons-material/Search";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { Box, ButtonGroup, Divider, IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import { OrderUnfinishedTableGen } from "./orderComp/OrderUnfnishedTableGen";
import PrintIcon from '@mui/icons-material/Print';
import { OrderFinishedTableGen } from "./orderComp/OrderFinishedTableGen";

const ButtonGroupMainPage = (status) => {
  const dispatch = useDispatch();
  const clientsList = useSelector((state) => state.globalOrders.clientsAllList);
  const getOrdData = useSelector((state) => state.globalOrders.orders);

  const orderOrders = [...getOrdData];
  orderOrders.sort((a, b) =>
    Number(a.ordID) > Number(b.ordID)
      ? 1
      : Number(b.ordID) > Number(a.ordID)
      ? -1
      : 0
  );

  const openUserModal = async () => {
    dispatch(fetchClients());
    dispatch(openModal("clientModalState"));
  };
  const openOrderModal = async () => {
    dispatch(fetchClients());
    dispatch(fetchOrders());
    dispatch(openModal("orderModalState"));
  };
  const updateDB = () => {
    dispatch(fetchCollNames());
    dispatch(handleExitOrders());
    dispatch(fetchClients());
    dispatch(fetchOrders());
  };

  const openSearch = () => {
    dispatch(openModal("searchModalState"))
  };

  const openSideBar = () => {
    dispatch(fetchCollNames());
    dispatch(openModal("sideBarState"));
  }

  const actions = [
    {
      icon: <ViewSidebarIcon />,
      name: "Відкрити Бокову Панель",
      onClick: openSideBar,
      disabled: false,
    },
    {
      icon: <PersonAddIcon />,
      name: "Список Клієнтів",
      onClick: openUserModal,
      disabled: false,
    },
    {
      icon: <LibraryAddIcon />,
      name: "Додати замовлення",
      onClick: openOrderModal,
      disabled: false,
    },
    {
      icon: <RefreshIcon />,
      name: "Оновити базу",
      onClick: updateDB,
      disabled: false,
    },
    {
      icon: <SearchIcon />,
      name: "Пошук",
      onClick: openSearch,
      disabled: false,
    },
  ];

  const [printValue, setPrintValue] = useState('1')

  const unfinishedPrint = () => {
    const table = OrderUnfinishedTableGen(clientsList, orderOrders);
    pdfMake.createPdf(table).getDataUrl((data) => {
      if (data) {
        dispatch(orderSaveTable(data));
        dispatch(openModal("orderPrintModalState"));
      }
    });
  };

  const printFrinished = () => {
    const table = OrderFinishedTableGen(clientsList, orderOrders);
    pdfMake.createPdf(table).getDataUrl((data) => {
      if (data) {
        dispatch(orderSaveTable(data));
        dispatch(openModal("orderPrintModalState"));
      }
    });
  };

  const printItems = [
    {value: 1, icon: <PrintIcon />, onClick: unfinishedPrint, disabled: getOrdData.length ? false : true, tooltip: "Друк не виконаних замовлень"},
    {value: 2, icon: <PrintIcon />, onClick: printFrinished, disabled: getOrdData.length ? false : true, tooltip: "Друк виконаних замовлень"},
]

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <ButtonGroup
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "white",
        }}
        variant="outlined"
        aria-label="outlined primary button group"
      >
        {actions.map((action) => (
          <Box sx={{ display: "flex" }} key={action.name}>
            <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />
            <Tooltip title={action.name}>
              <span>
                <IconButton
                  disabled={action.disabled}
                  onClick={() => {
                    action.onClick();
                  }}
                >
                  {action.icon}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        ))}
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />
        <Select
              variant="standard"
              sx={{border:"none"}}
              inputProps={{ IconComponent: () => null,  sx: { padding: '0 !important' } }}
              size="small"
              value={printValue}
              onChange={(e)=>setPrintValue(e.target.value)}
              >
                 {printItems.map((item,index)=>
                 <MenuItem sx={{maxWidth: 40, padding:0.1}} key={index} value={item.value}>
                  <Tooltip title={item.tooltip}>
                    <span>
                  <IconButton
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick();
                  }}
                  >
                  {item.icon}
                  </IconButton>
                  </span>
                  </Tooltip>
                 </MenuItem>)}
              </Select>
      </ButtonGroup>
    </Box>
  );
};

export default ButtonGroupMainPage;
