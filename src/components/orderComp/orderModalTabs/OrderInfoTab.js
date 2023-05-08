import { Divider, Switch } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { orderStateUpdate } from "../../toolkitSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* flex-wrap: wrap; */
  white-space: nowrap;
  padding-left: 30px;
  padding-right: 30px;
  width: 50%;
  justify-content: space-between;
  box-sizing: border-box;
`;

const OrderInfoTab = () => {
  const dispatch = useDispatch();
  const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);

  const updateStatus = (propName, value) => {
    if (propName === 'dateStart' || propName=== 'dateFinish') {
      console.log(propName, dayjs(value))
    } else {
      const data = { propName, value };
      dispatch(orderStateUpdate(data));
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "spaceBetween",
            padding: "10px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Номер Замовлення</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.ordID}
              onChange={(e) =>
                // setOrdID(e.target.value)
                updateStatus("ordID", e.target.value)
              }
            />
          </InfoBlock>
          <InfoBlock>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <p>Виготовлено</p>
              <Switch
                checked={tempOrdSave.ready}
                onChange={() => updateStatus("ready", !tempOrdSave.ready)}
              />
            </Box>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <p>Видано клієнту</p>
              <Switch
                checked={tempOrdSave.given}
                onChange={() => updateStatus("given", !tempOrdSave.given)}
              />
            </Box>
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Ім’я клієнта</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.clName}
              onChange={(e) => updateStatus("clName", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Скидка, %</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.clDiscount}
              onChange={(e) => updateStatus("clDiscount", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Телефон</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.clPhoneNum}
              onChange={(e) => updateStatus("clPhoneNum", e.target.value)}
            />
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}>
          <InfoBlock>
          <p>Дата початку</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"uk"}
            >
              <DatePicker
              value={tempOrdSave.dateStart}
              onChange={(newValue) => updateStatus("dateStart", newValue)}
              />
            </LocalizationProvider>
          </InfoBlock>
          <InfoBlock>
          <p>Дата закінчення</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"uk"}
            >
              <DatePicker
              value={tempOrdSave.dateFinish}
              onChange={(newValue) => updateStatus("dateFinish", newValue)}
              />
            </LocalizationProvider>
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Повна вартість</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.fullPrice}
              onChange={(e) => updateStatus("fullPrice", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Передплата</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.paid}
              onChange={(e) => updateStatus("paid", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Залишок до сплати</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.leftover}
              onChange={(e) => updateStatus("leftover", e.target.value)}
            />
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Стан замовлення</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.status}
              onChange={(e) => updateStatus("status", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <p>Монтаж</p>
              <Switch
                checked={tempOrdSave.installation}
                onChange={() =>
                  updateStatus("installation", !tempOrdSave.installation)
                }
              />
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>Доставка</p>
              <Switch
                checked={tempOrdSave.delivery}
                onChange={() => updateStatus("delivery", !tempOrdSave.delivery)}
              />
            </Box>
          </InfoBlock>
          <InfoBlock>
            <p>Адреса монтажу</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.adress}
              onChange={(e) => updateStatus("adress", e.target.value)}
            />
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%", margin: "10 10 10 10" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "20px 0 0 0",
          }}
        >
          <InfoBlock>
            <p>Коментарі</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.comments}
              onChange={(e) => updateStatus("comments", e.target.value)}
            />
          </InfoBlock>
        </Box>
      </Box>
    </div>
  );
};

export default OrderInfoTab;
