import { Box, Button, Divider, Modal, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/toolkitSlice';
import SearchAccordion from './SearchAccordion';
import SearchIcon from '@mui/icons-material/Search';
import { setQueryRequest } from '../store/GloabalOrdersList';


const style = {
    height: "85vh",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const SearchModal = () => {

    const [search, setSearch] = React.useState('');
    const [clientsFound, setClientsFound] = React.useState([]);

    const clientsList = useSelector((state) => state.globalOrders.clientsAllList);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setQueryRequest({search: "", key: "", currentCol: ""}))
        dispatch(openModal("searchModalState"))
        setClientsFound([])
        setSearch('')
    };

    const handlePush = () => {
       if (isNaN(search)) {
            // name case
            console.log("name search")
            setClientsFound(clientsList.filter((obj) => obj.Name.includes(search)))
        } 
        else if (!isNaN(search) ) {
            // phone number case
            console.log("phoneNum search")
            setClientsFound(clientsList.filter((obj) => obj.phoneNum.includes(search)))
        } else { setClientsFound([]) }
    }

  return (
    <Modal 
    open={useSelector((state) => state.toolkit.searchModalState)}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
        <Box sx={{display:"flex"}}>
        <TextField
        label={`Вкажіть ім'я клієнта, або номер телефону`}
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        fullWidth
        ></TextField>
        <Box sx={{width: "3%"}}></Box>
            <Button
            onClick={()=>{handlePush()}}
            sx={{borderRadius:50}}
             variant="contained" >
                <SearchIcon/>
            </Button>
        </Box>
        <Divider sx={{margin: 1}}></Divider>
      <SearchAccordion clientsFound = {clientsFound}/>
    </Box>
  </Modal>
  )
}
