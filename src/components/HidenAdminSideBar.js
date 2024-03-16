import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Accordion, AccordionDetails, AccordionSummary, Button, Icon, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import clientsDBList from './data/clients8-9-2023.json' 
import ordersDBList from './data/orders8-9-2023.json' 
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

export default function HidenAdminSideBar(status) {

  const clientsList = useSelector((state) => state.toolkit.clientsAllList);
  const getOrdData = useSelector((state) => state.globalOrders.orders);
  const date = new Date();
  
  console.log(`json clients length: ${clientsDBList.length}, firebase clients length: ${clientsList.length}`)
  console.log(`json orders length: ${ordersDBList.length}, firebase orders length: ${getOrdData.length}`)

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  
  const exportOrders = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(getOrdData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `orders${currentDate}.json`;

    link.click();
  };
  const exportClients = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(clientsList)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `clients${currentDate}.json`;

    link.click();
  }

  const importClients = () => {
    const clientsLength = clientsDBList.length
    for (let i = 1; i <= clientsLength; i++) {
      setDoc(doc(db, "clients", clientsDBList[i-1].id), clientsDBList[i-1])
    }
  }

  const importOrders = () => {
    const ordersLength = ordersDBList.length
    for (let k = 1; k <= ordersLength; k++) {
      setDoc(doc(db, "orders", ordersDBList[k-1].ranID), ordersDBList[k-1])
    }
  }

  const ImpExpActions = [
    {
      name: "Експорт Замовлень",
      onClick: exportOrders,
    },
    {
      name: "Експорт Клієнтів",
      onClick: exportClients,
    },
    {
      name: "Імпорт Замовлень",
      onClick: importOrders,
    },
    {
      name: "Імпорт Клієнтів",
      onClick: importClients,
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 280, boxSizing: "border-box", padding: 2}}
      role="presentation"
    >
         <Accordion sx={{marginBottom: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{width: "88%", display: "flex", justifyContent: "space-between"}}>
          <Icon> <ImportExportIcon/> </Icon>
          <Typography>Експорт \ Імпорт</Typography>
          </Box>
        </AccordionSummary>
        {ImpExpActions.map((action) => (
          <AccordionDetails key={action.name}>
              <Button
                fullWidth
                onClick={() => {
                  action.onClick();
                }}
              >
                <Typography>{action.name}</Typography>
              </Button>
          </AccordionDetails>
        ))}
      </Accordion>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={status.sideBarStatus}
          onClose={() => status.sideBarStatusChanger(false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
