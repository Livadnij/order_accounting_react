import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Icon, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react'
import { changeCurrentCollInOrders, fetchClients, fetchCollNames, fetchOrders } from "../store/GloabalOrdersList";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { changeCurrentCollInClients } from '../store/toolkitSlice';

export const CollectionAccordion = () => {

    const dispatch = useDispatch();

    const collectionList = useSelector((state) => state.globalOrders.collNames)
  
    const [currentColl, setCurrentColl] = useState(
      useSelector((state) => state.globalOrders.currentCollName).id
      );

    const getCollNames = () => {
      dispatch(fetchCollNames());
    };

    const emptyPlug = () => {

    }
  
    const CollActions = [
      {
        name: "Оновити список колецій",
        onClick: getCollNames,
      },
      {
        name: "Додати колекцію",
        onClick: emptyPlug,
      }
    ];

    const handleCollChange = (value) => {
      console.log(value)
      dispatch(changeCurrentCollInOrders(collectionList[value]))
      dispatch(changeCurrentCollInClients(collectionList[value]))
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
        {CollActions.map((action) => (
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
  )
}
