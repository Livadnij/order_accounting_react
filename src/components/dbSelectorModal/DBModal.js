import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setDBInClients } from '../store/toolkitSlice';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { fetchClients, fetchOrders, setDBInOrders } from '../store/GloabalOrdersList';

const style = {
    display: "flex",
    flexDirection: 'column' ,
    justifyContent: 'space-between',
  height: 250,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DBModal() {
    const dispatch = useDispatch();
    const [selectedDB, setSelectedDB] = React.useState(true)

    const handleChange = (event) => {
        setSelectedDB(event.target.value);
      };

      const handlePush = async () => {
        console.log(selectedDB)
        dispatch(setDBInClients(selectedDB))
        dispatch(setDBInOrders(selectedDB))
        dispatch(fetchClients());
        dispatch(fetchOrders());
            dispatch(openModal("dbModalState"));
      }


  return (
    <Box>
      <Modal
        open={useSelector((state) => state.toolkit.dbModalState)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Оберіть Базу Даних
          </Typography>
          <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDB}
          onChange={handleChange}
        >
          <MenuItem value={true}>БД для Роботи</MenuItem>
          <MenuItem value={false}>БД для Тестування</MenuItem>
        </Select>
      </FormControl>
      <Button 
      onClick={()=>{handlePush()}}
      variant='contained'
      > 
      Обрати 
      </Button>
        </Box>
      </Modal>
    </Box>
  );
}