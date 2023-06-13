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
import { openModal, orderModalEdit, orderSaveTable } from "../toolkitSlice";
import PrintIcon from "@mui/icons-material/Print";
import { OrderPrintTableGen } from "./OrderPrintTableGen";
import { statusDecode } from "../WorkDecoding";
import { useMemo } from "react";
import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/uk"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HardwareIcon from '@mui/icons-material/Hardware';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from "@mui/material";

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const clientsList = useSelector((state) => state.toolkit.clientsAllList);
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

  const deliveryIcon = () => {
    if(row.delivery && row.installation){
      return  <Box sx={{display: "flex", justifyContent: "end"}}><LocalShippingIcon/> <HardwareIcon/></Box>
    } else if ( row.delivery ) {
      return <LocalShippingIcon/>
    } else if ( row.installation ) {
      return <HardwareIcon/>
    } else { 
      return <CloseIcon/> 
    }
  }

  const dateConvert = (date) => {
    require('dayjs/locale/uk')
    const dateNew = moment(Number(date))
    // "DD.MM.YYYY"
    const correctDate = dayjs(dateNew).locale('uk').format( "dd DD MMM YYYY");
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

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, backgroundColor: rowColor }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.ordID}
        </TableCell>
        <TableCell align="right">
          {foundClient ? foundClient.Name : "Клієнта не знайдено."}
        </TableCell>
        <TableCell align="right">
          {`+380 ${foundClient ? foundClient.phoneNum : ""}`}
        </TableCell>
        <TableCell align="right">{dateConvert(row.dateStart)}</TableCell>
        <TableCell align="right">{dateConvert(row.dateFinish)}</TableCell>
        <TableCell align="right">{statusDecode[row.status - 1].prop}</TableCell>
        <TableCell align="right">{row.fullPrice}</TableCell>
        <TableCell align="right">{row.paid}</TableCell>
        <TableCell align="right">{isPaid()}</TableCell>
        <TableCell align="right">{deliveryIcon()}</TableCell>
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
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  Коментарі
                </Typography>
                {row.comments ? row.comments : "Немає коментарів"}
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

export default function CollapsibleTable({ search }) {
  const getOrdData = useSelector((state) => state.globalOrders.orders)
  const [plugValue, setPlugValue]=useState('')

  const totalOrders = useMemo(() => {
    const test = [...getOrdData]
    const ordersData = test.sort((a,b) => (Number(a.ordID) > Number(b.ordID)) ? 1 : ((Number(b.ordID) > Number(a.ordID)) ? -1 : 0))
    if(!getOrdData.length){setPlugValue('noOrders')} else if (ordersData&&!ordersData.filter((obj) => obj.ordID.includes(search)).length) {setPlugValue('notFound')}else{setPlugValue('')}
    if (search) {
      return ordersData.filter((obj) => obj.ordID.includes(search));
    }
    return ordersData
  }, [search, getOrdData]);

  const emplyPlug = () => {
    if(plugValue === "notFound"){
      return <caption> Не було знайдено підходящих замовлень. Спробуйте шукати за номером замовлення. </caption>
    } else if (plugValue === "noOrders"){
      return <caption> Додайте перше замовлення, щоб це повідомлення зникло. </caption>
    }
  }

  return (
    <TableContainer component={Paper} sx={{maxHeight: "85vh"}}>
      <Table stickyHeader aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>№</TableCell>
            <TableCell align="right">Ім'я Клієнта</TableCell>
            <TableCell align="right">Номер Телефону</TableCell>
            <TableCell align="right">Дата Початку</TableCell>
            <TableCell align="right">Дата Завршення</TableCell>
            <TableCell align="right">Стан</TableCell>
            <TableCell align="right">Вар-ть</TableCell>
            <TableCell align="right">Передплата</TableCell>
            <TableCell align="right">Залишок</TableCell>
            <TableCell align="right">Монтаж</TableCell>
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
