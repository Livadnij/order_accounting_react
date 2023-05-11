import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getClientsData, openModal } from "../toolkitSlice";
import { uploadNewClient } from "../toolkitSlice";
import { nanoid } from "nanoid";
import { Grid, TextField } from "@mui/material";
import getClients, { db } from "../Firebase";
import InputAdornment from "@mui/material/InputAdornment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    let data = await getClients(db);
    dispatch(getClientsData(data));
    setOpen(false);
  };
  const dispatch = useDispatch();
  const [clientsName, setclientsName] = useState("");
  const [clientsNum, setclientsNum] = useState("");
  const [clientsDiscount, setclientsDiscount] = useState("0");
  const groupClientInfo = async () => {
    const id = await nanoid();
    const newClient = {
      Name: clientsName,
      discount: clientsDiscount,
      id: id,
      phoneNum: clientsNum,
    };
    console.log(
      newClient.id,
      newClient.Name,
      newClient.phoneNum,
      newClient.discount
    );
    if (clientsName && clientsNum && id) {
      dispatch(uploadNewClient(newClient));
      setclientsDiscount("");
      setclientsName("");
      setclientsNum("");
    } else {
      alert(`input's can not be empty`);
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add new client
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 350 }}>
          <TextField
            sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
            fullWidth
            variant="outlined"
            value={clientsName ? clientsName : ""}
            label="Ім'я"
            type="string"
            onChange={(e) => setclientsName(e.target.value)}
          ></TextField>
          <TextField
            sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
            fullWidth
            variant="outlined"
            value={clientsNum ? clientsNum : ""}
            label="Номер телефону"
            type="string"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+ 38 </InputAdornment>
              ),
            }}
            onChange={(e) => isNaN(e.target.value)? '' :setclientsNum(e.target.value)}
          ></TextField>
          <TextField
            sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
            fullWidth
            variant="outlined"
            value={clientsDiscount ? clientsDiscount : ""}
            label="Скидка"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> % </InputAdornment>
              )}}
            onChange={(e) => isNaN(e.target.value)? '' :setclientsDiscount(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            onClick={() => {
              groupClientInfo();
              handleClose();
            }}
          >
            Add Client
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const NestedClientsListModal = (state) => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const clientsList = useSelector(
    (state) => state.toolkit.clientsAllList.payload
  );
  const searchList = searchInput
    ? clientsList.filter((data) => data === searchInput)
    : clientsList;

  const handleClose = () => {
    dispatch(openModal("clientModalState"));
  };

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.clientModalState)}
        onClose={handleClose}
      >
        <Box
          sx={{
            ...style,
            width: "800px",
            maxHeight: "75vh",
            paddingRight: "30px",
          }}
        >
          <Box>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="filled"
              value={searchInput}
              label="search"
              type="string"
              placeholder="search"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            ></TextField>
          </Box>
          <Box
            sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "60vh" }}
          >
            {searchList &&
              searchList.map((data) => (
                <Box>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "30px",
                    }}
                    key={data.id}
                  >
                    <Grid xs={0.01}></Grid>
                    <Grid
                      xs={4}
                      sx={{
                        alignSelf: "center",
                        justifySelf: "left",
                        textAlign: "left",
                      }}
                    >
                      {data.Name}
                    </Grid>
                    <Grid xs={4} sx={{ alignSelf: "center" }}>
                      {data.phoneNum}
                    </Grid>
                    <Grid xs={2} sx={{ textAlign: "right" }}>
                      {data.discount.toString()}
                    </Grid>
                    <Grid xs={0.01}></Grid>
                  </Grid>
                </Box>
              ))}
          </Box>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
};

export default NestedClientsListModal;
