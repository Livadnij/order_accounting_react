import React from 'react'
import { Box, Button, TextField } from "@mui/material";
import { InfoBlock } from '../StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import getClients, { db } from '../Firebase';
import { getClientsData, openModal, orderStateUpdate } from '../toolkitSlice';

const OrderClientSelectorComp = () => {
  const dispatch = useDispatch();
  const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);
  const openUserModal = async () => {
    let data = await getClients(db);
    dispatch(getClientsData(data));
    dispatch(openModal('clientModalState'))
}

const updateStatus = (propName, value) => {
  if (propName === 'dateStart' || propName=== 'dateFinish') {
    console.log(propName,value.toString())
    const data = { propName, value: value.toString() };
    dispatch(orderStateUpdate(data));
  } else {
    const data = { propName, value };
    dispatch(orderStateUpdate(data));
  }
};

  return (
    <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "20px 0 20px 0",
    }}
  >
    <InfoBlock>
      <p>Ім’я клієнта</p>
      <TextField
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={tempOrdSave.clName}
        onChange={(e) => updateStatus("clName", e.target.value)}
      />
    </InfoBlock>
    <InfoBlock>
      <p>Скидка, %</p>
      <TextField disabled
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={tempOrdSave.clDiscount}
        onChange={(e) => updateStatus("clDiscount", e.target.value)}
      />
    </InfoBlock>
    <InfoBlock>
      <p>Телефон</p>
      <TextField disabled
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={tempOrdSave.clPhoneNum}
        onChange={(e) => updateStatus("clPhoneNum", e.target.value)}
      />
    </InfoBlock>
    <InfoBlock 
    style={{display:"flex", justifyContent:"end"}}
    >
      <Button
      size="small"
      variant="outlined"
      onClick={()=>{openUserModal()}}
      >
        Список клієнтів
      </Button>
    </InfoBlock>
  </Box>
  )
}

export default OrderClientSelectorComp
