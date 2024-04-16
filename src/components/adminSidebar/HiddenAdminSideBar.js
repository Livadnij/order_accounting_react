import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { ImportAccordion } from "./ImportAccordion";
import { CollectionAccordion } from "./CollectionAccordion";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/toolkitSlice";


export default function HidenAdminSideBar() {
  
  const dispatch = useDispatch();

  const list = (anchor) => (
    <Box
      sx={{ width: 280, boxSizing: "border-box", padding: 2}}
      role="presentation"
    >
      <ImportAccordion/>
      <CollectionAccordion/>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
        sx={{zIndex:1100}}
          anchor={"left"}
          open={useSelector((state) => state.toolkit.sideBarState)}
          onClose={() => (dispatch(openModal("sideBarState")))}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
