import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../toolkitSlice';
import OrderTabs from './OrderTabs';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: "4px",
  boxShadow: 24,
  padding: " 10px 0 10px 0",
};

export default function OrderCreateModal() {
    const dispatch = useDispatch();
    const handleClose = () => dispatch(openModal('orderModalState'));

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
        <Button
        sx={{ margin: "10px 0 10px 25px" }}
        variant="contained"
        // onClick={() => {
        //   handleOpen();
        // }}
      >
        Додати
      </Button>
        </Box>
      </Modal>
    </div>
  );
}