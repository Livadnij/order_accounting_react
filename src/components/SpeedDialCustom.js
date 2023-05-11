import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import getClients, { db } from './Firebase';
import { getClientsData, openModal } from './toolkitSlice';
import { useDispatch } from 'react-redux';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';


export default function BasicSpeedDial() {
    const dispatch = useDispatch();

const openUserModal = async () => {
    let data = await getClients(db);
    dispatch(getClientsData(data));
    dispatch(openModal('clientModalState'))
}
const openOrderModal = async () => {
  let data = await getClients(db);
    dispatch(getClientsData(data));
    dispatch(openModal('orderModalState'))
}
const noneTest = () => {
    console.log(`none`)
}

const actions = [
  { icon: <PersonAddIcon />, name: 'додати клієнта', onClick: openUserModal },
  { icon: <LibraryAddIcon />, name: 'додати замовлення', onClick: openOrderModal},
  { icon: <PrintIcon />, name: 'Print', onClick: noneTest},
  { icon: <ShareIcon />, name: 'Share', onClick: noneTest},
];

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        direction = "left"
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16}}
        icon={<SpeedDialIcon sx={{color: "white"}}/>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick = {()=>{action.onClick()}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}