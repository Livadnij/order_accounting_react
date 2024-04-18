import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box,  Button,  IconButton,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { queryData, setQueryRequest } from '../store/GloabalOrdersList';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from "dayjs";
import "dayjs/locale/uk"
import moment from 'moment';
import SettingsIcon from "@mui/icons-material/Settings";
import { openModal, orderModalEdit, orderSaveTable } from '../store/toolkitSlice';
import pdfMake from "pdfmake/build/pdfmake";
import { OrderUnfinishedTableGen } from '../orderComp/OrderUnfnishedTableGen';

export default function SearchAccordion(status) {
  const dispatch = useDispatch();

    const dateConvert = (date) => {
      require('dayjs/locale/uk')
      const dateNew = moment(Number(date))
      const correctDate = dayjs(dateNew).locale('uk').format( "DD.MM.YYYY");
      return correctDate;
    };

    const statusValue = (row) => {
      switch(row.status) {
          case 1 : return 'Офіс';
          case 2 : return 'Порізка';
          case 3 : return 'Обробка';
          case 4 : return 'Свердлення';
          case 5 : return 'Граф. роботи';
          case 10 : return 'Фарбування';
          case 6 : return 'Готово';
          case 7 : return 'Монтаж';
          case 8 : return 'Отриман';
          case 9 : return 'Гартування';
          case 11 : return 'Переробка';
          default : return "";
      }
    }

  const [expanded, setExpanded] = React.useState(false);

  React.useMemo(()=>{setExpanded(false)},[status.clientsFound])

  const AccordionPanel = (status) => {
    const currentCol = useSelector((state) => state.globalOrders.currentCollName);

    const handleChange = (index) => (event, isExpanded) => {
      setExpanded(isExpanded ? index : false);

      if(isExpanded){
        dispatch(setQueryRequest({
          search: status.client.id,
          key: 'clID',
          currentCol: currentCol.name
        }))
          dispatch(queryData())
      } else {dispatch(setQueryRequest({search: "", key: "", currentCol: ""}))}
    };

    const queryIsLoading=useSelector((state) => state.globalOrders.queryIsLoading)

    const tempOrders = useSelector((state) => state.globalOrders.ordersQuery)

    const printOrders = () => {
      const table = OrderUnfinishedTableGen([status.client], tempOrders);
      pdfMake.createPdf(table).getDataUrl((data) => {
        if (data) {
          dispatch(orderSaveTable(data));
          dispatch(openModal("orderPrintModalState"));
        }
      });
    };

    return <Accordion key={status.index} expanded={expanded === status.index} onChange={handleChange(status.index)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography sx={{ width: '33%', flexShrink: 0 }}>
        {status.client.Name}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>{status.client.phoneNum}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{padding:0, maxHeight: "60vh"}}>
    <TableContainer component={Paper} elevation={6} sx={{maxHeight: "50vh"}}>
        <Table aria-label="collapsible table" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" >№</TableCell>
            <TableCell align="center">Початок \ Кінець</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">Коментарі</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          </TableHead>
        <TableBody sx={{overflowY: "scroll"}}>
      {!queryIsLoading && expanded === status.index?tempOrders.map((order, index) => 
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center" > {order.ordID} </TableCell>
        <TableCell align="center">Початок: {dateConvert(order.dateStart)} <br/> Кінець:{dateConvert(order.dateFinish)}</TableCell>
        <TableCell align="center">{statusValue(order)}</TableCell>
        <TableCell align="left"
        sx={{ maxWidth: '350px', whiteSpace:"pre-line"}}>
        {order.comments ? order.comments : ""}
        </TableCell>
        <TableCell align="center">
          <IconButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    dispatch(orderModalEdit(order));
                  }}
                >
                  <SettingsIcon />
                </IconButton>
        </TableCell>
        </TableRow>) : null}
      </TableBody>
      </Table>
      </TableContainer>
      {queryIsLoading?<Box sx={{height:"10vh"}}>
      <Box sx={{ display: 'flex', left: '50%', top : "50%" , position: "absolute", zIndex: 1500}}>
        <CircularProgress />
        </Box>
        </Box>:""}
        <Box sx={{display:"flex", float:'right'}}>
        <Button 
        variant="contained" 
        sx={{ display: !queryIsLoading?"":'none', margin: 2}}
        onClick={()=>{printOrders()}}
        >
              Друк Замовлень
            </Button>
            </Box>
    </AccordionDetails>
  </Accordion>
  }

  return (
    <Box sx={{overflowY: "scroll", maxHeight: "70vh"}}>
      {status.clientsFound.map((client, index)=> <AccordionPanel key = {index} index={index} client={client}/>)}
    </Box>
  );
}