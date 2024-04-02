import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import { openModal, orderModalEdit, orderSaveTable, orderStateUpdate, orderUpdate, tempOrderSave } from "../store/toolkitSlice";
import PrintIcon from "@mui/icons-material/Print";
import { OrderPrintTableGen } from "./OrderPrintTableGen";
import { useMemo } from "react";
import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/uk"
import { Switch, Tooltip } from "@mui/material";
import MainTableStatus from "./MainTableStatus";
import SortIcon from '@mui/icons-material/Sort';
import MainPageTableSorting from "./MainPageTableSorting";
import { fetchOrders } from "../store/GloabalOrdersList";

const style = {
  borderRight: 0.1,
  borderLeft: 0.1,
  borderColor: 'grey.400'
};

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const clientsList = useSelector((state) => state.globalOrders.clientsAllList);
  const foundClient = clientsList.find((obj) => obj.id === row.clID);
  const deadline = new Date(row.dateFinish) - Date.now();
  const rowColor = () => {
    if (row.status === 8) {
      return "LightGreen";
    } else if (deadline > 86400000 && row.status !== 8) {
      return "";
    } else if (deadline > 0 && row.status !== 8) {
      return "LemonChiffon";
    } else {
      return "MistyRose";
    }
  };

  const dateConvert = (date) => {
    require('dayjs/locale/uk')
    const dateNew = moment(Number(date))
    const correctDate = dayjs(dateNew).locale('uk').format( "DD.MM.YYYY");
    return correctDate;
  };

  const isPaid = () => {
    if(row.fullPrice&& row.paid&&row.fullPrice - row.paid === 0){
      return "Сплачено"
    } else if(row.fullPaid) {
      return "Сплачено"
    } else if (row.fullPrice&& row.paid) { return (row.fullPrice - row.paid)} else {return ""}
  }

  const modalPrint = (row) => {
    const table = OrderPrintTableGen(row, foundClient);
    pdfMake.createPdf(table).getDataUrl((data)=>{
      if (data) {
        dispatch(orderSaveTable(data));
        dispatch(openModal("orderPrintModalState"));
      }
    })
  };

  const updateStatus = (propName, value) => {
    console.log( propName, value )
    dispatch(tempOrderSave(row))
    const data = { propName, value };
    dispatch(orderStateUpdate(data));
    dispatch(orderUpdate());
    dispatch(fetchOrders())
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, backgroundColor: rowColor }}>
        <TableCell sx={style}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={style} align="center" component="th" scope="row">{row.ordID}</TableCell>
        <TableCell sx={style} align="left">{foundClient ? foundClient.Name : "Клієнта не знайдено."}</TableCell>
        <TableCell sx={style} align="left">{`+38 ${foundClient ? foundClient.phoneNum : ""}`}</TableCell>
        <TableCell sx={style} align="left">{dateConvert(row.dateStart)}</TableCell>
        <TableCell sx={style} align="left">{dateConvert(row.dateFinish)}</TableCell>
        <TableCell sx={style} align="left"><MainTableStatus infoRow={row}/></TableCell>
        <TableCell sx={style} align="left">{row.fullPrice}</TableCell>
        <TableCell sx={style} align="center">
          <Box
          sx={{fontSize:14}}
          >
          {row.paid}
          </Box>
          <Box
          sx={{fontSize:14}}
          >
          {row.paidOnCard?"На картку":""}
          </Box>
          </TableCell>
        <TableCell sx={style} align="left">{isPaid()}</TableCell>
        <TableCell align="left"
        sx={{...style, maxWidth: '350px'}}
        >{row.comments ? row.comments : ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                width: "100%",
                margin: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
              sx={{display: "flex",
            alignItems: "center"
            }}
              >
              <Typography variant="h6" gutterBottom component="div">
                  Сплачено
                </Typography>
                <Switch
                checked={row.fullPaid}
                onChange={() =>
                  updateStatus("fullPaid", !row.fullPaid)
                }
              />
              </Box>
              <Box>
              <Typography variant="h6" gutterBottom component="div">
                  Доставка
                </Typography>
                {row.delivery ? row.adress : "Немає доставки"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Tooltip title={row.material.length? 'Друк' : 'Додайте Матеріал'}>
                <span>
                <IconButton
                disabled = {row.material.length? false : true}
                  size="small"
                  variant="contained"
                  onClick={() => {
                    modalPrint(row);
                  }}
                >
                  <PrintIcon />
                </IconButton>
                </span>
                </Tooltip>
                <Tooltip title="Редагувати">
                <IconButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    dispatch(orderModalEdit(row));
                  }}
                >
                  <SettingsIcon />
                </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({search}) {
  const getClientsData = useSelector((state) => state.globalOrders.clientsAllList);
  const getOrdData = useSelector((state) => state.globalOrders.orders)
  const [plugValue, setPlugValue]=useState('')
  const [sortBy, setSortBy]=useState(true)

  const sortIconStyle = {
    transform: sortBy?'':'scaleY(-1)',
}

  const totalOrders = useMemo(() => {
    const sortedOrders = MainPageTableSorting(search, getOrdData, getClientsData)
    const arrayForSort = sortedOrders === 'notFound' || sortedOrders === 'noOrders'? "notFound" : [...sortedOrders]

    if (sortedOrders === 'notFound' || sortedOrders === 'noOrders') {setPlugValue(sortedOrders); return []
    } else if (getOrdData.length) {
      setPlugValue("")
      const ordersData = sortBy ? arrayForSort.sort((b,a) => (Number(a.ordID) > Number(b.ordID)) ? 1 : ((Number(b.ordID) > Number(a.ordID)) ? -1 : 0)) : arrayForSort.sort((a,b) => (Number(a.ordID) > Number(b.ordID)) ? 1 : ((Number(b.ordID) > Number(a.ordID)) ? -1 : 0))
      return ordersData
    }
    return []
  }, [search, getClientsData, getOrdData, sortBy]);

  const emplyPlug = () => {
    if(plugValue === "notFound"){
      return <caption> Не було знайдено підходящих замовлень. </caption>
    } else if (plugValue === "noOrders"){
      return <caption> Оновіть список замовлень або додайте перше замовлення, щоб це повідомлення зникло. </caption>
    } else {return ""}
  }

  return (
    <TableContainer component={Paper} sx={{maxHeight: "85vh"}}>
      <Table stickyHeader aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
              onClick={() => setSortBy(!sortBy)}
              >
                <SortIcon
                sx={sortIconStyle}
                />
              </IconButton>
            </TableCell>
            <TableCell sx={style} align="center" >№</TableCell>
            <TableCell sx={style} align="left">Ім'я Клієнта</TableCell>
            <TableCell sx={style} align="left">Номер Телефону</TableCell>
            <TableCell sx={style} align="left">Дата Початку</TableCell>
            <TableCell sx={style} align="left">Дата Завершення</TableCell>
            <TableCell sx={style} align="left">Стан</TableCell>
            <TableCell sx={style} align="left">Вар-ть</TableCell>
            <TableCell sx={style} align="left">Передплата</TableCell>
            <TableCell sx={style} align="left">Залишок</TableCell>
            <TableCell sx={style} align="left">Коментарі</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          { totalOrders.length ? totalOrders.map((row, index) => <Row key={index} row={row} />) : null}
        </TableBody>
        {emplyPlug()}
      </Table>
    </TableContainer>
  );
}
