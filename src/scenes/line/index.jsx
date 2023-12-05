import { Box } from "@mui/material";
import Header from "../../components/header";
import LineChart from "../../components/LineChart";
import Topbar from "../../scenes/global/Topbar";

const Line = () => {
  return (
    <Box m="20px">
      <Topbar/>
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;