import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PerceptronEntrenamiento from "./perceptronEntrenamiento";
import PerceptronSimulacion from "./perceptronSimulacion";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PerceptronMaster() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Entrenamiento" {...a11yProps(0)} />
            <Tab label="Simulación" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <div className={"page"}>
          <TabPanel value={value} index={0}>
            <PerceptronEntrenamiento />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PerceptronSimulacion />
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}

export default PerceptronMaster;
