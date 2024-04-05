import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { ImportAccordion } from "./ImportAccordion";
import { CollectionAccordion } from "./CollectionAccordion";


export default function HidenAdminSideBar(status) {

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
          open={status.sideBarStatus}
          onClose={() => (status.sideBarStatusChanger(false))}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
