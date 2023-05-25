import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../toolkitSlice';
import jsPDF from 'jspdf';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70vw",
  height: "85vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function OrderPrintModal() {
    const dispatch = useDispatch();
    const handleClose = () => {
    dispatch(openModal('orderPrintModalState'))};

    const generateData = function(amount) {
        const result = [];
        const data = {
          coin: "100",
          game_group: "GameGroup",
          game_name: "XPTO2",
          game_version: "25",
          machine: "20485861",
          vlt: "0"
        };
        for (let i = 0; i < amount; i += 1) {
          data.id = (i + 1).toString();
          result.push(Object.assign({}, data));
        }
        return result;
      };
      
      function createHeaders(keys) {
        const result = [];
        for (let i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "center",
            padding: 0
          });
        }
        return result;
      }
      
      const headers = createHeaders([
        "id",
        "coin",
        "game_group",
        "game_name",
        "game_version",
        "machine",
        "vlt"
      ]);
      
      const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.table(1, 1, generateData(10), headers, { autoSize: true });
    //   doc.output('datauri')
      console.log(doc)

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.orderPrintModalState)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div id='testOne' style={{display: "flex", justifyContent: "center"}}>
        <embed style={{width: "100%", height: "85vh"}} type='application/pdf' src={doc.output('datauristring')}/>
        </div>
        </Box>
      </Modal>
    </div>
  );
}