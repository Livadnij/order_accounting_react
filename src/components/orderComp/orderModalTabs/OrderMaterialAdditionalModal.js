import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { additionalWorkPush, openModal } from "../../toolkitSlice";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  padding: 4,
};

export default function OrderMaterialAdditionalModal() {
  const dispatch = useDispatch();

  const [work, setWork] = useState("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");

  const handleClose = () => {
    setWork('')
    setValueOne('')
    setValueTwo('')
    dispatch(openModal("orderMaterialAdditionalState"));
  };

  const handleSave = () => {
    let value
    if(work === 1 && valueOne !== false && valueTwo !== false) {
    value = [work, valueOne, valueTwo]
  } else if (work === 3 && valueOne !== false) {
    value = [work, valueOne]
  } else if (work === 4 && valueOne !== false && valueTwo !== false) {
    value = [work, valueOne, valueTwo]
  } else if (work === 5 && valueOne !== false) {
    value = [work, valueOne]
  } else { 
    value = [work]
  }
  dispatch(additionalWorkPush(value))
}

  return (
    <div>
      <Modal
        open={useSelector(
          (state) => state.toolkit.orderMaterialAdditionalState
        )}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Оберіть роботу:</p>
          <Select
            size="small"
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
              setValueOne("");
              setValueTwo("");
            }}
          >
            <MenuItem value={1}>Свердлення</MenuItem>
            <MenuItem value={2}>Уф.Друк</MenuItem>
            <MenuItem value={3}>Фарбування</MenuItem>
            <MenuItem value={4}>Подвійне Фарбування</MenuItem>
            <MenuItem value={5}>Піскуоструй</MenuItem>
            <MenuItem value={6}>Гартування</MenuItem>
            <MenuItem value={7}>Порізка Лазером</MenuItem>
            <MenuItem value={8}>Поклійка Оракала</MenuItem>
            <MenuItem value={9}>Поклійка Броні</MenuItem>
          </Select>
          <Select
            sx={{ display: [work === 1 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          >
            <MenuItem value={1}>ø5</MenuItem>
            <MenuItem value={2}>ø6</MenuItem>
            <MenuItem value={3}>ø7</MenuItem>
            <MenuItem value={4}>ø8</MenuItem>
            <MenuItem value={5}>ø9</MenuItem>
            <MenuItem value={6}>ø10</MenuItem>
          </Select>
          <Select
            sx={{ display: [work === 1 ? "" : "none"] }}
            value={valueTwo}
            size="small"
            onChange={(e) => {
              setValueTwo(e.target.value);
            }}
          >
            <MenuItem value={1}>1 од.</MenuItem>
            <MenuItem value={2}>2 од.</MenuItem>
            <MenuItem value={3}>3 од.</MenuItem>
            <MenuItem value={4}>4 од.</MenuItem>
            <MenuItem value={5}>5 од.</MenuItem>
            <MenuItem value={6}>6 од.</MenuItem>
            <MenuItem value={7}>7 од.</MenuItem>
            <MenuItem value={8}>8 од.</MenuItem>
            <MenuItem value={9}>9 од.</MenuItem>
            <MenuItem value={10}>10 од.</MenuItem>
          </Select>
          <TextField
            sx={{ display: [work === 3 || work === 4 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          ></TextField>
          <TextField
            sx={{ display: [work === 4 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          ></TextField>
          <Select
            sx={{ display: [work === 5 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          >
            <MenuItem value={1}>Повний Фоновий</MenuItem>
            <MenuItem value={2}>3/4 Фоновий</MenuItem>
            <MenuItem value={3}>Половина Фоновий</MenuItem>
            <MenuItem value={4}>1/4 Фоновий</MenuItem>
            <MenuItem value={5}>Фігурний</MenuItem>
          </Select>
          <Button
          variant="contained"
          onClick={handleSave}
          >Додати</Button>
        </Box>
      </Modal>
    </div>
  );
}
