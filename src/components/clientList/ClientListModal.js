import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import getClients, { db } from "../Firebase";
import { getClientsData, openModal } from "../toolkitSlice";
import { uploadNewClient } from "../toolkitSlice";
import { nanoid } from "nanoid";
import { Grid, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PercentIcon from "@mui/icons-material/Percent";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

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
    setOpen(false);
    let data = await getClients(db);
    dispatch(getClientsData(data));
  };
  const dispatch = useDispatch();
  const [clientsName, setclientsName] = useState("");
  const [clientsNum, setclientsNum] = useState("");
  const [clientsDiscount, setclientsDiscount] = useState(false);
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
      setclientsDiscount(false);
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
        <Box sx={{ ...style, width: 420 }}>
          <TextField
            sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
            fullWidth
            variant="filled"
            value={clientsName ? clientsName : ""}
            label="Name"
            type="string"
            placeholder="Name"
            onChange={(e) => setclientsName(e.target.value)}
          ></TextField>
          <TextField
            sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
            fullWidth
            variant="filled"
            value={clientsNum ? clientsNum : ""}
            label="Number"
            type="string"
            placeholder="Number"
            onChange={(e) => setclientsNum(e.target.value)}
          ></TextField>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <p style={{ marginTop: "13px" }}>Discount 10% :</p>
            </Grid>
            <Grid item xs={2}>
              <Checkbox
                checked={clientsDiscount}
                type="checkbox"
                id="discountCheckbox"
                onChange={() => setclientsDiscount(!clientsDiscount)}
                defaultChecked
              />
            </Grid>
          </Grid>
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

const NestedClientsListModal = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const clientsList = useSelector(
    (state) => state.toolkit.clientsAllList.payload
  );
 
  const [clientsSearchedList, setClientsSearchedList] = useState(clientsList)
  const handleClose = () => {
    dispatch(openModal('clientModalState'));
  };

useEffect(()=>{if (searchInput.length > 0){
  setClientsSearchedList(searchInput)
}}, [clientsList])

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.clientModalState)}
        onClose={handleClose}
      >
        <Box
          sx={{ ...style, width: 500, maxHeight: "75vh", paddingRight: "20px" }}
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
              // onChange={handleInputChange}
            ></TextField>
          </Box>
          <Box
            sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "60vh" }}
          >
            {clientsList &&
              clientsList.map((data) => (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "30px",
                  }}
                  key={data.id}
                >
                  <Grid xs={5} sx={{ alignSelf: "center" }}>
                    {data.Name}
                  </Grid>
                  <Grid xs={5} sx={{ alignSelf: "center" }}>
                    {data.phoneNum}
                  </Grid>
                  <Grid xs={1}>
                    {data.discount ? (
                      <PercentIcon sx={{ fill: "#2e7d32" }} />
                    ) : (
                      <IndeterminateCheckBoxIcon sx={{ fill: "#d32f2f" }} />
                    )}
                  </Grid>
                </Grid>
              ))}
          </Box>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

export default NestedClientsListModal