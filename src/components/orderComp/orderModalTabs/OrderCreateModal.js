import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openCloseModal, openModal, orderModalHandleClose, orderUpdate, uploadNewOrder } from '../../store/toolkitSlice';
import OrderTabs from '../OrderTabs';
import { Button } from '@mui/material';
import { fetchOrders } from '../../store/GloabalOrdersList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80vw',
  minHeight: '50vh',
  width: "auto",
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: "4px",
  boxShadow: 24,
  padding: " 10px 0 10px 0",
};

export default function OrderCreateModal() {
    const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);
    const editCheck = !tempOrdSave.ranID? 'none' : ''
    const dispatch = useDispatch();
    const handleClose = () => {
      dispatch(openCloseModal())
    }

      function ChildModal() {
        const handleClose = () => {
          dispatch(openCloseModal())
        };
      
        const modalStyle = {
        boxSizing: 'borderBox',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        height: 'auto',
        bgcolor: 'background.paper',
        borderRadius: "4px",
        boxShadow: 24,
        padding: 3,
        };

        return (
          <React.Fragment>
            <Modal
              open={useSelector((state) => state.toolkit.orderCloseModal)}
              onClose={handleClose}
            >
              <Box sx={modalStyle}>
                <h2>Бажаєте припинити створення замовлення?</h2>
                <Box sx={{display:'flex', justifyContent:'space-between', paddingTop: 2}}>
                <Button
            color="error"
            size='small'
            variant="contained"
            onClick={() => {dispatch(orderModalHandleClose());  dispatch(openModal('orderModalState')); handleClose()}}
            >Так</Button>
            <Button
            size='small'
            variant="contained"
            onClick={() => handleClose()}
            >{`Ні`}</Button>
              </Box>
              </Box>
            </Modal>
          </React.Fragment>
        );
      }

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.orderModalState)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <OrderTabs/>
        <Box sx={{display: "flex", justifyContent:"space-between"}}>
        <Button
        sx={{position: 'absolute', bottom: 10, margin: "10px 0 10px 25px",width:100, display: tempOrdSave.ranID? 'none' : '' }}
        variant="contained"
        onClick={() => {dispatch(uploadNewOrder()); dispatch(fetchOrders())}}
      >
        Додати
      </Button>
      <Button
        sx={{position: 'absolute', bottom: 65, margin: "10px 0 10px 25px",width:100, display: editCheck }}
        variant="contained"
        onClick={() => {dispatch(orderUpdate());dispatch( fetchOrders())}}
      >
        Оновити
      </Button>
      <Button
        color="error"
        sx={{position: 'absolute', bottom: 10, margin: "10px 25px 10px 25px",width:100, display: editCheck }}
        variant="contained"
        onClick={() => {dispatch(openModal('orderDeleteModal'))}}
      >
        Видалити
      </Button>
      </Box>
      <ChildModal/>
        </Box>
      </Modal>
    </div>
  );
}