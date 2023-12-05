import { Box } from "@mui/material";
import Header from "../../components/header";
import BarChart from "../../components/BarChart";
import Topbar from "../../scenes/global/Topbar";

const Bar = () => {
  return (
    <Box m="20px">
      <Topbar/>
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;