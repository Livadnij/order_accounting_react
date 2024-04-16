import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { changeCurrentCollInOrders, fetchClients, fetchCollNames, fetchOrders, handleExitOrders } from "../store/GloabalOrdersList";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { changeCurrentCollInClients, uploadNewColl } from '../store/toolkitSlice';


export const CollectionAccordion = () => {

    const dispatch = useDispatch();

    const collectionList = useSelector((state) => state.globalOrders.collNames)
    const collLastElement = collectionList.length ? collectionList.reduce(
      (prevObj, currObj) => { return Number(prevObj.id) > Number(currObj.id) ? prevObj : currObj;}
      ): {id: 0};
    const collArrayLength = Number(collLastElement.id)+1

    const [currentColl, setCurrentColl] = useState(
      useSelector((state) => state.globalOrders.currentCollName).id
      );
    const [newCollName, setNewCollName] = useState("");

    const getCollNames = () => {
      dispatch(fetchCollNames());
    };

    const addColl = () => {
      const newColl = {
        Name: newCollName,
        id: collArrayLength,
      };
      if (newCollName && collArrayLength) {
        dispatch(uploadNewColl(newColl));
        dispatch(fetchCollNames());
        setNewCollName("")
      }
    };

    const handleCollChange = (value) => {
      dispatch(changeCurrentCollInOrders(collectionList[value]))
      dispatch(changeCurrentCollInClients(collectionList[value]))
      dispatch(handleExitOrders())
      dispatch(fetchOrders());
      dispatch(fetchClients())
      };

  return (
    <Accordion sx={{marginBottom: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{width: "88%", display: "flex", justifyContent: "space-between"}}>
          <Icon> <CollectionsBookmarkIcon/> </Icon>
          <Typography>Коллекції</Typography>
          </Box>
        </AccordionSummary>
        <Divider/>
        <AccordionDetails key={"Обрати Колекцію"}>
        <FormControl fullWidth>
            <InputLabel>Обрана Колекція</InputLabel>
            <Select
              value={currentColl}
              label="Обрати Колекцію"
              onChange={(e) => {
                setCurrentColl(e.target.value)
                handleCollChange(e.target.value);
              }}
            >
                {collectionList.map((object, index) => (
                    <MenuItem key={index} value={object.id}>{object.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          </AccordionDetails>
          <AccordionDetails key={"Оновити список колецій"}>
              <Button
              variant="outlined"
                fullWidth
                onClick={() => {
                  getCollNames();
                }}
              >
                <Typography>{"Оновити список колецій"}</Typography>
              </Button>
          </AccordionDetails>
          <Divider/>
          <AccordionDetails key={"Ім'я нової колекції"}>
        <FormControl fullWidth>
            <TextField
            label="Ім'я нової колекції"
            onChange={(e)=>setNewCollName(e.target.value)}
            value={newCollName}
            />
          </FormControl>
          </AccordionDetails>
          <AccordionDetails key={"Додати колекцію"}>
              <Button
              variant="outlined"
                fullWidth
                onClick={() => {
                  addColl();
                }}
              >
                <Typography>{"Додати нову колекцію"}</Typography>
              </Button>
          </AccordionDetails>
      </Accordion>
  )
}
